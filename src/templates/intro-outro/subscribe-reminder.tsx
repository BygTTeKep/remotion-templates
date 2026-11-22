// Адаптация templates/subscribe-reminder.tsx: подписи — пропсами.
// От оригинала оставлена только плашка-оверлей: тёмный фон и заглушка контента убраны,
// шаблон предназначен для наложения поверх видео (прозрачный фон).
// Источник: https://github.com/reactvideoeditor/remotion-templates (MIT).
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const SubscribeReminder: React.FC<{
  text?: string;
  // вторая строка плашки («@CreativeStudio» в оригинале)
  subtext?: string;
  accentColor?: string;
}> = ({ text = 'Subscribe', subtext, accentColor = '#3b82f6' }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideIn = spring({
    frame: Math.max(frame - 10, 0),
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const translateY = interpolate(slideIn, [0, 1], [100, 0]);

  const bellPulse = interpolate(Math.sin(frame * 0.15), [-1, 1], [1, 1.15]);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 24,
        right: 24,
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        padding: '0.6rem 1.2rem',
        borderRadius: 999,
        transform: `translateY(${translateY}px)`,
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          backgroundColor: accentColor,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transform: `scale(${bellPulse})`,
        }}
      >
        <span style={{ color: 'white', fontSize: '0.8rem' }}>🔔</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ color: 'white', fontSize: '0.85rem', fontWeight: 600 }}>{text}</span>
        {subtext ? (
          <span style={{ color: '#9ca3af', fontSize: '0.65rem' }}>{subtext}</span>
        ) : null}
      </div>
    </div>
  );
};
