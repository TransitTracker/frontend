<template>
  <button
    class="tw-overflow-hiddenfull tw-group tw-relative tw-flex tw-h-10 tw-items-center tw-rounded-full tw-text-sm tw-font-medium tw-leading-5 focus:tw-outline-none"
    :class="[buttonClasses, withIcon ? 'tw-gap-2 tw-pl-4 tw-pr-6' : 'tw-px-6']"
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
    withIcon: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    buttonClasses() {
      switch (this.color) {
        case 'tonal':
          return 'tw-bg-secondary-90 tw-text-secondary-10 dark:tw-bg-secondary-30 dark:tw-text-secondary-90'

        default:
          return 'tw-text-primary-40 dark:tw-text-primary-80'
      }
    },
    stateLayerClasses() {
      switch (this.color) {
        case 'tonal':
          return 'tw-bg-secondary-10 dark:tw-bg-secondary-90'

        default:
          return 'tw-bg-primary-40 dark:tw-bg-primary-80'
      }
    },
  },
}
</script>
