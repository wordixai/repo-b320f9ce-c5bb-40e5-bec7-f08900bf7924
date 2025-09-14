import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { CodeRevealSection } from '../scenes/CodeRevealSection';
import { ParticleBackground } from '../components/ParticleBackground';

interface CodeRevealProps {
  code: string;
  language: string;
  title: string;
}

export const CodeRevealComposition: React.FC<CodeRevealProps> = ({
  code,
  language,
  title
}) => {
  return (
    <AbsoluteFill className="bg-background">
      <ParticleBackground />
      <CodeRevealSection
        code={code}
        language={language}
        title={title}
      />
    </AbsoluteFill>
  );
};