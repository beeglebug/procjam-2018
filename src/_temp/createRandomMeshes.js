import randomCylinder from './randomCylinder'
import randomCube from './randomCube'

export default function (count) {
  const meshes = []
  for (let i = 0; i < count / 2; i++) {
    meshes.push(randomCube())
    meshes.push(randomCylinder())
  }
  return meshes
}
