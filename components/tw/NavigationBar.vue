<template>
  <nav
    class="tw-fixed tw-bottom-0 tw-w-full tw-bg-neutral-99 tw-text-[.6875rem] tw-font-medium tw-leading-4 tw-text-neutralVariant-30 dark:tw-bg-neutral-10 dark:tw-text-neutralVariant-80"
  >
    <ul
      class="tw-mt-3 tw-mb-4 tw-flex tw-list-none tw-items-center tw-justify-center tw-gap-x-2"
    >
      <NuxtLink
        v-slot="{ isActive, navigate }"
        :to="localePath(`/regions/${region}/`)"
        tag="button"
        exact
      >
        <li @click="navigate">
          <div
            class="tw-flex tw-h-8 tw-w-16 tw-items-center tw-justify-center tw-rounded-2xl hover:tw-bg-neutralVariant-30/8 dark:hover:tw-bg-neutralVariant-80/8"
            :class="{
              'tw-bg-secondary-90 tw-text-secondary-10 dark:tw-bg-secondary-30 dark:tw-text-secondary-90':
                isActive,
            }"
          >
            <TwIcon :path="isActive ? mdiHome : mdiHomeOutline" />
          </div>
          <p
            class="!tw-mb-0 tw-pt-1 tw-text-center"
            :class="{ 'tw-text-neutral-10 dark:tw-text-neutral-90': isActive }"
          >
            {{ $t('app.tabHome') }}
          </p>
        </li>
      </NuxtLink>

      <NuxtLink
        v-slot="{ isActive, navigate }"
        :to="localePath(`/regions/${region}/map`)"
        tag="button"
        exact
      >
        <li @click="navigate">
          <div
            class="tw-flex tw-h-8 tw-w-16 tw-items-center tw-justify-center tw-rounded-2xl hover:tw-bg-neutralVariant-30/8 dark:hover:tw-bg-neutralVariant-80/8"
            :class="{
              'tw-bg-secondary-90 tw-text-secondary-10 dark:tw-bg-secondary-30 dark:tw-text-secondary-90':
                isActive,
            }"
          >
            <TwIcon :path="isActive ? mdiMap : mdiMapOutline" />
          </div>
          <p
            class="!tw-mb-0 tw-pt-1 tw-text-center"
            :class="{ 'tw-text-neutral-10 dark:tw-text-neutral-90': isActive }"
          >
            {{ $t('app.tabMap') }}
          </p>
        </li>
      </NuxtLink>

      <NuxtLink
        v-slot="{ isActive, navigate }"
        :to="localePath(`/regions/${region}/table`)"
        tag="button"
        exact
      >
        <li @click="navigate">
          <div
            class="tw-flex tw-h-8 tw-w-16 tw-items-center tw-justify-center tw-rounded-2xl hover:tw-bg-neutralVariant-30/8 dark:hover:tw-bg-neutralVariant-80/8"
            :class="{
              'tw-bg-secondary-90 tw-text-secondary-10 dark:tw-bg-secondary-30 dark:tw-text-secondary-90':
                isActive,
            }"
          >
            <TwIcon :path="isActive ? mdiTable : mdiTable" />
          </div>
          <p
            class="!tw-mb-0 tw-pt-1 tw-text-center"
            :class="{ 'tw-text-neutral-10 dark:tw-text-neutral-90': isActive }"
          >
            {{ $t('app.tabTable') }}
          </p>
        </li>
      </NuxtLink>
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
