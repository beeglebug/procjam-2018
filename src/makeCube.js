import { CubeGeometry, Mesh, MeshLambertMaterial } from 'three'

export default function (x, z, size, color) {
  const cubeGeometry = new CubeGeometry(size, size, size)
  const cubeMaterial = new MeshLambertMaterial({ color })
  const cube = new Mesh(cubeGeometry, cubeMaterial)
  cube.position.x = x
  cube.position.z = z
  return cube
}
