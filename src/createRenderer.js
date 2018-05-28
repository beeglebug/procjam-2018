import { WebGLRenderer } from 'three'

export default function createRenderer (domTarget) {
  const renderer = new WebGLRenderer()
  domTarget.appendChild(renderer.domElement)
  return renderer
}
