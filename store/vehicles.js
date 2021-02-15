import Vue from 'vue'
import { v4 as uuid } from 'uuid'
import GtfsRealtimeBindings from 'gtfs-realtime-bindings'

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
  processCustomFeed({ commit, dispatch }, { agency, file }) {
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

      // Create vehicles
      const vehicles = feed.entity.flatMap((entity) =>
        convertVehicle(agency, entity, this.$database)
      )

      Promise.all(vehicles).then((vehicles) => {
        vehicles = vehicles.flat()
        // Remove all previous active vehicles
        this.$database.vehicles
          .where({ agency: agency.slug })
          .modify({ isActive: false })
          .then(() => {
            // Insert new records
            this.$database.vehicles.bulkPut(vehicles)
          })

        commit('set', {
          agency,
          vehicles,
          features: {
            type: 'FeatureCollection',
            features: vehicles.map((vehicle) => {
              return {
                type: 'Feature',
                properties: {
                  id: vehicle.id,
                  label: vehicle.label,
                  'marker-symbol': `tt-custom-${agency.defaultVehicleType}`,
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
              features: result.map((entity) => {
                return {
                  type: 'Feature',
                  properties: {
                    id: entity.id,
                    label: entity.label,
                    'marker-symbol': `tt-custom-${agency.defaultVehicleType}`,
                  },
                  geometry: {
                    type: 'Point',
                    coordinates: [entity.position.lon, entity.position.lat],
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

const convertVehicle = async (agency, entity, database) => {
  if (!entity.vehicle || !entity.vehicle.trip) {
    return []
  }

  const trip =
    (await database.trips.get({
      agency: agency.slug,
      trip_id: entity.vehicle.trip.tripId,
    })) || {}
  let route = {}
  if (trip.route_id) {
    route =
      (await database.routes.get({
        agency: agency.slug,
        route_id: trip.route_id,
      })) || {}
  }

  return {
    agency: agency.slug,
    ref: entity.vehicle.vehicle.id,
    id: uuid(),
    isActive: true,
    label: entity.vehicle.vehicle.label || entity.vehicle.vehicle.id,
    timestamp: entity.vehicle.timestamp || null,
    tripId: entity.vehicle.trip.tripId || null,
    routeId: entity.vehicle.trip.routeId || null,
    startTime: entity.vehicle.trip.startTime || null,
    position: {
      lat: +parseFloat(entity.vehicle.position.latitude).toFixed(4),
      lon: +parseFloat(entity.vehicle.position.longitude).toFixed(4),
    },
    bearing: entity.vehicle.position.bearing || null,
    speed: Math.round(entity.vehicle.position.speed) || null,
    vehicleType: agency.defaultVehicleType,
    plate: entity.vehicle.vehicle.licensePlate || null,
    odometer: entity.vehicle.position.odometer || null,
    currentStopSequence: entity.vehicle.currentStopSequence || null,
    currentStatus: {
      data: entity.vehicle.currentStatus || null,
      label: '',
    },
    scheduleRelationship: {
      data: entity.vehicle.trip.scheduleRelationship || null,
      label: '',
    },
    congestionLevel: {
      data: entity.vehicle.congestionLevel || null,
      label: '',
    },
    occupancyStatus: {
      data: entity.vehicle.occupancyStatus || null,
      label: '',
    },
    links: [],
    trip: {
      id: trip.trip_id || null,
      headsign: trip.trip_headsign || null,
      shortName: trip.trip_short_name || null,
      routeColor: route.route_color || null,
      routeTextColor: route.route_text_color || null,
      routeShortName: route.route_short_name || null,
      routeLongName: route.route_long_name || null,
      shapeLink: null,
      serviceId: trip.service_id || null,
    },
    meta: {
      json: { vehiclePosition: entity.toJSON(), trip, route },
      isLocal: true,
    },
  }
}
