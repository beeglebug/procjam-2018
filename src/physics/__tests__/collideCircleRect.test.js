/* eslint-env jest */
import collideCircleRect from '../collideCircleRect'
import Circle from '../Circle'
import Rect from '../Rect'
import CollisionResponse from '../CollisionResponse'

describe('collideCircleRect', () => {

  it('collides from the right', () => {

    const circle = new Circle(22, 10, 10)
    const rect = new Rect(0, 0, 20, 20)
    const response = new CollisionResponse()

    const output = collideCircleRect(circle, rect, response)

    expect(output).toEqual(true)
    expect(response.position.x).toBe(20)
    expect(response.position.y).toBe(10)
    console.log(response)
  })

})
