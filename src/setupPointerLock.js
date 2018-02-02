export default (controls) => {
  const blocker = document.getElementById('blocker')
  const instructions = document.getElementById('instructions')
  const element = document.body

  const pointerLockSupport = 'pointerLockElement' in document

  if (!pointerLockSupport) {
    instructions.innerHTML = 'No Pointer Lock API Support'
    return
  }

  const handlePointerLockChange = () => {
    if (document.pointerLockElement === element) {
      controls.enabled = true
      blocker.style.display = 'none'
    } else {
      controls.enabled = false
      blocker.style.display = 'block'
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
  instructions.addEventListener('click', requestPointerLock)
}
