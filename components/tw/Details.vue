<template>
  <details @toggle="toggle" ref="details">
    <summary
      class="tw-flex tw-cursor-pointer tw-list-none tw-items-center tw-justify-between"
    >
      <slot name="summary" />
      <TwStandardIconButton
        :class="{ 'tw-rotate-180': open, '!tw-h-6 !tw-w-6': smallIcon }"
        class="tw-transition-transform tw-duration-200 tw-ease-linear"
        @click="manual"
      >
        <TwIcon :path="mdiChevronDown" />
      </TwStandardIconButton>
    </summary>
    <slot />
  </details>
</template>

<script>
import { mdiChevronDown } from '@mdi/js'

export default {
  props: {
    smallIcon: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data: () => ({
    open: false,
    mdiChevronDown,
  }),
  methods: {
    toggle() {
      this.open = this.$refs.details.open
    },
    manual() {
      const newState = !this.$refs.details.open

      if (newState) {
        this.$refs.details.setAttribute('open', '')
      } else {
        this.$refs.details.removeAttribute('open')
      }
    },
  },
}
</script>
