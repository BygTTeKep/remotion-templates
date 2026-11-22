// Адаптация templates/chapter-title.tsx: текст — крупный заголовок по центру («1» в оригинале).
// Источник: https://github.com/reactvideoeditor/remotion-templates (MIT).
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import type { CardTemplateProps } from '../../lib/props.js';

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

export const ChapterTitle: React.FC<
  CardTemplateProps & {
    // маленькая подпись над текстом («Chapter» в оригинале)
    label?: string;
  }
> = ({ text, label, subtext, accentColor = '#3b82f6', backgroundColor = '#111827' }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const numberScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  const subtitleOpacity = interpolate(frame, [20, 40], [0, 1], clamp);
  const subtitleY = interpolate(frame, [20, 40], [20, 0], clamp);
  const lineWidth = interpolate(frame, [10, 40], [0, 120], clamp);
  const labelOpacity = interpolate(frame, [5, 20], [0, 1], clamp);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {label ? (
        <p
          style={{
            color: '#9ca3af',
            fontSize: '1rem',
            fontWeight: 500,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            margin: 0,
            marginBottom: '0.5rem',
            opacity: labelOpacity,
          }}
        >
          {label}
        </p>
      ) : null}
      <h1
        style={{
          color: 'white',
          fontSize: '8rem',
          fontWeight: 800,
          margin: 0,
          lineHeight: 1,
          transform: `scale(${numberScale})`,
        }}
      >
        {text}
      </h1>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          marginTop: '1.5rem',
          marginBottom: '1rem',
        }}
      >
        <div
          style={{
            height: 1,
            width: lineWidth,
            backgroundColor: accentColor,
          }}
        />
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: accentColor,
            opacity: labelOpacity,
          }}
        />
        <div
          style={{
            height: 1,
            width: lineWidth,
            backgroundColor: accentColor,
          }}
        />
      </div>
      {subtext ? (
        <p
          style={{
            color: '#d1d5db',
            fontSize: '1.5rem',
            fontWeight: 300,
            margin: 0,
            letterSpacing: '0.1em',
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
          }}
        >
          {subtext}
        </p>
      ) : null}
    </div>
  );
};
