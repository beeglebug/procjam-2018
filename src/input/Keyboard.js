export default class Keyboard {
  constructor (target) {
    this.down = {}
    target.addEventListener('keydown', this.handleKeyDown)
    target.addEventListener('keyup', this.handleKeyUp)
  }

  handleKeyDown = event => {
    const code = event.keyCode
    this.down[code] = true
  }

  handleKeyUp = event => {
    const code = event.keyCode
    delete this.down[code]
  }

  isDown (key) {
    return this.down[key] === true
  }
}
