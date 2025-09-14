import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface SyntaxHighlighterProps {
  code: string;
  language: string;
}

export const SyntaxHighlighter: React.FC<SyntaxHighlighterProps> = ({
  code,
  language
}) => {
  const customStyle = {
    ...vscDarkPlus,
    'pre[class*="language-"]': {
      ...vscDarkPlus['pre[class*="language-"]'],
      background: 'transparent',
      fontSize: '18px',
      lineHeight: '1.6',
      fontFamily: 'JetBrains Mono, Fira Code, Monaco, Consolas, monospace'
    },
    'code[class*="language-"]': {
      ...vscDarkPlus['code[class*="language-"]'],
      background: 'transparent',
      fontSize: '18px',
      lineHeight: '1.6',
      fontFamily: 'JetBrains Mono, Fira Code, Monaco, Consolas, monospace'
    }
  };

  return (
    <SyntaxHighlighter
      language={language}
      style={customStyle}
      showLineNumbers
      lineNumberStyle={{
        color: '#666',
        borderRight: '1px solid #333',
        paddingRight: '1em',
        marginRight: '1em'
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
};