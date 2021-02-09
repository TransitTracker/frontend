import Vue from 'vue'

export const state = () => ({
  data: {},
  times: {},
})

export const mutations = {
  add(state, agency) {
    Vue.set(state.data, agency.slug, agency)
  },
  setTime(state, { agency, timestamp = null, custom = false }) {
    Vue.set(state.times, agency, timestamp)
    if (custom) {
      this.$database.agencies.update(agency, { 'meta.timestamp': timestamp })
    }
  },
  removeTime(state, agency) {
    Vue.delete(state.times, agency)
  },
}

export const actions = {
  async getCustom() {
    return await this.$database.agencies.toArray()
  },
  async getCustomById(context, id) {
    return await this.$database.agencies.get(id)
  },
  addCustom({ commit }, { id, name, vehicleType }) {
    const time = new Date().toISOString()
    const model = {
      id,
      name,
      shortName: 'Custom',
      slug: id,
      defaultVehicleType: vehicleType,
      color: '#4bccbd',
      textColor: '#ffffff',
      regions: ['*'],
      license: {
        url: null,
        title: 'None',
        isDownloadable: true,
      },
      meta: {
        createdAt: time,
        updatedAt: time,
        timestamp: null,
      },
    }
    this.$database.agencies.add(model)
    commit('setTime', { agency: id })
  },
  loadCustom({ commit, dispatch }) {
    return new Promise((resolve) => {
      dispatch('getCustom').then((agencies) => {
        agencies.forEach((agency) => {
          commit('add', agency)
          commit('setTime', {
            agency: agency.slug,
            timestamp: agency.meta.timestamp,
          })
        })
        resolve()
      })
    })
  },
}
