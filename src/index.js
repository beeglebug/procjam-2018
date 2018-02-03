/* global performance, requestAnimationFrame */
import { PerspectiveCamera } from 'three'
import setupPointerLock from './setupPointerLock'
import createScene from "./createScene"
import CharacterController from './CharacterController'
import createRenderer from "./createRenderer"
import Input from "./Input"

var camera
var scene
var renderer
var controller
var prevTime = performance.now()

function init () {
  scene = createScene()
  camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
  Input.bind(document)

  renderer = createRenderer()
  document.body.appendChild(renderer.domElement)
  window.addEventListener('resize', onWindowResize, false)

  controller = new CharacterController(camera)

  setupPointerLock(controller)
  scene.add(controller.mouseLook.yawObject)
  loop()
}

function onWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function loop () {
  requestAnimationFrame(loop)
  const time = performance.now()
  const delta = (time - prevTime) / 1000
  controller.update(delta)
  prevTime = time
  renderer.render(scene, camera)
}

init()
