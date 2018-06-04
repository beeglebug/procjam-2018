export default function drawLine (ctx, line, color = '#FFFFFF') {
  ctx.beginPath()
  ctx.lineWidth = 1
  ctx.strokeStyle = color
  ctx.moveTo(line.start.x, line.start.y)
  ctx.lineTo(line.end.x, line.end.y)
  ctx.stroke()
}
