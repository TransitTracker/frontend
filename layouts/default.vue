<template>
  <v-app class="tt-app">
    <v-app-bar
      fixed
      app
      color="primary"
      dark
      :elevation="hasAlert ? 0 : undefined"
    >
      <img
        src="/img/logo-white.svg"
        loading="lazy"
        alt="Logo"
        width="18px"
        class="ml-2 mr-3 cursor-pointer"
        @click="$router.push(localePath('/'))"
      />
      <v-toolbar-title
        class="cursor-pointer"
        @click="$router.push(localePath('/'))"
      >
        Transit Tracker
      </v-toolbar-title>
      <v-spacer />
      <v-btn
        v-if="dataIsLoaded"
        text
        :title="$t('regionSwitcher.title')"
        :small="$vuetify.breakpoint.smAndDown"
        @click="regionSwitcher = true"
      >
        {{ regionName }}
        <v-icon>{{ mdiMenuDown }}</v-icon>
      </v-btn>
      <v-btn
        v-else
        text
        nuxt
        :to="switchLocalePath(settingsLang === 'en' ? 'fr' : 'en')"
        @click="switchLanguage(settingsLang === 'en' ? 'fr' : 'en')"
      >
        {{ settingsLang === 'en' ? 'FR' : 'EN' }}
      </v-btn>
      <v-btn
        icon
        :title="$t('settings.open')"
        @click="settingsDrawer = !settingsDrawer"
      >
        <v-icon>{{ mdiCog }}</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <Alerts />
      <settings-drawer v-model="settingsDrawer" />
      <nuxt />
    </v-main>
    <nav>
      <v-bottom-navigation
        v-if="dataIsLoaded"
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
          <v-icon>{{ mdiViewGrid }}</v-icon>
        </v-btn>
        <v-btn
          :to="localePath(`/regions/${region}/map`)"
          nuxt
          style="background-color: transparent; height: inherit"
        >
          <span>{{ $t('app.tabMap') }}</span>
          <v-icon>{{ mdiMap }}</v-icon>
        </v-btn>
        <v-btn
          :to="localePath(`/regions/${region}/table`)"
          nuxt
          style="background-color: transparent; height: inherit"
        >
          <span>{{ $t('app.tabTable') }}</span>
          <v-icon>{{ mdiTable }}</v-icon>
        </v-btn>
        <v-btn
          :to="localePath('/byod')"
          nuxt
          style="background-color: transparent; height: inherit"
        >
          <span>{{ $t('app.tabByod') }}</span>
          <v-icon>{{ mdiFolderUpload }}</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </nav>
    <RegionSwitcher v-model="regionSwitcher" />
    <component :is="byodInjector" />
    <v-snackbar
      v-model="updateAvailable"
      :color="settingsDarkMode ? 'white' : null"
      app
      bottom
      right
      :timeout="-1"
    >
      <span :class="[settingsDarkMode && 'black--text']">
        {{ $t('settings.pwa.updateAvailable') }}
      </span>
      <template #action>
        <v-btn
          small
          depressed
          block
          :color="settingsDarkMode ? null : 'primary'"
          @click="$store.dispatch('app/installUpdate')"
        >
          {{ $t('settings.pwa.installUpdate') }}
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import {
  mdiCog,
  mdiFolderUpload,
  mdiMap,
  mdiMenuDown,
  mdiTable,
  mdiViewGrid,
} from '@mdi/js'

export default {
  data: () => ({
    loading: false,
    regionSwitcher: false,
    settingsDrawer: false,
    byodInjector: null,
    mdiCog,
    mdiFolderUpload,
    mdiMap,
    mdiMenuDown,
    mdiTable,
    mdiViewGrid,
  }),
  head() {
    return this.$nuxtI18nHead({ addSeoAttributes: true })
  },
  computed: {
    hasAlert() {
      return this.$store.getters['alerts/getCurrentAlert']
    },
    dataIsLoaded() {
      return this.$store.state.app.dataIsLoaded
    },
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
    settingsDarkMode() {
      const setting = this.$store.state.settings.theme
      if (setting === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
      }

      if (setting === 'dark') return true
      return false
    },
    settingsLang() {
      return this.$store.state.settings.lang
    },
    settingsLaunch() {
      return this.$store.state.settings.launch
    },
    updateAvailable() {
      return this.$store.state.app.updateAvailable
    },
  },
  mounted() {
    if (this.settingsDarkMode) {
      // https://csabaszabo.dev/blog/dark-mode-for-website-with-nuxtjs-and-vuetify/
      setTimeout(() => (this.$vuetify.theme.dark = true), 0)
    }

    // Set language only if defined
    if (this.settingsLang) this.$i18n.setLocale(this.settingsLang)

    this.handlePwa()
  },
  methods: {
    async handlePwa() {
      // Install prompt
      window.addEventListener('beforeinstallprompt', (event) => {
        console.log(event)

        event.preventDefault()
        this.$store.commit('app/set', {
          key: 'installPrompt',
          value: event,
        })
        this.$store.commit('app/set', {
          key: 'canInstall',
          value: true,
        })
      })

      // Workbox update
      const workbox = await window.$workbox
      if (workbox) {
        workbox.addEventListener('installed', (event) => {
          if (event.isUpdate) {
            this.$store.commit('app/set', {
              key: 'updateAvailable',
              value: true,
            })
          }
        })
      }
    },
    switchLanguage(lang) {
      this.$store.commit('settings/set', { setting: 'lang', value: lang })
    },
  },
}
</script>
