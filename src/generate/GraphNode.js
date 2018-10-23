export default class GraphNode {

  // walls all initially solid
  top = true
  left = true
  bottom = true
  right = true

  // a node is open if it is available to be added to the maze
  open = true

  constructor (x, y) {
    this.x = x
    this.y = y
  }
}
