import { AbstractEndpoint } from '../endpoint'
import { Schema } from './schemas/schema'

type EventID = string

export class EventsEndpoint<S extends Schema> extends AbstractEndpoint<S["Events"]> {
  constructor (client) {
    super(client)
    this.url = '/v1/event_details.json'
    this.cacheTime = 24 * 60 * 60
  }

  // @ts-expect-error no idea man
  all () {
    return (super.get().then(transformV1Format) as Promise<S["Events"][]>)
  }

  // @ts-expect-error same
  get (id: number) {
    return super.get(`?event_id=${id}`, true).then(json => transformV1Format(json)[0])
  }
}

function transformV1Format (json: {events?: any[]}): {}[] {
  let events = json.events
  let transformed = []
  const keys = Object.keys(events)

  for (let i = 0; i !== keys.length; i++) {
    transformed.push(Object.assign({ id: keys[i] }, events[keys[i]]))
  }

  return transformed
}
