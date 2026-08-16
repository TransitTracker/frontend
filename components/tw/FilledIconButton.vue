<template>
  <component
    :is="tag"
    class="tw:group tw:relative tw:flex tw:h-10 tw:w-10 tw:items-center tw:justify-center tw:rounded-full tw:focus:outline-hidden"
    :class="[buttonClasses]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <div
      class="tw:absolute tw:inset-0 tw:h-full tw:w-full tw:rounded-full tw:bg-transparent tw:transition-colors tw:duration-200"
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
          return 'tw:bg-neutral-99 tw:dark:bg-neutral-10 tw:text-neutral-10 tw:dark:text-neutral-90'
        case 'tonal':
          return 'tw:bg-secondary-90 tw:dark:bg-secondary-30 tw:text-secondary-30 tw:dark:text-secondary-90'

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
          return 'tw:group-hover:bg-white/8 tw:group-focus:bg-white/12 tw:dark:group-hover:bg-primary-20/8 tw:dark:group-focus:bg-primary-20/12'
        case 'onNavbar':
          return 'tw:group-hover:bg-white/8 tw:group-focus:bg-white/12 tw:dark:group-hover:bg-neutral-90/8 tw:dark:group-focus:bg-neutral-90/12'
        case 'primary':
          return 'tw:group-hover:bg-primary-40/8 tw:group-focus:bg-primary-40/12 tw:dark:group-hover:bg-primary-80/8 tw:dark:group-focus:bg-primary-80/12'
        case 'surface':
          return 'tw:group-hover:bg-neutral-10/8 tw:group-focus:bg-neutral-10/12 tw:dark:group-hover:bg-neutral-90/8 tw:dark:group-focus:bg-neutral-90/12'
        case 'tonal':
          return 'tw:group-hover:bg-secondary-30/8 tw:group-focus:bg-secondary-30/12 tw:dark:group-hover:bg-secondary-90/8 tw:dark:group-focus:bg-secondary-90/12'

        default:
          return 'tw:group-hover:bg-neutral-variant-30/8 tw:group-focus:bg-neutral-variant-30/12 tw:dark:group-hover:bg-neutral-variant-80/8 tw:dark:group-focus:bg-neutral-variant-80/12'
      }
    },
  },
}
</script>
