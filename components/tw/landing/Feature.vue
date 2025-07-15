<template>
  <div class="tw-space-y-2">
    <tw-icon
      :path="icon"
      class="!tw-h-8 !tw-w-8 tw-text-secondary-40 dark:tw-text-secondary-80"
    />
    <h4 class="tw-font-medium">{{ title }}</h4>
    <p class="!tw-mt-0">{{ description }}</p>
    <small class="tw-text-neutralVariant-30 dark:tw-text-neutralVariant-80">
      {{ note }}
    </small>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      required: false,
      default: null,
    },
  },
}
</script>
