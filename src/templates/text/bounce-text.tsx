// Адаптация templates/bounce-text.tsx: заголовок и подзаголовок — пропсами.
// Источник: https://github.com/reactvideoeditor/remotion-templates (MIT).
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import type { TextTemplateProps } from '../../lib/props.js';

export const BounceText: React.FC<TextTemplateProps & { subtext?: string }> = ({
  text,
  subtext,
  accentColor = '#3b82f6',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideIn = spring({
    frame,
    fps,
    from: -100,
    to: 0,
    config: {
      damping: 100,
      mass: 1,
      stiffness: 200,
    },
  });

  const fadeIn = spring({
    frame: frame - 15,
    fps,
    from: 0,
    to: 1,
    config: {
      damping: 100,
      mass: 1,
    },
  });

  const scaleIn = spring({
    frame,
    fps,
    from: 0.5,
    to: 0.8,
    config: {
      damping: 100,
      mass: 1,
      stiffness: 200,
    },
  });

  const containerFadeIn = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: {
      damping: 100,
      mass: 1,
    },
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) scale(${scaleIn})`,
        width: '80%',
        padding: '2rem 3rem',
        background: `linear-gradient(45deg, #1e3a8a, ${accentColor})`,
        borderRadius: 20,
        opacity: containerFadeIn,
      }}
    >
      <div style={{ transform: `translateX(${slideIn}%)` }}>
        <h1
          style={{
            fontSize: '3.5rem',
            fontWeight: 900,
            color: 'white',
            margin: 0,
            lineHeight: 1,
            textShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
          }}
        >
          {text}
        </h1>
        {subtext ? (
          <h2
            style={{
              fontSize: '1.8rem',
              color: 'white',
              margin: 0,
              marginTop: '0.75rem',
              fontWeight: 500,
              opacity: fadeIn,
              textShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
            }}
          >
            {subtext}
          </h2>
        ) : null}
      </div>
    </div>
  );
};
