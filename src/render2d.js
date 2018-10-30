import Line from './physics/geometry/Line'
import drawCircle from './2d/drawCircle'
import drawLine from './2d/drawLine'
import drawRect from './2d/drawRect'
import createCanvas from './createCanvas'
import { PI_2 } from './consts'

const _line = new Line()

const SIZE = 32

const fowCanvas = createCanvas(640, 400)
const fowCtx = fowCanvas.getContext('2d')
fowCtx.fillStyle = '#000000'
// fowCtx.fillRect(0, 0, 640, 400)

export default function render2d (ctx, graph, player, colliders) {

  ctx.save()

  ctx.fillStyle = '#333333'

  ctx.fillRect(0, 0, 640, 400)

  ctx.translate((640/2) - 160, (400/2) - 160)

  renderPlayer(ctx, player, SIZE)

  renderFogOfWar(fowCtx, player, SIZE)

  // renderColliders(ctx, colliders, SIZE)

  const width = graph.width * SIZE
  const height = graph.height * SIZE

  ctx.drawImage(fowCanvas, 0, 0, width, height, 0, 0, width, height)
  renderGraph(ctx, graph, SIZE)

  renderOutline(ctx, graph, width, height)

  ctx.restore()
}

function renderFogOfWar(ctx, player, size) {
  ctx.save()
  ctx.translate(size / 2, size / 2)
  const radius = 20
  ctx.beginPath()
  ctx.fillStyle = '#000000'
  ctx.arc(player.collider.x, player.collider.y, radius, 0, PI_2, false)
  ctx.fill()
  ctx.restore()
}

function renderOutline (ctx, graph, width, height) {
  ctx.save()
  ctx.translate(0.5, 0.5)
  ctx.strokeStyle = '#FFFFFF'
  ctx.strokeRect(0, 0, width, height)
  ctx.restore()
}

function renderColliders (ctx, colliders, size) {

  ctx.save()
  ctx.translate(size / 2, size / 2)

  colliders.forEach(collider => drawRect(ctx, collider, '#FF0000'))

  ctx.restore()
}

function renderPlayer (ctx, player, size) {

  ctx.save()
  ctx.translate(size / 2, size / 2)

  drawCircle(ctx, player.collider)

  _line.start.set(
    player.collider.x,
    player.collider.y
  )

  _line.end
    .set(0, -10)
    .rotate(-player.rotation.y)
    .add(_line.start)

  drawLine(ctx, _line, '#FFFFFF')

  ctx.restore()
}

function renderGraph (ctx, graph, size) {

  ctx.lineWidth = 1
  ctx.strokeStyle = '#FFFFFF'
  ctx.fillStyle = '#FFFFFF'
  ctx.font = '10px Arial'
  ctx.textAlign ='center'
  ctx.textBaseline ='middle'

  ctx.save()

  ctx.translate(0.5, 0.5)

  // ctx.globalCompositeOperation = 'destination-in'

  for (let y = 0; y < graph.height; y++) {

    for (let x = 0; x < graph.width; x++) {

      const node = graph.nodes[y][x]

      const xs = x * size
      const ys = y * size

      if (node.top) {
        ctx.strokeRect(xs, ys, size, 1)
      }

      if (node.left) {
        ctx.strokeRect(xs, ys, 1, size)
      }

      if (node.bottom) {
        ctx.strokeRect(xs, ys + size, size, 1)
      }

      if (node.right) {
        ctx.strokeRect(xs + size, ys, 1, size)
      }

      if (node.exit) {
        ctx.fillText('x', xs + size / 2, ys + size / 2)
      }

      // ctx.fillText(node.weight, xs + size / 2, ys + size / 2)
    }
  }

  ctx.restore()
}
