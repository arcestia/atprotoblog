import React, { useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

interface TypingTextProps {
  lines: string[];
  className?: string;
  children?: React.ReactNode;
  startDelay?: number;
}

export const TypingText: React.FC<TypingTextProps> = ({ 
  lines, 
  className = '', 
  children,
  startDelay = 0 
}) => {
  const controls = useAnimationControls();

  useEffect(() => {
    const sequence = lines.map((_, index) => ({
      opacity: 1,
      y: 0,
      transition: { 
        opacity: { duration: 0.5, delay: startDelay + index * 0.8 },
        y: { duration: 0.5, delay: startDelay + index * 0.8 }
      }
    }));

    controls.start(i => sequence[i]);
  }, [lines, controls, startDelay]);

  return (
    <div className={className}>
      {lines.map((line, i) => (
        <motion.div
          key={i}
          custom={i}
          animate={controls}
          initial={{ opacity: 0, y: 20 }}
          className="mb-2"
        >
          {children ? children(line, i) : line}
        </motion.div>
      ))}
    </div>
  );
};
