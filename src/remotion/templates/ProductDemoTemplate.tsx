import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { TextKineticSection } from '../scenes/TextKineticSection';
import { CodeRevealSection } from '../scenes/CodeRevealSection';
import { ParticleBackground } from '../components/ParticleBackground';

interface ProductDemoTemplateProps {
  productName: string;
  features: string[];
  codeExample: string;
  brandColor: string;
}

export const ProductDemoTemplate: React.FC<ProductDemoTemplateProps> = ({
  productName,
  features,
  codeExample,
  brandColor
}) => {
  return (
    <AbsoluteFill className="bg-background">
      <ParticleBackground />
      
      {/* Intro */}
      <Sequence from={0} durationInFrames={180}>
        <TextKineticSection
          title={productName}
          subtitle="Revolutionary Technology"
          brandColor={brandColor}
        />
      </Sequence>
      
      {/* Features */}
      {features.map((feature, index) => (
        <Sequence
          key={index}
          from={180 + (index * 120)}
          durationInFrames={120}
        >
          <AbsoluteFill className="flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-4xl font-bold gradient-text mb-4">
                {feature}
              </h2>
            </div>
          </AbsoluteFill>
        </Sequence>
      ))}
      
      {/* Code Demo */}
      <Sequence from={180 + (features.length * 120)} durationInFrames={300}>
        <CodeRevealSection
          code={codeExample}
          language="typescript"
          title="Implementation"
        />
      </Sequence>
    </AbsoluteFill>
  );
};