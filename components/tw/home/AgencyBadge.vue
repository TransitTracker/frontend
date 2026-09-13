<template>
  <li
    v-if="!agency.isArchived && !isLoading"
    class="tw:relative tw:flex tw:flex-col tw:justify-between tw:overflow-hidden tw:rounded-xl tw:border tw:border-neutral-variant-50/20 tw:p-3 tw:text-sm"
    :style="{ backgroundColor: `${agency.color}15` }"
  >
    <div class="tw:flex tw:items-start tw:justify-between tw:gap-2">
      <div class="tw:min-w-0">
        <b
          class="tw:block tw:truncate tw:font-medium tw:text-neutral-10 tw:dark:text-neutral-90"
        >
          {{ agency.name }}
        </b>
        <p
          class="tw:mb-0! tw:mt-0.5 tw:text-xs tw:text-neutral-variant-30 tw:dark:text-neutral-variant-80"
        >
          {{ $tc('landing.vehicles', vehicleCounts[agency.slug] || 0) }}
          <span v-if="timestamp">&bull;</span>
          <TwTimeAgo v-if="timestamp" :timestamp="timestamp" />
        </p>
      </div>
      <div
        class="tw:h-3.5 tw:w-3.5 tw:shrink-0 tw:rounded-full tw:border tw:border-white/20"
        :style="{ backgroundColor: agency.color }"
      ></div>
    </div>
    <div
      v-if="agency.license"
      class="tw:mt-2.5 tw:border-t tw:border-neutral-variant-50/15 tw:pt-2"
    >
      <a
        :href="agency.license.url"
        target="_blank"
        rel="noopener noreferrer"
        class="tw:inline-flex tw:max-w-full tw:items-center tw:gap-1 tw:text-xs tw:text-primary-40 tw:hover:underline tw:dark:text-primary-80"
      >
        <span class="tw:truncate">{{ agency.license.title }}</span>
        <TwIcon :path="mdiOpenInNew" class="tw:h-3 tw:w-3 tw:shrink-0" />
      </a>
    </div>
  </li>
</template>

<script>
import { mdiOpenInNew } from '@mdi/js'

export default {
  props: {
    agency: {
      type: Object,
      required: true,
    },
    timestamp: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data: () => ({
    mdiOpenInNew,
  }),
  computed: {
    vehicleCounts() {
      return this.$store.getters['vehicles/counts']
    },
    isLoading() {
      if (this.agency.slug in this.vehicleCounts) return false

      return true
    },
  },
}
</script>
