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
    Vue.set(state.data, agency, vehicles)
    Vue.set(state.features, agency, features)
  },
  setSelection(state, selection) {
    state.selection = selection
  },
  emptyData(state, agency) {
    Vue.set(state.data, agency, [])
    Vue.set(state.features, agency, [])
  },
}

export const actions = {
  async getVehiclesByCustomAgency(context, agency) {
    console.log(agency)
    return await this.$database.vehicles.where({ agency }).toArray()
  },
  async load({ commit }, agency) {
    const response = await this.$axios.get(`/agencies/${agency}/vehicles`)
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
  setSelectionById({ commit, state }, { id, agencySlug }) {
    const vehicle = state.data[agencySlug].find((vehicle) => vehicle.id === id)
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
          agency: agency.slug,
          timestamp: feed.header.timestamp,
          custom: true,
        },
        { root: true }
      )

      // Create vehicles
      const vehicles = feed.entity.map((entity) =>
        convertVehicle(agency, entity, this.$database)
      )

      console.log(vehicles)
      this.$database.vehicles.bulkPut(vehicles)

      commit('set', {
        agency: agency.slug,
        vehicles,
        features: {
          type: 'FeatureCollection',
          features: feed.entity.map((entity) => {
            return {
              type: 'Feature',
              properties: {
                id: entity.id,
                label:
                  entity.vehicle.vehicle.label || entity.vehicle.vehicle.id,
                'marker-symbol': `tt-custom-${agency.defaultVehicleType}`,
              },
              geometry: {
                type: 'Point',
                coordinates: [
                  entity.vehicle.position.longitude,
                  entity.vehicle.position.latitude,
                ],
              },
            }
          }),
        },
      })

      // localdb.touchAgency(agency.slug)

      resolve()
    })
  },
  async loadCustom({ commit, dispatch }) {
    const agencies = await dispatch('agencies/getCustom', null, { root: true })
    agencies.forEach((agency) => {
      dispatch('getVehiclesByCustomAgency', agency.slug).then((result) => {
        commit('set', {
          agency: agency.slug,
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
    })
  },
}

const convertVehicle = (agency, entity) => {
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
      id: null,
      headsign: null,
      shortName: null,
      routeColor: null,
      routeTextColor: null,
      routeShortName: null,
      routeLongName: null,
      shapeLink: null,
      serviceId: null,
    },
    meta: {
      json: entity.toJSON(),
      isLocal: true,
    },
  }
}
