/* eslint-env jest */
import nearestPointRect from '../nearestPointRect'
import Vector2 from '../Vector2'
import Rect from '../Rect'

describe('nearestPointRect', () => {

  it('calculates from the left', () => {

    const point = new Vector2(-10, 10)
    const rect = new Rect(0, 0, 20, 20)

    const output = nearestPointRect(point, rect)

    expect(output.x).toBe(0)
    expect(output.y).toBe(10)
  })

  it('calculates from the right', () => {
    const point = new Vector2(50, 10)
    const rect = new Rect(0, 0, 20, 20)

    const output = nearestPointRect(point, rect)

    expect(output.x).toBe(20)
    expect(output.y).toBe(10)
  })

  it('calculates from the top', () => {
    const point = new Vector2(10, -10)
    const rect = new Rect(0, 0, 20, 20)

    const output = nearestPointRect(point, rect)

    expect(output.x).toBe(10)
    expect(output.y).toBe(0)
  })

  it('calculates from the bottom', () => {
    const point = new Vector2(10, 50)
    const rect = new Rect(0, 0, 20, 20)

    const output = nearestPointRect(point, rect)

    expect(output.x).toBe(10)
    expect(output.y).toBe(20)
  })

  it('calculates from inside', () => {
    const point = new Vector2(11, 12)
    const rect = new Rect(0, 0, 20, 20)

    const output = nearestPointRect(point, rect)

    expect(output.x).toBe(11)
    expect(output.y).toBe(12)
  })
})
