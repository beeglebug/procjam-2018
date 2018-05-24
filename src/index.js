import { PerspectiveCamera } from 'three'
import setupPointerLock from './setupPointerLock'
import setupWindowResize from './setupWindowResize'
import createScene from './createScene'
import createRenderer from './createRenderer'
import CharacterController from './CharacterController'
import Input from './Input'
import loop from './loop'
import loadData from './loadData'
import mountUI from './ui'

const id = 'd4d17cea-5fec-41dc-94d5-dc19e5d762c8'
loadData(id)
  .then(data => {
    console.log(data)
  })

Input.bind(document)

const scene = createScene()
const renderer = createRenderer(320, 200, document.getElementById('renderer'))
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
const controller = new CharacterController(camera)

scene.add(controller.transform)

setupWindowResize(camera, renderer)
setupPointerLock(controller)

mountUI()

loop(deltaTime => {
  controller.update(deltaTime)
  renderer.render(scene, camera)
})

