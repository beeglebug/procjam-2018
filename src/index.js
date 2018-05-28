import { PerspectiveCamera } from 'three'
import setupPointerLock from './setupPointerLock'
import createScene from './createScene'
import createRenderer from './createRenderer'
import CharacterController from './CharacterController'
import Input from './Input'
import loop from './loop'
import mountUI from './ui'
import setupScaling from './setupScaling'

Input.bind(document)

const scene = createScene()
const renderer = createRenderer(document.getElementById('renderer'))
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
const controller = new CharacterController(camera)

scene.add(controller.transform)

setupScaling(renderer, 160, 100, 640, 400)

setupPointerLock(controller)

mountUI()

loop(deltaTime => {
  controller.update(deltaTime)
  renderer.render(scene, camera)
})

