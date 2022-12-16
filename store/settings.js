import { set } from 'vue'

export const state = () => ({
  activeAgencies: [],
  autoRefresh: false,
  configurationDone: false,
  readAlerts: [],
  currentRegion: 'mtl',
  launch: 'no',
  lang: null,
  theme: 'system',
  activateByod: false,
  preferDesktopView: true,
  pushSubscriptionUuid: null,
  selectedTableColumns: [],
  tableColumns: [
    {
      field: 'agency',
      template: 'cAgency',
      visible: true,
      filtering: true,
    },
    {
      field: 'ref',
      visible: false,
      filtering: true,
    },
    {
      field: 'label',
      visible: true,
      filtering: true,
    },
    {
      field: 'tags',
      template: 'cTags',
      visible: true,
      filtering: false,
    },
    {
      field: 'timestamp',
      template: 'cTimestamp',
      visible: false,
      filtering: true,
    },
    {
      field: 'tripId',
      visible: true,
      filtering: true,
    },
    {
      field: 'trip.headsign',
      visible: true,
      filtering: true,
    },
    {
      field: 'trip.shortName',
      visible: false,
      filtering: true,
    },
    {
      field: 'startTime',
      visible: true,
      filtering: true,
    },
    {
      field: 'routeId',
      visible: true,
      filtering: true,
    },
    {
      field: 'trip.routeShortName',
      template: 'cRoute',
      visible: true,
      filtering: true,
    },
    {
      field: 'trip.serviceId',
      visible: false,
      filtering: true,
    },
    {
      field: 'position.lat',
      template: 'cPosition',
      visible: false,
      filtering: false,
    },
    {
      field: 'bearing',
      visible: false,
      filtering: true,
    },
    {
      field: 'speed',
      visible: false,
      filtering: true,
    },
    {
      field: 'vehicleType',
      visible: false,
      filtering: true,
    },
    {
      field: 'plate',
      visible: false,
      filtering: true,
    },
    {
      field: 'odometer',
      visible: false,
      filtering: true,
    },
    {
      field: 'currentStopSequence',
      visible: false,
      filtering: true,
    },
    {
      field: 'currentStatus.label',
      visible: false,
      filtering: true,
    },
    {
      field: 'scheduleRelationship.label',
      visible: false,
      filtering: true,
    },
    {
      field: 'congestionLevel.label',
      visible: false,
      filtering: true,
    },
    {
      field: 'occupancyStatus.label',
      visible: false,
      filtering: true,
    },
    {
      field: 'createdAt',
      visible: false,
      filtering: true,
    },
    {
      field: 'actions',
      template: 'cActions',
      visible: true,
      filtering: false,
    },
  ],
})

export const mutations = {
  set(state, { setting, value }) {
    state[setting] = value
  },
  changeColumnOrder(state, { columnField, up }) {
    const from = state.tableColumns.findIndex(
      (column) => column.field === columnField
    )
    const to = up ? from - 1 : from + 1

    // Delete the field from it's current position
    const item = state.tableColumns.splice(from, 1)

    // Move to it's new position
    state.tableColumns.splice(to, 0, item[0])
  },
  changeVisibilityOfColumn(state, { columnField, visibility }) {
    const index = state.tableColumns.findIndex(
      (column) => column.field === columnField
    )
    set(state.tableColumns[index], 'visible', visibility)
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
