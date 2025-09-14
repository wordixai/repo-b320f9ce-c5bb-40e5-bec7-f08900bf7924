import { interpolate } from 'remotion';

export const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
};

export const easeElastic = (t: number): number => {
  const c4 = (2 * Math.PI) / 3;
  return t === 0
    ? 0
    : t === 1
    ? 1
    : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
};

export const createStaggeredAnimation = (
  frame: number,
  startFrame: number,
  itemIndex: number,
  staggerDelay: number,
  duration: number
) => {
  const itemStartFrame = startFrame + (itemIndex * staggerDelay);
  const activeFrame = Math.max(0, frame - itemStartFrame);
  
  return interpolate(activeFrame, [0, duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });
};

export const createPulseAnimation = (frame: number, speed: number = 0.05) => {
  return Math.sin(frame * speed) * 0.5 + 0.5;
};

export const createFloatAnimation = (frame: number, amplitude: number = 10, speed: number = 0.03) => {
  return Math.sin(frame * speed) * amplitude;
};