<template>
  <nav
    class="tw-inset-x-0 tw-top-0 tw-z-20 tw-flex tw-h-16 tw-w-full tw-items-center tw-gap-x-4 tw-bg-primary-40 tw-px-4 dark:tw-bg-primary-80 md:tw-hidden"
  >
    <NuxtLink
      class="tw-group tw-relative -tw-my-2 -tw-mx-2 tw-flex tw-items-center tw-gap-4 tw-py-2 tw-px-2 !tw-text-white tw-no-underline focus:tw-outline-none dark:!tw-text-primary-20 md:-tw-mr-4 md:tw-pr-4"
      :to="localePath('/')"
    >
      <div
        class="tw-absolute tw-inset-0 tw-h-full tw-w-full tw-rounded-full tw-bg-white tw-bg-opacity-0 tw-transition-colors tw-duration-200 group-hover:tw-bg-opacity-8 group-focus:tw-bg-opacity-12 dark:tw-bg-primary-20 dark:tw-opacity-0"
      ></div>
      <svg
        viewBox="0 0 295.01 403.72"
        xmlns="http://www.w3.org/2000/svg"
        class="tw-h-8 tw-fill-current"
      >
        <path
          d="m147.51 1.875c-80.34 0-145.63 65.291-145.63 145.63 0 84.709 87.863 198.79 126.94 245.63 9.708 11.651 27.428 11.651 37.137 0 39.32-46.845 127.18-160.92 127.18-245.63 0-80.34-65.291-145.63-145.63-145.63zm0 70.631c34.895 0 63.158 3.9481 63.158 31.58v78.945c0 6.948-3.0785 13.185-7.8945 17.527v10.105c0 6.553-5.3678 11.842-11.842 11.842-6.553 0-11.842-5.3678-11.842-11.842v-3.9473h-63.158v3.9473a11.826 11.826 0 0 1-11.842 11.842 11.826 11.826 0 0 1-11.844-11.842v-10.105c-4.816-4.342-7.8945-10.579-7.8945-17.527v-78.945c0-27.632 28.263-31.58 63.158-31.58zm-47.367 31.58v39.473h94.734v-39.473h-94.734zm11.842 63.156a11.826 11.826 0 0 0-11.842 11.844 11.826 11.826 0 0 0 11.842 11.842c6.552 0 11.842-5.2888 11.842-11.842a11.826 11.826 0 0 0-11.842-11.844zm71.051 0c-6.552 0-11.842 5.2908-11.842 11.844a11.826 11.826 0 0 0 11.842 11.842 11.826 11.826 0 0 0 11.842-11.842 11.826 11.826 0 0 0-11.842-11.844z"
        />
      </svg>
      <h1
        class="tw-hidden tw-text-[1.375rem] tw-font-semibold tw-leading-7 md:tw-block"
      >
        Transit Tracker
      </h1>
    </NuxtLink>
    <div class="tw-grow"></div>
    <TwOutlinedIconButton
      :title="$t('regionSwitcher.title')"
      color="onPrimary"
      v-if="dataIsLoaded"
      @click="regionSwitcher = true"
    >
      <!-- {{ region }} -->
      <TwIcon :path="mdiCity" />
    </TwOutlinedIconButton>
    <TwTextButton
      color="onPrimary"
      v-else
      @click="switchLanguage(settingsLang === 'en' ? 'fr' : 'en')"
    >
      {{ settingsLang === 'en' ? 'FR' : 'EN' }}
    </TwTextButton>
    <TwOutlinedIconButton @click="settingsDrawer = true" color="onPrimary">
      <TwIcon :path="mdiCog" />
    </TwOutlinedIconButton>
    <RegionSwitcher v-model="regionSwitcher" />
    <SettingsDrawer v-model="settingsDrawer" />
  </nav>
</template>

<script>
import { mdiCog, mdiCity } from '@mdi/js'

export default {
  data: () => ({
    mdiCog,
    mdiCity,
    regionSwitcher: false,
    settingsDrawer: false,
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
}
</script>
