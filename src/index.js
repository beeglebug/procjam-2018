/* global performance, requestAnimationFrame */
import { PerspectiveCamera } from 'three'
import setupPointerLock from './setupPointerLock'
import createScene from "./createScene"
import CharacterController from './CharacterController'
import createRenderer from "./createRenderer"
import Input from "./Input"

Input.bind(document)

const scene = createScene()
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
const renderer = createRenderer()
const controller = new CharacterController(camera)

window.addEventListener('resize', onWindowResize, false)
document.body.appendChild(renderer.domElement)

setupPointerLock(controller)
scene.add(controller.transform)

function onWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

let prevTime = performance.now()

function loop () {
  requestAnimationFrame(loop)
  const time = performance.now()
  const delta = (time - prevTime) / 1000
  controller.update(delta)
  prevTime = time
  renderer.render(scene, camera)
}

loop()
