import React from 'react';
import { motion } from 'framer-motion';
import { FireworksCanvas } from './FireworksCanvas';

interface FireworksSceneProps {
  onComplete: () => void;
}

export const FireworksScene: React.FC<FireworksSceneProps> = ({ onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 pointer-events-none z-30"
    >
      {/* 8-Second Multicolored Fireworks Sky */}
      <FireworksCanvas
        mode="choreographed"
        onChoreographyComplete={onComplete}
      />
    </motion.div>
  );
};
