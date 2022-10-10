<template>
  <v-skeleton-loader
    v-if="link.loading || !link.url"
    class="mt-4"
    width="100%"
    min-height="62px"
    max-height="62px"
    type="image"
  ></v-skeleton-loader>

  <v-sheet
    v-else
    outlined
    rounded="lg"
    class="px-4 py-2 mt-4 d-flex align-center justify-space-between cursor-pointer flex-shrink-0 tt-links__link text-decoration-none"
    :title="$t('mapBottomSheet.openLink')"
    tag="a"
    :href="generatedUrl"
    target="_blank"
  >
    <div>
      <p class="subtitle-2 mb-1">
        {{ link.title }}
      </p>
      <p class="body-2 mb-0">
        {{ link.description }}
      </p>
    </div>
    <v-icon class="ml-4" size="20px">
      {{ mdiOpenInNew }}
    </v-icon>
  </v-sheet>
</template>

<script>
import { mdiOpenInNew } from '@mdi/js'

export default {
  props: {
    link: {
      type: Object,
      required: false,
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
      return this.link.url
        .replace(':id', this.vehicle.id)
        .replace(':ref', this.vehicle.ref)
        .replace(':trip', this.vehicle.tripId)
    },
  },
}
</script>

<style>
.tt-links__links {
  border: 1px solid #72777e;
}
</style>
