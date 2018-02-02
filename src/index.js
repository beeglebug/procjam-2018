/* global performance, requestAnimationFrame */
import {
  PlaneGeometry,
  MeshBasicMaterial,
  VertexColors,
  BoxGeometry,
  MeshPhongMaterial,
  Mesh,
  WebGLRenderer,
  Raycaster,
  Color,
  Fog,
  HemisphereLight,
  Vector3,
  Scene,
  PerspectiveCamera
} from 'three'
import PointerLockControls from './PointerLockControls'
import setupPointerLock from './setupPointerLock'

var camera
var scene
var renderer
var controls
var objects = []
var raycaster
var moveForward = false
var moveBackward = false
var moveLeft = false
var moveRight = false
var canJump = false
var prevTime = performance.now()
var velocity = new Vector3()
var direction = new Vector3()

init()
animate()

function setupControls () {
  document.addEventListener('keydown', onKeyDown, false)
  document.addEventListener('keyup', onKeyUp, false)
}

const onKeyDown = function (event) {
  switch (event.keyCode) {
    case 38: // up
    case 87: // w
      moveForward = true
      break
    case 37: // left
    case 65: // a
      moveLeft = true; break
    case 40: // down
    case 83: // s
      moveBackward = true
      break
    case 39: // right
    case 68: // d
      moveRight = true
      break
    case 32: // space
      if (canJump === true) velocity.y += 350
      canJump = false
      break
  }
}

const onKeyUp = function (event) {
  switch (event.keyCode) {
    case 38: // up
    case 87: // w
      moveForward = false
      break
    case 37: // left
    case 65: // a
      moveLeft = false
      break
    case 40: // down
    case 83: // s
      moveBackward = false
      break
    case 39: // right
    case 68: // d
      moveRight = false
      break
  }
}

function addFloor (scene) {
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

  const floor = new Mesh(geometry, material)

  scene.add(floor)
}

function addBoxes (scene, objects) {
  const geometry = new BoxGeometry(20, 20, 20)
  for (let i = 0, l = geometry.faces.length; i < l; i++) {
    let face = geometry.faces[i]
    face.vertexColors[0] = new Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75)
    face.vertexColors[1] = new Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75)
    face.vertexColors[2] = new Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75)
  }
  for (let i = 0; i < 500; i++) {
    let boxMaterial = new MeshPhongMaterial({ specular: 0xffffff, flatShading: true, vertexColors: VertexColors })
    boxMaterial.color.setHSL(Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75)
    let box = new Mesh(geometry, boxMaterial)
    box.position.x = Math.floor(Math.random() * 20 - 10) * 20
    box.position.y = Math.floor(Math.random() * 20) * 20 + 10
    box.position.z = Math.floor(Math.random() * 20 - 10) * 20
    scene.add(box)
    objects.push(box)
  }
}

function init () {
  camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
  scene = new Scene()
  scene.background = new Color(0xffffff)
  scene.fog = new Fog(0xffffff, 0, 750)
  var light = new HemisphereLight(0xeeeeff, 0x777788, 0.75)
  light.position.set(0.5, 1, 0.75)
  scene.add(light)
  controls = new PointerLockControls(camera)
  setupPointerLock(controls)
  setupControls()
  scene.add(controls.getObject())
  raycaster = new Raycaster(new Vector3(), new Vector3(0, -1, 0), 0, 10)

  addFloor(scene)
  addBoxes(scene, objects)

  renderer = new WebGLRenderer()
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)
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
    const controlsObject = controls.getObject()
    raycaster.ray.origin.copy(controlsObject.position)
    raycaster.ray.origin.y -= 10
    var intersections = raycaster.intersectObjects(objects)
    var onObject = intersections.length > 0
    var time = performance.now()
    var delta = (time - prevTime) / 1000
    velocity.x -= velocity.x * 10.0 * delta
    velocity.z -= velocity.z * 10.0 * delta
    velocity.y -= 9.8 * 100.0 * delta // 100.0 = mass
    direction.z = Number(moveForward) - Number(moveBackward)
    direction.x = Number(moveLeft) - Number(moveRight)
    direction.normalize() // this ensures consistent movements in all directions
    if (moveForward || moveBackward) velocity.z -= direction.z * 400.0 * delta
    if (moveLeft || moveRight) velocity.x -= direction.x * 400.0 * delta
    if (onObject === true) {
      velocity.y = Math.max(0, velocity.y)
      canJump = true
    }
    controlsObject.translateX(velocity.x * delta)
    controlsObject.translateY(velocity.y * delta)
    controlsObject.translateZ(velocity.z * delta)
    if (controlsObject.position.y < 10) {
      velocity.y = 0
      controlsObject.position.y = 10
      canJump = true
    }
    prevTime = time
  }
  renderer.render(scene, camera)
}
