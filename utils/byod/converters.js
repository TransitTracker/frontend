import * as Papa from 'papaparse'
import GtfsRealtimeBindings from 'gtfs-realtime-bindings'
import { Vehicle } from './models'
import { staticGtfs, definitions } from './index'

export const csvParser = (
  model,
  agency,
  file,
  chunckCallback = (data) => {}
) => {
  return new Promise((resolve) => {
    Papa.parse(file, {
      header: true,
      worker: true,
      chunk: ({ data }) => {
        let items = data.map((line) => ({
          ...line,
          agency: agency.slug,
        }))

        items = items.filter((item) => {
          return item[model.key]
        })

        chunckCallback(items)
      },
      complete: () => {
        resolve()
      },
    })
  })
}

export const protoParser = (agency, buffer) => {
  return new Promise((resolve, reject) => {
    let feed = null
    try {
      feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
        new Uint8Array(buffer)
      )
    } catch (e) {
      reject(e)
    }

    const queue = {
      alerts: [],
      tripUpdates: [],
      vehicles: [],
    }
    const entities = {
      alerts: [],
      tripUpdates: [],
      vehicles: [],
    }

    feed.entity.forEach((entity) => {
      if (entity.alert) queue.alerts.push(entity)
      if (entity.tripUpdate) queue.tripUpdates.push(entity)
      if (entity.vehicle) queue.vehicles.push(entity)
    })

    entities.alerts = queue.alerts.map(({ id, alert }) => ({
      ...alert.toJSON(),
      ref: id,
      agency: agency.slug,
    }))

    entities.tripUpdates = queue.tripUpdates.map(({ id, tripUpdate }) => ({
      ...tripUpdate.toJSON(),
      ref: id,
      agency: agency.slug,
    }))

    entities.timestamp = feed.header.timestamp

    const vehiclesConverter = queue.vehicles.map(async (entity) => {
      const vehicle = new Vehicle()

      vehicle.setRealtimeVehicleEntity(entity)
      vehicle.setAgency(agency)

      const trip =
        (await staticGtfs.get(
          definitions.Trips,
          agency,
          entity.vehicle.trip.tripId
        )) || {}
      vehicle.setStaticTrip(trip)

      if (trip.route_id) {
        const route =
          (await staticGtfs.get(definitions.Routes, agency, trip.route_id)) ||
          {}
        vehicle.setStaticRoute(route)
      }

      entities.vehicles.push(vehicle)
      return vehicle
    })

    Promise.all(vehiclesConverter).then(() => {
      resolve(entities)
    })
  })
}
