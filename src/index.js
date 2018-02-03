/* global performance, requestAnimationFrame */
import { PerspectiveCamera, Vector3, WebGLRenderer } from 'three'
import MouseLook from './MouseLook'
import setupPointerLock from './setupPointerLock'
import Keyboard from './input/Keyboard'
import { KEY_A, KEY_D, KEY_S, KEY_W } from './input/keyCodes'
import createScene from "./createScene"

var camera
var scene
var renderer
var controls
var keyboard
var prevTime = performance.now()
var velocity = new Vector3()
var direction = new Vector3()

function createRenderer (element) {
  const renderer = new WebGLRenderer()
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  element.appendChild(renderer.domElement)
  return renderer
}

function init () {
  scene = createScene()
  camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
  renderer = createRenderer(document.body)
  window.addEventListener('resize', onWindowResize, false)
  // TODO CharacterController
  controls = new MouseLook(camera)
  keyboard = new Keyboard(document)
  setupPointerLock(controls)
  scene.add(controls)
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

  if (controls.enabled === true) {
    const moveForward = keyboard.isDown(KEY_W)
    const moveBackward = keyboard.isDown(KEY_S)
    const moveLeft = keyboard.isDown(KEY_A)
    const moveRight = keyboard.isDown(KEY_D)

    // apply damping
    velocity.x -= velocity.x * 10.0 * delta
    velocity.z -= velocity.z * 10.0 * delta

    direction.z = moveForward - moveBackward
    direction.x = moveLeft - moveRight
    direction.normalize()

    if (moveForward || moveBackward) velocity.z -= direction.z * 400.0 * delta
    if (moveLeft || moveRight) velocity.x -= direction.x * 400.0 * delta

    controls.translateX(velocity.x * delta)
    controls.translateZ(velocity.z * delta)
  }

  prevTime = time
  renderer.render(scene, camera)
}

init()
loop()
