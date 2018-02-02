export default (controls) => {
  const blocker = document.getElementById('blocker')
  const instructions = document.getElementById('instructions')
  const element = document.body

  // http://www.html5rocks.com/en/tutorials/pointerlock/intro/
  const havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document

  const pointerlockchange = function (event) {
    if (document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element) {
      controls.enabled = true
      blocker.style.display = 'none'
    } else {
      controls.enabled = false
      blocker.style.display = 'block'
      instructions.style.display = ''
    }
  }

  const pointerlockerror = function (event) {
    instructions.style.display = ''
  }

  if (havePointerLock) {
    // Hook pointer lock state change events
    document.addEventListener('pointerlockchange', pointerlockchange, false)
    document.addEventListener('mozpointerlockchange', pointerlockchange, false)
    document.addEventListener('webkitpointerlockchange', pointerlockchange, false)
    document.addEventListener('pointerlockerror', pointerlockerror, false)
    document.addEventListener('mozpointerlockerror', pointerlockerror, false)
    document.addEventListener('webkitpointerlockerror', pointerlockerror, false)

    instructions.addEventListener('click', function (event) {
      instructions.style.display = 'none'
      // Ask the browser to lock the pointer
      element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock
      element.requestPointerLock()
    }, false)
  } else {
    instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API'
  }
}
