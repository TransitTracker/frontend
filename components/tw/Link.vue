<template>
  <a
    class="tw-flex tw-items-center tw-justify-between tw-gap-4 tw-rounded-lg tw-border tw-border-solid tw-border-neutralVariant-50 tw-px-4 tw-py-2 !tw-text-neutral-10 tw-no-underline dark:tw-border-neutralVariant-60 dark:!tw-text-neutral-90"
    :title="$t('openLink')"
    :href="generatedUrl"
    target="_blank"
  >
    <div class="tw-grow tw-space-y-1">
      <p class="!tw-mb-0 tw-text-sm tw-leading-5">
        {{ link.title }}
      </p>
      <p class="tw-text-xs tw-font-medium tw-leading-4">
        {{ link.description }}
      </p>
    </div>
    <TwIcon class="tw-h-5 tw-w-5" :path="mdiOpenInNew" />
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
    link: {},
  }),
  computed: {
    generatedUrl() {
      if (!this.link.url) {
        return null
      }

      return this.link.url
        .replace(':id', this.vehicle.id)
        .replace(':ref', this.vehicle.ref)
        .replace(':trip', this.vehicle.tripId)
    },
  },
  mounted() {
    this.$store.dispatch('links/get', this.linkId).then((link) => {
      this.link = link
    })
  },
}
</script>

<i18n>
  {
    "en": {
      "openLink": "Open the link (in a new tab)"
    },
    "fr": {
      "openLink": "Ouvrir le lien (dans un nouvel onglet)"
    }
  }
</i18n>
