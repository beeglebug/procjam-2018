import Stats from 'stats.js'
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
import EffectComposer from './three/EffectComposer'
import RenderPass from './three/RenderPass'
import Hud from './ui/Hud'
import generate from './generate/generate'
import createWorld from './createWorld'
import renderDebug from './renderDebug'

Input.bind(document)

const scene = createScene()
const renderer = createRenderer()
const camera = new PerspectiveCamera(45, WIDTH / HEIGHT, 1, 1000)

const controller = new CharacterController(camera)

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

window.scene = scene

const stats = new Stats()
stats.showPanel(0)
document.body.appendChild(stats.dom)

const canvas = document.createElement('canvas')
const domElement = document.querySelector('#maze')
domElement.appendChild(canvas)
canvas.width = 400
canvas.height = 400
const ctx = canvas.getContext('2d')

console.log(controller)

loop(deltaTime => {
  stats.begin()
  controller.update(deltaTime)
  composer.render()
  hud.render()
  renderDebug(ctx, graph, controller, colliders)
  stats.end()
})

