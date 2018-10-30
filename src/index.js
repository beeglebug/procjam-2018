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
import { HEIGHT, WIDTH } from './consts'
import EffectComposer from './three/EffectComposer'
import RenderPass from './three/RenderPass'
import Hud from './ui/Hud'
import generate from './generate/generate'
import createWorld from './createWorld'
import { render2d, reset2d, setup2d } from './2d/render2d'
import setInitialDirection from './setInitialDirection'
import handleReticleSelection from './handleReticleSelection'

Input.bind(document)

document.addEventListener('click', () => {
  if (!selected) return
  reset()
})

let graph
let world

function reset () {

  if (world) {
    scene.remove(world)
  }

  graph = generate(+new Date)
  world = createWorld(graph)

  scene.add(world)
  Physics.setGraph(graph)

  controller.position.set(0,0,0)

  setInitialDirection(graph, controller)

  reset2d(graph, controller)
}



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

const composer = new EffectComposer(renderer)
const renderPass = new RenderPass(scene, camera)
renderPass.renderToScreen = true
composer.addPass(renderPass)


// stats
const stats = new Stats()
stats.showPanel(0)
// document.body.appendChild(stats.dom)

let selected = null

reset()

loop(deltaTime => {
  // stats.begin()
  controller.update(deltaTime)
  selected = handleReticleSelection(camera, [world._exit])
  composer.render()
  hud.render()
  render2d(graph, controller, Physics._lastColliders)
  // stats.end()
})

