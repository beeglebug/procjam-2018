import drawCircle from '../2d/drawCircle'
import Circle from '../physics/geometry/Circle'
import Rect from '../physics/geometry/Rect'
import drawLine from '../2d/drawLine'
import drawRect from '../2d/drawRect'
import Line from '../physics/geometry/Line'

const _line = new Line()

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

  renderDebug (player, colliders) {

    this.ctx.fillStyle = '#000000'

    this.ctx.save()
    this.ctx.translate(100, 100)

    drawCircle(this.ctx, player.collider)

    _line.start.set(
      player.collider.x,
      player.collider.y
    )

    _line.end
      .set(0, -10)
      .rotate(-player.rotation.y)
      .add(_line.start)

    drawLine(this.ctx, _line, '#00FF00')

    colliders.forEach(collider => {
      if (collider instanceof Rect) return drawRect(this.ctx, collider)
      if (collider instanceof Circle) return drawCircle(this.ctx, collider)
    })

    this.ctx.restore()
  }


}


function copyDimensions (source, destination) {
  destination.width = source.width
  destination.height = source.height
  destination.style.width = source.style.width
  destination.style.height = source.style.height
}
