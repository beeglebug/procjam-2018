import { CylinderGeometry, Mesh, MeshLambertMaterial } from 'three'

export default function (circle, height, color) {
  const geometry = new CylinderGeometry(circle.radius, circle.radius, height, 8, 2)
  const material = new MeshLambertMaterial({ color })
  const mesh = new Mesh(geometry, material)
  // tranlate mesh so that bottom is 0
  mesh.geometry.translate(0, height / 2, 0)
  mesh.position.x = circle.x
  mesh.position.z = circle.y
  return mesh
}
