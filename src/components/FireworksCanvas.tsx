import React, { useEffect, useRef } from 'react';
import { soundEngine } from '../audio/soundEngine';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  color: string;
  size: number;
  gravity: number;
  drag: number;
  type: 'spark' | 'kiss' | 'heart';
  rotation: number;
  rotSpeed: number;
  trail: { x: number; y: number; alpha: number }[];
}

interface Rocket {
  x: number;
  y: number;
  targetY: number;
  vx: number;
  vy: number;
  color: string;
  type: 'peony' | 'willow' | 'heart' | 'chrysanthemum' | 'kiss';
  trail: { x: number; y: number }[];
  isExploded: boolean;
}

interface SkyFlash {
  x: number;
  y: number;
  color: string;
  alpha: number;
  radius: number;
}

interface SoundShockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
  speed: number;
}

interface FireworksCanvasProps {
  mode: 'choreographed' | 'ambient' | 'kiss_burst' | 'none';
  onChoreographyComplete?: () => void;
}

export const FireworksCanvas: React.FC<FireworksCanvasProps> = ({
  mode,
  onChoreographyComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (mode === 'none') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: Particle[] = [];
    const rockets: Rocket[] = [];
    const flashes: SkyFlash[] = [];
    const shockwaves: SoundShockwave[] = [];

    const fireworkColors = [
      '#FF2A55', // Crimson red
      '#00E5FF', // Electric blue
      '#00FF88', // Emerald green
      '#FF2D95', // Hot pink
      '#9D4EDD', // Royal purple
      '#FFD700', // Gold
      '#FF6B1A', // Radiant orange
      '#FF1493', // Deep rose
    ];

    // Helper: draw kiss lips
    const drawKissLips = (c: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, alpha: number, rot: number) => {
      c.save();
      c.translate(x, y);
      c.rotate(rot);
      c.globalAlpha = alpha;
      c.fillStyle = color;
      c.beginPath();
      c.moveTo(-size, 0);
      c.quadraticCurveTo(-size * 0.5, -size * 0.5, -size * 0.2, -size * 0.3);
      c.quadraticCurveTo(0, -size * 0.1, size * 0.2, -size * 0.3);
      c.quadraticCurveTo(size * 0.5, -size * 0.5, size, 0);
      c.quadraticCurveTo(size * 0.5, size * 0.1, 0, size * 0.15);
      c.quadraticCurveTo(-size * 0.5, size * 0.1, -size, 0);
      c.closePath();
      c.fill();
      c.beginPath();
      c.moveTo(-size * 0.85, size * 0.05);
      c.quadraticCurveTo(0, size * 0.7, size * 0.85, size * 0.05);
      c.quadraticCurveTo(0, size * 0.2, -size * 0.85, size * 0.05);
      c.closePath();
      c.fill();
      c.restore();
    };

    // Helper: draw heart
    const drawHeart = (c: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, alpha: number, rot: number) => {
      c.save();
      c.translate(x, y);
      c.rotate(rot);
      c.globalAlpha = alpha;
      c.fillStyle = color;
      c.beginPath();
      const topCurveHeight = size * 0.3;
      c.moveTo(0, topCurveHeight);
      c.bezierCurveTo(-size / 2, -size / 2, -size, topCurveHeight / 3, 0, size);
      c.bezierCurveTo(size, topCurveHeight / 3, size / 2, -size / 2, 0, topCurveHeight);
      c.closePath();
      c.fill();
      c.restore();
    };

    const explodeRocket = (r: Rocket) => {
      // Trigger audible sound
      soundEngine.playFireworkExplosion();

      // Sky illumination flash
      flashes.push({
        x: r.x,
        y: r.y,
        color: r.color,
        alpha: 0.4,
        radius: Math.min(width, height) * 0.45,
      });

      // Visual Sound Shockwave Ripples (User can visually SEE the sound wave!)
      shockwaves.push({
        x: r.x,
        y: r.y,
        radius: 8,
        maxRadius: Math.min(width, height) * 0.26,
        alpha: 0.85,
        color: r.color,
        speed: 5.5,
      });
      shockwaves.push({
        x: r.x,
        y: r.y,
        radius: 2,
        maxRadius: Math.min(width, height) * 0.18,
        alpha: 0.65,
        color: '#FFFFFF',
        speed: 4.0,
      });

      if (r.type === 'kiss') {
        const count = 45;
        for (let i = 0; i < count; i++) {
          const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
          const speed = Math.random() * 4.5 + 2.0;
          const isLip = Math.random() < 0.6;

          particles.push({
            x: r.x,
            y: r.y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            alpha: 1.0,
            decay: Math.random() * 0.009 + 0.008,
            color: Math.random() < 0.6 ? '#FF2D95' : Math.random() < 0.8 ? '#FF1493' : '#FFD700',
            size: isLip ? Math.random() * 8 + 8 : Math.random() * 7 + 6,
            gravity: 0.03,
            drag: 0.975,
            type: isLip ? 'kiss' : 'heart',
            rotation: (Math.random() - 0.5) * 0.8,
            rotSpeed: (Math.random() - 0.5) * 0.04,
            trail: [],
          });
        }
      } else if (r.type === 'heart') {
        const count = 85;
        for (let i = 0; i < count; i++) {
          const t = (Math.PI * 2 * i) / count;
          const heartX = 16 * Math.pow(Math.sin(t), 3);
          const heartY = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
          const speed = 0.28 + Math.random() * 0.05;

          particles.push({
            x: r.x,
            y: r.y,
            vx: heartX * speed,
            vy: heartY * speed,
            alpha: 1.0,
            decay: Math.random() * 0.012 + 0.011,
            color: Math.random() < 0.7 ? '#FF2D95' : '#FFD700',
            size: Math.random() * 2.8 + 2.0,
            gravity: 0.03,
            drag: 0.98,
            type: 'spark',
            rotation: 0,
            rotSpeed: 0,
            trail: [],
          });
        }
      } else {
        const count = r.type === 'willow' ? 85 : 75;
        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 6.5 + 2.5;
          const isWillow = r.type === 'willow';

          particles.push({
            x: r.x,
            y: r.y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            alpha: 1.0,
            decay: isWillow ? 0.009 : Math.random() * 0.015 + 0.012,
            color: r.color,
            size: Math.random() * 2.6 + 1.8,
            gravity: isWillow ? 0.055 : 0.04,
            drag: 0.978,
            type: 'spark',
            rotation: 0,
            rotSpeed: 0,
            trail: [],
          });
        }
      }
    };

    const launchRocket = (
      x: number,
      targetY: number,
      color: string,
      type: 'peony' | 'willow' | 'heart' | 'chrysanthemum' | 'kiss' = 'peony'
    ) => {
      soundEngine.playRocketLaunch();
      const vx = (Math.random() - 0.5) * 1.5;
      const vy = -Math.sqrt(2 * 0.18 * (height - targetY));

      rockets.push({
        x,
        y: height - 10,
        targetY,
        vx,
        vy,
        color,
        type,
        trail: [],
        isExploded: false,
      });
    };

    const scheduledTimeouts: number[] = [];

    // EXACTLY 6-SECOND CHOREOGRAPHED SHOW FOR SCENE 2
    if (mode === 'choreographed') {
      scheduledTimeouts.push(
        window.setTimeout(() => launchRocket(width * 0.35, height * 0.28, '#FFD700', 'peony'), 150),
        window.setTimeout(() => launchRocket(width * 0.65, height * 0.30, '#FFC857', 'willow'), 500),
        window.setTimeout(() => launchRocket(width * 0.22, height * 0.22, '#FF2A55', 'peony'), 1000),
        window.setTimeout(() => launchRocket(width * 0.78, height * 0.24, '#00E5FF', 'peony'), 1450),
        window.setTimeout(() => launchRocket(width * 0.28, height * 0.26, '#00FF88', 'chrysanthemum'), 2000),
        window.setTimeout(() => launchRocket(width * 0.72, height * 0.25, '#FF2D95', 'heart'), 2350),
        window.setTimeout(() => launchRocket(width * 0.50, height * 0.20, '#9D4EDD', 'willow'), 2700),
        window.setTimeout(() => launchRocket(width * 0.20, height * 0.26, '#FF6B1A', 'peony'), 3100),
        window.setTimeout(() => launchRocket(width * 0.80, height * 0.22, '#00E5FF', 'willow'), 3450),
        window.setTimeout(() => launchRocket(width * 0.45, height * 0.18, '#FF2D95', 'heart'), 3800),
        window.setTimeout(() => launchRocket(width * 0.25, height * 0.24, '#00FF88', 'chrysanthemum'), 4200),
        window.setTimeout(() => launchRocket(width * 0.75, height * 0.20, '#FF2A55', 'peony'), 4400),
        window.setTimeout(() => launchRocket(width * 0.38, height * 0.16, '#FFD700', 'willow'), 4700),
        window.setTimeout(() => launchRocket(width * 0.62, height * 0.18, '#9D4EDD', 'peony'), 4900),
        window.setTimeout(() => launchRocket(width * 0.50, height * 0.15, '#FF2D95', 'heart'), 5150),
        window.setTimeout(() => {
          if (onChoreographyComplete) {
            onChoreographyComplete();
          }
        }, 6000)
      );
    }

    if (mode === 'kiss_burst') {
      scheduledTimeouts.push(
        window.setTimeout(() => launchRocket(width * 0.5, height * 0.28, '#FF2D95', 'kiss'), 200),
        window.setTimeout(() => launchRocket(width * 0.32, height * 0.22, '#FF1493', 'kiss'), 650),
        window.setTimeout(() => launchRocket(width * 0.68, height * 0.24, '#FF4D8D', 'kiss'), 1050),
        window.setTimeout(() => launchRocket(width * 0.5, height * 0.18, '#FFD700', 'heart'), 1500),
        window.setTimeout(() => launchRocket(width * 0.4, height * 0.20, '#FF2D95', 'kiss'), 2000),
        window.setTimeout(() => launchRocket(width * 0.6, height * 0.20, '#FF1493', 'kiss'), 2350),
        window.setTimeout(() => launchRocket(width * 0.5, height * 0.16, '#FFD700', 'heart'), 2800)
      );
    }

    let ambientTimer = 0;

    const render = () => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = 'lighter';

      // 1. Sky Flashes
      for (let i = flashes.length - 1; i >= 0; i--) {
        const f = flashes[i];
        f.alpha -= 0.018;
        if (f.alpha <= 0) {
          flashes.splice(i, 1);
          continue;
        }

        const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.radius);
        grad.addColorStop(0, f.color);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.save();
        ctx.globalAlpha = f.alpha;
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 2. VISUAL SOUND SHOCKWAVES (User can SEE the sound expanding!)
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += sw.speed;
        sw.alpha = Math.max(0, 1 - sw.radius / sw.maxRadius);

        if (sw.alpha <= 0 || sw.radius >= sw.maxRadius) {
          shockwaves.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = sw.alpha * 0.8;
        ctx.strokeStyle = sw.color;
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Second inner sound ring
        if (sw.radius > 20) {
          ctx.globalAlpha = sw.alpha * 0.4;
          ctx.beginPath();
          ctx.arc(sw.x, sw.y, sw.radius * 0.75, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();
      }

      // 3. Rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.x += r.vx;
        r.y += r.vy;
        r.vy += 0.18;

        r.trail.push({ x: r.x, y: r.y });
        if (r.trail.length > 7) r.trail.shift();

        ctx.strokeStyle = '#FFEAA7';
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        for (let j = 0; j < r.trail.length; j++) {
          const pt = r.trail[j];
          if (j === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();

        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(r.x, r.y, 3.2, 0, Math.PI * 2);
        ctx.fill();

        if (r.vy >= -0.5 || r.y <= r.targetY) {
          explodeRocket(r);
          rockets.splice(i, 1);
        }
      }

      // 4. Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vx *= p.drag;
        p.vy *= p.drag;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.rotation += p.rotSpeed;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        if (p.type === 'kiss') {
          drawKissLips(ctx, p.x, p.y, p.size, p.color, p.alpha, p.rotation);
        } else if (p.type === 'heart') {
          drawHeart(ctx, p.x, p.y, p.size, p.color, p.alpha, p.rotation);
        } else {
          p.trail.push({ x: p.x, y: p.y, alpha: p.alpha });
          if (p.trail.length > 5) p.trail.shift();

          for (let j = 0; j < p.trail.length; j++) {
            const pt = p.trail[j];
            ctx.save();
            ctx.globalAlpha = pt.alpha * 0.45;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, p.size * (j / p.trail.length), 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }

          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      // 5. Ambient mode
      if (mode === 'ambient') {
        ambientTimer++;
        if (ambientTimer % 160 === 0 && Math.random() < 0.75) {
          const sideX = Math.random() < 0.5 ? Math.random() * (width * 0.28) : width - Math.random() * (width * 0.28);
          const color = fireworkColors[Math.floor(Math.random() * fireworkColors.length)];
          const types: Array<'peony' | 'willow' | 'heart' | 'chrysanthemum'> = ['peony', 'willow', 'heart', 'chrysanthemum'];
          const type = types[Math.floor(Math.random() * types.length)];
          launchRocket(sideX, height * (0.2 + Math.random() * 0.2), color, type);
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      scheduledTimeouts.forEach(clearTimeout);
    };
  }, [mode, onChoreographyComplete]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-15"
      aria-hidden="true"
    />
  );
};
