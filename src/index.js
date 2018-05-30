import { PerspectiveCamera } from 'three'
import setupPointerLock from './setupPointerLock'
import createScene from './createScene'
import createRenderer from './createRenderer'
import CharacterController from './CharacterController'
import Input from './Input'
import loop from './loop'
import mountUI from './ui'
import setupScaling from './setupScaling'
import setup2d from './2d'
import makeCube from './makeCube'

const WIDTH = 640
const HEIGHT = 400

Input.bind(document)

const scene = createScene()
const renderer = createRenderer(document.getElementById('renderer'))
const camera = new PerspectiveCamera(45, WIDTH / HEIGHT, 1, 1000)
const controller = new CharacterController(camera)

const cubes = [
  makeCube(-100, -100, 20, '#FF0000'),
  makeCube(100, 100, 20, '#00FF00'),
  makeCube(100, -100, 20, '#0053ff'),
  makeCube(-100, 100, 20, '#FF00FF')
]
scene.add(...cubes)

scene.add(controller.transform)

setupScaling(renderer, 160, 100, WIDTH, HEIGHT)

setupPointerLock(controller)

mountUI()

const { renderer: renderer2d, stage, update, createCubes } = setup2d()

createCubes(cubes)

loop(deltaTime => {
  controller.update(deltaTime)
  update(controller)
  renderer.render(scene, camera)
  renderer2d.render(stage)
})

