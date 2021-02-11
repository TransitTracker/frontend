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
    console.log(4, 'agencies.js getCustom')
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
    commit('add', model)
    commit('setTime', { agency: id })
  },
  loadCustom({ commit, dispatch }) {
    console.log(2, 'agencies.js loadCustom')
    return new Promise((resolve) => {
      console.log(3, 'agencies.js promise start')
      dispatch('getCustom').then((agencies) => {
        console.log(5, 'agencies.js dispatch then')
        agencies.forEach((agency) => {
          commit('add', agency)
          commit('setTime', {
            agency: agency.slug,
            timestamp: agency.meta.timestamp,
          })
          console.log(6, 'agencies.js after commit', agency.name)
        })
        resolve(agencies)
      })
    })
  },
  touchUpdatedAt(context, agency) {
    this.$database.agencies.update(agency, {
      'meta.updatedAt': new Date().toISOString(),
    })
  },
}
