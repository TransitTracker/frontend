<template>
  <a
    class="tw-flex tw-items-center tw-justify-between tw-gap-4 tw-rounded-lg tw-border tw-border-solid tw-border-neutralVariant-50 tw-px-4 tw-py-2 !tw-text-neutral-10 tw-no-underline dark:tw-border-neutralVariant-60 dark:!tw-text-neutral-90"
    :title="$t('mapBottomSheet.openLink')"
    :href="generatedUrl"
    target="_blank"
    :class="[
      !link.title && 'tw-pointer-events-none tw-animate-pulse tw-cursor-wait',
    ]"
  >
    <div class="tw-grow tw-space-y-1">
      <p v-if="link.title" class="!tw-mb-0 tw-text-sm tw-leading-5">
        {{ link.title }}
      </p>
      <div
        v-else
        class="tw-h-4 tw-w-1/2 tw-rounded-sm tw-bg-neutralVariant-90 dark:tw-bg-neutralVariant-30"
      ></div>
      <p v-if="link.title" class="tw-text-xs tw-font-medium tw-leading-4">
        {{ link.description }}
      </p>
      <div
        v-else
        class="tw-h-4 tw-w-1/3 tw-rounded-sm tw-bg-neutralVariant-90 dark:tw-bg-neutralVariant-30"
      ></div>
    </div>
    <TwIcon v-if="link.title" class="tw-h-5 tw-w-5" :path="mdiOpenInNew" />
    <div
      v-else
      class="tw-h-4 tw-w-4 tw-rounded-full tw-bg-neutralVariant-90 dark:tw-bg-neutralVariant-30"
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
