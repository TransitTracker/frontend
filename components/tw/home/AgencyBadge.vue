<template>
  <li
    class="tw-relative tw-overflow-hidden tw-rounded-lg tw-py-1 tw-px-2 tw-text-sm tw-leading-5 md:tw-p-2"
    :style="{ backgroundColor: `${agency.color}26` }"
  >
    <b class="tw-hidden tw-font-medium md:tw-block">
      {{ agency.name }}
    </b>
    <b class="tw-font-medium md:tw-hidden">
      {{ agency.shortName }}
    </b>
    <p class="!tw-mb-0">
      {{ $tc('landing.vehicles', vehicleCounts[agency.slug]) }}
      &bull; il y a 55 sec.
    </p>
    <div
      class="tw-absolute tw-inset-y-0 -tw-right-2 tw-h-full tw-w-8 tw-skew-x-[18deg]"
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
  },
  computed: {
    vehicleCounts() {
      return this.$store.getters['vehicles/counts']
    },
  },
}
</script>
