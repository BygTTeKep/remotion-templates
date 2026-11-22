// Адаптация templates/cinematic-title-intro.tsx: заголовок и подзаголовок — пропсами.
// Источник: https://github.com/reactvideoeditor/remotion-templates (MIT).
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import type { CardTemplateProps } from '../../lib/props.js';

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

export const CinematicTitleIntro: React.FC<CardTemplateProps> = ({
  text,
  subtext,
  accentColor = '#4361ee',
  backgroundColor = '#111827',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = spring({
    frame,
    fps,
    from: 50,
    to: 0,
    durationInFrames: 40,
    config: {
      damping: 14,
      mass: 0.8,
    },
  });

  const titleOpacity = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    durationInFrames: 30,
  });

  const underlineWidth = interpolate(frame, [20, 50], [0, 100], clamp);
  const subtitleOpacity = interpolate(frame, [40, 60], [0, 1], clamp);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `linear-gradient(135deg, ${backgroundColor} 0%, #1a1a2e 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h1
        style={{
          color: 'white',
          fontSize: '4rem',
          fontWeight: 'bold',
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          margin: 0,
          letterSpacing: '0.05em',
        }}
      >
        {text}
      </h1>
      <div
        style={{
          width: `${underlineWidth}%`,
          maxWidth: 320,
          height: 4,
          background: `linear-gradient(90deg, ${accentColor}, #7209b7)`,
          borderRadius: 2,
          marginTop: 16,
        }}
      />
      {subtext ? (
        <p
          style={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '1.5rem',
            fontWeight: 300,
            opacity: subtitleOpacity,
            marginTop: 24,
            letterSpacing: '0.1em',
          }}
        >
          {subtext}
        </p>
      ) : null}
    </div>
  );
};
