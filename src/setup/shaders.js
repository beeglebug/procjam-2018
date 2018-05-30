import vertexShader from '../shaders/default.vert'
import fragmentShader from '../shaders/default.vert'

const testShader = {
  uniforms: {},
  vertexShader,
  fragmentShader
}

export default function () {

  const composer = new THREE.EffectComposer(renderer)
  const renderPass = new THREE.RenderPass(scene, camera)

  const shaderPass = new THREE.ShaderPass(testShader)
  testShader.renderToScreen = true

  composer.addPass(renderPass)
  composer.addPass(shaderPass)
}
