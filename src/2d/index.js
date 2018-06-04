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

  _line.set(
    player.collider.x,
    player.collider.y,
    player.collider.x,
    player.collider.y + 10
  )

  drawLine(ctx, _line)

  colliders.forEach(collider => {
    // todo draw other colliders
    drawRect(ctx, collider)
  })

  ctx.restore()
}
