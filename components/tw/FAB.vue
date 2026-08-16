<template>
  <component
    :is="tag"
    class="tw:group tw:relative tw:flex tw:h-14 tw:w-14 tw:items-center tw:justify-center tw:overflow-hidden tw:rounded-2xl tw:focus:outline-hidden"
    :class="[buttonClasses]"
    @click="$emit('click')"
  >
    <div
      class="tw:absolute tw:inset-0 tw:h-full tw:w-full tw:rounded-2xl"
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
    tag: {
      type: String,
      required: false,
      default: 'button',
    },
  },
  computed: {
    buttonClasses() {
      switch (this.color) {
        default:
          return 'tw:bg-primary-90 tw:text-primary-30 tw:dark:bg-primary-30 tw:dark:text-primary-90'
      }
    },
    stateLayerClasses() {
      switch (this.color) {
        default:
          return 'tw:bg-transparent tw:transition-colors tw:group-hover:bg-primary-30/8 tw:group-focus:bg-primary-30/10 tw:dark:group-hover:bg-primary-90/8 tw:dark:group-focus:bg-primary-90/10'
      }
    },
  },
}
</script>
