import { Composition } from 'remotion';
import { TechVideoComposition } from './compositions/TechVideoComposition';
import { CodeRevealComposition } from './compositions/CodeRevealComposition';
import { LogoAnimationComposition } from './compositions/LogoAnimationComposition';
import { DataVisualizationComposition } from './compositions/DataVisualizationComposition';
import { TerminalSimulationComposition } from './compositions/TerminalSimulationComposition';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="TechVideo"
        component={TechVideoComposition}
        durationInFrames={1800} // 60 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "Dynamic Tech Presentation",
          subtitle: "Advanced Animation Sequences",
          brandColor: "#42b883",
          logoUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=200&h=200&fit=crop",
          codeSnippets: [
            {
              language: "typescript",
              code: `function createVideoAnimation() {
  const timeline = gsap.timeline();
  return timeline.to('.element', {
    duration: 2,
    scale: 1.2,
    ease: 'elastic.out'
  });
}`
            },
            {
              language: "jsx",
              code: `<AnimatedComponent
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
/>`
            }
          ]
        }}
      />
      
      <Composition
        id="CodeReveal"
        component={CodeRevealComposition}
        durationInFrames={900} // 30 seconds
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          code: `import { useSpring, animated } from 'react-spring';

const AnimatedCard = () => {
  const [props, set] = useSpring(() => ({
    transform: 'scale(1) rotateY(0deg)',
    config: { tension: 200, friction: 25 }
  }));
  
  return (
    <animated.div
      style={props}
      onMouseEnter={() => set({
        transform: 'scale(1.1) rotateY(10deg)'
      })}
      onMouseLeave={() => set({
        transform: 'scale(1) rotateY(0deg)'
      })}
    >
      Interactive Animation
    </animated.div>
  );
};`,
          language: "typescript",
          title: "React Spring Animation"
        }}
      />
      
      <Composition
        id="LogoAnimation"
        component={LogoAnimationComposition}
        durationInFrames={600} // 20 seconds
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          logoUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=400&fit=crop",
          brandName: "TechBrand",
          primaryColor: "#42b883",
          secondaryColor: "#00d4ff"
        }}
      />
      
      <Composition
        id="DataVisualization"
        component={DataVisualizationComposition}
        durationInFrames={1200} // 40 seconds
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          data: [
            { name: "API Calls", value: 95, trend: "up" },
            { name: "Response Time", value: 120, trend: "down" },
            { name: "Success Rate", value: 99.8, trend: "up" },
            { name: "User Growth", value: 847, trend: "up" },
            { name: "Server Load", value: 67, trend: "stable" }
          ]
        }}
      />
      
      <Composition
        id="TerminalSimulation"
        component={TerminalSimulationComposition}
        durationInFrames={900} // 30 seconds
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          commands: [
            "npm install @remotion/cli",
            "npx remotion studio",
            "git add .",
            "git commit -m 'Add video animations'",
            "npm run build",
            "echo 'Deployment successful!'"
          ]
        }}
      />
    </>
  );
};