import { WebGLRenderer } from 'three'

export default function createRenderer () {
  const element = document.getElementById('renderer')
  const renderer = new WebGLRenderer()
  element.appendChild(renderer.domElement)
  return renderer
}
