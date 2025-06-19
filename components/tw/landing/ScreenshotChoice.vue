<template>
  <button
    class="tw-cursor-pointer tw-space-y-2 tw-rounded-lg tw-px-4 tw-py-2 tw-transition-colors tw-duration-200 tw-ease-emphasized md:tw-rounded-2xl md:tw-px-8 md:tw-py-6"
    :class="[
      isTabActive
        ? 'tw-bg-primary-40 tw-text-white focus:tw-outline focus:tw-outline-3 focus:tw-outline-offset-2 focus:tw-outline-secondary-80 dark:tw-bg-primary-80 dark:tw-text-primary-10 '
        : 'hover:tw-bg-primary-90 focus:tw-bg-primary-90 hover:dark:tw-bg-primary-30 focus:dark:tw-bg-primary-30',
    ]"
  >
    <div class="tw-flex tw-items-center tw-gap-2 md:tw-gap-4">
      <TwIcon :path="icon" class="md:!tw-h-12 md:!tw-w-12" />
      <h4 class="tw-text-lg">{{ title }}</h4>
    </div>
    <p class="!tw-mb-0">
      {{ description }}
    </p>
  </button>
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
    isTabActive: {
      type: Boolean,
      required: true,
    },
  },
}
</script>
