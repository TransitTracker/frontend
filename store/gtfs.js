import * as Papa from 'papaparse'

export const state = () => ({})

export const actions = {
  async getRoute({ agency, routeId }) {
    return await this.$database.routes.get({
      agency,
      route_id: routeId,
    })
  },
  async getRoutesByAgency(agency, count = false) {
    const collection = this.$database.routes.where({ agency })
    debugger
    if (count) {
      return await collection.count()
    }

    return collection.toArray()
  },
  async getTrip({ agency, tripId }) {
    return await this.$database.trips.get({
      agency,
      trip_id: tripId,
    })
  },
  async getTripsByAgency(agency) {
    const trips = await this.$database.trips.where({ agency })
    return trips
  },
  processRoutes(context, { agency, file }) {
    return new Promise((resolve) => {
      let total = 0
      // Convert file to JSON
      Papa.parse(file, {
        header: true,
        worker: true,
        chunk: ({ data, meta }) => {
          const routes = data.map((route) => {
            return {
              ...route,
              agency,
            }
          })
          this.$database.routes.bulkPut(routes)
          total += meta.cursor
        },
        complete: () => {
          resolve(total)
        },
      })
      // TODO: touch
      // localdb.touchAgency(agency)
    })
  },
  processTrips(context, { agency, file }) {
    return new Promise((resolve) => {
      // Convert file to JSON
      Papa.parse(file, {
        header: true,
        worker: true,
        chunk: (results) => {
          const trips = results.data.map((trip) => {
            return {
              ...trip,
              agency,
            }
          })
          this.$database.trips.bulkPut(trips)
        },
        complete: () => {
          resolve()
        },
      })
      // localdb.touchAgency(agency)
    })
  },
}
