import { Raycaster } from 'three'
import Input from '../Input'

const raycaster = new Raycaster()

export const checkIntersection = (camera, objects, outlinePass) => {

  raycaster.setFromCamera(Input.mousePosition, camera)

  const intersects = raycaster.intersectObjects(objects, true)

  if (intersects.length > 0) {
    const selected = intersects[0].object
    outlinePass.selectedObjects = selected
  }
}
