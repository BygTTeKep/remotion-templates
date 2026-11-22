// Адаптация templates/popping-text.tsx: текст — пропсом.
// Источник: https://github.com/reactvideoeditor/remotion-templates (MIT).
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import type { TextTemplateProps } from '../../lib/props.js';

const COLORS = ['#1e3a8a', '#3b82f6', '#A9D6E5'];

export const PoppingText: React.FC<TextTemplateProps> = ({ text, fontSize = 128 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        textAlign: 'center',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {text.split('').map((char, i) => {
        const delay = i * 7;
        const color = COLORS[i % COLORS.length]!;

        const scale = spring({
          frame: frame - delay,
          fps,
          from: 0,
          to: 1,
          config: { mass: 0.4, damping: 8, stiffness: 100 },
        });

        const opacity = spring({
          frame: frame - delay,
          fps,
          from: 0,
          to: 1,
          config: { mass: 0.3, damping: 8, stiffness: 100 },
        });

        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              opacity,
              color,
              fontSize,
              fontWeight: 900,
              margin: '0 0.1em',
              textShadow: `0 0 10px ${color}80,
                          -2px -2px 0 #fff,
                          2px -2px 0 #fff,
                          -2px 2px 0 #fff,
                          2px 2px 0 #fff`,
              transform: `scale(${scale})`,
              fontFamily: "'Impact', 'Arial Black', sans-serif",
              letterSpacing: '0.05em',
            }}
          >
            {char === ' ' ? ' ' : char}
          </span>
        );
      })}
    </div>
  );
};
