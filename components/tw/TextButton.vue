<template>
  <component
    :is="tag"
    class="tw:group tw:relative tw:flex tw:h-10 tw:items-center tw:overflow-hidden tw:rounded-full tw:text-sm tw:font-medium tw:leading-5 tw:focus:outline-hidden"
    :class="[
      buttonClasses,
      withIcon ? 'tw:gap-2 tw:pl-3 tw:pr-4' : 'tw:px-3',
      tag === 'a' && 'tw:inline-flex! tw:no-underline',
    ]"
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
          return 'tw:text-white tw:dark:text-primary-20'
        case 'onSecondary':
          return 'tw:text-white tw:dark:text-secondary-20'
        case 'onNavbar':
          return 'tw:text-white tw:dark:text-neutral-90'
        case 'onError':
          return 'tw:text-white tw:dark:text-error-20'
        case 'onErrorContainer':
          return 'tw:text-error-10 tw:dark:text-error-90'

        default:
          return 'tw:text-primary-40 tw:dark:text-primary-80'
      }
    },
    stateLayerClasses() {
      switch (this.color) {
        case 'onPrimary':
          return 'tw:group-hover:bg-white/8 tw:group-focus:bg-white/12 tw:dark:group-hover:bg-primary-20/8 tw:dark:group-focus:bg-primary-20/12'
        case 'onSecondary':
          return 'tw:group-hover:bg-white/8 tw:group-focus:bg-white/12 tw:dark:group-hover:bg-secondary-20/8 tw:dark:group-focus:bg-secondary-20/12'
        case 'onNavbar':
          return 'tw:group-hover:bg-white/8 tw:group-focus:bg-white/12 tw:dark:group-hover:bg-neutral-90/8 tw:dark:group-focus:bg-neutral-90/12'
        case 'onError':
          return 'tw:group-hover:bg-white/8 tw:group-focus:bg-white/12 tw:dark:group-hover:bg-error-20/8 tw:dark:group-focus:bg-error-20/12'
        case 'onErrorContainer':
          return 'tw:group-hover:bg-error-10/8 tw:group-focus:bg-error-10/12 tw:dark:group-hover:bg-error-90/8 tw:dark:group-focus:bg-error-90/12'

        default:
          return 'tw:group-hover:bg-primary-40/8 tw:group-focus:bg-primary-40/12 tw:dark:group-hover:bg-primary-80/8 tw:dark:group-focus:bg-primary-80/12'
      }
    },
  },
}
</script>
