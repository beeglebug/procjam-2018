import MersenneTwister from 'mersenne-twister'

const generator = new MersenneTwister()

export const randomIntBetween = (min, max) => Math.floor(generator.random() * (max - min + 1) + min)
