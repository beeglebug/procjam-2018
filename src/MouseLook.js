import { Object3D, Vector3, Euler } from 'three'
import Input from './Input'

const PI_2 = Math.PI / 2

export default class MouseLook {
  constructor (camera) {
    this.sensitivity = 0.002
    this.camera = camera
    this.enabled = false

    this.yawObject = new Object3D()
    this.pitchObject = new Object3D()

    this._direction = new Vector3(0, 0, -1)
    this._rotation = new Euler(0, 0, 0, 'YXZ')

    this.camera.rotation.set(0, 0, 0)

    this.pitchObject.add(this.camera)

    this.yawObject.add(this.pitchObject)
  }

  update = () => {
    const mouseX = Input.getAxis(Input.MouseX)
    const mouseY = Input.getAxis(Input.MouseY)
//console.log(mouseX, mouseY)
    this.yawObject.rotation.y -= mouseX * this.sensitivity
    this.pitchObject.rotation.x -= mouseY * this.sensitivity
    this.pitchObject.rotation.x = Math.max(-PI_2, Math.min(PI_2, this.pitchObject.rotation.x))
  }

  getDirection (v) {
    this._rotation.set(this.pitchObject.rotation.x, this.yawObject.rotation.y, 0)
    return v.copy(this._direction).applyEuler(this._rotation)
  }
}
