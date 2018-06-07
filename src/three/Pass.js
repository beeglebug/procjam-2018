export default class Pass {

  // if set to true, the pass is processed by the composer
  enabled = true

  // if set to true, the pass indicates to swap read and write buffer after rendering
  needsSwap = true

  // if set to true, the pass clears its buffer before rendering
  clear = false

  // if set to true, the result of the pass is rendered to screen
  renderToScreen = false

  setSize (width, height) {}

  render (renderer, writeBuffer, readBuffer, delta, maskActive) {
    console.warn( 'Pass.render() must be implemented in derived class' )
  }
}
