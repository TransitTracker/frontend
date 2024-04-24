<template>
  <v-app class="tt-app">
    <TwTopAppBar />
    <TwNavigationRail />
    <v-main class="mb-16 mb-md-0 ml-md-20">
      <TwAlert />
      <NotificationsCentre
        v-if="dataIsLoaded"
        v-model="openNotificationsCentre"
      />
      <RegionSwitcher v-model="openRegionSwitcher" />
      <SettingsDrawer v-model="openSettingsDrawer" />
      <HomeDownloadDialog v-model="openDownloadAssistant" />
      <nuxt />
    </v-main>
    <TwNavigationBar v-if="dataIsLoaded" />
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
        {{
          $t(
            `settings.pwa.${
              updatePending ? 'updatePending' : 'updateAvailable'
            }`
          )
        }}
      </span>
      <template #action>
        <v-btn
          v-if="!updatePending"
          small
          depressed
          block
          :color="settingsDarkMode ? null : 'primary'"
          @click="installUpdate"
        >
          {{ $t('settings.pwa.installUpdate') }}
        </v-btn>
      </template>
    </v-snackbar>
    <script
      async
      defer
      data-website-id="69f24534-1974-4b50-9193-18cfadbdd7d8"
      data-domains="www.transittracker.ca,transittracker.ca"
      data-cache="true"
      src="https://analytics.us.umami.is/script.js"
    ></script>
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
    byodInjector: null,
    mdiCog,
    mdiFolderUpload,
    mdiMap,
    mdiMenuDown,
    mdiTable,
    mdiViewGrid,
    workbox: null,
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
    openNotificationsCentre: {
      get() {
        return this.$store.state.app.openNotificationsCentre
      },
      set(value) {
        this.$store.commit('app/set', { key: 'openNotificationsCentre', value })
      },
    },
    openRegionSwitcher: {
      get() {
        return this.$store.state.app.openRegionSwitcher
      },
      set(value) {
        this.$store.commit('app/set', { key: 'openRegionSwitcher', value })
      },
    },
    openSettingsDrawer: {
      get() {
        return this.$store.state.app.openSettingsDrawer
      },
      set(value) {
        this.$store.commit('app/set', { key: 'openSettingsDrawer', value })
      },
    },
    openDownloadAssistant: {
      get() {
        return this.$store.state.app.openDownloadAssistant
      },
      set(value) {
        this.$store.commit('app/set', { key: 'openDownloadAssistant', value })
      },
    },
    updatePending() {
      return this.$store.state.app.updatePending
    },
  },
  mounted() {
    if (this.settingsDarkMode) {
      // https://csabaszabo.dev/blog/dark-mode-for-website-with-nuxtjs-and-vuetify/
      setTimeout(() => (this.$vuetify.theme.dark = true), 0)
    }

    // Set language only if defined
    if (this.settingsLang) this.$i18n.setLocale(this.settingsLang)

    // this.handleWorkboxEvents()

    // Install prompt
    window.addEventListener('beforeinstallprompt', (event) => {
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

    // Import tag data
    this.$store.dispatch('tags/getAll')
  },
  methods: {
    async handleWorkboxEvents() {
      // Workbox update
      this.workbox = await window.$workbox

      if (!this.workbox) {
        return
      }

      // Occurs when the user accepts the update and the new SW is ready to take control
      this.workbox.addEventListener('controlling', () => {
        console.log('WB Controlling')
        window.location.reload()
      })

      // The new SW is installing but is waiting for activation
      this.workbox.addEventListener('waiting', (event) => {
        console.log('WB Waiting')
        this.$store.commit('app/set', {
          key: 'updateAvailable',
          value: true,
        })
      })
    },
    installUpdate() {
      console.log('WB skip waiting')
      this.$store.commit('app/set', {
        key: 'updatePending',
        value: true,
      })

      this.workbox.messageSkipWaiting()
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
