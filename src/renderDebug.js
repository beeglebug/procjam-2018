import Circle from './physics/geometry/Circle'
import Line from './physics/geometry/Line'
import Rect from './physics/geometry/Rect'
import drawCircle from './2d/drawCircle'
import drawLine from './2d/drawLine'
import drawRect from './2d/drawRect'
import { TILE_SIZE } from './consts'

const _line = new Line()

const SIZE = 32

export default function renderDebug (ctx, graph, player, colliders) {

  ctx.save()

  ctx.fillStyle = '#333333'

  ctx.fillRect(0, 0, 640, 400)

  ctx.translate((640/2) - 160, (400/2) - 160)

  renderGraph(ctx, graph)

  ctx.translate(SIZE / 2, SIZE / 2)

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
    if (collider instanceof Rect) return drawRect(ctx, collider)
    if (collider instanceof Circle) return drawCircle(ctx, collider)
  })

  ctx.restore()
}

function renderGraph (ctx, graph) {

  ctx.lineWidth = 1
  ctx.strokeStyle = '#FFFFFF'

  ctx.fillStyle = '#888888'
  ctx.font='10px Arial'
  ctx.textAlign='center'
  ctx.textBaseline='middle'

  for (let y = 0; y < graph.height; y++) {

    for (let x = 0; x < graph.width; x++) {

      const node = graph.nodes[y][x]

      ctx.translate(0.5, 0.5)

      const xs = x * SIZE
      const ys = y * SIZE

      if (node.top) {
        ctx.strokeRect(xs, ys, SIZE, 1)
      }

      if (node.left) {
        ctx.strokeRect(xs, ys, 1, SIZE)
      }

      if (node.bottom) {
        ctx.strokeRect(xs, ys + SIZE, SIZE, 1)
      }

      if (node.right) {
        ctx.strokeRect(xs + SIZE, ys, 1, SIZE)
      }

      ctx.fillText(node.weight, xs + TILE_SIZE / 2, ys + TILE_SIZE / 2)

      ctx.translate(-0.5, -0.5)
    }
  }
}

