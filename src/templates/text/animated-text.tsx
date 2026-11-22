// Адаптация templates/animated-text.tsx: текст и размер — пропсами.
// Источник: https://github.com/reactvideoeditor/remotion-templates (MIT).
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import type { TextTemplateProps } from '../../lib/props.js';

export const AnimatedText: React.FC<TextTemplateProps> = ({ text, fontSize = 80 }) => {
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
      }}
    >
      {text.split('').map((char, i) => {
        const delay = i * 5;

        const opacity = spring({
          frame: frame - delay,
          fps,
          from: 0,
          to: 1,
          config: { mass: 0.5, damping: 10 },
        });

        const y = spring({
          frame: frame - delay,
          fps,
          from: -50,
          to: 0,
          config: { mass: 0.5, damping: 10 },
        });

        const rotate = spring({
          frame: frame - delay,
          fps,
          from: -180,
          to: 0,
          config: { mass: 0.5, damping: 12 },
        });

        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              opacity,
              color: 'white',
              fontSize,
              fontWeight: 'bold',
              transform: `translateY(${y}px) rotate(${rotate}deg)`,
            }}
          >
            {char === ' ' ? ' ' : char}
          </span>
        );
      })}
    </div>
  );
};
