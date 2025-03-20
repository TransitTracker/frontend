<template>
  <component
    :is="tag"
    class="tw-group tw-relative tw-flex tw-h-10 tw-w-10 tw-items-center tw-justify-center tw-rounded-full focus:tw-outline-none"
    :class="[buttonClasses]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <div
      class="tw-absolute tw-inset-0 tw-h-full tw-w-full tw-rounded-full tw-bg-opacity-0 tw-transition-colors tw-duration-200 group-hover:tw-bg-opacity-8 group-focus:tw-bg-opacity-12 dark:tw-bg-opacity-0"
      :class="[stateLayerClasses]"
    ></div>
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: false,
      default: null,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    tag: {
      type: String,
      required: false,
      default: 'button',
    },
  },
  computed: {
    buttonClasses() {
      if (this.disabled) {
        return 'tw-opacity-[0.62]'
      }

      switch (this.color) {
        case 'onPrimary':
          return 'tw-text-white dark:tw-text-primary-20'
        case 'onNavbar':
          return 'tw-text-white dark:tw-text-neutral-90'
        case 'primary':
          return 'tw-text-primary-40 dark:tw-text-primary-80'
        case 'surface':
          return 'tw-bg-neutral-99 dark:tw-bg-neutral-10 tw-text-neutral-10 dark:tw-text-neutral-90'

        default:
          return 'tw-text-neutralVariant-30 dark:tw-text-neutralVariant-80'
      }
    },
    stateLayerClasses() {
      if (this.disabled) {
        return ''
      }

      switch (this.color) {
        case 'onPrimary':
          return 'tw-bg-white dark:tw-bg-primary-20'
        case 'onNavbar':
          return 'tw-bg-white dark:tw-bg-neutral-90'
        case 'primary':
          return 'tw-bg-primary-40 dark:tw-bg-primary-80'
        case 'surface':
          return 'tw-bg-neutral-10 dark:tw-bg-neutral-90'

        default:
          return 'tw-bg-neutralVariant-30 dark:tw-bg-neutralVariant-80'
      }
    },
  },
}
</script>
