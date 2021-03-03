import * as Papa from 'papaparse'
import GtfsRealtimeBindings from 'gtfs-realtime-bindings'

export const state = () => ({})

export const actions = {
  async getRoute(context, { agency, routeId }) {
    return await this.$database.routes.get({
      agency,
      route_id: routeId,
    })
  },
  async getRoutesByAgency(context, { agency, count = false }) {
    const collection = this.$database.routes.where({ agency })

    if (count) {
      return await collection.count()
    }

    return await collection.toArray()
  },
  async getTrip(context, { agency, tripId }) {
    return await this.$database.trips.get({
      agency,
      trip_id: tripId,
    })
  },
  async getTripsByAgency(context, agency) {
    const trips = await this.$database.trips.where({ agency })
    return trips
  },
  async getShape(context, { agency, shapeId }) {
    return await this.$database.shapes.get({
      agency,
      shape_id: shapeId,
    })
  },
  async getAlertsByAgency(context, agency) {
    return await this.$database.alerts
      .where({
        agency: agency.slug,
      })
      .toArray()
  },
  async getTripUpdatesByAgency(context, agency) {
    return await this.$database.tripUpdates
      .where({
        agency: agency.slug,
      })
      .toArray()
  },
  async delete(context, { agency, model }) {
    await this.$database[model].where({ agency: agency.slug }).delete()
  },
  saveRealtimeFeed({ commit, dispatch }, { agency, file }) {
    return new Promise((resolve, reject) => {
      // Convert file to protobuf
      let feed = null
      try {
        feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(file)
      } catch (e) {
        reject(e)
      }

      // Update timestamp
      commit(
        'agencies/setTime',
        {
          agency,
          timestamp: feed.header.timestamp,
          custom: true,
        },
        { root: true }
      )

      // Create queue
      const queues = {
        alerts: [],
        tripUpdates: [],
        vehicles: [],
      }

      feed.entity.forEach((entity) => {
        if (entity.alert) queues.alerts.push(entity)
        if (entity.tripUpdate) queues.tripUpdates.push(entity)
        if (entity.vehicle) queues.vehicles.push(entity)
      })

      // Send entities
      const dispatcher = async () => {
        await dispatch(
          'vehicles/processCustomFeed',
          { agency, vehicles: queues.vehicles },
          { root: true }
        )
        await dispatch('processAlerts', {
          agency,
          alerts: queues.alerts,
        })
        await dispatch('processTripUpdates', {
          agency,
          tripUpdates: queues.tripUpdates,
        })
      }
      dispatcher().then(() => {
        resolve()
      })
    })
  },
  processAlerts(context, { agency, alerts }) {
    return new Promise((resolve, reject) => {
      // Delete all existing alerts
      this.$database.alerts.where({ agency: agency.slug }).delete()

      // Map new alerts
      const updates = alerts.map(({ id, alert }) => {
        return {
          ...alert.toJSON(),
          ref: id,
          agency: agency.slug,
        }
      })

      this.$database.alerts.bulkPut(updates).then(() => {
        resolve()
      })
    })
  },
  processTripUpdates(context, { agency, tripUpdates }) {
    return new Promise((resolve, reject) => {
      // Delete all existing trip updates
      this.$database.tripUpdates.where({ agency: agency.slug }).delete()

      // Map new trip updates
      const updates = tripUpdates.map(({ id, tripUpdate }) => {
        return {
          ...tripUpdate.toJSON(),
          ref: id,
          agency: agency.slug,
        }
      })

      this.$database.tripUpdates.bulkPut(updates).then(() => {
        resolve()
      })
    })
  },
  saveRoutes({ dispatch }, { agency, file }) {
    return new Promise((resolve) => {
      // Convert file to JSON
      Papa.parse(file, {
        header: true,
        worker: true,
        chunk: ({ data }) => {
          let routes = data.map((route) => {
            return {
              ...route,
              agency: agency.slug,
            }
          })

          routes = routes.filter((route) => {
            return route.route_id
          })

          this.$database.routes.bulkPut(routes)
        },
        complete: () => {
          resolve()
          dispatch('agencies/touchUpdatedAt', agency, { root: true })
        },
      })
    })
  },
  saveTrips({ dispatch }, { agency, file }) {
    return new Promise((resolve) => {
      // Convert file to JSON
      Papa.parse(file, {
        header: true,
        worker: true,
        chunk: async ({ data }) => {
          let trips = data.map((trip) => {
            return {
              ...trip,
              agency: agency.slug,
            }
          })

          trips = trips.filter((trip) => {
            return trip.trip_id
          })

          await this.$database.trips.bulkPut(trips)
        },
        complete: () => {
          resolve()
          dispatch('agencies/touchUpdatedAt', agency, { root: true })
        },
      })
    })
  },
  // saveShapes({ dispatch }, { agency, file }) {
  //   return new Promise((resolve) => {
  //     const shapes = {}
  //     Papa.parse(file, {
  //       header: true,
  //       worker: true,
  //       chunk: ({ data }) => {
  //         data.forEach((shape) => {
  //           if (!shapes[shape.shape_id]) shapes[shape.shape_id] = []
  //           shapes[shape.shape_id].push({
  //             coordinates: [shape.shape_pt_lon, shape.shape_pt_lat],
  //             sequence: shape.shape_pt_sequence,
  //           })
  //         })
  //       },
  //       complete: () => {
  //         console.log('shapes', shapes)

  //         const geojsonShapes = Object.keys(shapes).map((shapeId) => {
  //           const unorderedShape = shapes[shapeId]
  //           const orderedShape = unorderedShape.sort(
  //             (a, b) => a.sequence - b.sequence
  //           )
  //           console.log('orderedShape', orderedShape)

  //           const coordinates = []
  //           orderedShape.forEach((point) => {
  //             coordinates.push(point.coordinates)
  //           })

  //           return {
  //             agency: agency.slug,
  //             shape_id: shapeId,
  //             type: 'Feature',
  //             properties: {},
  //             geometry: {
  //               type: 'LineString',
  //               coordinates,
  //             },
  //           }
  //         })
  //         console.log('geojsonShapes', geojsonShapes)

  //         this.$database.shapes.bulkPut(geojsonShapes)

  //         resolve()
  //         dispatch('agencies/touchUpdatedAt', agency, { root: true })
  //       },
  //     })
  //   })
  // },
}
