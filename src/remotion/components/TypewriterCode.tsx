import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { SyntaxHighlighter } from './SyntaxHighlighter';

interface TypewriterCodeProps {
  code: string;
  language: string;
  startFrame: number;
  speed?: number;
}

export const TypewriterCode: React.FC<TypewriterCodeProps> = ({
  code,
  language,
  startFrame,
  speed = 2
}) => {
  const frame = useCurrentFrame();
  const activeFrame = Math.max(0, frame - startFrame);
  
  // Calculate how many characters to show
  const totalChars = code.length;
  const charsToShow = Math.floor(interpolate(
    activeFrame,
    [0, totalChars / speed],
    [0, totalChars],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  ));
  
  const visibleCode = code.substring(0, charsToShow);
  
  // Add cursor effect
  const showCursor = Math.floor(activeFrame / 10) % 2 === 0;
  const codeWithCursor = visibleCode + (showCursor && charsToShow < totalChars ? '|' : '');

  return (
    <SyntaxHighlighter
      code={codeWithCursor}
      language={language}
    />
  );
};