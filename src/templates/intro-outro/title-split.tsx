// Адаптация templates/title-split.tsx: два слова сверху/снизу — пропсами.
// Источник: https://github.com/reactvideoeditor/remotion-templates (MIT).
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import type { CardTemplateProps } from '../../lib/props.js';

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

export const TitleSplit: React.FC<CardTemplateProps> = ({
  text,
  subtext,
  accentColor = 'rgba(59, 130, 246',
  backgroundColor = '#111827',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const topY = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 80 },
    from: -120,
    to: 0,
  });

  const bottomY = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 80 },
    from: 120,
    to: 0,
  });

  const glowOpacity = interpolate(Math.sin(frame * 0.1), [-1, 1], [0.3, 0.8]);

  const meetProgress = interpolate(frame, [0, 20], [0, 1], clamp);

  const textShadow =
    meetProgress === 1 ? `0 0 ${20 * glowOpacity}px ${accentColor}, ${glowOpacity})` : 'none';

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
        gap: '0.25rem',
      }}
    >
      <h1
        style={{
          color: 'transparent',
          fontSize: '5rem',
          fontWeight: 800,
          margin: 0,
          letterSpacing: '0.15em',
          WebkitTextStroke: '2px white',
          transform: `translateY(${topY}px)`,
          textShadow,
        }}
      >
        {text}
      </h1>
      <h1
        style={{
          color: 'white',
          fontSize: '5rem',
          fontWeight: 800,
          margin: 0,
          letterSpacing: '0.15em',
          transform: `translateY(${bottomY}px)`,
          textShadow,
        }}
      >
        {subtext}
      </h1>
    </div>
  );
};
