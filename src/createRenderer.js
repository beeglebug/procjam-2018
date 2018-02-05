import { WebGLRenderer } from 'three'

export default function createRenderer (domTarget) {
  const renderer = new WebGLRenderer()
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  domTarget.appendChild(renderer.domElement)
  return renderer
}
