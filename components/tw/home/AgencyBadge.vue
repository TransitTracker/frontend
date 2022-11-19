<template>
  <li
    class="tw-relative tw-overflow-hidden tw-rounded-lg tw-py-1 tw-px-2 tw-text-sm tw-leading-5 md:tw-p-2"
    :style="{ backgroundColor: `${agency.color}26` }"
  >
    <v-progress-linear
      v-if="!(agency.slug in vehicleCounts)"
      indeterminate
      :color="agency.color"
      class="!tw-absolute tw-inset-x-0 tw-top-0"
    />
    <b class="tw-hidden tw-font-medium md:tw-block">
      {{ agency.name }}
    </b>
    <b class="tw-font-medium md:tw-hidden">
      {{ agency.shortName }}
    </b>
    <p v-if="agency.slug in vehicleCounts" class="!tw-mb-0">
      {{ $tc('landing.vehicles', vehicleCounts[agency.slug]) }}
      <br class="md:tw-hidden" />
      <span class="tw-hidden md:tw-inline">&bull;</span>
      <TwTimeAgo :timestamp="timestamp" />
    </p>
    <div
      class="tw-absolute tw-inset-y-0 -tw-right-4 tw-h-full tw-w-10 tw-skew-x-[18deg]"
      :style="{ backgroundColor: agency.color }"
    ></div>
  </li>
</template>

<script>
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
  computed: {
    vehicleCounts() {
      return this.$store.getters['vehicles/counts']
    },
  },
}
</script>
