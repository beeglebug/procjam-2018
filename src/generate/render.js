import { HEIGHT, WIDTH } from '../consts'

const ctx = makeCanvas(100, 100)

export default function render (graph) {

  ctx.fillStyle = '#333333'
  ctx.fillRect(0, 0, WIDTH, HEIGHT)

  ctx.fillStyle = '#FFFFFF'

  ctx.lineWidth = 1
  ctx.strokeStyle = '#000000'

  const size = 10

  for (let y = 0; y < graph.height; y++) {

    for (let x = 0; x < graph.width; x++) {

      const node = graph.nodes[y][x]
      ctx.fillRect(x * size, y * size, size, size )

      ctx.translate(0.5, 0.5)

      const xs = x * size
      const ys = y * size

      if (node.top) {
        // ctx.strokeStyle = '#cb2008'
        ctx.beginPath()
        ctx.moveTo(xs, ys)
        ctx.lineTo(xs + size, ys)
        ctx.stroke()
      }

      if (node.left) {
        // ctx.strokeStyle = '#428ccb'
        ctx.beginPath()
        ctx.moveTo(xs, ys)
        ctx.lineTo(xs, ys + size)
        ctx.stroke()
      }

      if (node.bottom) {
        // ctx.strokeStyle = '#cbc754'
        ctx.beginPath()
        ctx.moveTo(xs, ys + size)
        ctx.lineTo(xs + size, ys + size)
        ctx.stroke()
      }

      if (node.right) {
        // ctx.strokeStyle = '#0acb56'
        ctx.beginPath()
        ctx.moveTo(xs + size, ys)
        ctx.lineTo(xs + size, ys + size)
        ctx.stroke()
      }

      ctx.translate(-0.5, -0.5)
    }
  }
}


function makeCanvas (width, height) {
  const canvas = document.createElement('canvas')
  const domElement = document.querySelector('#maze')
  domElement.appendChild(canvas)
  canvas.width = width
  canvas.height = height
  return canvas.getContext('2d')
}
