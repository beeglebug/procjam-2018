import vertexShader from './vertex.glsl'
import fragmentShader from './fragment.glsl'

export default {
  uniforms: {
    tDiffuse: { value: null },
    opacity:  { value: 1.0 }
  },
  vertexShader,
  fragmentShader
}
