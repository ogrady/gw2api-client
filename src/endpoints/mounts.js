const AbstractEndpoint = require('../endpoint')

module.exports = class MountsEndpoint extends AbstractEndpoint {
  types () {
    return new TypesEndpoint(this)
  }

  skins () {
    return new SkinsEndpoint(this)
  }
}

class TypesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/mounts/types'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
    this.cacheTime = 24 * 60 * 60
  }
}

class SkinsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/mounts/skins'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
    this.cacheTime = 24 * 60 * 60
  }
}
