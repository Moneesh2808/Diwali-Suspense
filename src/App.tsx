import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { SceneState } from './types';
import { StarField } from './components/StarField';
import { FloatingParticles } from './components/FloatingParticles';
import { HorizonSilhouettes } from './components/HorizonSilhouettes';
import { FireworksCanvas } from './components/FireworksCanvas';
import { AudioToggle } from './components/AudioToggle';
import { LandingScene } from './components/LandingScene';
import { FireworksScene } from './components/FireworksScene';
import { DiwaliMessageScene } from './components/DiwaliMessageScene';
import { KissSurpriseScene } from './components/KissSurpriseScene';

export const App: React.FC = () => {
  const [scene, setScene] = useState<SceneState>('LANDING');

  // Scene transitions with instant scroll reset
  const handleStartSurprise = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setScene('FIREWORKS');
  };

  const handleFireworksComplete = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setScene('DIWALI_MESSAGE');
  };

  const handleNextSurprise = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setScene('KISS_SURPRISE');
  };

  const handleReplay = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setScene('LANDING');
  };

  return (
    <main className="relative min-h-screen w-full bg-[#02030A] text-white overflow-x-hidden flex flex-col justify-between selection:bg-rose-500/30 selection:text-amber-200">
      {/* 1. Deep Cinematic Sky Gradients */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
        style={{
          background: scene === 'KISS_SURPRISE'
            ? 'radial-gradient(ellipse 120% 90% at 50% 15%, #180D2C 0%, #071126 50%, #02030A 100%)'
            : 'radial-gradient(ellipse 120% 90% at 50% 25%, #0B1938 0%, #071126 45%, #02030A 100%)'
        }}
      />

      {/* 2. Twinkling Starfield Canvas */}
      <StarField />

      {/* 3. Floating Embers & Romantic Hearts (No AI stars) */}
      <FloatingParticles scene={scene} />

      {/* 4. Ambient Distant Fireworks (during message scene) */}
      {scene === 'DIWALI_MESSAGE' && (
        <FireworksCanvas mode="ambient" />
      )}

      {/* 5. Indian Horizon Silhouettes and Floor Mist */}
      <HorizonSilhouettes />

      {/* 6. Audio Toggle - safely pinned at top right */}
      <AudioToggle />

      {/* 7. Scene Manager with Smooth Framer Motion Transitions */}
      <div className="relative z-20 flex-1 flex flex-col justify-center items-center w-full min-h-screen">
        <AnimatePresence mode="wait">
          {scene === 'LANDING' && (
            <LandingScene key="landing" onStartSurprise={handleStartSurprise} />
          )}

          {scene === 'FIREWORKS' && (
            <FireworksScene key="fireworks" onComplete={handleFireworksComplete} />
          )}

          {scene === 'DIWALI_MESSAGE' && (
            <DiwaliMessageScene key="message" onNextSurprise={handleNextSurprise} />
          )}

          {scene === 'KISS_SURPRISE' && (
            <KissSurpriseScene key="kiss" onReplay={handleReplay} />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default App;
