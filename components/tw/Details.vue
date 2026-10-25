<template>
  <details ref="details" @toggle="toggle">
    <summary
      class="tw:flex tw:cursor-pointer tw:list-none tw:items-center tw:justify-between"
    >
      <div class="tw:flex tw:items-center tw:gap-3">
        <TwIcon
          v-if="icon"
          :path="icon"
          class="tw:h-6 tw:w-6 tw:shrink-0 tw:text-primary-40 tw:dark:text-primary-80"
        />
        <slot name="summary" />
      </div>
      <TwStandardIconButton
        :class="{ 'tw:rotate-180': open, 'tw:h-6! tw:w-6!': smallIcon }"
        class="tw:transition-transform tw:duration-200 tw:ease-linear"
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
    icon: {
      type: String,
      required: false,
      default: null,
    },
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
      this.$emit('toggle', this.open)
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
