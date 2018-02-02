import { Object3D, Vector3, Euler } from 'three'

const PI_2 = Math.PI / 2

class MouseLook extends Object3D {
  constructor (camera, target = document) {
    super()
    this.camera = camera
    this.target = target
    this.enabled = false
    this.pitchObject = new Object3D()

    this._direction = new Vector3(0, 0, -1)
    this._rotation = new Euler(0, 0, 0, 'YXZ')

    this.camera.rotation.set(0, 0, 0)

    this.pitchObject.add(this.camera)

    this.position.y = 10
    this.add(this.pitchObject)

    this.target.addEventListener('mousemove', this.handleMouseMove, false)
  }

  handleMouseMove = event => {
    if (this.enabled === false) return

    const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0
    const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0

    this.rotation.y -= movementX * 0.002
    this.pitchObject.rotation.x -= movementY * 0.002
    this.pitchObject.rotation.x = Math.max(-PI_2, Math.min(PI_2, this.pitchObject.rotation.x))
  }

  dispose () {
    this.target.removeEventListener('mousemove', this.handleMouseMove, false)
  }

  getDirection (v) {
    this._rotation.set(this.pitchObject.rotation.x, this.rotation.y, 0)
    return v.copy(this._direction).applyEuler(this._rotation)
  }
}

export default MouseLook
