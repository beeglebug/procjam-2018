import { FileLoader } from 'three'

const loader = new FileLoader()

export default id => {
  const url = `./data/${id}/data.json`
  return new Promise((resolve, reject) => {
    loader.load(url, resolve, undefined, reject)
  })
}
