import { Object3D } from 'three'
import Input from './Input'

const PI_2 = Math.PI / 2

export default class MouseLook {
  constructor (camera) {
    this.sensitivity = 0.002
    this.camera = camera
    this.yawObject = new Object3D()
    this.pitchObject = new Object3D()
    this.camera.rotation.set(0, 0, 0)
    this.pitchObject.add(this.camera)
    this.yawObject.add(this.pitchObject)
  }

  update () {
    const mouseX = Input.getAxis(Input.MouseX)
    const mouseY = Input.getAxis(Input.MouseY)
    this.yawObject.rotation.y -= mouseX * this.sensitivity
    this.pitchObject.rotation.x -= mouseY * this.sensitivity
    this.pitchObject.rotation.x = Math.max(-PI_2, Math.min(PI_2, this.pitchObject.rotation.x))
  }
}
