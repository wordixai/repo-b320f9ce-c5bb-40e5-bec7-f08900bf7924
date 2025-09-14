import { useCurrentFrame } from 'remotion';
import { useMemo } from 'react';

interface AnimationStep {
  name: string;
  startFrame: number;
  duration: number;
  easing?: (t: number) => number;
}

export const useAnimationSequence = (steps: AnimationStep[]) => {
  const frame = useCurrentFrame();
  
  return useMemo(() => {
    const activeSteps = new Map<string, number>();
    
    steps.forEach((step) => {
      const localFrame = frame - step.startFrame;
      
      if (localFrame >= 0 && localFrame <= step.duration) {
        const progress = localFrame / step.duration;
        const easedProgress = step.easing ? step.easing(progress) : progress;
        activeSteps.set(step.name, easedProgress);
      } else if (localFrame > step.duration) {
        activeSteps.set(step.name, 1);
      } else {
        activeSteps.set(step.name, 0);
      }
    });
    
    return activeSteps;
  }, [frame, steps]);
};

export const useStaggeredAnimation = (
  count: number,
  startFrame: number,
  staggerDelay: number,
  duration: number
) => {
  const frame = useCurrentFrame();
  
  return useMemo(() => {
    return Array.from({ length: count }, (_, index) => {
      const itemStartFrame = startFrame + (index * staggerDelay);
      const localFrame = Math.max(0, frame - itemStartFrame);
      return Math.min(1, Math.max(0, localFrame / duration));
    });
  }, [frame, count, startFrame, staggerDelay, duration]);
};