import MersenneTwister from 'mersenne-twister'

export default class RandomNumberGenerator {

  constructor (seed = 0) {
    this.generator = new MersenneTwister(seed)
  }

  randomIntBetween (min, max) {
    return Math.floor(this.generator.random() * (max - min + 1) + min)
  }

  randomItemFromArray (arr) {
    return arr[this.randomIntBetween(0, arr.length - 1)]
  }
}
