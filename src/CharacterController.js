import { Object3D, Vector3 } from 'three'
import KeyCode from './KeyCode'
import Input from './Input'
import clamp from './clamp'
import { PI_2 } from './consts'

export default class CharacterController extends Object3D {

  enabled = false
  eyeHeight = 18
  velocity = new Vector3()
  direction = new Vector3()

  collider = null
  mouseSensitivity = 0.6
  speed = 500

  constructor (camera) {
    super()

    this.pitch = new Object3D()
    this.pitch.position.y = this.eyeHeight

    this.add(this.pitch)
    this.pitch.add(camera)
  }

  handleMouseInput (delta) {
    // apply mouse movement
    this.rotation.y -= Input.getAxis(Input.MouseX) * delta * this.mouseSensitivity
    this.pitch.rotation.x -= Input.getAxis(Input.MouseY) * delta * this.mouseSensitivity

    // clamp between straight down and straight up
    this.pitch.rotation.x = clamp(this.pitch.rotation.x, -PI_2, PI_2)
  }

  handleKeyboardInput (delta) {

    const moveForward = Input.getKey(KeyCode.W)
    const moveBackward = Input.getKey(KeyCode.S)
    const moveLeft = Input.getKey(KeyCode.A)
    const moveRight = Input.getKey(KeyCode.D)

    // apply damping
    this.velocity.x -= this.velocity.x * 10.0 * delta
    this.velocity.z -= this.velocity.z * 10.0 * delta

    this.direction.z = moveForward - moveBackward
    this.direction.x = moveLeft - moveRight
    this.direction.normalize()

    if (moveForward || moveBackward) this.velocity.z -= this.direction.z * this.speed * delta
    if (moveLeft || moveRight) this.velocity.x -= this.direction.x * this.speed * delta
  }

  update (delta) {
    if (!this.enabled) return

    this.handleMouseInput(delta)
    this.handleKeyboardInput(delta)

    this.translateX(this.velocity.x * delta)
    this.translateZ(this.velocity.z * delta)
  }
}
