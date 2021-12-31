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
      <NotificationsCentre v-if="dataIsLoaded" />
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
import { urlBase64ToUint8Array } from '@/utils/push'

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
    settingsPushSubscriptionUuid() {
      return this.$store.state.settings.pushSubscriptionUuid
    },
    updateAvailable() {
      return this.$store.state.app.updateAvailable
    },
  },
  mounted() {
    this.checkForOldSettings()

    if (this.settingsDarkMode) {
      // https://csabaszabo.dev/blog/dark-mode-for-website-with-nuxtjs-and-vuetify/
      setTimeout(() => (this.$vuetify.theme.dark = true), 0)
    }

    // Set language only if defined
    if (this.settingsLang) this.$i18n.setLocale(this.settingsLang)

    this.handleWorkboxEvents()

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

    // Update push subscription
    if (this.settingsPushSubscriptionUuid) {
      this.verifyNotificationSubscriptionStatus()
    }
  },
  methods: {
    checkForOldSettings() {
      // Import settings from previous versions
      // TODO: remove after a transition period
      if (!window.localStorage) return

      const vuex = JSON.parse(window.localStorage.getItem('vuex'))

      if (!vuex || !vuex.settings) return

      this.$store.commit('settings/set', {
        setting: 'activeAgencies',
        value: vuex.settings.activeAgencies,
      })

      this.$store.commit('settings/set', {
        setting: 'autoRefresh',
        value: vuex.settings.autoRefresh,
      })

      this.$store.commit('settings/set', {
        setting: 'theme',
        value: vuex.settings.darkMode ? 'dark' : 'light',
      })

      this.$store.commit('settings/set', {
        setting: 'launch',
        value: vuex.settings.defaultPath,
      })

      this.$i18n.setLocale(vuex.settings.language)

      this.$store.commit('settings/set', {
        setting: 'currentRegion',
        value: vuex.settings.activeRegion,
      })

      // Rename and remove old one
      window.localStorage.setItem(
        'old-tt-settings',
        window.localStorage.getItem('vuex')
      )
      window.localStorage.removeItem('vuex')
    },
    async handleWorkboxEvents() {
      // Workbox update
      const workbox = await window.$workbox

      if (!workbox) {
        return
      }

      workbox.addEventListener('installed', (event) => {
        if (!event.isUpdate) {
          return
        }

        this.$store.commit('app/set', {
          key: 'updateAvailable',
          value: true,
        })
      })
    },
    async verifyNotificationSubscriptionStatus() {
      try {
        await Notification.requestPermission()

        const registration = await navigator.serviceWorker.ready

        const pushSubscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(process.env.vapidKey),
        })

        const { data } = await this.$axios.post('/push/profile/verify', {
          ...pushSubscription.toJSON(),
          uuid: this.settingsPushSubscriptionUuid,
          isFrench: this.$i18n.locale === 'fr',
        })

        this.$store.commit('settings/set', {
          setting: 'pushSubscriptionUuid',
          value: data.data.uuid,
        })
      } catch (error) {
        this.$store.commit('settings/set', {
          setting: 'pushSubscriptionUuid',
          value: undefined,
        })
      }
    },
    switchLanguage(lang) {
      this.$store.commit('settings/set', { setting: 'lang', value: lang })
    },
  },
}
</script>
