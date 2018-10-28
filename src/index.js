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
import render2d from './render2d'
import setInitialDirection from './setInitialDirection'
import createCanvas from './createCanvas'

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


const composer = new EffectComposer(renderer)
const renderPass = new RenderPass(scene, camera)
renderPass.renderToScreen = true
composer.addPass(renderPass)

const graph = generate(+new Date)
const world = createWorld(graph)

scene.add(world)

Physics.setGraph(graph)

console.log(graph, Physics)

window.scene = scene
window.player = controller

// stats
const stats = new Stats()
stats.showPanel(0)
document.body.appendChild(stats.dom)

// map
const canvas = createCanvas(640, 400)
document.querySelector('#maze').appendChild(canvas)
const ctx = canvas.getContext('2d')

setInitialDirection(graph, controller)

loop(deltaTime => {
  stats.begin()
  controller.update(deltaTime)
  composer.render()
  hud.render()
  render2d(ctx, graph, controller, Physics._lastColliders)
  stats.end()
})

