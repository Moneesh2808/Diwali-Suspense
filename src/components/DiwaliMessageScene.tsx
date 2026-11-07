import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Diya3D } from './Diya3D';
import { soundEngine } from '../audio/soundEngine';

interface DiwaliMessageSceneProps {
  onNextSurprise: () => void;
}

export const DiwaliMessageScene: React.FC<DiwaliMessageSceneProps> = ({ onNextSurprise }) => {
  // Ensure the page starts directly at the top
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const handleButtonClick = () => {
    soundEngine.playChimeArpeggio();
    onNextSurprise();
  };

  const paragraphs = [
    "This Diwali, my biggest wish is not just for beautiful lights or a sky full of fireworks. My biggest wish is for us.",
    "I hope this festival brings peace to our hearts, happiness into our lives, and strength to face every challenge together.",
    "Whatever problems come our way, I hope we find the courage to solve them hand in hand. Whatever dreams we have, I hope we keep supporting each other, achieving more, and growing stronger together.",
    "I want us to celebrate each other's little victories, stand beside each other during difficult days, and keep choosing one another through every season of life.",
    "May our love shine brighter than every diya, our happiness sparkle brighter than every firework, and our future be filled with beautiful memories that we create together.",
    "This Diwali, I don't wish for a perfect life. I wish for a beautiful life with you.",
    "More love. More understanding. More success. More laughter. More dreams fulfilled. And many more Diwalis together.",
    "No matter how dark the sky becomes, I hope we will always be each other's light.",
    "Happy Diwali, my Papa. You are one of the most beautiful parts of my life, and this little surprise is just for you."
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.0, ease: 'easeOut' }}
      className="relative min-h-screen w-full flex flex-col items-center justify-start px-3 sm:px-6 md:px-12 py-8 sm:py-12 z-20 overflow-y-auto"
    >
      {/* 
        DESKTOP FLANKING VILAKUS:
        Only on tablets/desktops (hidden on mobile so they NEVER cover the text words)
      */}
      <div className="hidden md:block fixed left-4 lg:left-12 top-1/2 -translate-y-1/2 pointer-events-none z-30 transform md:scale-90 lg:scale-100">
        <Diya3D size="normal" />
      </div>

      <div className="hidden md:block fixed right-4 lg:right-12 top-1/2 -translate-y-1/2 pointer-events-none z-30 transform md:scale-90 lg:scale-100">
        <Diya3D size="normal" />
      </div>

      {/* Main Center Romantic Content Card */}
      <div className="w-full max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto text-center px-2 sm:px-4 z-20">
        
        {/* Heading directly in view at top */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: -10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4 sm:mb-6 mt-2"
        >
          <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm uppercase tracking-[0.25em] text-rose-400 font-sans font-medium mb-2">
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            <span>Happy Festival of Lights</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-black text-amber-200 tracking-wide glow-text-gold">
            Happy Diwali, <br className="sm:hidden" />
            <span className="shimmer-text">My Love ❤️</span>
          </h1>
        </motion.div>

        {/* Romantic Letter Card */}
        <div className="romantic-card glow-box-gold rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 text-left relative overflow-hidden mb-6">
          {/* Top divider */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          </div>

          {/* Salutation */}
          <h2 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-amber-300 mb-4 sm:mb-6 glow-text-gold flex items-center gap-2">
            <span>My dearest Papa</span>
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 fill-rose-500 inline-block animate-pulse" />
          </h2>

          {/* Staggered Paragraphs */}
          <div className="space-y-3.5 sm:space-y-4 text-zinc-200 font-serif text-sm sm:text-base md:text-lg leading-relaxed">
            {paragraphs.map((para, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + index * 0.07, duration: 0.6 }}
                className="text-zinc-200/95"
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Closing Signature */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-amber-400/20 text-right font-handwriting text-xl sm:text-2xl md:text-3xl text-amber-300">
            With all my love, always. ❤️🪔
          </div>

          {/* Suspense Teaser Before Final Button */}
          <div className="mt-8 sm:mt-10 text-center pt-6 sm:pt-8 border-t border-amber-400/25">
            <p className="text-sm sm:text-base md:text-lg font-serif italic text-amber-200/90 mb-4 sm:mb-6">
              And I have one more little surprise for you, Papa… ❤️
            </p>

            {/* Second Suspense Button */}
            <div className="relative inline-block">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 opacity-70 blur-md animate-pulse" />

              <button
                onClick={handleButtonClick}
                aria-label="Open the final surprise"
                className="relative flex items-center justify-center gap-2.5 px-7 sm:px-10 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 text-white font-semibold text-xs sm:text-sm md:text-base tracking-wide shadow-[0_0_25px_rgba(255,77,141,0.6)] hover:shadow-[0_0_40px_rgba(255,77,141,0.9)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <span>One Last Surprise 💋</span>
                <Heart className="w-4 h-4 text-white fill-white animate-bounce" />
              </button>
            </div>
          </div>
        </div>

        {/* 
          MOBILE: VILAKUS DISPLAYED NICELY BELOW THE CONTENT (As requested)
        */}
        <div className="md:hidden flex items-center justify-around w-full max-w-xs mx-auto mb-8">
          <Diya3D size="small" />
          <Diya3D size="small" />
        </div>
      </div>
    </motion.div>
  );
};
