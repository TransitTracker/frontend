import { FIELDS_DEFINITIONS, DEFAULT_TABLE_COLUMNS } from '~/utils/fields'

// A list of all available columns for table
const availableColumns = Object.keys(FIELDS_DEFINITIONS)

export const state = () => ({
  activeAgencies: [],
  hiddenAgencies: [],
  autoRefresh: true,
  readAlerts: [],
  currentRegion: 'mtl',
  launch: 'no',
  lang: null,
  theme: 'system',
  pushSubscriptionUuid: null,
  selectedTableColumns: DEFAULT_TABLE_COLUMNS,
  tableGroupBy: 'properties.agencyId',
  debugMode: false,
})

export const mutations = {
  set(state, { setting, value }) {
    state[setting] = value
  },
  changeColumnOrder(state, { columnField, newIndex }) {
    // Delete the field from it's current position
    state.selectedTableColumns.splice(
      state.selectedTableColumns.indexOf(columnField),
      1
    )

    // Move to it's new position
    state.selectedTableColumns.splice(newIndex, 0, columnField)
  },
  changeVisibilityOfColumn(state, { columnField, remove }) {
    if (remove) {
      state.selectedTableColumns.splice(
        state.selectedTableColumns.indexOf(columnField),
        1
      )
    } else {
      state.selectedTableColumns.push(columnField)
    }
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
        return !state.hiddenAgencies.includes(agency.slug)
      }
    )

    // For each selected agency, load vehicles
    activeAgencies.forEach((agency) => {
      dispatch('vehicles/load', agency, { root: true })
    })

    dispatch('regions/connectToAutoRefresh', region, { root: true })
  },
  toggleAgency({ commit, dispatch, rootState, state }, agency) {
    const setting = [...state.hiddenAgencies]

    // Is already in array
    if (setting.includes(agency.slug)) {
      // Remove from hidden agencies
      setting.splice(setting.indexOf(agency.slug), 1)

      // Load agency if in current region
      if (agency.regions.includes(state.currentRegion)) {
        dispatch('vehicles/load', agency, { root: true })
      }
      // Is not in array
    } else {
      // Add to hidden agencies
      setting.push(agency.slug)

      // Remove times and data
      commit('vehicles/emptyData', agency, { root: true })
      commit('agencies/removeTime', agency, { root: true })

      // Remove selection if necessary
      if (rootState.vehicles.selection.agency === agency.slug) {
        commit('vehicles/setSelection', {}, { root: true })
      }
    }

    // Update settings
    commit('set', { setting: 'hiddenAgencies', value: setting })
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
