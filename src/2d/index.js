import { autoDetectRenderer, Container, Graphics } from 'pixi.js'

const width = 300
const height = 300

export default function () {

  const renderer = autoDetectRenderer(width, height)

  const domElement = document.getElementById('renderer2d')

  domElement.appendChild(renderer.view)

  const stage = new Container()
  const world = new Container()

  let character

  const create2dGraphics = (circle, meshes) => {
    character = makeCharacter(circle)
    const cubes = meshes.map(makeCubeFromMesh)
    world.addChild(character)
    world.addChild(...cubes)
  }

  world.x = 150
  world.y = 150

  stage.addChild(world)

  const update2dGraphics = (controller) => {

    character.x = controller.position.x
    character.y = controller.position.z

    character.rotation = -controller.rotation.y
  }

  const render2d = () => renderer.render(stage)

  return { render2d, update2dGraphics, create2dGraphics }
}

// TODO properly draw based on CharacterController when controller has collider
function makeCharacter (circle) {

  const gfx = new Graphics()

  gfx.lineStyle(1, 0xffffff)
  gfx.drawCircle(circle.x, circle.y, circle.radius)

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
