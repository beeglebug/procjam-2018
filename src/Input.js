import KeyCode from './KeyCode'
import Vector2 from './physics/geometry/Vector2'

const downKeys = {}
const mousePosition = new Vector2()
const mouseMove = new Vector2()

const MouseX = 'MouseX'
const MouseY = 'MouseY'

const LOCATION_LEFT = 1
const LOCATION_RIGHT = 2

const determineCode = event => {
  switch (event.keyCode) {
    case KeyCode.Shift:
      if (event.location === LOCATION_LEFT) return KeyCode.LeftShift
      else if (event.location === LOCATION_RIGHT) return KeyCode.RightShift
      break
    case KeyCode.Control:
      if (event.location === LOCATION_LEFT) return KeyCode.LeftControl
      else if (event.location === LOCATION_RIGHT) return KeyCode.RightControl
      break
  }
  return event.keyCode
}

const handleKeyDown = event => {
  const code = determineCode(event)
  downKeys[code] = true
}

const handleKeyUp = event => {
  const code = determineCode(event)
  delete downKeys[code]
}

const getKey = key => {
  return downKeys[key] === true
}

const bind = target => {
  target.addEventListener('keydown', handleKeyDown)
  target.addEventListener('keyup', handleKeyUp)
  target.addEventListener('mousemove', handleMouseMove)
}

let timeout

const handleMouseMove = event => {
  clearTimeout(timeout)
  const { movementX, movementY, clientX, clientY } = event
  mousePosition.x = clientX
  mousePosition.y = clientY
  mouseMove.x = movementX || 0
  mouseMove.y = movementY || 0
  timeout = setTimeout(clearMouseMove, 50)
}

const clearMouseMove = () => {
  mouseMove.x = 0
  mouseMove.y = 0
}

const getAxis = axis => {
  switch (axis) {
    case MouseX: return mouseMove.x
    case MouseY: return mouseMove.y
  }
}

export default {
  bind,
  getKey,
  getAxis,
  mousePosition,
  MouseX,
  MouseY
}
