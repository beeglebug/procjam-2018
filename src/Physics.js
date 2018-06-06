class Physics {

  colliders = []

  setColliders (colliders) {
    this.colliders = colliders
  }

  // TODO actual broadphase
  broadphase () {
    return this.colliders
  }
}


export default new Physics()
