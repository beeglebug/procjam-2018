import { BoxGeometry, Color, Mesh, MeshLambertMaterial, Object3D, PlaneGeometry } from 'three'
import { TILE_SIZE, WALL_HEIGHT, WALL_THICKNESS } from './consts'

export default function createWorld (graph) {

  const world = new Object3D()

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

      // corners
      if (!node.right && !node.bottom) {
        const corner = createCorner()
        corner.position.x = HALF_SIZE - HALF_THICKNESS
        corner.position.z = HALF_SIZE - HALF_THICKNESS
        tile.add(corner)
      }

      if (!node.left && !node.bottom) {
        const corner = createCorner()
        corner.position.x = -HALF_SIZE + HALF_THICKNESS
        corner.position.z = HALF_SIZE - HALF_THICKNESS
        tile.add(corner)
      }

      if (!node.right && !node.top) {
        const corner = createCorner()
        corner.position.x = HALF_SIZE - HALF_THICKNESS
        corner.position.z = -HALF_SIZE + HALF_THICKNESS
        tile.add(corner)
      }

      if (!node.left && !node.top) {
        const corner = createCorner()
        corner.position.x = -HALF_SIZE + HALF_THICKNESS
        corner.position.z = -HALF_SIZE + HALF_THICKNESS
        tile.add(corner)
      }

      if (node.entrance) {
        const door = createDoor()
        door.position.y = WALL_HEIGHT
        tile.add(door)
      }

      if (node.exit) {
        const door = createDoor()
        world._exit = door
        tile.add(door)
      }

      world.add(tile)
    }

  }

  return world
}

const wallMaterial = new MeshLambertMaterial({ color: new Color('#597491') })
const doorMaterial = new MeshLambertMaterial({ color: new Color('#916d59') })

function createWall () {
  const geometry = new BoxGeometry(TILE_SIZE, WALL_HEIGHT, WALL_THICKNESS)
  const mesh = new Mesh(geometry, wallMaterial)
  mesh.position.y = WALL_HEIGHT / 2
  return mesh
}

function createCorner () {
  const geometry = new BoxGeometry(WALL_THICKNESS, WALL_HEIGHT, WALL_THICKNESS)
  const mesh = new Mesh(geometry, wallMaterial)
  mesh.position.y = WALL_HEIGHT / 2
  return mesh
}

function createDoor () {
  const geometry = new BoxGeometry(16, 1, 16)
  const mesh = new Mesh(geometry, doorMaterial)
  return mesh
}

function createFloor () {
  const geometry = new PlaneGeometry(TILE_SIZE, TILE_SIZE)
  geometry.rotateX(-Math.PI / 2)
  const mesh = new Mesh(geometry, wallMaterial)
  return mesh
}

function createCeiling () {
  const geometry = new PlaneGeometry(TILE_SIZE, TILE_SIZE)
  geometry.rotateX(Math.PI / 2)
  const mesh = new Mesh(geometry, wallMaterial)
  mesh.position.y = WALL_HEIGHT
  return mesh
}
