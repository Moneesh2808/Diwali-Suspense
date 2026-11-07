import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../audio/soundEngine';
import { Diya3D } from './Diya3D';
import { FireworksCanvas } from './FireworksCanvas';
import { RomanticBoyGirlKiss } from './RomanticBoyGirlKiss';

interface KissSurpriseSceneProps {
  onReplay: () => void;
}

interface FloatingKiss {
  id: number;
  x: number;
  y: number;
  scale: number;
}

export const KissSurpriseScene: React.FC<KissSurpriseSceneProps> = ({ onReplay }) => {
  const [isKissing, setIsKissing] = useState<boolean>(false);
  const [floatingKisses, setFloatingKisses] = useState<FloatingKiss[]>([]);
  const [showContent, setShowContent] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    const spawnKissBurst = (originX: number, originY: number) => {
      soundEngine.playRomanticKissShimmer();
      confetti({
        particleCount: 40,
        spread: 65,
        origin: { x: originX, y: originY },
        colors: ['#FF2D95', '#FF1493', '#FFAAC8', '#FFD700', '#FFFFFF'],
        shapes: ['circle'],
        scalar: 1.1,
        disableForReducedMotion: true,
        zIndex: 9999,
      });
    };

    // 1. First Kiss at 1.4s
    const t1 = setTimeout(() => {
      setIsKissing(true);
      spawnKissBurst(0.5, 0.25);
      setFloatingKisses(prev => [...prev, { id: 1, x: 48, y: 28, scale: 1.1 }]);
    }, 1400);

    // 2. Second Kiss at 2.5s
    const t2 = setTimeout(() => {
      spawnKissBurst(0.48, 0.24);
      setFloatingKisses(prev => [...prev, { id: 2, x: 42, y: 22, scale: 1.3 }]);
    }, 2500);

    // 3. Third Loving Kiss at 3.6s
    const t3 = setTimeout(() => {
      spawnKissBurst(0.52, 0.23);
      setFloatingKisses(prev => [
        ...prev,
        { id: 3, x: 55, y: 20, scale: 1.4 },
        { id: 4, x: 50, y: 15, scale: 1.5 }
      ]);
    }, 3600);

    // 4. THEN ONLY AFTER KISSES, REVEAL CONTENT at 4.6s!
    const t4 = setTimeout(() => {
      setShowContent(true);
    }, 4600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
      className="relative min-h-screen w-full flex flex-col items-center justify-start px-3 sm:px-6 py-6 sm:py-10 z-25 overflow-y-auto"
    >
      {/* 
        SKY SHOTS BURNING INTO KISSES (💋) AND HEARTS:
        Rockets explode into radiant lip prints and glowing hearts!
      */}
      <FireworksCanvas mode="kiss_burst" />

      {/* DESKTOP Outer Flanking Vilakus (Hidden on mobile) */}
      <div className="hidden md:block fixed left-4 lg:left-12 top-1/2 -translate-y-1/2 pointer-events-none z-30 transform md:scale-90 lg:scale-100">
        <Diya3D size="normal" />
      </div>

      <div className="hidden md:block fixed right-4 lg:right-12 top-1/2 -translate-y-1/2 pointer-events-none z-30 transform md:scale-90 lg:scale-100">
        <Diya3D size="normal" />
      </div>

      {/* Romantic purple & rose center spotlight */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at 50% 30%, rgba(255, 45, 149, 0.18) 0%, rgba(157, 78, 221, 0.14) 40%, rgba(2, 3, 10, 0.92) 75%)'
        }}
      />

      {/* 
        TOP: REALISTIC BOY & GIRL ROMANTIC KISS
      */}
      <div className="relative z-20 w-full flex flex-col items-center mt-2 sm:mt-4">
        {/* Floating Kiss Badges (💋) blooming with each kiss */}
        <AnimatePresence>
          {floatingKisses.map(k => (
            <motion.div
              key={k.id}
              initial={{ scale: 0, opacity: 0, y: 0 }}
              animate={{ scale: k.scale, opacity: [0, 1, 0.9, 0], y: -55 }}
              transition={{ duration: 2.2, ease: 'easeOut' }}
              className="absolute pointer-events-none text-2xl sm:text-3xl z-40"
              style={{ left: `${k.x}%`, top: `${k.y}%` }}
            >
              💋
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Realistic Detailed Vector Boy & Girl Illustration */}
        <RomanticBoyGirlKiss isKissing={isKissing} />
      </div>

      {/* 
        THEN ONLY REVEAL CONTENT:
        Fades in smoothly after the sky shots and multiple kisses finish!
      */}
      {showContent && (
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
          className="w-full max-w-xl mx-auto text-center px-5 py-7 sm:px-10 sm:py-9 rounded-2xl sm:rounded-3xl romantic-card-kiss glow-box-romantic z-20 mt-4 mb-8"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/40 text-rose-200 text-xs font-medium mb-3">
            <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
            <span>Forever & Always</span>
            <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-4xl font-serif font-black text-rose-200 mb-4 glow-text-romantic tracking-wide">
            For You, <span className="shimmer-text">Papa ❤️💋</span>
          </h2>

          {/* Emotional Letter */}
          <div className="space-y-3 sm:space-y-4 text-zinc-100 font-serif text-sm sm:text-base md:text-lg leading-relaxed max-w-lg mx-auto text-center">
            <p className="italic text-amber-200/95 font-medium">
              “If I could gift you one thing this Diwali, it would be the ability to see yourself through my eyes. Then you would understand how special you are to me.”
            </p>

            <p className="text-zinc-200">
              You are my favourite person, my sweetest happiness, and a beautiful reason to smile.
            </p>

            <p className="text-zinc-200">
              No matter how many lights shine in the sky, you will always have a special place in my heart.
            </p>

            <p className="text-rose-300 font-semibold text-base sm:text-lg pt-1">
              I love you, Papa. Happy Diwali, my love. ❤️🪔
            </p>
          </div>

          {/* Replay Button */}
          <div className="mt-6 pt-5 border-t border-rose-500/20 flex items-center justify-center">
            <button
              onClick={() => {
                soundEngine.playSparkle(800);
                onReplay();
              }}
              className="flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-amber-400/40 text-amber-200 hover:text-amber-100 text-xs sm:text-sm font-medium shadow-[0_0_15px_rgba(255,200,87,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
              <span>Experience Our Diwali Again ↻</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* 
        MOBILE: VILAKUS NICELY DISPLAYED BELOW THE CONTENT (As requested)
      */}
      <div className="md:hidden flex items-center justify-around w-full max-w-xs mx-auto mt-4 mb-8">
        <Diya3D size="small" />
        <Diya3D size="small" />
      </div>
    </motion.div>
  );
};
