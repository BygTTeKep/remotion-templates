// Адаптация templates/slide-text.tsx: текст и размер — пропсами.
// Источник: https://github.com/reactvideoeditor/remotion-templates (MIT).
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import type { TextTemplateProps } from '../../lib/props.js';

export const SlideText: React.FC<TextTemplateProps> = ({ text, fontSize = 64 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    durationInFrames: 30,
  });

  const slideX = spring({
    frame,
    fps,
    from: 200,
    to: 0,
    durationInFrames: 30,
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
        transform: `translate(-50%, -50%) translateX(${slideX}px)`,
        width: '100%',
        textAlign: 'center',
      }}
    >
      <h1
        style={{
          opacity,
          color: 'white',
          fontSize,
          fontWeight: 'bold',
        }}
      >
        {text}
      </h1>
    </div>
  );
};
