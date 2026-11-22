// Адаптация templates/countdown-intro.tsx: финальное слово — пропсом, отсчёт — 3 секунды + GO в конце слота.
// Источник: https://github.com/reactvideoeditor/remotion-templates (MIT).
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import type { CardTemplateProps } from '../../lib/props.js';

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

export const CountdownIntro: React.FC<
  CardTemplateProps & {
    // слово после отсчёта («GO!» в оригинале)
    goText?: string;
  }
> = ({ goText = 'GO!', accentColor = '#3b82f6', backgroundColor = '#111827' }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const totalCountdownFrames = fps * 3;
  const secondFrames = fps;

  const currentSecond = Math.max(3 - Math.floor(frame / secondFrames), 0);
  const isCountdownDone = frame >= totalCountdownFrames;

  const frameInSecond = frame % secondFrames;
  const ringProgress = frameInSecond / secondFrames;

  const circumference = 2 * Math.PI * 70;
  const dashOffset = isCountdownDone ? circumference : circumference * ringProgress;

  const numberOpacity = isCountdownDone ? 0 : 1;

  const goScale = spring({
    frame: Math.max(frame - totalCountdownFrames, 0),
    fps,
    config: { damping: 8, stiffness: 100 },
  });

  const goOpacity = interpolate(frame, [totalCountdownFrames, totalCountdownFrames + 5], [0, 1], clamp);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'relative', width: 180, height: 180 }}>
        <svg width={180} height={180} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={90} cy={90} r={70} fill="none" stroke="#1e293b" strokeWidth={6} />
          {!isCountdownDone && (
            <circle
              cx={90}
              cy={90}
              r={70}
              fill="none"
              stroke={accentColor}
              strokeWidth={6}
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
            />
          )}
        </svg>
        {!isCountdownDone && (
          <span
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
              fontSize: '4rem',
              fontWeight: 700,
              opacity: numberOpacity,
            }}
          >
            {currentSecond}
          </span>
        )}
        {isCountdownDone && (
          <span
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) scale(${goScale})`,
              color: accentColor,
              fontSize: '3.5rem',
              fontWeight: 800,
              opacity: goOpacity,
            }}
          >
            {goText}
          </span>
        )}
      </div>
    </div>
  );
};
