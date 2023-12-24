<template>
  <component
    :is="tag"
    class="tw-group tw-relative tw-flex tw-h-8 tw-items-center tw-rounded-lg tw-px-4 tw-text-sm tw-font-medium tw-leading-6 !tw-text-neutralVariant-30 tw-outline !tw-outline-1 tw-outline-neutralVariant-50 dark:!tw-text-neutralVariant-80 dark:tw-outline-neutralVariant-60"
    :to="to"
  >
    <div
      class="tw-absolute tw-inset-0 tw-transition-colors group-hover:tw-bg-neutralVariant-30/[0.08] group-focus:tw-bg-neutralVariant-30/[0.1] group-hover:dark:tw-bg-neutralVariant-80/[0.08] group-focus:dark:tw-bg-neutralVariant-80/[0.1]"
    ></div>
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      required: false,
      default: 'li',
    },
    to: {
      type: String,
      required: false,
      default: null,
    },
  },
}
</script>
