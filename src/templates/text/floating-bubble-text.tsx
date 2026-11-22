// Адаптация templates/floating-bubble-text.tsx: текст и цвета — пропсами.
// CSS-анимация rotate из оригинала заменена на поворот от кадра: Remotion CSS-анимации не исполняет.
// Источник: https://github.com/reactvideoeditor/remotion-templates (MIT).
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import type { TextTemplateProps } from '../../lib/props.js';

export const FloatingBubbleText: React.FC<TextTemplateProps> = ({
  text,
  accentColor = '#3b82f6',
  fontSize = 72,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const float = Math.sin(frame / 30) * 20;
  const scale = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: {
      damping: 12,
      mass: 0.5,
    },
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) translateY(${float}px) scale(${scale})`,
      }}
    >
      <div
        style={{
          fontSize,
          fontWeight: 'bold',
          color: 'white',
          padding: '2rem 3.5rem',
          borderRadius: 24,
          background: `linear-gradient(45deg, #1e3a8a, ${accentColor})`,
          border: '3px solid transparent',
          backgroundClip: 'padding-box',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(30, 58, 138, 0.2)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: -60,
            background: 'linear-gradient(45deg, cyan, magenta)',
            zIndex: -1,
            transform: `rotate(${frame * 2}deg)`,
          }}
        />
        {text}
      </div>
    </div>
  );
};
