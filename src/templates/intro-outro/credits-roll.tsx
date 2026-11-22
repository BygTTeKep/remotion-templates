// Адаптация templates/credits-roll.tsx: список титров — пропсом, скорость прокрутки
// подбирается так, чтобы весь список прошёл за длительность слота.
// Источник: https://github.com/reactvideoeditor/remotion-templates (MIT).
import { useCurrentFrame, useVideoConfig } from 'remotion';

export type Credit = {
  role: string;
  name: string;
};

export const CreditsRoll: React.FC<{
  credits: Credit[];
  backgroundColor?: string;
  // высота одной строки титров + отступ, px; влияет на расчёт скорости прокрутки
  itemHeight?: number;
}> = ({ credits, backgroundColor = '#111827', itemHeight = 130 }) => {
  const frame = useCurrentFrame();
  const { height, durationInFrames } = useVideoConfig();

  // весь список должен успеть пройти через экран за слот
  const contentHeight = credits.length * itemHeight;
  const translateY = height - (frame / durationInFrames) * (height + contentHeight);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 80,
          background: `linear-gradient(to bottom, ${backgroundColor}, transparent)`,
          zIndex: 2,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 80,
          background: `linear-gradient(to top, ${backgroundColor}, transparent)`,
          zIndex: 2,
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2.5rem',
          transform: `translateY(${translateY}px)`,
          paddingTop: '2rem',
        }}
      >
        {credits.map((credit, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <p
              style={{
                color: '#3b82f6',
                fontSize: '0.9rem',
                fontWeight: 500,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                margin: 0,
                marginBottom: '0.4rem',
              }}
            >
              {credit.role}
            </p>
            <p
              style={{
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: 600,
                margin: 0,
              }}
            >
              {credit.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
