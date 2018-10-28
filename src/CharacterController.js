import { Object3D, Vector3 } from 'three'
import KeyCode from './KeyCode'
import Input from './Input'
import clamp from './clamp'
import Circle from './physics/geometry/Circle'
import separate from './physics/separate'
import Vector2 from './physics/geometry/Vector2'
import Physics from './Physics'

const halfPi = Math.PI / 2

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

    this.collider = new Circle(0, 0, 5)
  }

  handleMouseInput (delta) {
    // apply mouse movement
    this.rotation.y -= Input.getAxis(Input.MouseX) * delta * this.mouseSensitivity
    this.pitch.rotation.x -= Input.getAxis(Input.MouseY) * delta * this.mouseSensitivity

    // clamp between straight down and straight up
    this.pitch.rotation.x = clamp(this.pitch.rotation.x, -halfPi, halfPi)
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

  handlePhysics () {
    // copy position to the collider
    this.collider.x = this.position.x
    this.collider.y = this.position.z

    // stop the player going into the cubes
    const colliders = Physics.getColliders(this)

    separate(this.collider, colliders)

    // update the player controller based on the collider
    this.position.set(this.collider.x, 0, this.collider.y)
  }

  update (delta) {
    if (!this.enabled) return

    this.handleMouseInput(delta)
    this.handleKeyboardInput(delta)

    this.translateX(this.velocity.x * delta)
    this.translateZ(this.velocity.z * delta)

    this.handlePhysics()
  }
}
