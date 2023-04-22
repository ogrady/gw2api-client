import { AbstractEndpoint } from '../endpoint'

export class CurrenciesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/currencies'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
    this.cacheTime = 24 * 60 * 60
  }
}
