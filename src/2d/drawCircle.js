import { PI_2 } from '../consts'

export default function drawCircle (ctx, circle, color = '#FFFFFF') {
  ctx.beginPath()
  ctx.lineWidth = 1
  ctx.strokeStyle = color
  ctx.arc(circle.x, circle.y, circle.radius, 0, PI_2, false)
  ctx.stroke()
}
