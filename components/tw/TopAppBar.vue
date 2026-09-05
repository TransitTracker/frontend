<template>
  <nav
    class="tw:fixed tw:inset-x-0 tw:top-0 tw:z-20 tw:flex tw:h-16 tw:w-full tw:items-center tw:gap-x-4 tw:bg-primary-40 tw:px-4 tw:dark:bg-primary-4 tw:md:hidden"
  >
    <NuxtLink
      class="tw:group tw:relative tw:-mx-2 tw:-my-2 tw:flex tw:items-center tw:gap-4 tw:px-2 tw:py-2 tw:text-white! tw:no-underline tw:focus:outline-hidden tw:dark:text-neutral-90! tw:md:-mr-4 tw:md:pr-4"
      :to="localePath('/')"
    >
      <div
        class="tw:absolute tw:inset-0 tw:h-full tw:w-full tw:rounded-full tw:bg-transparent tw:transition-colors tw:group-hover:bg-white/8 tw:group-focus:bg-white/12 tw:dark:group-hover:bg-primary-20/8 tw:dark:group-focus:bg-primary-20/12"
      ></div>
      <svg
        viewBox="0 0 295.01 403.72"
        xmlns="http://www.w3.org/2000/svg"
        class="tw:h-8 tw:fill-current"
      >
        <path
          d="m147.51 1.875c-80.34 0-145.63 65.291-145.63 145.63 0 84.709 87.863 198.79 126.94 245.63 9.708 11.651 27.428 11.651 37.137 0 39.32-46.845 127.18-160.92 127.18-245.63 0-80.34-65.291-145.63-145.63-145.63zm0 70.631c34.895 0 63.158 3.9481 63.158 31.58v78.945c0 6.948-3.0785 13.185-7.8945 17.527v10.105c0 6.553-5.3678 11.842-11.842 11.842-6.553 0-11.842-5.3678-11.842-11.842v-3.9473h-63.158v3.9473a11.826 11.826 0 0 1-11.842 11.842 11.826 11.826 0 0 1-11.844-11.842v-10.105c-4.816-4.342-7.8945-10.579-7.8945-17.527v-78.945c0-27.632 28.263-31.58 63.158-31.58zm-47.367 31.58v39.473h94.734v-39.473h-94.734zm11.842 63.156a11.826 11.826 0 0 0-11.842 11.844 11.826 11.826 0 0 0 11.842 11.842c6.552 0 11.842-5.2888 11.842-11.842a11.826 11.826 0 0 0-11.842-11.844zm71.051 0c-6.552 0-11.842 5.2908-11.842 11.844a11.826 11.826 0 0 0 11.842 11.842 11.826 11.826 0 0 0 11.842-11.842 11.826 11.826 0 0 0-11.842-11.844z"
        />
      </svg>
      <h1
        class="tw:hidden tw:text-[1.375rem] tw:font-semibold tw:leading-7 tw:md:block"
      >
        Transit Tracker
      </h1>
    </NuxtLink>
    <div class="tw:grow"></div>
    <TwStandardIconButton
      v-if="dataIsLoaded"
      color="onNavbar"
      @click="openAlerts()"
    >
      <TwIcon :path="mdiBell" />
    </TwStandardIconButton>
    <TwStandardIconButton
      v-if="dataIsLoaded"
      :title="$t('regionSwitcher.title')"
      color="onNavbar"
      @click="openRegionSwitcher()"
    >
      <!-- {{ region }} -->
      <TwIcon :path="mdiCity" />
    </TwStandardIconButton>
    <TwTextButton v-else color="onNavbar" @click="switchLanguage">
      {{ settingsLang === 'en' ? 'FR' : 'EN' }}
    </TwTextButton>
    <TwStandardIconButton color="onNavbar" @click="openSettings()">
      <TwIcon :path="mdiCog" />
    </TwStandardIconButton>
  </nav>
</template>

<script>
import { mdiBell, mdiCog, mdiCity } from '@mdi/js'

export default {
  data: () => ({
    mdiBell,
    mdiCog,
    mdiCity,
  }),
  computed: {
    dataIsLoaded() {
      return this.$store.state.app.dataIsLoaded
    },
    region() {
      return this.$store.state.regions.data[
        this.$route.params.region || this.$store.state.settings.currentRegion
      ]?.name
    },
    settingsLang() {
      return this.$store.state.settings.lang
    },
  },
  methods: {
    openAlerts() {
      this.$store.commit('app/set', { key: 'alertsView', value: 'index' })
    },
    openRegionSwitcher() {
      this.$store.commit('app/set', {
        key: 'regionSwitcherVisible',
        value: true,
      })
    },
    openSettings() {
      this.$store.commit('app/set', {
        key: 'settingsView',
        value: 'index',
      })
    },
    switchLanguage() {
      this.$i18n.setLocale(this.settingsLang === 'en' ? 'fr' : 'en')
    },
  },
}
</script>
