<template>
  <button
    class="tw-overflow-hiddenfull tw-group tw-relative tw-flex tw-h-10 tw-items-center tw-text-sm tw-font-medium tw-leading-5 focus:tw-outline-none"
    :class="[buttonClasses, withIcon ? 'tw-gap-2 tw-pl-3 tw-pr-4' : 'tw-px-3']"
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
        case 'onPrimary':
          return 'tw-text-white dark:tw-text-primary-20'
        case 'onNavbar':
          return 'tw-text-white dark:tw-text-neutral-90'

        default:
          return 'tw-text-primary-40 dark:tw-text-primary-80'
      }
    },
    stateLayerClasses() {
      switch (this.color) {
        case 'onPrimary':
          return 'tw-bg-white dark:tw-bg-primary-20'
        case 'onNavbar':
          return 'tw-text-white dark:tw-text-neutral-90'

        default:
          return 'tw-bg-primary-40 dark:tw-bg-primary-80'
      }
    },
  },
}
</script>
