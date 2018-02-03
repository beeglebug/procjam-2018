const downKeys = {}
const mouseMove = {
  x: 0,
  y: 0
}

const MouseX = 'MouseX'
const MouseY = 'MouseY'

const handleKeyDown = event => {
  const code = event.keyCode
  downKeys[code] = true
}

const handleKeyUp = event => {
  const code = event.keyCode
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
  const { movementX, movementY } = event
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
  MouseX,
  MouseY
}
