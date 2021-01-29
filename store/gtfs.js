import Vue from 'vue'
import * as Papa from 'papaparse'

export const state = () => ({
  routes: {},
  trips: {},
})

export const mutations = {
  setRoutes(state, { agency, routes }) {
    Vue.set(state.routes, agency, routes)
  },
  setTrips(state, { agency, trips }) {
    Vue.set(state.trips, agency, trips)
  },
}

export const actions = {
  processRoutes({ commit, state }, { agency, file }) {
    // Conver file to JSON
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        commit('setRoutes', { agency, routes: results.data })
      },
    })
    // return state.routes[agency].length
    return 0
  },
  processTrips({ commit, state }, { agency, file }) {
    // Conver file to JSON
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        commit('setTrips', { agency, trips: results.data })
      },
    })
    // return state.trips[agency].length
    return 0
  },
}
