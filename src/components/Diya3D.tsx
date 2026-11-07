import React, { useState, useId } from 'react';
import { DiyaFlame } from './DiyaFlame';

interface Diya3DProps {
  size?: 'normal' | 'small' | 'large';
  className?: string;
  brighten?: boolean;
}

export const Diya3D: React.FC<Diya3DProps> = ({
  size = 'normal',
  className = '',
  brighten = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const uid = useId().replace(/:/g, '_'); // Unique ID for SVG gradients to prevent collision

  // Proportional scale
  const scale = size === 'small' ? 0.75 : size === 'large' ? 1.15 : 0.95;
  const intensity = brighten ? 1.6 : isHovered ? 1.3 : 1.0;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setTimeout(() => setIsHovered(false), 800)}
      className={`relative select-none cursor-pointer transition-transform duration-300 ease-out group flex flex-col items-center shrink-0 ${className}`}
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'bottom center',
      }}
      aria-label="Traditional Indian brass vilaku deepam"
    >
      {/* Floor reflection & warm pool of light */}
      <div
        className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-44 h-14 rounded-full pointer-events-none transition-all duration-500"
        style={{
          background: `radial-gradient(ellipse at center, rgba(255, 180, 50, ${isHovered || brighten ? 0.55 : 0.35}) 0%, rgba(200, 100, 20, 0.2) 50%, rgba(0, 0, 0, 0) 80%)`,
          filter: 'blur(8px)',
          transform: `scale(${isHovered || brighten ? 1.3 : 1})`,
        }}
      />

      {/* Main Vilaku Container */}
      <div className="relative flex flex-col items-center overflow-visible">
        {/* Flames on the top oil plate */}
        <div className="relative z-30 mb-[-12px] flex items-center justify-center">
          {/* Main central flame */}
          <div className="relative z-20">
            <DiyaFlame scale={1.15} intensity={intensity} isHovered={isHovered || brighten} />
          </div>

          {/* Left auxiliary wick flame */}
          <div className="absolute -left-6 bottom-0 z-10 opacity-85">
            <DiyaFlame scale={0.7} intensity={intensity * 0.9} isHovered={isHovered || brighten} />
          </div>

          {/* Right auxiliary wick flame */}
          <div className="absolute -right-6 bottom-0 z-10 opacity-85">
            <DiyaFlame scale={0.7} intensity={intensity * 0.9} isHovered={isHovered || brighten} />
          </div>
        </div>

        {/* Solid & Metallic Brass Kuthu Vilaku SVG Artwork */}
        <div 
          className="relative z-20 transition-all duration-300 overflow-visible"
          style={{
            filter: `drop-shadow(0 0 ${isHovered || brighten ? '22px rgba(255, 200, 87, 0.75)' : '12px rgba(255, 180, 50, 0.45)'})`
          }}
        >
          <svg
            width="135"
            height="255"
            viewBox="0 0 140 260"
            className="overflow-visible block"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Unique Polished Metallic Brass Gradient */}
              <linearGradient id={`brassMet_${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8A5A1C" />
                <stop offset="25%" stopColor="#E2A63B" />
                <stop offset="45%" stopColor="#FFF2A8" />
                <stop offset="70%" stopColor="#E2A63B" />
                <stop offset="90%" stopColor="#B87B22" />
                <stop offset="100%" stopColor="#6E4413" />
              </linearGradient>

              {/* Specular Highlight Gradient */}
              <linearGradient id={`brassHigh_${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#A86E20" />
                <stop offset="30%" stopColor="#FFE894" />
                <stop offset="50%" stopColor="#FFFFFF" />
                <stop offset="70%" stopColor="#FFDE6A" />
                <stop offset="100%" stopColor="#875114" />
              </linearGradient>

              {/* Liquid Ghee Gradient */}
              <linearGradient id={`ghee_${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFC857" />
                <stop offset="50%" stopColor="#FB8500" />
                <stop offset="100%" stopColor="#8C3D00" />
              </linearGradient>

              {/* Pedestal Base Gradient */}
              <linearGradient id={`pedBase_${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#5A350E" />
                <stop offset="25%" stopColor="#C4882B" />
                <stop offset="50%" stopColor="#FFE699" />
                <stop offset="75%" stopColor="#B37822" />
                <stop offset="100%" stopColor="#432507" />
              </linearGradient>
            </defs>

            {/* 1. Crown Finial / Annapakshi at the Top */}
            <path
              d="M70,8 
                 C74,14 78,18 78,24 
                 C78,29 74,33 70,35 
                 C66,33 62,29 62,24 
                 C62,18 66,14 70,8 Z"
              fill={`url(#brassHigh_${uid})`}
              stroke="#FFF2A8"
              strokeWidth="0.8"
            />
            {/* Crown wings */}
            <path
              d="M62,20 C56,17 50,22 55,28 C59,29 63,28 65,26 Z
                 M78,20 C84,17 90,22 85,28 C81,29 77,28 75,26 Z"
              fill={`url(#brassMet_${uid})`}
            />
            <circle cx="70" cy="37" r="4.5" fill={`url(#brassHigh_${uid})`} />

            {/* 2. Upper Oil Reservoir (Agal) - Solid brass body */}
            <path
              d="M18,46 
                 C18,46 32,65 70,65 
                 C108,65 122,46 122,46 
                 C125,43 127,48 120,53 
                 C104,69 88,73 70,73 
                 C52,73 36,69 20,53 
                 C13,48 15,43 18,46 Z"
              fill={`url(#brassMet_${uid})`}
              stroke="#FFE894"
              strokeWidth="1.2"
            />

            {/* Liquid Ghee Surface */}
            <ellipse cx="70" cy="49" rx="46" ry="7.5" fill={`url(#ghee_${uid})`} />
            <ellipse cx="70" cy="49" rx="38" ry="4" fill="#FFEAA7" opacity="0.6" />

            {/* Agal bowl decorative fluting */}
            <path d="M30,56 Q70,71 110,56" stroke="#5E380E" strokeWidth="2" fill="none" opacity="0.8" />
            <path d="M40,61 Q70,72 100,61" stroke="#FFF2A8" strokeWidth="1.5" fill="none" opacity="0.9" />

            {/* 3. Bowl Base Collar */}
            <path d="M56,73 L84,73 L78,83 L62,83 Z" fill={`url(#brassMet_${uid})`} stroke="#FFE894" strokeWidth="0.8" />
            <ellipse cx="70" cy="83" rx="12" ry="4" fill={`url(#brassHigh_${uid})`} />

            {/* 4. Ornate Tiered Stem (Kambam) */}
            {/* Top bead bulb */}
            <ellipse cx="70" cy="94" rx="10" ry="8" fill={`url(#brassHigh_${uid})`} stroke="#B87B22" strokeWidth="0.8" />
            
            {/* Central turned ring */}
            <ellipse cx="70" cy="104" rx="15" ry="4.5" fill={`url(#brassMet_${uid})`} stroke="#FFE894" strokeWidth="0.8" />

            {/* Fluted Middle Column Stem */}
            <path
              d="M63,104 
                 C63,128 61,148 62,175 
                 L78,175 
                 C79,148 77,128 77,104 Z"
              fill={`url(#brassMet_${uid})`}
              stroke="#D4942A"
              strokeWidth="1"
            />
            {/* Specular highlight strip down stem */}
            <path d="M68,104 L69,175 L71,175 L70,104 Z" fill="#FFFFFF" opacity="0.5" />

            {/* Lower ring bulge */}
            <ellipse cx="70" cy="177" rx="17" ry="5.5" fill={`url(#brassMet_${uid})`} stroke="#FFE894" strokeWidth="0.8" />
            <ellipse cx="70" cy="186" rx="13" ry="4.5" fill={`url(#brassHigh_${uid})`} />

            {/* 5. Stepped Pedestal Base (Peedam) - Fully Solid and Grounded */}
            {/* Collar tier */}
            <path d="M52,188 L88,188 L94,205 L46,205 Z" fill={`url(#brassMet_${uid})`} stroke="#B87B22" strokeWidth="0.8" />
            <ellipse cx="70" cy="205" rx="24" ry="5.5" fill={`url(#brassHigh_${uid})`} />

            {/* Bell shaped base dome */}
            <path
              d="M44,206 
                 C44,206 30,226 24,236 
                 C22,240 26,243 34,243 
                 L106,243 
                 C114,243 118,240 116,236 
                 C110,226 96,206 96,206 Z"
              fill={`url(#pedBase_${uid})`}
              stroke="#C4882B"
              strokeWidth="1"
            />

            {/* Engraved floral petal curves on base */}
            <path d="M36,236 Q50,220 70,220 Q90,220 104,236" stroke="#FFF2A8" strokeWidth="2" fill="none" opacity="0.9" />
            <path d="M46,238 Q70,226 94,238" stroke="#4A2606" strokeWidth="1.5" fill="none" />

            {/* Thick bottom rim footing */}
            <rect x="20" y="243" width="100" height="11" rx="4" fill={`url(#brassMet_${uid})`} stroke="#FFE894" strokeWidth="1" />
            <ellipse cx="70" cy="254" rx="48" ry="4.5" fill="#3B2006" opacity="0.75" />
          </svg>
        </div>
      </div>
    </div>
  );
};
