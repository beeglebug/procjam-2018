import { BoxGeometry, Mesh, MeshLambertMaterial, Object3D, PlaneGeometry } from 'three'

const TILE_SIZE = 32
const WALL_THICKNESS = 2
const WALL_HEIGHT = 32

export default function createWorld (graph) {

  const world = new Object3D()

  console.log(graph)

  const HALF_SIZE = TILE_SIZE / 2
  const HALF_THICKNESS = WALL_THICKNESS / 2
  const HALF_PI = Math.PI / 2

  for (let y = 0; y < graph.height; y++) {

    for (let x = 0; x < graph.width; x++) {

      const node = graph.nodes[y][x]

      const tile = new Object3D()

      tile.position.set(x * TILE_SIZE, 0, y * TILE_SIZE)

      tile.add(createFloor())
      tile.add(createCeiling())

      if (node.top) {
        const wall = createWall()
        wall.position.z = -HALF_SIZE + HALF_THICKNESS
        tile.add(wall)
      }

      if (node.bottom) {
        const wall = createWall()
        wall.position.z = HALF_SIZE - HALF_THICKNESS
        tile.add(wall)
      }

      if (node.left) {
        const wall = createWall()
        wall.rotation.y = HALF_PI
        wall.position.x = -HALF_SIZE + HALF_THICKNESS
        tile.add(wall)
      }

      if (node.right) {
        const wall = createWall()
        wall.rotation.y = HALF_PI
        wall.position.x = HALF_SIZE - HALF_THICKNESS
        tile.add(wall)
      }

      world.add(tile)
    }

  }

  return world
}

const material = new MeshLambertMaterial({ color: 0x597491 })

function createWall () {
  const geometry = new BoxGeometry(TILE_SIZE, WALL_HEIGHT, WALL_THICKNESS)
  const mesh = new Mesh(geometry, material)
  mesh.position.y = WALL_HEIGHT / 2
  return mesh
}

function createFloor () {
  const geometry = new PlaneGeometry(TILE_SIZE, TILE_SIZE)
  geometry.rotateX(-Math.PI / 2)
  const mesh = new Mesh(geometry, material)
  return mesh
}

function createCeiling () {
  const geometry = new PlaneGeometry(TILE_SIZE, TILE_SIZE)
  geometry.rotateX(Math.PI / 2)
  const mesh = new Mesh(geometry, material)
  mesh.position.y = WALL_HEIGHT
  return mesh
}
