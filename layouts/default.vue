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
        class="ml-2 mr-3 cursor-pointer"
        @click="$router.push(localePath('/'))"
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
      <v-toolbar-title
        class="cursor-pointer"
        @click="$router.push(localePath('/'))"
      >
        Transit Tracker
      </v-toolbar-title>
      <v-spacer />
      <v-btn
        text
        :title="$t('regionSwitcher.title')"
        :small="$vuetify.breakpoint.smAndDown"
        @click="regionSwitcher = true"
      >
        {{ regionName }}
        <v-icon>mdi-menu-down</v-icon>
      </v-btn>
      <v-btn
        icon
        :title="$t('settings.open')"
        @click="settingsDrawer = !settingsDrawer"
      >
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <Alerts />
      <settings-drawer v-model="settingsDrawer" />
      <nuxt />
    </v-main>
    <nav>
      <v-bottom-navigation
        v-if="$route.name && !$route.name.includes('landing')"
        grow
        :color="settingsDarkMode ? null : 'primary'"
        fixed
      >
        <v-btn
          :to="localePath(`/regions/${region}/`)"
          nuxt
          exact
          style="background-color: transparent; height: inherit"
        >
          <span>{{ $t('app.tabHome') }}</span>
          <v-icon>mdi-view-grid</v-icon>
        </v-btn>
        <v-btn
          :to="localePath(`/regions/${region}/map`)"
          nuxt
          style="background-color: transparent; height: inherit"
        >
          <span>{{ $t('app.tabMap') }}</span>
          <v-icon>mdi-map</v-icon>
        </v-btn>
        <v-btn
          :to="localePath(`/regions/${region}/table`)"
          nuxt
          style="background-color: transparent; height: inherit"
        >
          <span>{{ $t('app.tabTable') }}</span>
          <v-icon>mdi-table</v-icon>
        </v-btn>
        <v-btn
          :to="localePath('/byod')"
          nuxt
          style="background-color: transparent; height: inherit"
        >
          <span>{{ $t('app.tabByod') }}</span>
          <v-icon>mdi-folder-upload</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </nav>
    <RegionSwitcher
      v-model="regionSwitcher"
      @new-region="listenToUpdates($event)"
    />
    <component :is="byodInjector" />
  </v-app>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    regionSwitcher: false,
    settingsDrawer: false,
    byodInjector: null,
  }),
  computed: {
    region() {
      return (
        this.$route.params.region || this.$store.state.settings.currentRegion
      )
    },
    regionName() {
      return this.$store.state.regions.data[this.region]?.name
    },
    settingsAutoRefresh() {
      return this.$store.state.settings.autoRefresh
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
  mounted() {
    this.$store.dispatch('regions/loadAll').then(() => {
      // Check if region exists
      if (!(this.region in this.$store.state.regions.data)) {
        this.$nuxt.error({
          message: "This region dosen't exist.",
          statusCode: 404,
        })
        return false
      }

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

    // Load ByodInjector component if BYOD module is actived
    // TODO: find a better way to handle BYOD at loading
    // if (this.settingsByod) this.byodInjector = 'ByodInjector'

    if (this.settingsDarkMode) {
      // https://csabaszabo.dev/blog/dark-mode-for-website-with-nuxtjs-and-vuetify/
      setTimeout(() => (this.$vuetify.theme.dark = true), 0)
    }
    this.$i18n.setLocale(this.settingsLang)
    // this.$vuetify.lang.current = this.settingsLang
  },
  methods: {
    listenToUpdates(region) {
      // Remove any existing channels
      Object.keys(this.$echo.connector?.channels).forEach((channel) => {
        this.$echo.leave(channel)
      })

      // Add the new channel
      this.$echo.channel(region.slug).listen('AgencyUpdated', (event) => {
        // Check if autoRefresh is enabled and if agency is selected in settings
        if (!this.settingsAutoRefresh) return false
        if (!this.$store.state.settings.activeAgencies.includes(event.slug)) {
          return false
        }

        // Find agency
        const agency = this.$store.state.agencies.data[event.slug]

        // If dosen't exist, don't proceed
        if (!agency) return false

        this.$store.dispatch('vehicles/load', agency)
      })
    },
  },
}
</script>
