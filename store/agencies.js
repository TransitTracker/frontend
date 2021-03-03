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
    Vue.set(state.times, agency.slug, timestamp)
    if (custom) {
      this.$database.agencies.update(agency.slug, {
        'meta.timestamp': timestamp,
      })
    }
  },
  removeTime(state, agency) {
    Vue.delete(state.times, agency.slug)
  },
}

export const actions = {
  async delete(context, { agency }) {
    await this.$database.agencies.where({ id: agency.slug }).delete()
  },
  async getLocals() {
    return await this.$database.agencies.toArray()
  },
  async getLocal(context, id) {
    return await this.$database.agencies.get(id)
  },
  saveLocal({ commit }, { id, name, vehicleType }) {
    const time = new Date().toISOString()
    const agency = {
      id,
      name,
      shortName: 'Custom',
      slug: id,
      cities: [],
      defaultVehicleType: vehicleType,
      color: '#009a8d',
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
    this.$database.agencies.add(agency)
    commit('add', agency)
    commit('setTime', { agency })
  },
  async updateLocal(context, { agency, fields }) {
    await this.$database.agencies.update(agency.slug, fields)
    return await this.$database.agencies.get(agency.slug)
  },
  loadLocal({ commit, dispatch }) {
    return new Promise((resolve) => {
      dispatch('getLocals').then((agencies) => {
        agencies.forEach((agency) => {
          commit('add', agency)
          commit('setTime', {
            agency,
            timestamp: agency.meta.timestamp,
          })
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
