/* global performance, requestAnimationFrame */
import {
  PlaneGeometry,
  MeshBasicMaterial,
  VertexColors,
  BoxGeometry,
  MeshPhongMaterial,
  Mesh,
  WebGLRenderer,
  Color,
  Fog,
  HemisphereLight,
  Vector3,
  Scene,
  PerspectiveCamera
} from 'three'
import MouseLook from './MouseLook'
import setupPointerLock from './setupPointerLock'
import Keyboard from './input/Keyboard'
import { KEY_A, KEY_D, KEY_S, KEY_W } from './input/keyCodes'

var camera
var scene
var renderer
var controls
var keyboard
var prevTime = performance.now()
var velocity = new Vector3()
var direction = new Vector3()

function createFloor () {
  const geometry = new PlaneGeometry(2000, 2000, 100, 100)
  geometry.rotateX(-Math.PI / 2)

  for (let i = 0, l = geometry.vertices.length; i < l; i++) {
    let vertex = geometry.vertices[i]
    vertex.x += Math.random() * 20 - 10
    vertex.y += Math.random() * 2
    vertex.z += Math.random() * 20 - 10
  }

  for (let i = 0, l = geometry.faces.length; i < l; i++) {
    let face = geometry.faces[i]
    face.vertexColors[0] = new Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75)
    face.vertexColors[1] = new Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75)
    face.vertexColors[2] = new Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75)
  }

  const material = new MeshBasicMaterial({ vertexColors: VertexColors })
  return new Mesh(geometry, material)
}

function createScene () {
  const scene = new Scene()
  scene.background = new Color(0xffffff)
  scene.fog = new Fog(0xffffff, 0, 750)
  const light = new HemisphereLight(0xeeeeff, 0x777788, 0.75)
  light.position.set(0.5, 1, 0.75)
  scene.add(light)
  return scene
}

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
  controls = new MouseLook(camera)
  setupPointerLock(controls)
  keyboard = new Keyboard(document)
  scene.add(controls)
  const floor = createFloor()
  scene.add(floor)
  renderer = createRenderer(document.body)
  window.addEventListener('resize', onWindowResize, false)
}

function onWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate () {
  requestAnimationFrame(animate)
  if (controls.enabled === true) {
    const time = performance.now()
    const delta = (time - prevTime) / 1000

    const moveForward = keyboard.isDown(KEY_W)
    const moveBackward = keyboard.isDown(KEY_S)
    const moveLeft = keyboard.isDown(KEY_A)
    const moveRight = keyboard.isDown(KEY_D)

    velocity.x -= velocity.x * 10.0 * delta
    velocity.z -= velocity.z * 10.0 * delta
    direction.z = Number(moveForward) - Number(moveBackward)
    direction.x = Number(moveLeft) - Number(moveRight)
    direction.normalize() // this ensures consistent movements in all directions
    if (moveForward || moveBackward) {
      velocity.z -= direction.z * 400.0 * delta
    }
    if (moveLeft || moveRight) velocity.x -= direction.x * 400.0 * delta

    controls.translateX(velocity.x * delta)
    controls.translateZ(velocity.z * delta)
    prevTime = time
  }
  renderer.render(scene, camera)
}

init()
animate()
