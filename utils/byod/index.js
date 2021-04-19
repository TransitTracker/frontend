import db from './database'

export const definitions = {
  Routes: {
    store: 'routes',
    key: 'route_id',
    file: 'routes.txt',
    type: 'static',
  },
  Services: {
    store: 'services',
    key: 'service_id',
    file: 'calendar.txt',
    type: 'static',
  },
  Stops: {
    store: 'stops',
    key: 'stop_id',
    file: 'stops.txt',
    type: 'static',
  },
  Shapes: {
    store: 'shapes',
    key: 'shape_id',
    file: 'shapes.txt',
    type: 'static',
  },
  Trips: {
    store: 'trips',
    key: 'trip_id',
    file: 'trips.txt',
    type: 'static',
  },
  Vehicles: {
    store: 'vehicles',
    key: 'ref',
    type: 'realtime',
  },
  TripUpdates: {
    store: 'tripUpdates',
    key: 'ref',
    type: 'realtime',
  },
  Alerts: {
    store: 'alerts',
    key: 'ref',
    type: 'realtime',
  },
}

export const agencies = {
  put: async (agency) => {
    // console.log('agencies put', agency)
    return await db.agencies.put(agency)
  },
  get: async (id) => {
    // console.log('agencies get', id)
    return await db.agencies.get({ id })
  },
  all: async () => {
    // console.log('agencies all')
    return await db.agencies.toArray()
  },
  touch: async (agency) => {
    return await db.agencies.update(agency.slug, {
      'meta.updatedAt': new Date().toISOString(),
    })
  },
  delete: async (agency) => {
    // console.log('agencies delete', agency)

    return await db.agencies.where({ id: agency.id }).delete()
  },
}

export const staticGtfs = {
  bulkPut: async (model, agency, items) => {
    // console.log('staticGtfs bulkPut', model, items, agency)

    items.map((item) => {
      return {
        ...item,
        agency: agency.slug,
      }
    })

    items.filter((item) => {
      if (!item[model.key]) return false

      return true
    })

    agencies.touch(agency)

    return await db[model.store].bulkPut(items)
  },
  get: async (model, agency, key) => {
    // console.log('staticGtfs get', model, key, agency)

    let keys = {
      agency: '',
    }

    if (typeof key === 'string') keys[model.key] = key
    if (typeof key === 'object') keys = key
    if (agency) keys.agency = agency.slug

    return await db[model.store].get(keys)
  },
  all: async (model, agency, count = false) => {
    // console.log('staticGtfs all', model, agency, count)

    const collection = db[model.store].where({
      agency: agency.slug,
    })

    if (count) return await collection.count()

    return await collection.toArray()
  },
  delete: async (model, agency) => {
    // console.log('staticGtfs delete', model, agency)

    agencies.touch(agency)

    return await db[model.store].where({ agency: agency.slug }).delete()
  },
}

export const realtimeGtfs = {
  bulkPut: async (model, agency, items) => {
    // console.log('realtime bulkPut', model, items, agency)

    items.map((item) => {
      return {
        ...item,
        agency: agency.slug,
      }
    })

    items.filter((item) => {
      if (!item[model.key]) return false

      return true
    })

    agencies.touch(agency)

    return await db[model.store].bulkPut(items)
  },
  bulkUpdate: async (model, agency, keyValue) => {
    return await db[model.store].where({ agency: agency.slug }).modify(keyValue)
  },
  get: async (model, agency, key) => {
    // console.log('realtime get', model, key, agency)

    let keys = {
      agency: '',
    }

    if (typeof key === 'string') keys[model.key] = key
    if (typeof key === 'object') keys = key
    if (agency) keys.agency = agency.slug

    return await db[model.store].get(keys)
  },
  all: async (model, agency, count = false, active = false) => {
    // console.log('realtime all', model, agency, count)

    const keys = {
      agency: agency.slug,
    }

    const collection = db[model.store].where(keys)

    if (count) return await collection.count()
    if (!count && model.store === 'vehicles' && active) {
      const vehicles = await collection.toArray()
      return vehicles.filter((vehicle) => {
        return vehicle.isActive
      })
    }

    return await collection.toArray()
  },
  delete: async (model, agency) => {
    // console.log('realtime delete', model, agency)

    agencies.touch(agency)

    return await db[model.store].where({ agency: agency.slug }).delete()
  },
}
