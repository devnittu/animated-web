'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

/**
 * SplitText — Snake / Typewriter scroll animation.
 *
 * Characters appear one by one (left → right) when the element
 * enters the viewport, like a snake slithering through the text.
 * Each char slides in from slightly below + left with a blur-to-sharp
 * transition. Resets when leaving viewport so it re-plays on re-entry.
 */

interface SplitTextProps {
  text: string;
  style?: React.CSSProperties;
  className?: string;
  /** Entry delay before first char appears (seconds) */
  delay?: number;
  /** Delay between each character (seconds) — controls "typing speed" */
  charDelay?: number;
  /** HTML wrapper tag */
  tag?: 'span' | 'div' | 'h1' | 'h2' | 'h3';
  /** Viewport margin before triggering */
  margin?: string;
  /** Show blinking cursor at end while typing */
  cursor?: boolean;
}

export default function SplitText({
  text,
  style,
  className,
  delay = 0,
  charDelay = 0.042,
  tag: Tag = 'span',
  margin = '-10% 0px -10% 0px',
  cursor = false,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<HTMLElement>, {
    once: false,
    margin: margin as Parameters<typeof useInView>[1]['margin'],
  });

  const chars = text.split('');
  const totalDuration = delay + chars.length * charDelay;

  return (
    // @ts-expect-error — dynamic tag
    <Tag
      ref={ref}
      className={className}
      style={{ display: 'block', ...style }}
    >
      {chars.map((char, i) => (
        <motion.span
          key={i}
          style={{
            display: 'inline-block',
            willChange: 'transform, opacity, filter',
          }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  y: 0,
                  x: 0,
                  filter: 'blur(0px)',
                  // Brief glow "snake head" highlight as each char lands
                  textShadow: [
                    '0 0 18px rgba(200,220,255,0.9)',
                    '0 0 0px rgba(200,220,255,0)',
                  ],
                }
              : {
                  // Instantly reset so re-entry always replays from scratch
                  opacity: 0,
                  y: 14,
                  x: -6,
                  filter: 'blur(6px)',
                  textShadow: '0 0 0px rgba(200,220,255,0)',
                }
          }
          transition={
            isInView
              ? {
                  opacity:     { duration: 0.2,  delay: delay + i * charDelay },
                  y:           { type: 'spring', stiffness: 260, damping: 22, delay: delay + i * charDelay },
                  x:           { type: 'spring', stiffness: 260, damping: 22, delay: delay + i * charDelay },
                  filter:      { duration: 0.18, delay: delay + i * charDelay },
                  textShadow:  { duration: 0.55, delay: delay + i * charDelay },
                }
              : {
                  // Instant reset — no exit animation
                  duration: 0.01,
                }
          }
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}

      {/* Blinking cursor — appears after all chars land, blinks then fades */}
      {cursor && (
        <motion.span
          style={{ display: 'inline-block', marginLeft: '1px', ...style, fontSize: 'inherit' }}
          animate={
            isInView
              ? { opacity: [0, 0, 1, 1, 0, 0, 1, 1, 0, 0] }
              : { opacity: 0 }
          }
          transition={
            isInView
              ? {
                  delay: totalDuration,
                  duration: 1.8,
                  times: [0, 0.1, 0.1, 0.3, 0.3, 0.5, 0.5, 0.7, 0.7, 1],
                  repeat: 2,
                  repeatType: 'loop',
                  ease: 'linear',
                }
              : { duration: 0.01 }
          }
        >
          ▋
        </motion.span>
      )}
    </Tag>
  );
}
