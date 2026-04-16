import React from 'react';
import { motion } from 'motion/react';

export const RadioWaves: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-emerald-500/30 rounded-full"
          initial={{ width: 0, height: 0, opacity: 0.5 }}
          animate={{
            width: ['0%', '200%'],
            height: ['0%', '200%'],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};
