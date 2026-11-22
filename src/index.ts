// Публичный вход пакета: адаптированные под интеграцию шаблоны.
export { noise } from './lib/random.js';
export type { TextTemplateProps, CardTemplateProps } from './lib/props.js';

export { AnimatedText } from './templates/text/animated-text.js';
export { BounceText } from './templates/text/bounce-text.js';
export { BubblePopText } from './templates/text/bubble-pop-text.js';
export { FloatingBubbleText } from './templates/text/floating-bubble-text.js';
export { GlitchText } from './templates/text/glitch-text.js';
export { PoppingText } from './templates/text/popping-text.js';
export { PulsingText } from './templates/text/pulsing-text.js';
export { SlideText } from './templates/text/slide-text.js';
export { TypewriterSubtitle } from './templates/text/typewriter-subtitle.js';

export { ChapterTitle } from './templates/intro-outro/chapter-title.js';
export { CinematicTitleIntro } from './templates/intro-outro/cinematic-title-intro.js';
export { CountdownIntro } from './templates/intro-outro/countdown-intro.js';
export { CreditsRoll } from './templates/intro-outro/credits-roll.js';
export type { Credit } from './templates/intro-outro/credits-roll.js';
export { EndCard } from './templates/intro-outro/end-card.js';
export { LowerThird } from './templates/intro-outro/lower-third.js';
export { QuoteCard } from './templates/intro-outro/quote-card.js';
export { SubscribeReminder } from './templates/intro-outro/subscribe-reminder.js';
export { TitleSplit } from './templates/intro-outro/title-split.js';
