<template>
  <component
    :is="tag"
    class="tw-group tw-relative tw-flex tw-h-14 tw-w-14 tw-items-center tw-justify-center tw-overflow-hidden tw-rounded-2xl focus:tw-outline-none"
    :class="[buttonClasses]"
    @click="$emit('click')"
  >
    <div
      class="tw-absolute tw-inset-0 tw-h-full tw-w-full tw-rounded-2xl tw-bg-opacity-0 tw-transition-colors tw-duration-200 group-hover:tw-bg-opacity-8 group-focus:tw-bg-opacity-10 dark:tw-bg-opacity-0"
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
          return 'tw-bg-primary-90 tw-text-primary-30 dark:tw-bg-primary-30 dark:tw-text-primary-90'
      }
    },
    stateLayerClasses() {
      switch (this.color) {
        default:
          return 'tw-bg-primary-30 dark:tw-bg-primary-90'
      }
    },
  },
}
</script>
