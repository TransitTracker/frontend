<template>
  <div
    ref="tooltip"
    role="tooltip"
    class="tw-hidden tw-rounded tw-bg-neutral-10 tw-px-1 tw-py-0.5 tw-text-center tw-text-sm tw-text-neutral-95 dark:tw-bg-neutral-90 dark:tw-text-neutral-20"
  >
    <slot></slot>
  </div>
</template>

<script>
/* import { createPopper } from '@popperjs/core/lib/popper-lite'
import preventOverflow from '@popperjs/core/lib/modifiers/preventOverflow' */

export default {
  props: {
    reference: {
      required: true,
    },
  },
  data: () => ({
    popperInstance: null,
  }),
  mounted() {
    /* this.popperInstance = createPopper(this.reference, this.$refs.tooltip, {
      modifiers: [preventOverflow],
    })

    const showEvents = ['mouseenter', 'focus']
    const hideEvents = ['mouseleave', 'blur']

    showEvents.forEach((event) => {
      this.reference.addEventListener(event, this.show)
    })

    hideEvents.forEach((event) => {
      this.reference.addEventListener(event, this.hide)
    }) */
  },
  methods: {
    show() {
      this.$refs.tooltip.setAttribute('data-show', '')

      this.popperInstance.setOptions((options) => ({
        ...options,
        modifiers: [
          ...options.modifiers,
          { name: 'eventListeners', enabled: true },
        ],
      }))

      this.popperInstance.update()
    },
    hide() {
      this.$refs.tooltip.removeAttribute('data-show')

      this.popperInstance.setOptions((options) => ({
        ...options,
        modifiers: [
          ...options.modifiers,
          { name: 'eventListeners', enabled: false },
        ],
      }))
    },
  },
}
</script>
