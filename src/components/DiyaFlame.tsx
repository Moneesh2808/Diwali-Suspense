import React, { useEffect, useState } from 'react';

interface DiyaFlameProps {
  scale?: number;
  intensity?: number;
  isHovered?: boolean;
}

export const DiyaFlame: React.FC<DiyaFlameProps> = ({
  scale = 1,
  intensity = 1,
  isHovered = false,
}) => {
  const [flickerOffset, setFlickerOffset] = useState({ scaleY: 1, skewX: 0, opacity: 0.95 });

  useEffect(() => {
    let animId: number;
    let t = Math.random() * 100;

    const animate = () => {
      t += 0.08;
      // Perlin-like organic flicker with combined sine waves
      const sY = 1 + Math.sin(t * 3.2) * 0.08 + Math.cos(t * 7.1) * 0.05 + (isHovered ? 0.15 : 0);
      const skX = Math.sin(t * 2.1) * 3 + Math.cos(t * 5.4) * 2;
      const op = 0.9 + Math.sin(t * 4.5) * 0.09;

      setFlickerOffset({
        scaleY: Math.max(0.85, sY),
        skewX: skX,
        opacity: Math.min(1, op),
      });

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [isHovered]);

  const currentScale = scale * (isHovered ? 1.15 : 1) * intensity;

  return (
    <div 
      className="relative flex items-center justify-center pointer-events-none select-none"
      style={{
        transform: `scale(${currentScale})`,
        transition: 'transform 0.3s ease-out'
      }}
    >
      {/* Outer ambient light halo cast onto surrounding scene */}
      <div
        className="absolute rounded-full pointer-events-none -translate-y-3 mix-blend-screen transition-opacity duration-300"
        style={{
          width: `${140 * intensity}px`,
          height: `${140 * intensity}px`,
          background: 'radial-gradient(circle, rgba(255, 180, 50, 0.45) 0%, rgba(255, 100, 20, 0.2) 40%, rgba(255, 50, 0, 0) 70%)',
          opacity: (isHovered ? 0.95 : 0.75) * flickerOffset.opacity,
          transform: `scale(${flickerOffset.scaleY})`,
          filter: 'blur(8px)',
        }}
      />

      {/* Secondary warm gold glow */}
      <div
        className="absolute rounded-full pointer-events-none -translate-y-2 mix-blend-screen"
        style={{
          width: '70px',
          height: '70px',
          background: 'radial-gradient(circle, rgba(255, 235, 150, 0.8) 0%, rgba(255, 140, 20, 0.45) 50%, rgba(255, 60, 0, 0) 75%)',
          filter: 'blur(4px)',
          opacity: flickerOffset.opacity,
        }}
      />

      {/* SVG Multi-Layered Realistic Teardrop Flame */}
      <div
        style={{
          transform: `scaleY(${flickerOffset.scaleY}) skewX(${flickerOffset.skewX}deg)`,
          transformOrigin: '50% 90%',
          filter: `drop-shadow(0 0 10px rgba(255, 160, 30, ${isHovered ? 0.9 : 0.7}))`,
        }}
        className="relative z-10"
      >
        <svg
          width="40"
          height="64"
          viewBox="0 0 40 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Outer flame gradient */}
            <linearGradient id="flameOuter" x1="20" y1="62" x2="20" y2="2" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#E63946" stopOpacity="0.9" />
              <stop offset="30%" stopColor="#FB8500" />
              <stop offset="65%" stopColor="#FFB703" />
              <stop offset="90%" stopColor="#FFE066" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>

            {/* Inner core gradient */}
            <linearGradient id="flameInner" x1="20" y1="60" x2="20" y2="16" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2A9D8F" stopOpacity="0.8" />
              <stop offset="25%" stopColor="#FFD166" />
              <stop offset="70%" stopColor="#FFF9EB" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>

            {/* Base blue oxygen flame */}
            <radialGradient id="flameBaseBlue" cx="20" cy="58" r="8" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00B4D8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0077B6" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Outer Flame body */}
          <path
            d="M20,2 
               C26,14 36,32 36,46 
               C36,56 29,62 20,62 
               C11,62 4,56 4,46 
               C4,32 14,14 20,2 Z"
            fill="url(#flameOuter)"
          />

          {/* Inner luminous bright core */}
          <path
            d="M20,16 
               C24,24 30,38 30,48 
               C30,55 25,59 20,59 
               C15,59 10,55 10,48 
               C10,38 16,24 20,16 Z"
            fill="url(#flameInner)"
            opacity="0.95"
          />

          {/* Hot white central ember line */}
          <ellipse cx="20" cy="46" rx="3.5" ry="9" fill="#FFFFFF" opacity="0.9" />

          {/* Base blue teardrop */}
          <ellipse cx="20" cy="57" rx="6" ry="3.5" fill="url(#flameBaseBlue)" />
        </svg>
      </div>

      {/* Cotton wick */}
      <div 
        className="absolute bottom-[-4px] w-1.5 h-3 bg-gradient-to-t from-[#1F1810] to-[#59422F] rounded-full z-20"
        style={{
          boxShadow: '0 0 3px rgba(255, 100, 0, 0.8)'
        }}
      />
    </div>
  );
};

