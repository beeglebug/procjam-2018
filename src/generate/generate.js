import RandomNumberGenerator from '../RandomNumberGenerator'
import { TILE_SIZE } from '../consts'

export default function generate (seed) {

  const random = new RandomNumberGenerator(seed)

  const graph = createGraph(10, 10)

  const start = getNode(graph, 0, 0)
  start.open = false
  start.entrance = true

  const frontier = getNeighbours(graph, start.x, start.y)

  while (frontier.length > 0) {

    const index = random.randomIntBetween(0, frontier.length - 1)
    const nextNode = frontier.splice(index, 1)[0]

    // nearby nodes already in maze
    const closedNeighbours = getNeighbours(graph, nextNode.x, nextNode.y).filter(node => node.open === false)

    const alreadyIn = random.randomItemFromArray(closedNeighbours)

    // join them on the shared edge
    if (nextNode.x === alreadyIn.x) {
      if (nextNode.y > alreadyIn.y) {
        // below
        nextNode.top = false
        alreadyIn.bottom = false
      } else {
        // above
        nextNode.bottom = false
        alreadyIn.top = false
      }
    } else {
      if (nextNode.x > alreadyIn.x) {
        // right
        nextNode.left = false
        alreadyIn.right = false
      } else {
        // left
        nextNode.right = false
        alreadyIn.left = false
      }
    }

    nextNode.open = false
    nextNode.weight = alreadyIn.weight + 1
    const frontierNeighbours = getNeighbours(graph, nextNode.x, nextNode.y).filter(node => node.open === true)
    frontierNeighbours.forEach(node => {
      if (frontier.includes(node)) return
      frontier.push(node)
    })
  }

  setExit(graph, random)

  return graph
}

function setExit (graph, random) {

  const all = [].concat(...graph.nodes)
  all.sort(byWeight)
  const possible = all.slice(-5)
  const exitNode = random.randomItemFromArray(possible)
  exitNode.exit = true
}

const byWeight = (a,b) => a.weight - b.weight

function createGraph (width, height) {

  const nodes = []

  for (let y = 0; y < height; y++) {
    nodes[y] = []
    for (let x = 0; x < width; x++) {
      nodes[y][x] = {
        x: x,
        y: y,
        top: true, // walls all initially solid
        left: true,
        bottom: true,
        right: true,
        open: true, // open if not in maze yet
        weight: 0, // distance from start
        exit: false,
      }
    }
  }

  return {
    width,
    height,
    nodes
  }
}

export function getNode (graph, x, y) {
  if ((x < 0) || (x >= graph.width) || (y < 0) || (y >= graph.height)) return null
  return graph.nodes[y][x]
}

export function getNeighbours (graph, x, y) {
  const left = getNode(graph, x - 1, y)
  const right = getNode(graph, x + 1, y)
  const above = getNode(graph, x, y - 1)
  const below = getNode(graph, x, y + 1)
  return [left, right, above, below].filter(a => a)
}

export function getSurrounding (graph, x, y) {
  return [
    getNode(graph, x - 1, y - 1),
    getNode(graph, x, y - 1),
    getNode(graph, x + 1, y - 1),
    getNode(graph, x - 1, y),
    //getNode(graph, x, y),
    getNode(graph, x + 1, y),
    getNode(graph, x - 1, y + 1),
    getNode(graph, x, y + 1),
    getNode(graph, x + 1, y + 1),
  ].filter(a => a)
}

export function getNodeWorld (graph, x, y) {
  const gx = Math.floor(x / TILE_SIZE)
  const gy = Math.floor(y / TILE_SIZE)
  return getNode(graph, gx, gy)
}
