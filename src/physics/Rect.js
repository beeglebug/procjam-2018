export default class Rect {

  constructor (x = 0, y = 0, width = 1, height = 1) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }

  toString () {
    return `Rect[${this.x},${this.y},${this.width}${this.height}]`
  }
}
