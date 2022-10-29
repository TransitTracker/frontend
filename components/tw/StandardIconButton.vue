<template>
  <button
    class="tw-group tw-relative tw-flex tw-items-center tw-justify-center tw-text-neutralVariant-30 active:tw-text-primary-40 dark:tw-text-neutralVariant-80 dark:active:tw-text-primary-80"
  >
    <div
      class="dark:active:tw-bg-primary-8 tw-absolute tw-inset-0 tw-h-full tw-w-full tw-rounded-full tw-bg-neutralVariant-30 tw-bg-opacity-0 tw-transition-colors tw-duration-200 active:tw-bg-primary-40 group-hover:tw-bg-opacity-[0.08] group-active:tw-bg-opacity-[0.12] dark:tw-bg-neutralVariant-80"
    ></div>
    <slot />
  </button>
</template>

<script>
export default {
  prop: {
    value: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>
