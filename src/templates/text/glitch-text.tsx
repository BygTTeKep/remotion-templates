// Адаптация templates/glitch-text.tsx: текст — пропсом, RGB-слои — акцентными цветами.
// Источник: https://github.com/reactvideoeditor/remotion-templates (MIT).
import { useCurrentFrame } from 'remotion';
import type { TextTemplateProps } from '../../lib/props.js';

export const GlitchText: React.FC<
  TextTemplateProps & {
    // второй RGB-слой глитча; magenta — фирменный исходника
    secondaryColor?: string;
  }
> = ({
  text,
  fontSize = 80,
  accentColor = 'cyan',
  secondaryColor = 'magenta',
}) => {
  const frame = useCurrentFrame();

  const glitchIntensity = Math.sin(frame / 10) * 10;
  const rgbOffset = Math.sin(frame / 5) * 5;

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize,
        fontWeight: 'bold',
        fontFamily: 'monospace',
      }}
    >
      <div
        style={{
          position: 'absolute',
          color: accentColor,
          transform: `translate(${rgbOffset}px, ${glitchIntensity}px)`,
          mixBlendMode: 'screen',
        }}
      >
        {text}
      </div>
      <div
        style={{
          position: 'absolute',
          color: secondaryColor,
          transform: `translate(${-rgbOffset}px, ${-glitchIntensity}px)`,
          mixBlendMode: 'screen',
        }}
      >
        {text}
      </div>
      <div style={{ color: 'white', opacity: 0.8 }}>{text}</div>
    </div>
  );
};
