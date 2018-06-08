export default (renderer, drawingWidth, drawingHeight, outputWidth, outputHeight) => {

  renderer.setSize(drawingWidth, drawingHeight)

  const canvas = renderer.domElement

  canvas.style.width = outputWidth
  canvas.style.height = outputHeight
  canvas.style.imageRendering = 'pixelated'
  canvas.style.position = 'absolute'
  canvas.style.top = 0
  canvas.style.left = 0
}
