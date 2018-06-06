import { Color, CubeGeometry, Mesh, MeshLambertMaterial } from 'three'
import Rect from '../physics/geometry/Rect'
import { randomIntBetween } from '../rng'

export default function () {

  const color = new Color(Math.random(), Math.random(), Math.random())
  const x = randomIntBetween(-120, 120)
  const y = randomIntBetween(-120, 120)
  const width = randomIntBetween(10, 20)
  const depth = randomIntBetween(10, 20)
  const height = randomIntBetween(20, 60)

  const collider = new Rect(x, y, width, depth)
  const geometry = new CubeGeometry(width, height, depth)

  const material = new MeshLambertMaterial({ color })
  const mesh = new Mesh(geometry, material)

  // offset so origin is the same as the 2d rect
  mesh.geometry.translate(width / 2, height / 2, depth / 2)
  mesh.position.x = x
  mesh.position.z = y

  mesh.collider = collider

  return mesh
}
