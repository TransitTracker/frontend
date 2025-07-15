<template>
  <div
    v-if="loading"
    class="tw-fixed tw-inset-x-0 tw-top-0 tw-z-30 md:tw-left-20 md:tw-right-0"
  >
    <div
      class="tw-h-1 tw-w-full tw-overflow-hidden tw-bg-secondary-90 dark:tw-bg-secondary-30"
    >
      <progress
        class="tw-absolute tw-top-0 tw-h-full tw-w-full tw-origin-left-right tw-animate-progress tw-border-none tw-bg-primary-40 dark:tw-bg-primary-80"
      />
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    value: 0,
  }),
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    },
    fail() {
      this.loading = false
    },
    increase(num) {
      this.value += num
    },
  },
}
</script>
