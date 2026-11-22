// Адаптация templates/quote-card.tsx: цитата и атрибуция — пропсами.
// Источник: https://github.com/reactvideoeditor/remotion-templates (MIT).
import { interpolate, useCurrentFrame } from 'remotion';
import type { CardTemplateProps } from '../../lib/props.js';

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

export const QuoteCard: React.FC<CardTemplateProps> = ({
  text,
  subtext,
  backgroundColor = '#111827',
}) => {
  const frame = useCurrentFrame();

  const quoteMarkOpacity = interpolate(frame, [0, 15], [0, 1], clamp);
  const textOpacity = interpolate(frame, [10, 30], [0, 1], clamp);
  const attributionOpacity = interpolate(frame, [30, 45], [0, 1], clamp);
  const attributionX = interpolate(frame, [30, 45], [40, 0], clamp);

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
        padding: '4rem',
        overflow: 'hidden',
      }}
    >
      <span
        style={{
          color: '#3b82f6',
          fontSize: '6rem',
          fontWeight: 700,
          lineHeight: 1,
          opacity: quoteMarkOpacity,
          fontFamily: 'Georgia, serif',
          marginBottom: '1rem',
        }}
      >
        {'“'}
      </span>
      <p
        style={{
          color: 'white',
          fontSize: '1.8rem',
          fontWeight: 400,
          lineHeight: 1.6,
          textAlign: 'center',
          maxWidth: 700,
          margin: 0,
          opacity: textOpacity,
          fontFamily: 'Georgia, serif',
          fontStyle: 'italic',
        }}
      >
        {text}
      </p>
      {subtext ? (
        <p
          style={{
            color: '#9ca3af',
            fontSize: '1.1rem',
            fontWeight: 500,
            margin: 0,
            marginTop: '2rem',
            opacity: attributionOpacity,
            transform: `translateX(${attributionX}px)`,
          }}
        >
          — {subtext}
        </p>
      ) : null}
    </div>
  );
};
