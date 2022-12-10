<template>
  <nav
    class="tw-fixed tw-bottom-0 tw-z-10 tw-w-full tw-bg-neutral-99 tw-text-sm tw-font-medium tw-leading-4 tw-tracking-wider dark:tw-bg-neutral-10 md:tw-left-0 md:tw-top-0 md:tw-mt-16 md:tw-hidden md:tw-h-full md:tw-w-20"
  >
    <ul
      class="tw-flex tw-list-none tw-items-center tw-justify-around tw-gap-x-2 tw-bg-primary-40/12 tw-pt-3 tw-pb-4 !tw-pl-0 dark:tw-bg-primary-80/12 md:tw-h-full md:tw-flex-col md:tw-justify-center md:tw-gap-y-3 md:tw-py-0"
    >
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
  }),
  computed: {
    region() {
      return (
        this.$route.params.region || this.$store.state.settings.currentRegion
      )
    },
  },
}
</script>
