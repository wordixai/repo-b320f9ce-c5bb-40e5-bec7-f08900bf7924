import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

interface TerminalWindowProps {
  commands: string[];
  startFrame: number;
}

export const TerminalWindow: React.FC<TerminalWindowProps> = ({
  commands,
  startFrame
}) => {
  const frame = useCurrentFrame();
  const activeFrame = Math.max(0, frame - startFrame);

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden glow-cyan">
      {/* Terminal Header */}
      <div className="bg-gray-800 px-4 py-3 flex items-center">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="ml-4 text-sm text-gray-400 font-mono">
          Terminal — bash
        </div>
      </div>
      
      {/* Terminal Content */}
      <div className="p-6 font-mono text-sm">
        {commands.map((command, index) => {
          const commandStartFrame = activeFrame - (index * 60);
          const isVisible = commandStartFrame >= 0;
          
          if (!isVisible) return null;
          
          // Typewriter effect for each command
          const charsToShow = Math.floor(interpolate(
            commandStartFrame,
            [0, command.length * 2],
            [0, command.length],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          ));
          
          const visibleCommand = command.substring(0, charsToShow);
          const showCursor = Math.floor(commandStartFrame / 10) % 2 === 0;
          const commandWithCursor = visibleCommand + 
            (showCursor && charsToShow < command.length ? '█' : '');
          
          const promptOpacity = interpolate(
            commandStartFrame,
            [0, 10],
            [0, 1],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );

          return (
            <div key={index} className="mb-4">
              {/* Command prompt */}
              <div 
                className="flex items-center"
                style={{ opacity: promptOpacity }}
              >
                <span className="text-green-400 mr-2">$</span>
                <span className="text-white">{commandWithCursor}</span>
              </div>
              
              {/* Command output (shows after command is fully typed) */}
              {charsToShow >= command.length && (
                <div 
                  className="ml-4 mt-1 text-gray-300"
                  style={{
                    opacity: interpolate(
                      commandStartFrame - command.length * 2,
                      [0, 20],
                      [0, 1],
                      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                    )
                  }}
                >
                  {getCommandOutput(command)}
                </div>
              )}
            </div>
          );
        })}
        
        {/* Final prompt */}
        {activeFrame > commands.length * 60 && (
          <div className="flex items-center">
            <span className="text-green-400 mr-2">$</span>
            <span className="text-white animate-pulse">█</span>
          </div>
        )}
      </div>
    </div>
  );
};

function getCommandOutput(command: string): string {
  if (command.includes('npm install')) {
    return '✓ Package installed successfully';
  }
  if (command.includes('git commit')) {
    return '[main 1a2b3c4] Add video animations\n 5 files changed, 127 insertions(+)';
  }
  if (command.includes('npm run build')) {
    return '✓ Build completed successfully\n  dist/index.html  2.1 kB\n  dist/assets/  156.8 kB';
  }
  if (command.includes('echo')) {
    return command.split("'")[1] || 'Deployment successful!';
  }
  return '✓ Command executed successfully';
}