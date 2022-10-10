import Vue from 'vue'

export const state = () => ({
  data: {},
  features: {},
  selection: {
    id: 1542,
    ref: '30173',
    isActive: true,
    label: '30-173',
    timestamp: '1660696842',
    tripId: '252395115',
    routeId: '215',
    startTime: '20:37:00',
    position: { lat: 45.47266, lon: -73.81896 },
    bearing: 54,
    speed: 54,
    vehicleType: 'bus',
    plate: 'A12578',
    odometer: '568630',
    currentStopSequence: 6,
    currentStatus: { data: 2, label: 'In transit to' },
    scheduleRelationship: { data: 1, label: 'Added' },
    congestionLevel: { data: 3, label: 'Congestion' },
    occupancyStatus: { data: 1, label: 'Many seats available' },
    agency: 'stm',
    links: [1, 2, 3, 22],
    tags: [2],
    trip: {
      id: '252395115',
      headsign: '215-O',
      shortName: '25',
      routeColor: '#009EE0',
      routeTextColor: '#ffffff',
      routeShortName: '215',
      routeLongName: 'Henri-Bourassa',
      shapeLink: '/storage/shapes/stm/2150147.json',
      serviceId: null,
    },
    createdAt: '2019-11-22 06:00:09',
    meta: {},
  },
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
  async load({ commit, state }, agency) {
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

    // If selected vehicle is from this agency, replace it or erase it
    if (state.selection.agency === agency.slug) {
      const vehicle = response.data.data.find(
        ({ id }) => id === state.selection.id
      )
      if (vehicle) commit('setSelection', vehicle)
      else commit('setSelection', {})
    }
  },
  setSelectionById({ commit, state }, { id, agency }) {
    const vehicle = state.data[agency.slug].find((vehicle) => vehicle.id === id)

    if (!vehicle) {
      return {}
    }

    commit('setSelection', vehicle)
    return vehicle
  },
}
