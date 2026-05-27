/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';

interface ParallaxWrapperProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export default function ParallaxWrapper({
  children,
  strength = 12,
  className = ''
}: ParallaxWrapperProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let active = true;
    const handleMouseMove = (e: MouseEvent) => {
      if (!active) return;
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX / innerWidth) - 0.5; // -0.5 to 0.5
      const normY = (e.clientY / innerHeight) - 0.5; // -0.5 to 0.5

      setOffset({
        x: normX * strength,
        y: normY * strength
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      active = false;
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [strength]);

  return (
    <div
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0px)`,
        transition: 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)' // Damped spring-like motion
      }}
      className={className}
    >
      {children}
    </div>
  );
}
