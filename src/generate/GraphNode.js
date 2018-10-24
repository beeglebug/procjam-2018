export default class GraphNode {

  // walls all initially solid
  top = true
  left = true
  bottom = true
  right = true

  // open if not in maze yet
  open = true

  constructor (x, y) {
    this.x = x
    this.y = y
  }
}
