import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { TypewriterCode } from '../components/TypewriterCode';
import { SyntaxHighlighter } from '../components/SyntaxHighlighter';

interface CodeRevealSectionProps {
  code: string;
  language: string;
  title: string;
}

export const CodeRevealSection: React.FC<CodeRevealSectionProps> = ({
  code,
  language,
  title
}) => {
  const frame = useCurrentFrame();
  
  // Title animation
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });
  
  const titleY = interpolate(frame, [0, 30], [50, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });
  
  // Code container animation
  const codeScale = interpolate(frame, [30, 60], [0.8, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });
  
  const codeOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  return (
    <AbsoluteFill className="flex flex-col items-center justify-center p-16">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="tech-grid h-full w-full" />
      </div>
      
      {/* Title */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`
        }}
        className="mb-12 text-center"
      >
        <h1 className="text-5xl font-bold gradient-text mb-4">
          {title}
        </h1>
        <div className="w-32 h-1 bg-primary mx-auto glow-green" />
      </div>
      
      {/* Code Container */}
      <div
        style={{
          opacity: codeOpacity,
          transform: `scale(${codeScale})`
        }}
        className="w-full max-w-4xl"
      >
        <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-8 glow-cyan">
          <div className="flex items-center mb-6">
            <div className="flex space-x-2 mr-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-sm text-muted-foreground font-mono">
              {language}
            </span>
          </div>
          
          {frame > 60 ? (
            <TypewriterCode
              code={code}
              language={language}
              startFrame={60}
            />
          ) : (
            <SyntaxHighlighter
              code=""
              language={language}
            />
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};