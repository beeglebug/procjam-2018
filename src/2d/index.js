import drawCircle from './drawCircle'
import drawRect from './drawRect'
import { HEIGHT, WIDTH } from '../consts'

let canvas
let ctx

export function setup2d (domTarget) {

  canvas = document.createElement('canvas')
  ctx = canvas.getContext('2d')

  domTarget.appendChild(canvas)
}


export function render2d (player, colliders) {

  ctx.fillStyle = '#000000'
  ctx.fillRect(0, 0, WIDTH, HEIGHT)

  drawCircle(ctx, player)

  colliders.forEach(collider => {
    // todo draw other colliders
    drawRect(ctx, collider)
  })
}
