import React, { useEffect, useRef } from 'react';
import { SceneState } from '../types';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  type: 'ember' | 'heart';
  rotation: number;
  rotSpeed: number;
  wobbleSpeed: number;
  wobblePhase: number;
}

interface FloatingParticlesProps {
  scene: SceneState;
}

export const FloatingParticles: React.FC<FloatingParticlesProps> = ({ scene }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
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
    const maxParticles = scene === 'KISS_SURPRISE' ? 65 : 40;

    const emberColors = ['#FFC857', '#FFA500', '#FF8C00', '#FFE5A3', '#FFD700'];
    const heartColors = ['#FF4D8D', '#FF2A70', '#FFAAC8', '#FF69B4', '#FF85A2'];

    const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, alpha: number, rot: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(0, topCurveHeight);
      ctx.bezierCurveTo(-size / 2, -size / 2, -size, topCurveHeight / 3, 0, size);
      ctx.bezierCurveTo(size, topCurveHeight / 3, size / 2, -size / 2, 0, topCurveHeight);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const spawnParticle = (initialY?: number): Particle => {
      const isHeart = (scene === 'DIWALI_MESSAGE' || scene === 'KISS_SURPRISE') && Math.random() < (scene === 'KISS_SURPRISE' ? 0.5 : 0.25);
      return {
        x: Math.random() * width,
        y: initialY !== undefined ? initialY : height + Math.random() * 20,
        vx: (Math.random() - 0.5) * 0.6,
        vy: isHeart ? -(Math.random() * 0.6 + 0.35) : -(Math.random() * 1.0 + 0.4),
        size: isHeart ? Math.random() * 7 + 6 : Math.random() * 2.8 + 1.2,
        alpha: Math.random() * 0.5 + 0.3,
        color: isHeart
          ? heartColors[Math.floor(Math.random() * heartColors.length)]
          : emberColors[Math.floor(Math.random() * emberColors.length)],
        type: isHeart ? 'heart' : 'ember',
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        wobbleSpeed: Math.random() * 0.03 + 0.01,
        wobblePhase: Math.random() * Math.PI * 2,
      };
    };

    // Pre-populate particles across screen
    for (let i = 0; i < maxParticles; i++) {
      particles.push(spawnParticle(Math.random() * height));
    }

    let tick = 0;
    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // Maintain particle count
      while (particles.length < maxParticles) {
        particles.push(spawnParticle());
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.y += p.vy;
        p.x += p.vx + Math.sin(tick * p.wobbleSpeed + p.wobblePhase) * 0.5;
        p.rotation += p.rotSpeed;

        if (p.type === 'heart') {
          drawHeart(ctx, p.x, p.y, p.size, p.color, p.alpha, p.rotation);
        } else {
          // Soft glowing ember sphere without sharp star shapes
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          // Outer faint halo
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha * 0.2;
          ctx.fill();
          ctx.restore();
        }

        // Recycle if out of bounds
        if (p.y < -30 || p.x < -30 || p.x > width + 30) {
          particles.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [scene]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      aria-hidden="true"
    />
  );
};
