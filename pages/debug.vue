<template>
  <div class="tw-m-4">
    <div>
      <p v-if="debugMode">Debug mode is On</p>
      <p v-else>Debug mode is Off</p>
      <button
        @click="toggleDebug(true)"
        class="tw-bg-primary-40 tw-p-2 tw-text-white"
      >
        Turn On
      </button>
      <button
        @click="toggleDebug(false)"
        class="tw-bg-primary-40 tw-p-2 tw-text-white"
      >
        Turn Off
      </button>
    </div>
    <div class="tw-my-8"></div>
    <h2>Login</h2>
    <p v-if="user.id">Welcome {{ user.name }} (id {{ user.id }})</p>
    <p v-else>Please log in</p>
    <input
      v-model="email"
      placeholder="Email"
      :disabled="disableLogin"
      class="tw-border tw-border-solid tw-border-primary-20 tw-bg-white tw-p-2"
      type="email"
    />
    <input
      v-model="password"
      placeholder="Password"
      type="password"
      class="tw-border tw-border-solid tw-border-primary-20 tw-bg-white tw-p-2"
      :disabled="disableLogin"
    />
    <button
      @click="login"
      :disabled="disableLogin"
      class="tw-bg-primary-40 tw-p-2 tw-text-white"
    >
      Login
    </button>
    <div class="tw-my-8"></div>
    <h2>Load hidden agency</h2>
    <p v-if="addedAgency">{{ addedAgency }} is now loaded</p>
    <input
      v-model="agency"
      placeholder="slug"
      class="tw-border tw-border-solid tw-border-primary-20 tw-bg-white tw-p-2"
    />
    <button @click="load" class="tw-bg-primary-40 tw-p-2 tw-text-white">
      Load
    </button>
  </div>
</template>

<script>
export default {
  async asyncData({ app, env }) {
    const baseDomain = env.backendHost
    await app.$axios.get(`${baseDomain}/sanctum/csrf-cookie`)

    return { baseDomain }
  },
  data: () => ({
    email: '',
    password: '',
    disableLogin: false,
    agency: null,
    addedAgency: null,
    agencyError: null,
    user: {},
  }),
  computed: {
    debugMode() {
      return this.$store.state.settings.debugMode
    },
  },
  mounted() {
    this.$axios.get('/admin/user').then(({ data }) => {
      this.user = data
    })
  },
  methods: {
    async login() {
      this.disableLogin = true
      const { data } = await this.$axios.post(`${this.baseDomain}/login`, {
        email: this.email,
        password: this.password,
      })

      this.user = data
      this.disableLogin = false
    },
    load() {
      this.$axios
        .get(`/admin/agencies/${this.agency}`)
        .then(({ data }) => {
          this.$store.commit('agencies/add', data.data)
          this.$store.dispatch('vehicles/load', data.data)
          this.addedAgency = data.data.name
        })
        .catch((error) => {
          this.agencyError = error.response
            ? error.response.status
            : error.reqest
            ? error.reqest
            : error.message
        })
    },
    toggleDebug(newState) {
      this.$store.commit('settings/set', {
        setting: 'debugMode',
        value: newState,
      })
    },
  },
}
</script>
