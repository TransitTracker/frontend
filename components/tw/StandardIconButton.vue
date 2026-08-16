<template>
  <button
    class="tw:group tw:relative tw:flex tw:h-10 tw:w-10 tw:items-center tw:justify-center tw:focus:outline-hidden"
    :class="[buttonClasses]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <div
      class="tw:absolute tw:inset-0 tw:h-full tw:w-full tw:rounded-full tw-bg-opacity-0 tw:transition-colors tw:duration-200 group-hover:tw-bg-opacity-8 group-focus:tw-bg-opacity-12 dark:tw-bg-opacity-0"
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
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    buttonClasses() {
      if (this.disabled) {
        return 'tw:opacity-[0.62]'
      }

      switch (this.color) {
        case 'onPrimary':
          return 'tw:text-white tw:dark:text-primary-20'
        case 'onNavbar':
          return 'tw:text-white tw:dark:text-neutral-90'
        case 'primary':
          return 'tw:text-primary-40 tw:dark:text-primary-80'
        case 'surface':
          return 'tw:text-neutral-10 tw:dark:text-neutral-90'
        case 'onError':
          return 'tw:text-white tw:dark:text-error-20'
        case 'onErrorContainer':
          return 'tw:text-error-10 tw:dark:text-error-90'

        default:
          return 'tw:text-neutral-variant-30 tw:dark:text-neutral-variant-80'
      }
    },
    stateLayerClasses() {
      if (this.disabled) {
        return ''
      }

      switch (this.color) {
        case 'onPrimary':
          return 'tw:bg-white tw:dark:bg-primary-20'
        case 'onNavbar':
          return 'tw:bg-white tw:dark:bg-neutral-90'
        case 'primary':
          return 'tw:bg-primary-40 tw:dark:bg-primary-80'
        case 'surface':
          return 'tw:bg-neutral-99 tw:dark:bg-neutral-10'
        case 'onError':
          return 'tw:bg-error-40 tw:dark:bg-error-80'
        case 'onErrorContainer':
          return 'tw:bg-error-90 tw:dark:bg-error-30'

        default:
          return 'tw:bg-neutral-variant-30 tw:dark:bg-neutral-variant-80'
      }
    },
  },
}
</script>
