import Vector2 from './Vector2'

export default class CollisionResponse {

  position = new Vector2()
  mtd = new Vector2()
  normal = new Vector2()
  collider = null
  time = null

  reset () {
    this.position.zero()
    this.mtd.zero()
    this.normal.zero()
    this.collider = null
    this.time = null
  }
}
