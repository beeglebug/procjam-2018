export default class Circle {

  constructor (x = 0, y = 0, radius = 1) {
    this.x = x
    this.y = y
    this.radius = radius
  }

  toString () {
    return `Circle[${this.x},${this.y},${this.radius}]`
  }
}
