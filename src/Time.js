let _prev = null
let deltaTime = 0

const update = time => {
  deltaTime = (_prev === null ? 0 : time - _prev) / 1000
  _prev = time
}

export default {
  deltaTime,
  update
}
