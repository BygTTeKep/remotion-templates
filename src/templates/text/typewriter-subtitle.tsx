// Адаптация templates/typewriter-subtitle.tsx: текст — пропсом, набор — пропорционально длительности слота.
// Math.random() из оригинала заменён на детерминированный noise() — рендер повторяем.
// Источник: https://github.com/reactvideoeditor/remotion-templates (MIT).
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { noise } from '../../lib/random.js';
import type { TextTemplateProps } from '../../lib/props.js';

export const TypewriterSubtitle: React.FC<TextTemplateProps> = ({
  text,
  accentColor = '#60a5fa',
  fontSize = 48,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // набор занимает ~60% слота, но не длиннее исходных 45 кадров
  const typeFrames = Math.max(10, Math.min(45, Math.round(durationInFrames * 0.6)));
  const visibleCharacters = Math.floor(
    interpolate(frame, [0, typeFrames], [0, text.length], {
      extrapolateRight: 'clamp',
    })
  );

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      {text
        .slice(0, visibleCharacters)
        .split('')
        .map((char, index) => {
          // детерминированный «глитч» буквы вместо Math.random из оригинала
          const isGlitching = frame % 30 === 0 && noise(index + 1, frame) > 0.7;

          return (
            <span
              key={index}
              style={{
                display: 'inline-block',
                fontFamily: "'Courier New', monospace",
                fontSize,
                fontWeight: 'bold',
                color: 'white',
                transition: 'all 0.05s ease-out',
              }}
            >
              {isGlitching ? char : char === ' ' ? ' ' : char}
            </span>
          );
        })}
      <span
        style={{
          fontSize,
          color: accentColor,
          opacity: frame % 15 < 7 ? 1 : 0,
          marginLeft: '0.2rem',
          verticalAlign: 'middle',
        }}
      >
        ▌
      </span>
    </div>
  );
};
