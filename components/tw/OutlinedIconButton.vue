<template>
  <button
    class="tw:group tw:relative tw:flex tw:h-10 tw:w-10 tw:items-center tw:justify-center tw:rounded-full tw:border tw:border-solid tw:focus:outline-hidden"
    :class="[buttonClasses]"
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
  },
  computed: {
    buttonClasses() {
      switch (this.color) {
        case 'onPrimary':
          return 'tw:text-white tw:dark:text-primary-20 tw:border-primary-90 tw:dark:border-primary-30'

        default:
          return 'tw:text-neutral-variant-30 tw:dark:text-neutral-variant-80 tw:border-neutral-variant-50 tw:dark:border-neutral-variant-60'
      }
    },
    stateLayerClasses() {
      switch (this.color) {
        case 'onPrimary':
          return 'tw:bg-white tw:dark:bg-primary-20'

        default:
          return 'tw:bg-primary-40 tw:dark:bg-primary-80'
      }
    },
  },
}
</script>
