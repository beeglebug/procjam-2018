import {
  AxesHelper,
  Color,
  Fog,
  HemisphereLight,
  Mesh,
  MeshLambertMaterial,
  PlaneGeometry,
  Scene,
  // ImageUtils,
  // NearestFilter,
  // LinearMipMapLinearFilter
} from 'three'

function createFloor () {

  const geometry = new PlaneGeometry(2000, 2000, 100, 100)
  geometry.rotateX(-Math.PI / 2)

  const material = new MeshLambertMaterial({ color: '#DDDDDD' })

  return new Mesh(geometry, material)
}

export default function createScene () {
  const scene = new Scene()
  scene.background = new Color(0xffffff)
  // scene.fog = new Fog(0xffffff, 0, 750)

  const light = new HemisphereLight(0xeeeeff, 0x777788, 0.75)
  light.position.set(0.5, 1, 0.75)
  scene.add(light)

  // const floor = createFloor()
  // scene.add(floor)

  // const wall = createWall()
  // scene.add(wall)

  const axesHelper = new AxesHelper(5)
  axesHelper.position.y = 0.1
  // axesHelper.position.z = -10
  scene.add(axesHelper)

  return scene
}

// function createWall () {
//   const map = ImageUtils.loadTexture('./data/d4d17cea-5fec-41dc-94d5-dc19e5d762c8/test.png')
//   const material = new MeshLambertMaterial({map})
//   const geometry = new PlaneGeometry(10, 10)
//
//   map.magFilter = NearestFilter
//   map.minFilter = LinearMipMapLinearFilter
//
//   const mesh = new Mesh(geometry, material)
//   mesh.position.y = 0
//   mesh.position.z = 0
//   return mesh
// }
