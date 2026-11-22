// Адаптация templates/pulsing-text.tsx: текст — пропсом, период пульса масштабируется от длительности слота.
// Источник: https://github.com/reactvideoeditor/remotion-templates (MIT).
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import type { TextTemplateProps } from '../../lib/props.js';

export const PulsingText: React.FC<TextTemplateProps> = ({ text, fontSize = 80 }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  // 3 полных пульса за слот (в оригинале фиксированные 30 кадров)
  const period = Math.max(10, Math.round(durationInFrames / 3));

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        gap: '1rem',
      }}
    >
      {text.split('').map((char, i) => {
        const delay = i * 6;
        const phase = (((frame - delay) % period) + period) / period;

        const pulse = interpolate(phase, [0, 0.5, 1], [1, 1.2, 1], {
          extrapolateRight: 'clamp',
        });

        const opacity = interpolate(phase, [0, 0.5, 1], [0.5, 1, 0.5], {
          extrapolateRight: 'clamp',
        });

        return (
          <div
            key={i}
            style={{
              position: 'relative',
              transform: `scale(${pulse})`,
            }}
          >
            <span
              style={{
                fontSize,
                fontWeight: 'bold',
                color: 'white',
                position: 'relative',
                zIndex: 2,
              }}
            >
              {char === ' ' ? ' ' : char}
            </span>
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: fontSize,
                height: fontSize,
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                filter: 'blur(20px)',
                opacity,
                zIndex: 1,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
