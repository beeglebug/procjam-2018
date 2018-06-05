import Vector2 from './geometry/Vector2'

/**
 * Determine the closest point on a circle to a reference point
 * @param {Vector2} point a point in space
 * @param {Circle} circle a circle
 * @param {Vector2} output
 * @return {Vector2} the closest point on the circle to the point
 */
export default function closestPointCircle (point, circle, output = new Vector2()) {

  output.set(
    point.x - circle.x,
    point.y - circle.y
  )

  output.setMagnitude(circle.radius)

  return output.add(circle.x, circle.y)
}
