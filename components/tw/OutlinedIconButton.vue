<template>
  <button
    class="tw-group tw-relative tw-flex tw-h-10 tw-w-10 tw-items-center tw-justify-center tw-rounded-full tw-border tw-border-solid focus:tw-outline-none"
    :class="[buttonClasses]"
    @click="$emit('click')"
  >
    <div
      class="tw-absolute tw-inset-0 tw-h-full tw-w-full tw-rounded-full tw-bg-opacity-0 tw-transition-colors tw-duration-200 group-hover:tw-bg-opacity-8 group-focus:tw-bg-opacity-12 dark:tw-bg-opacity-0"
      :class="[stateLayerClasses]"
    ></div>
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: false,
      default: null,
    },
  },
  computed: {
    buttonClasses() {
      switch (this.color) {
        case 'onPrimary':
          return 'tw-text-white dark:tw-text-primary-20 tw-border-primary-90 dark:tw-border-primary-30'

        default:
          return 'tw-text-neutralVariant-30 dark:tw-text-neutralVariant-80 tw-border-neutralVariant-50 dark:tw-border-neutralVariant-60'
      }
    },
    stateLayerClasses() {
      switch (this.color) {
        case 'onPrimary':
          return 'tw-bg-white dark:tw-bg-primary-20'

        default:
          return 'tw-bg-primary-40 dark:tw-bg-primary-80'
      }
    },
  },
}
</script>
