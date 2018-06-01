import CollisionResponse from './CollisionResponse'
import collideCircleRect from './collideCircleRect'

const _response = new CollisionResponse()

export default function (target, obstacles) {

  // TODO currently assumes target is a circle and obstacles are rects
  for (const obstacle of obstacles) {
    if (collideCircleRect(target, obstacle, _response)) {
      // TODO apply response
      // console.log(target, obstacle, _response)
      const mtd = _response.mtd
      target.x += mtd.x
      target.y += mtd.y
    }
  }
}
