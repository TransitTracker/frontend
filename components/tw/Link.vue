<template>
  <a
    class="tw-flex tw-animate-pulse tw-cursor-wait tw-items-center tw-justify-between tw-gap-4 tw-rounded-lg tw-border tw-border-solid tw-border-neutralVariant-50 tw-px-4 tw-py-2 dark:tw-border-neutralVariant-60 tw-pointer-events-none"
    :title="$t('mapBottomSheet.openLink')"
    :href="generatedUrl"
    target="_blank"
  >
    <div class="tw-grow tw-space-y-1">
      <p class="tw-text-sm tw-leading-5" v-if="link.title">
        {{ link.title }}
      </p>
      <div
        class="tw-h-4 tw-w-1/2 tw-rounded-sm tw-bg-neutralVariant-90 dark:tw-bg-neutralVariant-30"
        v-else
      ></div>
      <p class="tw-text-xs tw-font-medium tw-leading-4" v-if="link.title">
        {{ link.description }}
      </p>
      <div
        class="tw-h-4 tw-w-1/3 tw-rounded-sm tw-bg-neutralVariant-90 dark:tw-bg-neutralVariant-30"
        v-else
      ></div>
    </div>
    <TwIcon class="tw-h-4 tw-w-4" :path="mdiOpenInNew" v-if="link.title" />
    <div
      class="tw-h-4 tw-w-4 tw-rounded-full tw-bg-neutralVariant-90 dark:tw-bg-neutralVariant-30"
      v-else
    ></div>
  </a>
</template>

<script>
import { mdiOpenInNew } from '@mdi/js'

export default {
  props: {
    linkId: {
      type: Number,
      required: true,
      default: null,
    },
    vehicle: {
      type: Object,
      required: false,
      default: null,
    },
  },
  data: () => ({
    mdiOpenInNew,
  }),
  computed: {
    generatedUrl() {
      if (!this.link.url) {
        return '#'
      }

      return this.link.url
        .replace(':id', this.vehicle.id)
        .replace(':ref', this.vehicle.ref)
        .replace(':trip', this.vehicle.tripId)
    },
    link() {
      return this.$store.state.links.data[this.linkId] ?? {}
    },
  },
}
</script>
