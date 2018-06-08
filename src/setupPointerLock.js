export default (controls, hud) => {

  const element = document.body

  const pointerLockSupport = 'pointerLockElement' in document

  if (!pointerLockSupport) {
    return console.error('No Pointer Lock API Support')
  }

  const handlePointerLockChange = () => {
    if (document.pointerLockElement === element) {
      controls.enabled = true
    } else {
      controls.enabled = false
    }
  }

  const handlePointerLockError = () => {
    return console.error('Pointer Lock Error')
  }

  const requestPointerLock = () => {
    element.requestPointerLock()
  }

  document.addEventListener('pointerlockchange', handlePointerLockChange)
  document.addEventListener('pointerlockerror', handlePointerLockError)
  hud.canvas.addEventListener('click', requestPointerLock)
}
