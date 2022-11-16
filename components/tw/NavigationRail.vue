<template>
  <nav
    class="tw-fixed tw-inset-y-0 tw-left-0 tw-z-10 tw-hidden tw-h-full tw-w-20 tw-bg-neutral-99 tw-text-sm tw-font-medium tw-leading-4 tw-tracking-wider dark:tw-bg-neutral-10 md:tw-block"
  >
    <ul
      class="tw-flex tw-h-full tw-list-none tw-flex-col tw-items-center tw-gap-y-3 tw-bg-primary-40/25 tw-py-4 !tw-pl-0 dark:tw-bg-primary-80/12"
    >
      <NuxtLink
        class="tw-group tw-relative -tw-m-2 tw-my-auto tw-h-14 tw-p-2 !tw-text-primary-40 tw-no-underline focus:tw-outline-none dark:!tw-text-white"
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
      </NuxtLink>

      <TwNavigationBarButton
        :to="localePath(`/regions/${region}/`)"
        :icon="mdiHomeOutline"
        :active-icon="mdiHome"
      >
        {{ $t('app.tabHome') }}
      </TwNavigationBarButton>
      <TwNavigationBarButton
        :to="localePath(`/regions/${region}/map`)"
        :icon="mdiMapOutline"
        :active-icon="mdiMap"
      >
        {{ $t('app.tabMap') }}
      </TwNavigationBarButton>
      <TwNavigationBarButton
        :to="localePath(`/regions/${region}/table`)"
        :icon="msTableOutline"
        :active-icon="msTable"
      >
        {{ $t('app.tabTable') }}
      </TwNavigationBarButton>
      <TwNavigationBarButton
        :to="localePath(`/byod`)"
        :icon="mdiFolderUploadOutline"
        :active-icon="mdiFolderUpload"
      >
        {{ $t('app.tabByod') }}
      </TwNavigationBarButton>
      <div class="tw-grow"></div>
      <TwStandardIconButton @click="open('SettingsDrawer')" v-if="dataIsLoaded">
        <TwIcon :path="mdiBell" />
      </TwStandardIconButton>
      <TwStandardIconButton @click="open('RegionSwitcher')" v-if="dataIsLoaded">
        <TwIcon :path="mdiCity" />
      </TwStandardIconButton>
      <TwStandardIconButton @click="open('SettingsDrawer')">
        <TwIcon :path="mdiCog" />
      </TwStandardIconButton>
    </ul>
  </nav>
</template>

<script>
import {
  mdiHomeOutline,
  mdiHome,
  mdiMap,
  mdiMapOutline,
  mdiFolderUpload,
  mdiFolderUploadOutline,
  mdiBell,
  mdiCity,
  mdiCog,
} from '@mdi/js'
export default {
  data: () => ({
    mdiHomeOutline,
    mdiHome,
    mdiMap,
    mdiMapOutline,
    msTable:
      'M21 21v-4.65H3V21h18Zm0-6.65V9.625H3v4.725h18Zm0-6.725V3H3v4.625h18Z',
    msTableOutline:
      'M19 19v-3H5v3h14Zm0-5v-4H5v4h14Zm0-6V5H5v3h14ZM5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h14q.825 0 1.413.587Q21 4.175 21 5v14q0 .825-.587 1.413Q19.825 21 19 21Z',
    mdiFolderUpload,
    mdiFolderUploadOutline,
    mdiBell,
    mdiCity,
    mdiCog,
  }),
  computed: {
    region() {
      return (
        this.$route.params.region || this.$store.state.settings.currentRegion
      )
    },
    dataIsLoaded() {
      return this.$store.state.app.dataIsLoaded
    },
  },
  methods: {
    open(setting) {
      this.$store.commit('app/set', { key: 'open' + setting, value: true })
    },
  },
}
</script>
