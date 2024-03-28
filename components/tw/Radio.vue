<script>
import { defineComponent } from '@nuxtjs/composition-api'
// const data = ref('')
export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    return {
      ...props,
    }
  },
})
</script>

<template>
  <div class="tw-flex tw-items-center">
    <div
      class="has-[:checked]:tw-bg-primary-40/[0.08] tw-flex tw-h-10 tw-w-10 tw-items-center tw-justify-center tw-rounded-full hover:tw-bg-neutral-10/[0.08]"
    >
      <input
        :id="`${id}-${value}`"
        :name="id"
        type="radio"
        :value="value"
        class="tw-h-5 tw-w-5 tw-appearance-none tw-rounded-full tw-ring-2 tw-ring-inset tw-ring-neutralVariant-30 before:tw-absolute before:tw-inset-1 before:tw-h-3 before:tw-w-3 before:tw-rounded-full before:tw-bg-primary-40 checked:tw-ring-primary-40"
      />
    </div>
    <label
      :for="`${id}-${value}`"
      class="tw-ms-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-gray-300"
    >
      {{ label }}
    </label>
  </div>
</template>

<style scoped></style>
