import React from 'react';

export const HorizonSilhouettes: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 pointer-events-none z-5 overflow-hidden">
      {/* Warm ambient floor glow from the deepams and fireworks */}
      <div 
        className="absolute bottom-0 inset-x-0 h-44 pointer-events-none opacity-40 mix-blend-screen"
        style={{
          background: 'radial-gradient(ellipse 90% 60% at 50% 100%, rgba(255, 180, 50, 0.28) 0%, rgba(157, 78, 221, 0.15) 50%, rgba(2, 3, 10, 0) 100%)'
        }}
      />

      {/* Atmospheric Indian architectural horizon silhouette */}
      <svg
        className="w-full h-24 sm:h-32 md:h-40 block text-[#050711] fill-current opacity-85"
        viewBox="0 0 1440 180"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="
          M0,180 L1440,180 L1440,165 
          C1410,165 1400,140 1380,140 C1360,140 1350,165 1330,165
          L1300,165 L1300,135 C1295,120 1285,110 1270,110 C1255,110 1245,120 1240,135 L1240,165
          L1210,165 C1200,150 1180,145 1160,150 L1150,165
          L1110,165 L1110,120 C1100,105 1080,95 1060,115 L1060,165
          L1020,165 C1000,160 990,145 970,145 C950,145 940,160 920,165
          L880,165 L880,130 C870,110 850,90 820,125 L820,165
          L780,165 C760,150 740,140 720,140 C700,140 680,150 660,165
          L620,165 L620,125 C600,95 570,110 560,130 L560,165
          L520,165 C500,160 490,145 470,145 C450,145 440,160 420,165
          L380,165 L380,115 C360,95 340,105 330,120 L330,165
          L290,165 C275,150 255,145 240,150 L230,165
          L200,165 L200,135 C195,120 185,110 170,110 C155,110 145,120 140,135 L140,165
          L110,165 C90,165 80,140 60,140 C40,140 30,165 0,165 Z" 
        />
        {/* Distant temple spires / domes */}
        <path d="
          M170,110 Q170,85 170,70 Q170,85 170,110 Z
          M1060,95 Q1060,70 1060,55 Q1060,70 1060,95 Z
          M720,140 Q720,115 720,100 Q720,115 720,140 Z
          M380,95 Q380,75 380,60 Q380,75 380,95 Z
          M1270,110 Q1270,85 1270,70 Q1270,85 1270,110 Z"
          stroke="#071126"
          strokeWidth="3"
        />
      </svg>

      {/* Atmospheric misty ground blur */}
      <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-[#02030A] to-transparent pointer-events-none" />
    </div>
  );
};

