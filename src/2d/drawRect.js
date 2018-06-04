export default function drawCircle (ctx, rect, color = '#FFFFFF') {
  ctx.beginPath()
  ctx.lineWidth = 1
  ctx.strokeStyle = color
  ctx.strokeRect(rect.x, rect.y, rect.width, rect.height)
}
