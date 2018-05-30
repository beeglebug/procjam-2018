import { CubeGeometry, Mesh, MeshLambertMaterial, Matrix4 } from 'three'

export default function (x, z, size, color) {
  const geometry = new CubeGeometry(size, size, size)
  const material = new MeshLambertMaterial({ color })
  const mesh = new Mesh(geometry, material)
  const matrix = new Matrix4().makeTranslation( 0, size/2, 0 )
  mesh.geometry.applyMatrix(matrix)
  mesh.position.x = x
  mesh.position.z = z
  return mesh
}
