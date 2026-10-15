<template>
  <component
    :is="tag"
    class="tw:group tw:relative tw:inline-flex tw:h-8 tw:items-center tw:gap-x-2 tw:rounded-lg tw:border tw:border-solid tw:border-neutral-variant-80 tw:px-4 tw:transition-shadow tw:hover:shadow-sm tw:focus:outline tw:focus:outline-3 tw:focus:outline-offset-2 tw:focus:outline-secondary-30 tw:dark:focus:outline-secondary-80"
    :class="[icon && 'tw:pl-2']"
  >
    <div
      class="tw:absolute tw:inset-0 tw:h-full tw:w-full tw:rounded-lg tw:bg-transparent tw:transition-colors tw:group-hover:bg-primary-30/8 tw:group-focus:bg-primary-30/10 tw:dark:group-hover:bg-primary-90/8 tw:dark:group-focus:bg-primary-90/10"
    ></div>
    <TwIcon :path="icon" v-if="icon" class="tw:h-4.5! tw:w-4.5!" />
    <span
      class="tw:text-sm tw:font-medium tw:text-neutral-variant-30 tw:dark:text-neutral-variant-80"
    >
      <slot />
    </span>
  </component>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      required: false,
      default: 'button',
    },
    icon: {
      type: String,
      required: false,
      default: null,
    },
  },
}
</script>
