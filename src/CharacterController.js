import { Vector3 } from 'three'
import MouseLook from './MouseLook'
import KeyCode from './KeyCode'
import Input from './Input'

export default class CharacterController {
  constructor (camera) {
    this.velocity = new Vector3()
    this.direction = new Vector3()
    this.mouseLook = new MouseLook(camera)
    this.enabled = false

    this.transform = this.mouseLook.yawObject

    this.transform.position.y = 10
  }

  update (delta) {
    if (!this.enabled) return
    this.mouseLook.update(delta)

    // TODO use Input.getAxis(Input.Horizontal)
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

    if (moveForward || moveBackward) this.velocity.z -= this.direction.z * 400.0 * delta
    if (moveLeft || moveRight) this.velocity.x -= this.direction.x * 400.0 * delta

    this.transform.translateX(this.velocity.x * delta)
    this.transform.translateZ(this.velocity.z * delta)
  }
}
