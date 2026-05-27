/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  className?: string;
  amount?: number;
  key?: React.Key;
}

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 1.1,
  className = '',
  amount = 0.08
}: ScrollRevealProps) {
  const getInitialOffset = () => {
    switch (direction) {
      case 'up': return { y: 35, opacity: 0 };
      case 'down': return { y: -35, opacity: 0 };
      case 'left': return { x: 35, opacity: 0 };
      case 'right': return { x: -35, opacity: 0 };
      case 'none': return { opacity: 0 };
      default: return { y: 35, opacity: 0 };
    }
  };

  const getExitOffset = () => {
    switch (direction) {
      case 'up': return { y: -20, opacity: 0 };
      case 'down': return { y: 20, opacity: 0 };
      case 'left': return { x: -20, opacity: 0 };
      case 'right': return { x: 20, opacity: 0 };
      case 'none': return { opacity: 0 };
      default: return { y: -20, opacity: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitialOffset()}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      exit={getExitOffset()}
      viewport={{ once: false, amount: amount }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.16, 1, 0.3, 1] // Superior high-end cubic-bezier
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
