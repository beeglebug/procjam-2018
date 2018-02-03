import { Color, Fog, HemisphereLight, Mesh, MeshBasicMaterial, PlaneGeometry, Scene, VertexColors } from 'three'

function createFloor () {
  const geometry = new PlaneGeometry(2000, 2000, 100, 100)
  geometry.rotateX(-Math.PI / 2)

  for (let i = 0, l = geometry.vertices.length; i < l; i++) {
    let vertex = geometry.vertices[i]
    vertex.x += Math.random() * 20 - 10
    vertex.y += Math.random() * 2
    vertex.z += Math.random() * 20 - 10
  }

  for (let i = 0, l = geometry.faces.length; i < l; i++) {
    let face = geometry.faces[i]
    face.vertexColors[0] = new Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75)
    face.vertexColors[1] = new Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75)
    face.vertexColors[2] = new Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75)
  }

  const material = new MeshBasicMaterial({ vertexColors: VertexColors })

  return new Mesh(geometry, material)
}

export default function createScene () {
  const scene = new Scene()
  scene.background = new Color(0xffffff)
  scene.fog = new Fog(0xffffff, 0, 750)

  const light = new HemisphereLight(0xeeeeff, 0x777788, 0.75)
  light.position.set(0.5, 1, 0.75)
  scene.add(light)

  const floor = createFloor()
  scene.add(floor)

  return scene
}
