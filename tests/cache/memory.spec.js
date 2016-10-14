/* eslint-env node, mocha */
import {expect} from 'chai'
import storage from '../../src/cache/memory'
const cache = storage()

function wait (ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

describe('cache > memory', function () {
  this.timeout(3000)

  beforeEach(() => {
    cache.flush()
  })

  it('can flush the cache', async () => {
    await cache.set('foo', 'bar', 60 * 60)
    let cachedFresh = await cache.get('foo')
    expect(cachedFresh).to.equal('bar')

    await cache.flush()

    let cachedFlushed = await cache.get('foo')
    expect(cachedFlushed).to.equal(false)
  })

  it('can set and get a single value', async () => {
    await cache.set('foo', 'bar', 1)
    let cachedFresh = await cache.get('foo')
    expect(cachedFresh).to.equal('bar')

    await wait(2000)

    let cachedExpired = await cache.get('foo')
    expect(cachedExpired).to.equal(false)
  })

  it('can set and get multiple value', async () => {
    await cache.mset([['foo', 'bar', 1], ['herp', 'derp', 1]])
    let cachedFresh = await cache.mget(['foo', 'herp'])
    expect(cachedFresh).to.deep.equal(['bar', 'derp'])

    await wait(2000)

    let cachedExpired = await cache.mget(['foo', 'herp'])
    expect(cachedExpired.filter(x => x)).to.deep.equal([])
  })
})
