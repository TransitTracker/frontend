<template>
  <nav
    class="tw-fixed tw-bottom-0 tw-w-full tw-bg-neutral-99 tw-text-sm tw-font-medium tw-leading-4 tw-tracking-wider dark:tw-bg-neutral-10 md:tw-left-0 md:tw-top-0 md:tw-h-full md:tw-w-20"
  >
    <ul
      class="tw-flex tw-list-none tw-items-center tw-justify-around tw-gap-x-2 tw-bg-primary-40/12 tw-pt-3 tw-pb-4 dark:tw-bg-primary-80/12 md:tw-h-full md:tw-flex-row"
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
        :icon="mdiTable"
      >
        {{ $t('app.tabTable') }}
      </TwNavigationBarButton>
      <TwNavigationBarButton
        :to="localePath(`/regions/${region}/`)"
        :icon="mdiHomeOutline"
        :active-icon="mdiHome"
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
  mdiTable,
} from '@mdi/js'
export default {
  data: () => ({
    mdiHomeOutline,
    mdiHome,
    mdiMap,
    mdiMapOutline,
    mdiTable,
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
