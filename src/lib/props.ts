// Общие пропсы адаптированных шаблонов.
// Конвенции адаптации (отличия от исходных демо в templates/):
// - контент пропсами, не хардкодом;
// - длительность — из useVideoConfig().durationInFrames родительского Sequence,
//   шаблон оборачивается в <Sequence durationInFrames={...}> со стороны монтажа;
// - шрифты не подгружаются здесь: наследуются от контейнера, потребитель
//   (AiDreamsStudioAutoMontage) грузит их через @remotion/fonts;
// - никакого Math.random — только детерминированный noise() из ./random.

// Базовые пропсы текстовых шаблонов.
export type TextTemplateProps = {
  text: string;
  // акцентный цвет шаблона; по умолчанию — фирменный цвет исходного шаблона
  accentColor?: string;
  // размер основного текста, px; по умолчанию — из исходного шаблона
  fontSize?: number;
};

// Базовые пропсы карточек (полноэкранных сцен: интро, аутро, титры).
export type CardTemplateProps = {
  text: string;
  subtext?: string;
  accentColor?: string;
  // фон карточки; по умолчанию — фирменный тёмный исходного шаблона
  backgroundColor?: string;
};
