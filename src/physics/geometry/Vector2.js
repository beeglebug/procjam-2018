export default class Vector2 {

  constructor (x = 0, y = 0) {
    this.x = x
    this.y = y
  }

  set (x = 0, y = 0) {
    this.x = x
    this.y = y
    return this
  }

  multiply (scalar = 1) {
    this.x *= scalar
    this.y *= scalar
    return this
  }

  subtract (vector) {
    this.x -= vector.x
    this.y -= vector.y
    return this
  }

  zero () {
    this.x = 0
    this.y = 0
    return this
  }

  isZero () {
    return this.x === 0 && this.y === 0
  }

  magnitude () {
    return Math.sqrt((this.x * this.x) + (this.y * this.y))
  }

  normalize () {
    // shortcuts to avoid magnitude sqrt
    if (this.isZero()) return this

    if (this.x === 0) {
      this.y = this.y > 0 ? 1 : -1
      return this
    }

    if (this.y === 0) {
      this.x = this.x > 0 ? 1 : -1
      return this
    }

    const magnitude = this.magnitude()

    this.x /= magnitude
    this.y /= magnitude

    return this
  }
}

Vector2.right = new Vector2(1, 0)
Vector2.left = new Vector2(-1, 0)
Vector2.up = new Vector2(0, -1)
Vector2.down = new Vector2(0, 1)