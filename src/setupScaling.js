export default (renderer, drawingWidth, drawingHeight, outputWidth, outputHeight) => {

  const ratio = drawingWidth / outputWidth

  renderer.setPixelRatio(ratio)
  renderer.setSize(outputWidth, outputHeight)

  const canvas = renderer.domElement
  canvas.style.imageRendering = 'pixelated'


}
