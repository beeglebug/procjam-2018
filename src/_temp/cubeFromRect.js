import { CubeGeometry, Mesh, MeshLambertMaterial } from 'three'

export default function (rect, height, color) {
  const geometry = new CubeGeometry(rect.width, rect.height, height)
  const material = new MeshLambertMaterial({ color })
  const mesh = new Mesh(geometry, material)
  // offset so origin is the same as the 2d rect
  mesh.geometry.translate(rect.width / 2, height / 2, rect.height / 2)
  mesh.position.x = rect.x
  mesh.position.z = rect.y
  return mesh
}
