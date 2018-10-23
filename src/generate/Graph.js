import GraphNode from './GraphNode'

export default class Graph {

  constructor (width, height) {
    this.width = width
    this.height = height
    this.nodes = []

    for (let y = 0; y < height; y++) {
      this.nodes[y] = []
      for (let x = 0; x < width; x++) {
        this.nodes[y][x] = new GraphNode(x, y, width, height)
      }
    }
  }

  get (x, y) {
    if ((x < 0) || (x >= this.width) || (y < 0) || (y >= this.height)) return null
    return this.nodes[y][x]
  }

  getOpenNeighbours (node) {
    const left = this.get(node.x - 1, node.y)
    const right = this.get(node.x + 1, node.y)
    const above = this.get(node.x, node.y - 1)
    const below = this.get(node.x, node.y + 1)
    return [left, right, above, below].filter(a => a && a.open)
  }

}
