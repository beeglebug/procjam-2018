import { ObjectLoader } from 'three'

const loader = new ObjectLoader()

export default id => {
  const url = `./data/${id}/data.json`
  return new Promise((resolve, reject) => {
    loader.load(url, resolve, undefined, reject)
  })
}
