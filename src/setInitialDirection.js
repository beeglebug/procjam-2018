import { getNodeWorld } from './generate/generate'

export default function setInitialDirection (graph, controller) {
  const node = getNodeWorld(graph, controller.position.x, controller.position.y)
  if (!node.top) return controller.rotation.y = 0
  if (!node.right) return controller.rotation.y = -Math.PI / 2
  if (!node.bottom) return controller.rotation.y = Math.PI
  if (!node.left) return controller.rotation.y = Math.PI / 2
}
