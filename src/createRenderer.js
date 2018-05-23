import { WebGLRenderer } from 'three'

export default function createRenderer (width, height, domTarget) {
  const renderer = new WebGLRenderer()
  //renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(width, height)
  domTarget.appendChild(renderer.domElement)
  return renderer
}
