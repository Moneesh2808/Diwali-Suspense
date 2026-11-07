import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface RomanticBoyGirlKissProps {
  isKissing?: boolean;
}

export const RomanticBoyGirlKiss: React.FC<RomanticBoyGirlKissProps> = () => {
  return (
    <div className="relative w-full max-w-sm sm:max-w-md h-64 sm:h-76 mx-auto flex items-center justify-center select-none overflow-visible">
      {/* Warm Diwali ambient glow behind the companions */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute w-64 h-64 sm:w-72 sm:h-72 rounded-full pointer-events-none blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(255, 180, 50, 0.6) 0%, rgba(255, 77, 141, 0.35) 45%, rgba(0, 0, 0, 0) 75%)',
        }}
      />

      {/* Floating heart above them representing their special bond */}
      <motion.div
        animate={{ y: [-4, 4, -4], scale: [1, 1.08, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-3 z-30 flex items-center justify-center"
      >
        <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-rose-500 fill-rose-500 drop-shadow-[0_0_25px_rgba(255,42,112,0.9)] animate-pulse" />
      </motion.div>

      {/* Realistic Illustration: Boy & Girl Side-by-Side as Best Friends with Hand on Shoulder */}
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9 }}
        className="relative z-20 flex items-center justify-center w-full max-w-[320px] sm:max-w-[350px]"
      >
        <svg
          viewBox="0 0 340 240"
          className="w-full h-auto drop-shadow-[0_4px_25px_rgba(255,200,87,0.4)] overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Realistic Boy Skin Tone */}
            <linearGradient id="boyRealSkin" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F2CBB0" />
              <stop offset="50%" stopColor="#D99B77" />
              <stop offset="100%" stopColor="#A8633F" />
            </linearGradient>

            {/* Realistic Girl Skin Tone */}
            <linearGradient id="girlRealSkin" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE4D4" />
              <stop offset="50%" stopColor="#F5BFA5" />
              <stop offset="100%" stopColor="#C87F63" />
            </linearGradient>

            {/* Boy Hair Gradient */}
            <linearGradient id="boyRealHair" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4A3427" />
              <stop offset="60%" stopColor="#251610" />
              <stop offset="100%" stopColor="#120A07" />
            </linearGradient>

            {/* Girl Hair Gradient */}
            <linearGradient id="girlRealHair" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5E382A" />
              <stop offset="50%" stopColor="#301A12" />
              <stop offset="100%" stopColor="#160805" />
            </linearGradient>

            {/* Boy Jacket Gradient */}
            <linearGradient id="boyJacket" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E2A40" />
              <stop offset="60%" stopColor="#121B2C" />
              <stop offset="100%" stopColor="#0B111D" />
            </linearGradient>

            {/* Girl Kurti / Top Gradient */}
            <linearGradient id="girlTop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9E2A4B" />
              <stop offset="60%" stopColor="#751532" />
              <stop offset="100%" stopColor="#400A1A" />
            </linearGradient>
          </defs>

          {/* ================= GIRL'S LONG HAIR BACKGROUND ================= */}
          <path
            d="M210,60 
               C245,55 265,90 268,135 
               C270,175 255,210 240,240 
               L190,240 
               C215,200 225,160 222,125 
               C220,95 215,75 210,60 Z"
            fill="url(#girlRealHair)"
          />

          {/* ================= BOY (LEFT COMPANION) ================= */}
          <g className="boy-friend">
            {/* Boy Torso & Jacket */}
            <path
              d="M30,240 
                 C35,175 60,152 105,148 
                 L145,148 
                 C158,148 168,158 174,175 
                 C155,190 125,215 105,240 Z"
              fill="url(#boyJacket)"
            />
            {/* Jacket collar & trim */}
            <path
              d="M105,148 L122,168 L142,148"
              stroke="#FFC857"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            <path d="M122,168 L122,240" stroke="#FFC857" strokeWidth="1.8" opacity="0.6" />

            {/* Boy Natural Neck (Seamless & proportionate) */}
            <path
              d="M102,108 C100,125 104,142 108,150 L136,150 C140,142 142,125 140,108 Z"
              fill="url(#boyRealSkin)"
            />

            {/* Boy Realistic Head (Smiling toward viewer / companion) */}
            <path
              d="M88,68 
                 C88,38 112,22 138,32 
                 C155,38 162,52 160,75 
                 C158,98 145,115 125,116 
                 C105,117 88,98 88,68 Z"
              fill="url(#boyRealSkin)"
            />

            {/* Boy Handsome Layered Hair */}
            <path
              d="M80,68 
                 C78,32 102,12 138,12 
                 C162,12 174,28 170,55 
                 C166,62 154,55 144,48 
                 C136,42 122,45 112,38 
                 C100,32 90,44 82,52 Z"
              fill="url(#boyRealHair)"
            />
            {/* Hair golden rim highlights */}
            <path
              d="M95,20 C115,16 142,20 158,32"
              stroke="#FFD700"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.85"
            />

            {/* Boy Eyes & Warm Friendly Smile */}
            {/* Eye (Happy crescent) */}
            <path d="M130,58 Q138,64 146,58" stroke="#3D2012" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            <path d="M128,50 Q137,46 146,51" stroke="#261208" strokeWidth="2.8" strokeLinecap="round" fill="none" />
            {/* Nose */}
            <path d="M148,65 Q152,74 146,78 L142,78" stroke="#995632" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            {/* Warm Friendly Smile */}
            <path d="M130,90 Q142,102 152,88" stroke="#873522" strokeWidth="2.4" strokeLinecap="round" fill="none" />

            {/* Boy Ear */}
            <ellipse cx="98" cy="74" rx="6" ry="9" fill="url(#boyRealSkin)" />
            <path d="M98,69 Q101,74 98,79" stroke="#995632" strokeWidth="1.5" fill="none" />
          </g>

          {/* ================= GIRL (RIGHT COMPANION) ================= */}
          <g className="girl-friend">
            {/* Girl Torso & Kurti/Dress */}
            <path
              d="M310,240 
                 C305,178 275,152 235,148 
                 L195,148 
                 C180,148 168,160 162,175 
                 C180,192 215,218 235,240 Z"
              fill="url(#girlTop)"
            />
            {/* Neckline */}
            <path
              d="M198,150 Q215,168 232,150"
              stroke="#FF4D8D"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />

            {/* Girl Natural Neck */}
            <path
              d="M198,108 C196,125 198,142 202,150 L228,150 C232,142 234,125 232,108 Z"
              fill="url(#girlRealSkin)"
            />
            {/* Delicate gold necklace */}
            <path d="M202,132 Q215,140 228,132" stroke="#FFD700" strokeWidth="2" fill="none" />
            <circle cx="215" cy="138" r="2.5" fill="#FFD700" />

            {/* Girl Realistic Head (Smiling happily beside him) */}
            <path
              d="M250,68 
                 C250,38 226,22 200,32 
                 C183,38 176,52 178,75 
                 C180,98 193,115 213,116 
                 C233,117 250,98 250,68 Z"
              fill="url(#girlRealSkin)"
            />

            {/* Soft Rosy Cheeks */}
            <ellipse cx="195" cy="82" rx="8" ry="5" fill="#FF4D8D" opacity="0.38" />

            {/* Girl Soft Flowing Bangs & Waves */}
            <path
              d="M256,68 
                 C258,32 236,12 200,12 
                 C176,12 164,28 168,55 
                 C172,62 184,55 194,48 
                 C202,42 216,45 226,38 
                 C238,32 248,44 256,52 Z"
              fill="url(#girlRealHair)"
            />
            {/* Highlights */}
            <path
              d="M242,20 C222,16 198,20 182,32"
              stroke="#FFAAC8"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.85"
            />

            {/* Girl Eyes with Eyelashes & Sweet Smile */}
            {/* Eye with eyelashes */}
            <path d="M190,58 Q198,64 206,58" stroke="#38190F" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            <path d="M192,59 L190,63 M196,61 L195,65 M202,60 L203,64" stroke="#38190F" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M188,50 Q197,46 206,51" stroke="#261208" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Nose */}
            <path d="M188,66 Q184,74 190,78 L194,78" stroke="#995632" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            {/* Sweet Happy Smile */}
            <path d="M186,90 Q196,102 208,88" stroke="#B82845" strokeWidth="2.4" strokeLinecap="round" fill="none" />

            {/* Girl Ear & Gold Earring */}
            <ellipse cx="240" cy="74" rx="6" ry="9" fill="url(#girlRealSkin)" />
            <circle cx="240" cy="84" r="3" fill="#FFD700" />
          </g>

          {/* ================= REALISTIC HAND ON SHOULDER ================= */}
          {/* Boy's arm and hand gently resting over her shoulder like a true friend/companion */}
          <g className="hand-on-shoulder">
            {/* Arm sleeve wrapping around shoulder */}
            <path
              d="M135,148 
                 C150,140 175,138 198,145 
                 C195,155 170,165 145,160 Z"
              fill="url(#boyJacket)"
            />
            {/* Boy's hand resting over her shoulder fabric with natural fingers */}
            <path
              d="M192,142 
                 C200,138 212,140 216,145 
                 C218,148 215,154 208,156 
                 C202,157 194,152 190,146 Z"
              fill="url(#boyRealSkin)"
              stroke="#995632"
              strokeWidth="1.2"
            />
            {/* Finger knuckles & nails */}
            <path d="M198,142 Q202,148 199,152" stroke="#7A3F20" strokeWidth="1.2" fill="none" />
            <path d="M204,143 Q208,149 205,153" stroke="#7A3F20" strokeWidth="1.2" fill="none" />
            <path d="M210,145 Q213,150 211,154" stroke="#7A3F20" strokeWidth="1.2" fill="none" />
          </g>
        </svg>
      </motion.div>
    </div>
  );
};
