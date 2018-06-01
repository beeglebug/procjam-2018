export default (controls, width, height) => {
  const overlay = document.getElementById('overlay')
  const instructions = document.getElementById('instructions')
  const element = document.body

  overlay.style.width = width
  overlay.style.height = height

  const pointerLockSupport = 'pointerLockElement' in document

  if (!pointerLockSupport) {
    instructions.innerHTML = 'No Pointer Lock API Support'
    return
  }

  const handlePointerLockChange = () => {
    if (document.pointerLockElement === element) {
      controls.enabled = true
      overlay.style.display = 'none'
    } else {
      controls.enabled = false
      overlay.style.display = 'block'
      instructions.style.display = ''
    }
  }

  const handlePointerLockError = () => {
    instructions.style.display = ''
  }

  const requestPointerLock = () => {
    instructions.style.display = 'none'
    element.requestPointerLock()
  }

  document.addEventListener('pointerlockchange', handlePointerLockChange)
  document.addEventListener('pointerlockerror', handlePointerLockError)
  overlay.addEventListener('click', requestPointerLock)
}
