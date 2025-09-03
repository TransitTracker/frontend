<template>
  <div>
    <div class="tw-flex tw-items-center tw-justify-between tw-gap-x-3">
      <h3 class="tw-font-medium">{{ title }}</h3>
      <TwStandardIconButton v-if="newView" @click="navigateToView">
        <TwIcon :path="mdiArrowRight" />
      </TwStandardIconButton>
    </div>
    <p
      v-if="description"
      class="!tw-mb-0 tw-text-sm tw-text-neutralVariant-10 dark:tw-text-neutralVariant-90"
    >
      {{ description }}
    </p>
    <div class="tw-mt-2 tw-grid tw-grid-cols-2 tw-gap-2">
      <slot />
    </div>
  </div>
</template>

<script>
import { mdiArrowRight } from '@mdi/js'

export default {
  data: () => ({
    mdiArrowRight,
  }),
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: null,
    },
    newView: {
      type: String,
      required: false,
      default: null,
    },
  },
  methods: {
    navigateToView() {
      this.$store.commit('app/set', {
        key: 'settingsView',
        value: this.newView,
      })
    },
  },
}
</script>
