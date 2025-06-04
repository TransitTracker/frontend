<template>
  <h3
    class="tw-relative tw-rounded tw-bg-white tw-p-2 tw-font-heading tw-text-xl tw-font-bold tw-text-primary-40 dark:tw-bg-primary-20 dark:tw-text-primary-80"
  >
    <span
      v-if="hasPing"
      class="tw-absolute tw-right-0 tw-top-0 -tw-mr-1 -tw-mt-1 tw-flex tw-h-3 tw-w-3"
    >
      <span
        class="tw-absolute tw-inline-flex tw-h-full tw-w-full tw-animate-ping tw-rounded-full tw-bg-secondary-50/75 dark:tw-bg-secondary-90/75"
      ></span>
      <span
        class="tw-relative tw-inline-flex tw-h-3 tw-w-3 tw-rounded-full tw-bg-secondary-40 dark:tw-bg-secondary-80"
      ></span>
    </span>
    {{ number }} <br />
    <small
      class="tw-text-md tw-font-medium tw-text-primary-10 dark:tw-text-primary-90"
    >
      {{ label }}
      <span v-if="labelSr" class="tw-sr-only">{{ labelSr }}</span>
    </small>
  </h3>
</template>

<script>
export default {
  props: {
    number: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    labelSr: {
      type: String,
      required: false,
      default: null,
    },
    hasPing: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>
