export default function distanceBetween (v1, v2) {
  const dx = v1.x - v2.x
  const dy = v1.y - v2.y
  return Math.sqrt((dx * dx) + (dy * dy))
}
