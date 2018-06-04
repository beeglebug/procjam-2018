import Line from '../physics/geometry/Line'
import drawLine from './drawLine'
import drawCircle from './drawCircle'
import drawRect from './drawRect'
import { HEIGHT, WIDTH } from '../consts'

let canvas
let ctx

export function setup2d (domTarget) {

  canvas = document.createElement('canvas')
  ctx = canvas.getContext('2d')

  canvas.width = WIDTH
  canvas.height = HEIGHT

  domTarget.appendChild(canvas)
}

const _line = new Line()

export function render2d (player, colliders) {

  ctx.fillStyle = '#000000'
  ctx.fillRect(0, 0, WIDTH, HEIGHT)

  ctx.save()
  ctx.translate(100, 100)

  drawCircle(ctx, player.collider)

  _line.start.set(
    player.collider.x,
    player.collider.y
  )

  _line.end
    .set(0, -10)
    .rotate(-player.rotation.y)
    .add(_line.start)

  drawLine(ctx, _line, '#00FF00')

  colliders.forEach(collider => {
    // todo draw other colliders
    drawRect(ctx, collider)
  })

  ctx.restore()
}
