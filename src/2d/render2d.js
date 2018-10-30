import Line from '../physics/geometry/Line'
import drawCircle from './drawCircle'
import drawLine from './drawLine'
import { PI_2 } from '../consts'

const _line = new Line()

const SIZE = 32

const graphCanvas = document.createElement('canvas')
const graphCtx = graphCanvas.getContext('2d')

const fogOfWarCanvas = document.createElement('canvas')
const fogOfWarCtx = fogOfWarCanvas.getContext('2d')

const outputCanvas = document.createElement('canvas')
const outputCtx = outputCanvas.getContext('2d')

outputCanvas.width = 640
outputCanvas.height = 400
outputCanvas.style.backgroundColor = '#333333'

document.querySelector('#maze').appendChild(outputCanvas)
// document.querySelector('#maze').appendChild(graphCanvas)
// document.querySelector('#maze').appendChild(fogOfWarCanvas)

let width, height

export function reset2d (graph, player) {

  width = graph.width * SIZE
  height = graph.height * SIZE

  graphCanvas.width = width
  graphCanvas.height = height

  fogOfWarCanvas.width = width
  fogOfWarCanvas.height = height

  renderGraph(graphCtx, graph, SIZE)

  renderFogOfWar(fogOfWarCtx, SIZE, player.collider.x, player.collider.y, 50)

  const ex = graph.exit.x * SIZE
  const ey = graph.exit.y * SIZE

  renderFogOfWar(fogOfWarCtx, SIZE, ex, ey, 50)
}

export function render2d (graph, player) {

  outputCtx.save()

  outputCtx.clearRect(0, 0, 640, 400)

  renderFogOfWar(fogOfWarCtx, SIZE, player.collider.x, player.collider.y, 40)

  outputCtx.translate(
    (640 / 2) - (width / 2),
    (400 / 2) - (height / 2)
  )

  // combine
  outputCtx.drawImage(fogOfWarCanvas, 0, 0)
  outputCtx.globalCompositeOperation = 'source-in'
  outputCtx.drawImage(graphCanvas, 0, 0)

  outputCtx.globalCompositeOperation = 'source-over'
  // add persistent stuff
  renderOutline(outputCtx, graph, width, height)
  renderPlayer(outputCtx, player, SIZE)
  renderExit(outputCtx, graph, SIZE)

  outputCtx.restore()
}

function renderExit(ctx, graph, size) {
  const exit = graph.exit
  const xs = exit.x * size
  const ys = exit.y * size
  ctx.fillStyle = '#FFFFFF'
  ctx.font = '10px Arial'
  ctx.textAlign ='center'
  ctx.textBaseline ='middle'
  ctx.fillText('x', xs + size / 2, ys + size / 2)
}

function renderFogOfWar(ctx, size, x, y, radius) {
  ctx.save()
  ctx.translate(size / 2, size / 2)
  ctx.beginPath()
  ctx.fillStyle = '#000000'
  ctx.arc(x, y, radius, 0, PI_2, false)
  ctx.fill()
  ctx.restore()
}

function renderOutline (ctx, graph, width, height) {
  ctx.save()
  ctx.translate(0.5, 0.5)
  ctx.strokeStyle = '#FFFFFF'
  ctx.strokeRect(0, 0, width - 1, height - 1)
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
  ctx.fillStyle = '#3e3e3e'

  ctx.save()
  ctx.translate(-0.5, -0.5)

  ctx.fillRect(0, 0, width, height)

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

      // ctx.fillText(node.weight, xs + size / 2, ys + size / 2)
    }
  }

  ctx.restore()
}
