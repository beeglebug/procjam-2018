import Graph from './Graph'
import RandomNumberGenerator from '../RandomNumberGenerator'
import render from './render'

export default function () {

  const random = new RandomNumberGenerator(+new Date)

  const graph = new Graph(10, 10)

  const start = graph.get(0, 0)
  start.open = false

  const frontier = graph.getNeighbours(start)

  while (frontier.length > 0) {

    const index = random.randomIntBetween(0, frontier.length - 1)
    const nextNode = frontier.splice(index, 1)[0]

    // nearby nodes already in maze
    const closedNeighbours = graph.getNeighbours(nextNode).filter(node => node.open === false)

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
    const frontierNeighbours = graph.getNeighbours(nextNode).filter(node => node.open === true)
    frontierNeighbours.forEach(node => {
      if (frontier.includes(node)) return
      frontier.push(node)
    })
  }

  render(graph)
}
