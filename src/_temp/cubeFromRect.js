import { CubeGeometry, Mesh, MeshLambertMaterial } from 'three'

export default function (rect, height, color) {
  const geometry = new CubeGeometry(rect.width, rect.height, height)
  const material = new MeshLambertMaterial({ color })
  const mesh = new Mesh(geometry, material)
  mesh.geometry.translate(0, height/2, 0)
  mesh.position.x = rect.x
  mesh.position.z = rect.y
  return mesh
}
