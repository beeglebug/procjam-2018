import { cameraPicker } from './_temp/raycast'

let _currentSelection
let _currentSelectionColor

export default function (camera, meshes) {

  const intersects = cameraPicker(camera, meshes)

  if (intersects.length) {
    const newSelection = intersects[0].object
    if (newSelection !== _currentSelection) {
      if (_currentSelection) {
        _currentSelection.material.color.set(_currentSelectionColor)
      }
      _currentSelection = newSelection
      _currentSelectionColor = _currentSelection.material.color.getHex()
      _currentSelection.material.color.set(0xffffff)
    }
  } else {
    if (_currentSelection) {
      _currentSelection.material.color.set(_currentSelectionColor)
      _currentSelection = null
    }
  }

}
