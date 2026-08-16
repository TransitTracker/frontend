<template>
  <div
    class="tw:relative tw:w-96 tw:font-normal"
    :class="[supportingText && 'tw:mb-5']"
  >
    <input
      id="input"
      :value="value"
      type="text"
      :class="[backgroundClasses]"
      class="tw:peer tw:h-14 tw:w-96 tw:rounded-t tw:border-b tw:pb-2 tw:pl-4 tw:pr-[52px] tw:pt-6 tw:placeholder-transparent tw:focus:border-b-2 tw:focus:border-primary-40 tw:focus:outline-hidden tw:dark:focus:border-primary-80"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)"
    />
    <div
      class="tw:pointer-events-none tw:absolute tw:inset-0 peer-hover:tw-bg-opacity-10 dark:peer-hover:tw-bg-opacity-10"
    ></div>
    <label
      for="input"
      class="tw:pointer-events-none tw:absolute tw:left-0 tw:top-0 tw:ml-4 tw:mr-[52px] tw:mt-2 tw:text-xs tw:duration-300 tw:peer-placeholder-shown:mt-4 tw:peer-placeholder-shown:text-base tw:peer-focus:mt-2 tw:peer-focus:text-xs tw:peer-focus:text-primary-40 tw:dark:peer-focus:text-primary-80"
    >
      {{ placeholder }}
    </label>
    <button
      v-if="value"
      class="tw:absolute tw:right-3 tw:top-4"
      :title="clearText"
      @click="$emit('text-cleared')"
    >
      <svg class="tw:h-6 tw:w-6" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"
        />
      </svg>
    </button>

    <label
      v-if="supportingText"
      for="input"
      class="tw:pointer-events-none tw:absolute tw:-bottom-5 tw:left-4 tw:text-xs"
    >
      {{ supportingText }}
    </label>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    supportingText: {
      type: String,
      required: false,
      default: null,
    },
    clearText: {
      type: String,
      required: false,
      default: null,
    },
    color: {
      type: String,
      required: false,
      default: null,
    },
  },
  computed: {
    backgroundClasses() {
      switch (this.color) {
        case 'background':
          return 'tw:bg-neutral-99 tw:dark:bg-neutral-10 tw:text-neutral-10 tw:dark:text-neutral-90'
        default:
          return 'tw:bg-neutral-variant-90 tw:text-neutral-variant-30 tw:dark:bg-neutral-variant-30 tw:dark:text-neutral-variant-80'
      }
    },
  },
}
</script>
