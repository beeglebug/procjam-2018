import { getNodeWorld } from './generate/generate'

export default function getInitialDirection (graph, controller) {
  const node = getNodeWorld(graph, controller.position.x, controller.position.y)
  if (!node.top) return 0
  if (!node.right) return -Math.PI / 2
  if (!node.bottom) return Math.PI
  if (!node.left) return Math.PI / 2
}
