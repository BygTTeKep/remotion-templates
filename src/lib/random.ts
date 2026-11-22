// Детерминированный псевдослучайный шум.
// Значение зависит только от (seed, frame): повторный рендер и превью дают одинаковый
// результат. Замена Math.random() из исходных шаблонов — недетерминированный random
// ломает повторяемость рендера в Remotion.
export function noise(seed: number, frame: number): number {
  const x = Math.sin(seed * 127.1 + frame * 311.7) * 43758.5453;
  return x - Math.floor(x);
}
