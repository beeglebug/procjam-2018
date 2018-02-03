import { WebGLRenderer } from 'three'

export default function createRenderer () {
  const renderer = new WebGLRenderer()
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  return renderer
}
