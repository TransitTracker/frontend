<template>
  <button
    class="tw:group tw:relative tw:flex tw:h-10 tw:w-10 tw:items-center tw:justify-center tw:rounded-full tw:border tw:border-solid tw:focus:outline-hidden"
    :class="[buttonClasses]"
    @click="$emit('click')"
  >
    <div
      class="tw:absolute tw:inset-0 tw:h-full tw:w-full tw:rounded-full tw:bg-transparent tw:transition-colors tw:duration-200"
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
          return 'tw:group-hover:bg-white/8 tw:group-focus:bg-white/12 tw:dark:group-hover:bg-primary-20/8 tw:dark:group-focus:bg-primary-20/12'

        default:
          return 'tw:group-hover:bg-primary-40/8 tw:group-focus:bg-primary-40/12 tw:dark:group-hover:bg-primary-80/8 tw:dark:group-focus:bg-primary-80/12'
      }
    },
  },
}
</script>
