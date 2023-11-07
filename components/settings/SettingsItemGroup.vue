<template>
  <div class="tw-mt-1 tw-grid tw-grid-cols-2 tw-gap-2" :value="value" mandatory>
    <div
      v-for="option in options"
      :key="option.value"
      class="tw-flex tw-cursor-pointer tw-flex-col tw-justify-center tw-rounded tw-px-4 tw-py-3"
      :class="[
        option.value === value
          ? 'text-white tw-bg-primary-40 dark:tw-bg-primary-80 dark:tw-text-primary-20'
          : 'tw-bg-neutralVariant-90 dark:tw-bg-neutralVariant-30',
      ]"
      @click="$emit('input', option.value)"
    >
      <div class="tw-flex tw-items-center tw-justify-between">
        {{ option.label }}
        <TwIcon v-if="option.icon" :path="option.icon" class="tw-ml-1" />
      </div>
      <div v-if="option.description">
        <small class="tw-mb-0">{{ option.description }}</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [Boolean, String],
      required: false,
      default: null,
    },
    options: {
      type: Array,
      required: true,
    },
  },
}
</script>
