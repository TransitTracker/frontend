<template>
  <component
    :is="tag"
    class="tw-group tw-relative tw-inline-flex tw-h-8 tw-items-center tw-rounded-lg tw-border tw-border-solid tw-border-neutralVariant-80 tw-px-4 tw-transition-shadow hover:tw-shadow-sm focus:tw-outline focus:tw-outline-3 focus:tw-outline-offset-2 focus:tw-outline-secondary-30 focus:dark:tw-outline-secondary-80"
  >
    <div
      class="tw-absolute tw-inset-0 tw-h-full tw-w-full tw-rounded-lg tw-bg-neutralVariant-30 tw-bg-opacity-0 tw-transition-colors group-hover:tw-bg-opacity-8 group-focus:tw-bg-opacity-10 dark:tw-bg-neutralVariant-80 dark:tw-bg-opacity-0"
    ></div>
    <span
      class="tw-text-sm tw-font-medium tw-text-neutralVariant-30 dark:tw-text-neutralVariant-80"
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
  },
}
</script>
