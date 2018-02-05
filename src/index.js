/* global performance, requestAnimationFrame */
import { PerspectiveCamera } from 'three'
import setupPointerLock from './setupPointerLock'
import setupWindowResize from './setupWindowResize'
import createScene from './createScene'
import createRenderer from './createRenderer'
import CharacterController from './CharacterController'
import Input from './Input'
import Time from './TIme'

Input.bind(document)

const scene = createScene()
const renderer = createRenderer()
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
const controller = new CharacterController(camera)

document.body.appendChild(renderer.domElement)

setupWindowResize(camera, renderer)
setupPointerLock(controller)
scene.add(controller.transform)

function loop (time) {
  requestAnimationFrame(loop)
  Time.update(time)
  controller.update(Time.deltaTime)
  renderer.render(scene, camera)
}

loop()
