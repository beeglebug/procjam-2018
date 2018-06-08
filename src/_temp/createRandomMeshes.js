import randomCube from './randomCube'

export default function (count) {
  const meshes = []
  for (let i = 0; i < count; i++) {
    meshes.push(randomCube())
  }
  return meshes
}
