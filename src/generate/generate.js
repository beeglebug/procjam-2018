import Graph from './Graph'
import RandomNumberGenerator from '../RandomNumberGenerator'
import { HEIGHT, WIDTH } from '../consts'

export default function () {

  const graph = new Graph(10, 10)
  const start = graph.get(0, 0)

  const maze = [start]

  const openSet = graph.getOpenNeighbours(start)

  const random = new RandomNumberGenerator(1)

  const next = random.randomItemFromArray(openSet)

  console.log(maze, next)

  const ctx = makeCanvas(WIDTH, HEIGHT)

  ctx.fillStyle = '#333333'
  ctx.fillRect(0, 0, WIDTH, HEIGHT)

  ctx.fillStyle = '#FFFFFF'
  ctx.lineWidth = 1
  ctx.strokeStyle = '#000000'

  ctx.translate(10, 10)
  const size = 30
  for (let y = 0; y < graph.height; y++) {
    for (let x = 0; x < graph.width; x++) {
      const node = graph.get(x, y)
      ctx.fillRect(x * size, y * size, size, size )

      ctx.translate(0.5, 0.5)

      const xs = x * size
      const ys = y * size

      if (node.top) {
        ctx.beginPath()
        ctx.moveTo(xs, ys)
        ctx.lineTo(xs + size, ys)
        ctx.stroke()
      }

      if (node.left) {
        ctx.beginPath()
        ctx.moveTo(xs, ys)
        ctx.lineTo(xs, ys + size)
        ctx.stroke()
      }

      if (node.bottom) {
        ctx.beginPath()
        ctx.moveTo(xs, ys + size)
        ctx.lineTo(xs + size, ys + size)
        ctx.stroke()
      }

      if (node.right) {
        ctx.beginPath()
        ctx.moveTo(xs, ys + size)
        ctx.lineTo(xs + size, ys + size)
        ctx.stroke()
      }

      ctx.translate(-0.5, -0.5)
    }
  }

}


function makeCanvas (width, height) {
  const canvas = document.createElement('canvas')
  const domElement = document.querySelectorAll('canvas')[0]
  domElement.parentNode.insertBefore(canvas, domElement.nextSibling)
  canvas.style.position = 'absolute'
  canvas.style.top = 0
  canvas.style.left = 0
  canvas.width = width
  canvas.height = height
  return canvas.getContext('2d')
}
