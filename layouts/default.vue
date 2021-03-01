<template>
  <v-app class="tt-app">
    <v-app-bar fixed app color="primary" dark>
      <!-- eslint-disable -->
      <svg
        tag="svg"
        to="/"
        xmlns="http://www.w3.org/2000/svg"
        style="isolation: isolate"
        viewBox="0 0 295.012 403.722"
        width="18px"
        class="ml-2 mr-3 tt-toolbar--click"
        @click="$router.push('/')"
      >
      <!-- eslint-enable -->
        <path
          fill="#fff"
          class="pin"
          d="M293.137 147.506c0-80.34-65.291-145.631-145.631-145.631S1.875 67.166 1.875 147.506c0 84.709 87.864 198.786 126.942 245.631 9.708 11.651 27.427 11.651 37.136 0 39.32-46.845 127.184-160.922 127.184-245.631z"
        />
        <path
          fill="#2374ab"
          class="bus"
          d="M84.348 183.032c0 6.948 3.079 13.185 7.895 17.527v10.105a11.826 11.826 0 0011.842 11.842 11.826 11.826 0 0011.842-11.842v-3.947h63.158v3.947c0 6.474 5.289 11.842 11.842 11.842 6.474 0 11.842-5.289 11.842-11.842v-10.105c4.816-4.342 7.895-10.579 7.895-17.527v-78.947c0-27.632-28.263-31.579-63.158-31.579-34.895 0-63.158 3.947-63.158 31.579zm27.632 7.895a11.826 11.826 0 01-11.842-11.842 11.826 11.826 0 0111.842-11.842 11.826 11.826 0 0111.842 11.842c0 6.553-5.29 11.842-11.842 11.842zm71.052 0a11.826 11.826 0 01-11.842-11.842c0-6.553 5.29-11.842 11.842-11.842a11.826 11.826 0 0111.842 11.842 11.826 11.826 0 01-11.842 11.842zm11.842-47.368h-94.736v-39.474h94.736z"
        />
      </svg>
      <v-toolbar-title class="tt-toolbar--click" @click="$router.push('/')">
        Transit Tracker
      </v-toolbar-title>
      <v-spacer />
      <v-btn text @click="loading = !loading">
        Montréal
        <v-icon>mdi-menu-down</v-icon>
      </v-btn>
      <v-btn
        icon
        :aria-label="$t('settings.open')"
        @click="settingsDrawer = !settingsDrawer"
      >
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <settings-drawer v-model="settingsDrawer" />
      <nuxt />
    </v-main>
    <nav>
      <v-bottom-navigation
        v-if="!$route.name.includes('landing')"
        grow
        :color="settingsDarkMode ? null : 'primary'"
        fixed
      >
        <v-btn :to="localePath(`/app/${region}/`)" nuxt exact>
          <span>{{ $t('app.tabHome') }}</span>
          <v-icon>mdi-home</v-icon>
        </v-btn>
        <v-btn :to="localePath(`/app/${region}/map`)" nuxt>
          <span>{{ $t('app.tabMap') }}</span>
          <v-icon>mdi-map</v-icon>
        </v-btn>
        <v-btn :to="localePath(`/app/${region}/table`)" nuxt>
          <span>{{ $t('app.tabTable') }}</span>
          <v-icon>mdi-table</v-icon>
        </v-btn>
        <v-btn :to="localePath('/byod')" nuxt>
          <span>{{ $t('app.tabByod') }}</span>
          <v-icon>mdi-folder-upload</v-icon>
        </v-btn>
        <v-btn :to="localePath('/settings')" nuxt>
          <span>{{ $t('app.tabSettings') }}</span>
          <v-icon>mdi-cog</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </nav>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    settingsDrawer: false,
  }),
  computed: {
    region() {
      return (
        this.$route.params.region || this.$store.state.settings.currentRegion
      )
    },
    settingsByod() {
      return this.$store.state.settings.activateByod
    },
    settingsLang() {
      return this.$store.state.settings.lang
    },
    settingsDarkMode() {
      const setting = this.$store.state.settings.theme
      if (setting === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
      }

      if (setting === 'dark') return true
      return false
    },
    localAgenciesWithRemote() {
      const allAgencies = Object.values(this.$store.state.agencies.data)
      return allAgencies.filter((agency) => {
        if (!agency.meta) return false
        if (agency.meta.remoteUrl && agency.meta.remoteAutoRefresh) return true
        return false
      })
    },
  },
  watch: {
    settingsByod(value) {
      console.log('watcher byod', value)
      if (value) this.loadByodAgencies()
    },
    settingsDarkMode(value) {
      console.log('watcher dark', value)
      this.$vuetify.theme.dark = value
    },
    settingsLang(value) {
      console.log('watcher lang', value)
      this.$i18n.setLocale(value)
      this.$vuetify.lang.current = value
    },
  },
  mounted() {
    this.$store.dispatch('regions/loadAll').then((slugs) => {
      // Make an array of all selected agencies
      const activeAgencies = this.$store.state.regions.data[
        this.region
      ].agencies.filter((agency) => {
        return this.$store.state.settings.activeAgencies.includes(agency.slug)
      })

      // For each selected agency, load vehicles
      activeAgencies.forEach((agency) => {
        this.$store.dispatch('vehicles/load', agency)
      })

      // Load alerts for this region
      this.$store.dispatch('alerts/load', this.region)
    })

    console.log(
      'settings',
      this.settingsByod,
      this.settingsDarkMode,
      this.settingsLang
    )
    if (this.settingsByod) this.loadByodAgencies()
    if (this.settingsDarkMode) this.$vuetify.theme.dark = true
    this.$i18n.setLocale(this.settingsLang)
  },
  methods: {
    loadByodAgencies() {
      // Load byod agencies
      this.$store.dispatch('agencies/loadLocal').then((agencies) => {
        this.$store.dispatch('vehicles/loadLocal', agencies)
      })

      // Set up auto refresh for local agencies with remote URL
      setInterval(() => {
        this.localAgenciesWithRemote.forEach((agency) => {
          this.$store.dispatch('vehicles/loadRemote', agency)
        })
      }, 1000 * 60)
    },
  },
}
</script>

<style>
.tt-toolbar--click {
  cursor: pointer;
}
.theme--light.tt-app {
  background: #eef6fc !important;
}
</style>
