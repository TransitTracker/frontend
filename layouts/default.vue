<template>
  <div
    class="tt-app tw:relative tw:flex tw:font-sans tw:leading-normal tw:dark:text-white"
    :data-theme="[settingsDarkMode && 'dark']"
  >
    <div
      class="tw:relative tw:flex tw:min-h-screen tw:max-w-full tw:shrink tw:grow tw:basis-auto tw:flex-col"
    >
      <TwTopAppBar />
      <TwNavigationRail />
      <main
        class="tw:mb-16 tw:mt-16 tw:flex tw:max-w-full tw:shrink-0 tw:grow tw:basis-auto tw:p-0 tw:md:mb-0 tw:md:ml-20 tw:md:mt-0"
      >
        <div class="tw:relative tw:max-w-full tw:shrink tw:grow tw:basis-auto">
          <TwAlert />
          <TwRegionSwitcher />
          <SettingsDrawer />
          <TwAlertDrawer />
          <nuxt />
        </div>
      </main>

      <TwNavigationBar v-if="dataIsLoaded" />
    </div>
  </div>
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
    settingsView() {
      return this.$store.state.app.settingsView
    },
    updatePending() {
      return this.$store.state.app.updatePending
    },
    regionSwitcherVisible() {
      return this.$store.state.app.regionSwitcherVisible
    },
  },
  watch: {
    settingsDarkMode(oldVal, newVal) {
      this.$store.commit('app/set', {
        key: 'darkMode',
        value: newVal,
      })
    },
  },
  mounted() {
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

    // Check for dark mode
    const darkModeSetting = this.$store.state.settings.theme
    let isDarkMode = false
    if (darkModeSetting === 'system') {
      isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    }

    if (darkModeSetting === 'dark') isDarkMode = true
    this.$store.commit('app/set', {
      key: 'darkMode',
      value: isDarkMode,
    })

    // Import links and tag data
    this.$store.dispatch('links/getAll')
    this.$store.dispatch('tags/getAll')
    this.$store.dispatch('carriageTypes/getAll')
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
        window.location.reload()
      })

      // The new SW is installing but is waiting for activation
      this.workbox.addEventListener('waiting', (event) => {
        this.$store.commit('app/set', {
          key: 'updateAvailable',
          value: true,
        })
      })
    },
    installUpdate() {
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
