import Vue from 'vue'

export const state = () => ({
  data: {},
  features: {},
  selection: {},
})

export const getters = {
  counts(state) {
    const counts = {}
    Object.keys(state.data).forEach((agency) => {
      counts[agency] = state.data[agency].length
    })

    return counts
  },
}

export const mutations = {
  set(state, { agency, vehicles, features }) {
    Vue.set(state.data, agency.slug, vehicles)
    Vue.set(state.features, agency.slug, features)
  },
  setSelection(state, selection) {
    state.selection = selection
  },
  emptyData(state, agency) {
    Vue.set(state.data, agency.slug, [])
    Vue.set(state.features, agency.slug, [])
  },
}

export const actions = {
  async getLocalsActiveVehicles(context, agency) {
    const vehicles = await this.$database.vehicles
      .where({ agency: agency.slug })
      .toArray()
    return vehicles.filter((vehicle) => {
      return vehicle.isActive
    })
  },
  async load({ commit }, agency) {
    const response = await this.$axios.get(`/agencies/${agency.slug}/vehicles`)
    commit('set', {
      agency,
      vehicles: response.data.data,
      features: response.data.geojson,
    })

    // Commit timestamp
    commit(
      'agencies/setTime',
      { agency, timestamp: response.data.timestamp },
      { root: true }
    )
  },
  setSelectionById({ commit, state }, { id, agency }) {
    const vehicle = state.data[agency.slug].find((vehicle) => vehicle.id === id)

    if (!vehicle) {
      return {}
    }

    commit('setSelection', vehicle)
    return vehicle
  },
  processCustomFeed({ commit, dispatch }, { agency, vehicles }) {
    return new Promise((resolve, reject) => {
      // Create vehicles
      const newVehicles = []

      const asyncMap = vehicles.map(async (entity) => {
        const vehicle = new this.$byod.Vehicle()
        vehicle.setRealtimeVehicleEntity(entity)
        vehicle.setAgency(agency)

        if (entity.tripUpdate) {
          vehicle.setRealtimeTripUpdateEntity(entity)
        }

        const trip =
          (await this.$database.trips.get({
            agency: agency.slug,
            trip_id: entity.vehicle.trip.tripId,
          })) || {}
        vehicle.setStaticTrip(trip)

        if (trip.route_id) {
          const route =
            (await this.$database.routes.get({
              agency: agency.slug,
              route_id: trip.route_id,
            })) || {}
          vehicle.setStaticRoute(route)
        }

        newVehicles.push(vehicle)
      })

      Promise.all(asyncMap).then(() => {
        console.log(newVehicles)

        // Remove all previous active vehicles
        this.$database.vehicles
          .where({ agency: agency.slug })
          .modify({ isActive: false })
          .then(() => {
            // Insert new records
            this.$database.vehicles.bulkPut(newVehicles)
          })

        commit('set', {
          agency,
          vehicles,
          features: {
            type: 'FeatureCollection',
            features: newVehicles.map((vehicle) => {
              return {
                type: 'Feature',
                properties: {
                  id: vehicle.id,
                  label: vehicle.label,
                  'marker-symbol': `tt-custom-${vehicle.vehicleType}`,
                },
                geometry: {
                  type: 'Point',
                  coordinates: [vehicle.position.lon, vehicle.position.lat],
                },
              }
            }),
          },
        })
        resolve()
        dispatch('agencies/touchUpdatedAt', agency.slug, { root: true })
      })
    })
  },
  loadLocal({ commit, dispatch }, agencies) {
    agencies.forEach((agency) => {
      if (agency.meta.remoteAutoRefresh) {
        dispatch('loadRemote', agency)
      } else {
        dispatch('getLocalsActiveVehicles', agency).then((result) => {
          commit('set', {
            agency,
            vehicles: result,
            features: {
              type: 'FeatureCollection',
              features: result.map((vehicle) => {
                return {
                  type: 'Feature',
                  properties: {
                    id: vehicle.id,
                    label: vehicle.label,
                    'marker-symbol': `tt-custom-${vehicle.vehicleType}`,
                  },
                  geometry: {
                    type: 'Point',
                    coordinates: [vehicle.position.lon, vehicle.position.lat],
                  },
                }
              }),
            },
          })
        })
      }
    })
  },
  loadRemote({ dispatch }, agency) {
    return new Promise((resolve, reject) => {
      if (!agency.meta.remoteUrl) return
      this.$axios
        .get(agency.meta.remoteUrl, {
          responseType: 'arraybuffer',
        })
        .then((response) => {
          dispatch('processCustomFeed', {
            agency,
            file: new Uint8Array(response.data),
          })
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
