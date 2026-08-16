<template>
  <label
    :for="id"
    :aria-disabled="disabled"
    class="tw:flex tw:cursor-pointer tw:select-none tw:items-center tw:aria-disabled:cursor-not-allowed"
  >
    <div class="tw:relative">
      <input
        type="checkbox"
        :id="id"
        class="tw:peer tw:sr-only"
        :checked="value"
        :disabled="disabled"
        @input="$emit('input', $event.target.value)"
      />
      <!-- Track -->
      <div
        class="tw:block tw:h-8 tw:w-13 tw:rounded-full tw:bg-neutral-90 tw:outline tw:outline-neutral-variant-50 tw:transition-colors tw:delay-150 tw:ease-standard-effects-fast tw:peer-checked:bg-primary-40 tw:peer-checked:outline-primary-40 peer-disabled:tw-bg-opacity-12 tw:dark:bg-neutral-22 tw:dark:outline-neutral-variant-60 tw:dark:peer-checked:bg-primary-80 tw:dark:peer-checked:outline-primary-80"
      ></div>
      <!-- Handle -->
      <div
        class="tw:absolute tw:left-2 tw:top-2 tw:h-4 tw:w-4 tw:rounded-full tw:bg-neutral-variant-50 tw:transition-all tw:delay-350 tw:ease-standard-spatial tw:peer-checked:left-0 tw:peer-checked:top-1 tw:peer-checked:h-6 tw:peer-checked:w-6 tw:peer-checked:translate-x-full tw:peer-checked:bg-white tw:peer-disabled:bg-neutral-10 peer-disabled:tw-bg-opacity-38 tw:peer-checked:peer-disabled:bg-neutral-98 peer-disabled:peer-checked:tw-bg-opacity-100 tw:dark:bg-neutral-variant-60 tw:dark:peer-checked:bg-primary-20 tw:dark:peer-disabled:bg-neutral-90 tw:dark:peer-checked:peer-disabled:bg-neutral-6"
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
