import { autoDetectRenderer, Container, Graphics } from 'pixi.js'

const width = 300
const height = 300

export default function () {

  const renderer = autoDetectRenderer(width, height)

  const domElement = document.getElementById('renderer2d')

  domElement.appendChild(renderer.view)

  const stage = new Container()
  const world = new Container()

  const character = makeCharacter()

  const createCubes = meshes => {
    const cubes = meshes.map(makeCubeFromMesh)
    world.addChild(...cubes)
  }

  world.addChild(character)

  world.x = 150
  world.y = 150

  stage.addChild(world)

  const update = (controller) => {

    character.x = controller.transform.position.x
    character.y = controller.transform.position.z

    character.rotation = -controller.transform.rotation.y
  }

  return { renderer, stage, update, createCubes }
}


function makeCharacter () {

  const gfx = new Graphics()

  gfx.lineStyle(1, 0xffffff)
  gfx.drawCircle(0, 0, 10)

  gfx.lineStyle(1, 0x00FF00)
  gfx.moveTo(0, 0)
  gfx.lineTo(0, -15)

  return gfx
}

function makeCubeFromMesh (mesh) {
  const { position, material, geometry } = mesh

  const gfx = new Graphics()

  gfx.lineStyle(1, material.color.getHex())

  // todo check width and depth are right axis
  gfx.drawRect(position.x, position.z, geometry.parameters.width, geometry.parameters.depth)

  return gfx
}
