import { PerspectiveCamera } from 'three'
import setupPointerLock from './setupPointerLock'
import createScene from './createScene'
import createRenderer from './createRenderer'
import CharacterController from './CharacterController'
import Input from './Input'
import loop from './loop'
import mountUI from './ui'
import setupScaling from './setupScaling'
import { setup2d, render2d } from './2d'
import Physics from './Physics'
import { HEIGHT, WIDTH } from './consts'
import createRandomMeshes from './_temp/createRandomMeshes'

Input.bind(document)

const scene = createScene()
const renderer = createRenderer(document.getElementById('renderer'))
const camera = new PerspectiveCamera(45, WIDTH / HEIGHT, 1, 1000)

const controller = new CharacterController(camera)

scene.add(controller)

setupScaling(renderer, WIDTH / 2, HEIGHT / 2, WIDTH, HEIGHT)

setupPointerLock(controller, WIDTH, HEIGHT)

mountUI()

setup2d(document.getElementById('renderer2d'))

const meshes = createRandomMeshes(20)

const colliders = meshes.map(mesh => mesh.collider)

scene.add(...meshes)

Physics.setColliders(colliders)

loop(deltaTime => {
  // move the player according to input
  controller.update(deltaTime)

  renderer.render(scene, camera)
  render2d(controller, colliders)
})

