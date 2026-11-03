<template>
  <label
    :for="id"
    :aria-disabled="disabled"
    class="tw-flex tw-cursor-pointer tw-select-none tw-items-center aria-disabled:tw-cursor-not-allowed"
  >
    <div class="tw-relative">
      <input
        :id="id"
        type="checkbox"
        class="tw-peer tw-sr-only"
        :checked="value"
        :disabled="disabled"
        @input="$emit('input', $event.target.value)"
      />
      <!-- Track -->
      <div
        class="tw-block tw-h-8 tw-w-[3.25rem] tw-rounded-full tw-bg-neutral-90 tw-outline tw-outline-2 tw-outline-neutralVariant-50 tw-transition-colors tw-delay-150 tw-ease-standard-effects-fast peer-checked:tw-bg-primary-40 peer-checked:tw-outline-primary-40 peer-disabled:tw-bg-opacity-12 dark:tw-bg-neutral-22 dark:tw-outline-neutralVariant-60 peer-checked:dark:tw-bg-primary-80 peer-checked:dark:tw-outline-primary-80"
      ></div>
      <!-- Handle -->
      <div
        class="tw-absolute tw-left-2 tw-top-2 tw-h-4 tw-w-4 tw-rounded-full tw-bg-neutralVariant-50 tw-transition-all tw-delay-350 tw-ease-standard-spatial peer-checked:tw-left-0 peer-checked:tw-top-1 peer-checked:tw-h-6 peer-checked:tw-w-6 peer-checked:tw-translate-x-full peer-checked:tw-bg-white peer-disabled:tw-bg-neutral-10 peer-disabled:tw-bg-opacity-38 peer-disabled:peer-checked:tw-bg-neutral-98 peer-disabled:peer-checked:tw-bg-opacity-100 dark:tw-bg-neutralVariant-60 peer-checked:dark:tw-bg-primary-20 dark:peer-disabled:tw-bg-neutral-90 dark:peer-disabled:peer-checked:tw-bg-neutral-6"
      ></div>
    </div>
  </label>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    value: {
      type: Boolean,
      required: true,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>
