import { Raycaster, Vector2 } from 'three'

const raycaster = new Raycaster()

const center = new Vector2()

export const cameraPicker = (camera, objects) => {

  raycaster.setFromCamera(center, camera)

  return raycaster.intersectObjects(objects, true)
}
