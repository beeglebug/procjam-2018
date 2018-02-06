import { PerspectiveCamera } from 'three'
import setupPointerLock from './setupPointerLock'
import setupWindowResize from './setupWindowResize'
import createScene from './createScene'
import createRenderer from './createRenderer'
import CharacterController from './CharacterController'
import Input from './Input'
import loop from './loop'

Input.bind(document)

const scene = createScene()
const renderer = createRenderer(document.body)
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
const controller = new CharacterController(camera)

scene.add(controller.transform)

setupWindowResize(camera, renderer)
setupPointerLock(controller)

loop(deltaTime => {
  controller.update(deltaTime)
  renderer.render(scene, camera)
})
