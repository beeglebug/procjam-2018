import Rect from './physics/geometry/Rect'
import { TILE_SIZE, WALL_THICKNESS } from './consts'
import { getNodeWorld, getSurrounding } from './generate/generate'
import Vector2 from './physics/geometry/Vector2'

class Physics {

  setGraph (graph) {

    for (let y = 0; y < graph.height; y++) {
      for (let x = 0; x < graph.width; x++) {
        const node = graph.nodes[y][x]
        node.colliders = generateColliders(node)
      }
    }

    this.graph = graph
  }

  _lastColliders = []

  getColliders (player) {

    const pos = graphSafe(player.position)

    const node = getNodeWorld(this.graph, pos.x, pos.y)

    // bail out!
    if (!node) return []

    const nodes = getSurrounding(this.graph, node.x, node.y)

    const colliders = [
      ...node.colliders,
      ...[].concat(...nodes.map(n => n.colliders))
    ]

    this._lastColliders = colliders

    return colliders
  }
}

const _v = new Vector2()

// convert controller position for use in graph (3d -> 2d, and offset)
function graphSafe (position) {
  return _v.set(
    position.x + TILE_SIZE / 2,
    position.z + TILE_SIZE / 2
  )
}

function generateColliders (node) {

  const colliders = []

  // world sizes
  const wx = (node.x * TILE_SIZE) - (TILE_SIZE / 2)
  const wy = (node.y * TILE_SIZE) - (TILE_SIZE / 2)

  if (node.top) {
    colliders.push(new Rect(
      wx,
      wy,
      TILE_SIZE,
      WALL_THICKNESS,
    ))
  }

  if (node.right) {
    colliders.push(new Rect(
      wx + TILE_SIZE - WALL_THICKNESS,
      wy,
      WALL_THICKNESS,
      TILE_SIZE,
    ))
  }

  if (node.bottom) {
    colliders.push(new Rect(
      wx,
      wy + TILE_SIZE - WALL_THICKNESS,
      TILE_SIZE,
      WALL_THICKNESS,
    ))
  }

  if (node.left) {
    colliders.push(new Rect(
      wx,
      wy,
      WALL_THICKNESS,
      TILE_SIZE,
    ))
  }

  return colliders
}



export default new Physics()
