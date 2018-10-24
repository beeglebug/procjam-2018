import drawCircle from '../2d/drawCircle'
import Circle from '../physics/geometry/Circle'

export default class Hud {

  constructor (renderer) {

    const { domElement } = renderer

    this.canvas = document.createElement('canvas')

    domElement.parentNode.insertBefore(this.canvas, domElement.nextSibling)

    copyDimensions(domElement, this.canvas)
    this.canvas.style.imageRendering = 'pixelated'
    this.canvas.style.position = 'absolute'
    this.canvas.style.top = 0
    this.canvas.style.left = 0

    this.width = domElement.width
    this.height = domElement.height

    this.ctx = this.canvas.getContext('2d')

    this.reticle = new Circle(this.width / 2, this.height / 2, 5)
  }

  render () {
    this.ctx.clearRect(0, 0, this.width, this.height)
    drawCircle(this.ctx, this.reticle)
  }
}


function copyDimensions (source, destination) {
  destination.width = source.width
  destination.height = source.height
  destination.style.width = source.style.width
  destination.style.height = source.style.height
}
