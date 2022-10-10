<template>
  <button
    class="tw-h-10 tw-w-10 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-bg-primary-400 tw-bg-opacity-0 hover:tw-bg-opacity-[0.08] focus:tw-bg-opacity-[0.12] tw-border tw-border-neutralVariant-500"
  >
    <TwIcon
      :path="iconPath"
      class="tw-text-neutralVariant-900 dark:tw-text-neutral-300"
    />
  </button>
</template>

<script>
export default {
  props: {
    iconPath: {
      required: true,
      type: String,
    },
  },
}
</script>
