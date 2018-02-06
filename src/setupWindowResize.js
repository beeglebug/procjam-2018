export default (camera, renderer) => {
  window.addEventListener('resize', handleWindowResize, false)
  function handleWindowResize () {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
}
