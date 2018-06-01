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
import cubeFromRect from './_temp/cubeFromRect'
import Circle from './physics/Circle'
import Rect from './physics/Rect'
import separate from './physics/separate'

const WIDTH = 640
const HEIGHT = 400

Input.bind(document)

const scene = createScene()
const renderer = createRenderer(document.getElementById('renderer'))
const camera = new PerspectiveCamera(45, WIDTH / HEIGHT, 1, 1000)

const controller = new CharacterController(camera)

scene.add(controller)

setupScaling(renderer, 160, 100, WIDTH, HEIGHT)

setupPointerLock(controller, WIDTH, HEIGHT)

mountUI()

const { render2d, update2dGraphics, create2dGraphics } = setup2d()


const rect1 = new Rect(-100, -100, 20, 20)
const rect2 = new Rect(100, 100, 20, 20)
const rect3 = new Rect(100, -100, 20, 20)
const rect4 = new Rect(-100, 100, 20, 20)

const playerCollider = new Circle(0, 0, 10)

const colliders = [rect1, rect2, rect3, rect4]

const cubes = [
  cubeFromRect(rect1, 20, '#FF0000'),
  cubeFromRect(rect2, 20, '#00FF00'),
  cubeFromRect(rect3, 20, '#0053ff'),
  cubeFromRect(rect4, 20, '#FF00FF')
]
scene.add(...cubes)

create2dGraphics(playerCollider, cubes)

loop(deltaTime => {

  // move the player according to input
  controller.update(deltaTime)

  // NOTE: 3D.x = 2D.x / 3D.z = 2D.y

  // copy position to the collider
  playerCollider.x = controller.position.x
  playerCollider.y = controller.position.z

  // stop the player going into the cubes
  separate(playerCollider, colliders)

  // update the player controller based on the collider
  controller.position.set(playerCollider.x, 0, playerCollider.y)

  update2dGraphics(controller)

  renderer.render(scene, camera)
  render2d()
})

