export const KEY_DOWN = 'KEY_DOWN'
export const KEY_UP = 'KEY_UP'
export const KEY_PRESS = 'KEY_PRESS'

const fire = (listeners, event, arg) => {
  if (!listeners) return
  listeners.forEach(listener => listener(event, arg))
}

export default class Keyboard {
  constructor (target) {
    this.down = {}
    this.listeners = {}
    target.addEventListener('keydown', this.handleKeyDown)
    target.addEventListener('keypress', this.handleKeyPress)
    target.addEventListener('keyup', this.handleKeyUp)
  }

  handleKeyDown = event => {
    const code = event.keyCode
    this.down[code] = true

    // generic key handler
    fire(this.listeners[KEY_DOWN], event, code)

    // specific key
    fire(this.listeners[code], event, KEY_DOWN)

    return false
  }

  handleKeyPress = event => {
    const code = event.keyCode

    // generic key handler
    fire(this.listeners[KEY_PRESS], event, code)

    // specific key
    fire(this.listeners[code], event, KEY_PRESS)

    return false
  }

  handleKeyUp = event => {
    const code = event.keyCode
    delete this.down[code]

    // generic key handler
    fire(this.listeners[KEY_UP], event, code)

    // specific key
    fire(this.listeners[code], event, KEY_UP)

    return false
  }

  /**
   * add an event listener for a type of event
   */
  on (event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }

    this.listeners[event].push(callback)
  }

  /**
   * remove a specific event listener
   */
  off (event, callback) {
    if (!this.listeners[event]) return

    this.listeners[event] = this.listeners[event].filter(fn => fn !== callback)
  }

  isDown (key) {
    return this.down[key] === true
  }
}
