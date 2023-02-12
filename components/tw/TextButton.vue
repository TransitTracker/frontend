<template>
  <component
    :is="tag"
    class="tw-overflow-hiddenfull tw-group tw-relative tw-flex tw-h-10 tw-items-center tw-text-sm tw-font-medium tw-leading-5 focus:tw-outline-none"
    :class="[
      buttonClasses,
      withIcon ? 'tw-gap-2 tw-pl-3 tw-pr-4' : 'tw-px-3',
      tag === 'a' && '!tw-inline-flex tw-no-underline',
    ]"
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
    withIcon: {
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
        case 'onPrimary':
          return 'tw-text-white dark:tw-text-primary-20'
        case 'onNavbar':
          return 'tw-text-white dark:tw-text-neutral-90'
        case 'onError':
          return 'tw-text-white dark:tw-text-error-20'
        case 'onErrorContainer':
          return 'tw-text-error-10 dark:tw-text-error-90'

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
        case 'onError':
          return 'tw-bg-error-40 dark:tw-bg-error-80'
        case 'onErrorContainer':
          return 'tw-bg-error-90 dark:tw-bg-error-30'

        default:
          return 'tw-bg-primary-40 dark:tw-bg-primary-80'
      }
    },
  },
}
</script>
