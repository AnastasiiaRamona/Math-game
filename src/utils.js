export function vhToPixels(vh) {
  const viewportHeight = window.innerHeight;
  const pixels = (vh / 100) * viewportHeight;
  return pixels;
}

export function checkAnswerIsNumber(answer) {
  return typeof answer === 'number' && !isNaN(answer);
}
