// A list of all available columns for table
const availableColumns = [
  'properties.vehicle.id',
  'properties.vehicle.label',
  'properties.tags',
  'properties.lastSeenAt',
  'properties.trip.id',
  'properties.trip.headsign',
  'properties.trip.shortName',
  'properties.trip.startTime',
  'properties.route.id',
  'properties.route.shortName',
  'properties.trip.serviceId',
  'properties.trip.blockId',
  'geometry.coordinates',
  'properties.position.bearing',
  'properties.position.speed',
  'properties.vehicle.type',
  'properties.vehicle.licensePlate',
  'properties.vehicle.odometer',
  'properties.currentStopSequence',
  'properties.currentStatus',
  'properties.trip.scheduleRelationship',
  'properties.congestionLevel',
  'properties.occupancyStatus',
  'properties.firstSeenAt',
  'actions',
]

export const state = () => ({
  activeAgencies: [],
  autoRefresh: false,
  configurationDone: false,
  readAlerts: [],
  currentRegion: 'mtl',
  launch: 'no',
  lang: null,
  theme: 'system',
  preferDesktopView: true,
  pushSubscriptionUuid: null,
  selectedTableColumns: [
    'properties.vehicle.label',
    'properties.tags',
    'properties.route.id',
    'properties.route.shortName',
    'properties.trip.headsign',
    'properties.trip.id',
    'properties.trip.startTime',
    'actions',
  ],
  completedFlags: [],
  adminMode: false,
})

export const mutations = {
  set(state, { setting, value }) {
    state[setting] = value
  },
  completeFlag(state, flag) {
    state.selectedTableColumns.push(flag)
  },
}

export const actions = {
  changeRegion({ commit, dispatch, rootState, state }, region) {
    // Change the setting
    commit('set', { setting: 'currentRegion', value: region.slug })

    // Remove existing times and vehicles
    Object.keys(rootState.agencies.times).forEach((slug) => {
      commit('vehicles/emptyData', { slug }, { root: true })
      commit('agencies/removeTime', { slug }, { root: true })
    })

    commit('vehicles/setSelection', {}, { root: true })

    // Make an array of all selected agencies
    const activeAgencies = rootState.regions.data[region.slug].agencies.filter(
      (agency) => {
        return state.activeAgencies.includes(agency.slug)
      }
    )

    // For each selected agency, load vehicles
    activeAgencies.forEach((agency) => {
      dispatch('vehicles/load', agency, { root: true })
    })

    dispatch('regions/connectToAutoRefresh', region, { root: true })
  },
  toggleAgency({ commit, dispatch, rootState, state }, agency) {
    const setting = [...state.activeAgencies]

    if (setting.includes(agency.slug)) {
      setting.splice(setting.indexOf(agency.slug), 1)

      // Remove times and data
      commit('vehicles/emptyData', agency, { root: true })
      commit('agencies/removeTime', agency, { root: true })

      // Remove selection if necessary
      if (rootState.vehicles.selection.agency === agency.slug) {
        commit('vehicles/setSelection', {}, { root: true })
      }
    } else {
      setting.push(agency.slug)
      if (agency.regions.includes(state.currentRegion)) {
        dispatch('vehicles/load', agency, { root: true })
      }
    }

    commit('set', { setting: 'activeAgencies', value: setting })
  },
}

export const getters = {
  availableTableColumns() {
    return availableColumns
  },
  visibleTableColumns(state) {
    return state.selectedTableColumns.filter((column) =>
      availableColumns.includes(column)
    )
  },
  hiddenTableColumns(state) {
    return availableColumns.filter(
      (column) => !state.selectedTableColumns.includes(column)
    )
  },
}
