import { PerspectiveCamera } from 'three'
import setupPointerLock from './setupPointerLock'
import createScene from './createScene'
import createRenderer from './createRenderer'
import CharacterController from './CharacterController'
import Input from './Input'
import loop from './loop'
import setupScaling from './setupScaling'
import Physics from './Physics'
import { HEIGHT, WIDTH } from './consts'
import createRandomMeshes from './_temp/createRandomMeshes'
import EffectComposer from './three/EffectComposer'
import RenderPass from './three/RenderPass'
import Hud from './ui/Hud'
import handleReticleSelection from './handleReticleSelection'

Input.bind(document)

const scene = createScene()
const renderer = createRenderer()
const camera = new PerspectiveCamera(45, WIDTH / HEIGHT, 1, 1000)

const controller = new CharacterController(camera)

scene.add(controller)

setupScaling(renderer, WIDTH / 2, HEIGHT / 2, WIDTH, HEIGHT)

const hud = new Hud(renderer)

setupPointerLock(controller, hud)

const meshes = createRandomMeshes(10)

const colliders = meshes.map(mesh => mesh.collider)

scene.add(...meshes)

Physics.setColliders(colliders)

const composer = new EffectComposer(renderer)

const renderPass = new RenderPass(scene, camera)
renderPass.renderToScreen = true
composer.addPass(renderPass)

loop(deltaTime => {
  controller.update(deltaTime)
  handleReticleSelection(camera, meshes)
  composer.render()
  hud.render()
  //hud.renderDebug(controller, colliders)
})

