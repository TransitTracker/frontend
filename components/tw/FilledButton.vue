<template>
  <component
    :is="tag"
    class="tw:group tw:relative tw:flex tw:h-10 tw:items-center tw:overflow-hidden tw:rounded-full tw:text-sm tw:font-medium tw:leading-5 tw:no-underline! tw:focus:outline-hidden"
    :class="[
      buttonClasses,
      withIcon && 'tw:gap-2 tw:pl-4 tw:pr-6',
      withIconRight && 'tw:gap-2 tw:pl-6 tw:pr-4',
      !withIcon && !withIconRight && 'tw:px-6',
    ]"
    @click="$emit('click')"
  >
    <div
      class="tw:absolute tw:inset-0 tw:h-full tw:w-full tw:rounded-full tw:bg-transparent tw:transition-colors"
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
    withIcon: {
      type: Boolean,
      required: false,
      default: false,
    },
    withIconRight: {
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
      switch (this.color) {
        case 'tonal':
          return 'tw:bg-secondary-90 tw:text-secondary-10! tw:dark:bg-secondary-30 tw:dark:text-secondary-90!'

        case 'secondary':
          return 'tw:bg-secondary-40 tw:text-white! tw:dark:bg-secondary-80 tw:dark:text-secondary-20!'

        default:
          return 'tw:bg-primary-40 tw:text-white! tw:dark:bg-primary-80 tw:dark:text-primary-20!'
      }
    },
    stateLayerClasses() {
      switch (this.color) {
        case 'tonal':
          return 'tw:group-hover:bg-secondary-10/8 tw:group-focus:bg-secondary-10/12 tw:dark:group-hover:bg-secondary-90/8 tw:dark:group-focus:bg-secondary-90/12'

        case 'secondary':
          return 'tw:group-hover:bg-white/8 tw:group-focus:bg-white/12 tw:dark:group-hover:bg-secondary-20/8 tw:dark:group-focus:bg-secondary-20/12'

        default:
          return 'tw:group-hover:bg-white/8 tw:group-focus:bg-white/12 tw:dark:group-hover:bg-primary-20/8 tw:dark:group-focus:bg-primary-20/12'
      }
    },
  },
}
</script>
