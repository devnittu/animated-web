'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, ReactNode } from 'react';

interface ParallaxLayerProps {
  children: ReactNode;
  depth?: number; // 0=none, 1=subtle, 2=medium, 3=deep
  className?: string;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
}

export default function ParallaxLayer({
  children,
  depth = 1,
  className = '',
  mouseX,
  mouseY,
}: ParallaxLayerProps) {
  const factor = depth * 8;

  const x = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  const y = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });

  useEffect(() => {
    const unsubX = mouseX.on('change', (v) => x.set(v * factor));
    const unsubY = mouseY.on('change', (v) => y.set(v * factor));
    return () => { unsubX(); unsubY(); };
  }, [mouseX, mouseY, x, y, factor]);

  return (
    <motion.div className={className} style={{ x, y }}>
      {children}
    </motion.div>
  );
}
