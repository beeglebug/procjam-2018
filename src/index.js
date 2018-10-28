import Stats from 'stats.js'
import { Color, PerspectiveCamera, PointLight } from 'three'
import setupPointerLock from './setupPointerLock'
import createScene from './createScene'
import createRenderer from './createRenderer'
import CharacterController from './CharacterController'
import Input from './Input'
import loop from './loop'
import setupScaling from './setupScaling'
import Physics from './Physics'
import { HEIGHT, TILE_SIZE, WIDTH } from './consts'
import EffectComposer from './three/EffectComposer'
import RenderPass from './three/RenderPass'
import Hud from './ui/Hud'
import generate, { getNodeWorld } from './generate/generate'
import createWorld from './createWorld'
import renderDebug from './renderDebug'

Input.bind(document)

const scene = createScene()
const renderer = createRenderer()
const camera = new PerspectiveCamera(45, WIDTH / HEIGHT, 1, 1000)

const controller = new CharacterController(camera)

const light = new PointLight(new Color('#FFFFFF'), 1, 100, 2)
light.position.y = controller.eyeHeight
controller.add(light)

scene.add(controller)

setupScaling(renderer, WIDTH / 2, HEIGHT / 2, WIDTH, HEIGHT)

const hud = new Hud(renderer)

setupPointerLock(controller, hud)

const colliders = []

Physics.setColliders(colliders)

const composer = new EffectComposer(renderer)
const renderPass = new RenderPass(scene, camera)
renderPass.renderToScreen = true
composer.addPass(renderPass)

const graph = generate(+new Date)
const world = createWorld(graph)

scene.add(world)

console.log(graph)

window.scene = scene

const stats = new Stats()
stats.showPanel(0)
document.body.appendChild(stats.dom)

const canvas = document.createElement('canvas')
const domElement = document.querySelector('#maze')
domElement.appendChild(canvas)
canvas.width = 640
canvas.height = 400
const ctx = canvas.getContext('2d')

setInitialDirection(graph, controller)

function setInitialDirection (graph, controller) {
  const node = getNodeWorld(graph, controller.position.x, controller.position.y)

  if (!node.top) return controller.rotation.y = 0
  if (!node.right) return controller.rotation.y = -Math.PI / 2
  if (!node.bottom) return controller.rotation.y = Math.PI
  if (!node.left) return controller.rotation.y = Math.PI / 2
}


loop(deltaTime => {
  stats.begin()
  controller.update(deltaTime)
  composer.render()
  hud.render()
  renderDebug(ctx, graph, controller, colliders)
  stats.end()
})

