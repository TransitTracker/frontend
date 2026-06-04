<template>
  <div
    class="tw-flex tw-h-12 tw-w-12 tw-items-center tw-justify-center tw-rounded-full tw-bg-primary-90 tw-text-primary-30 dark:tw-bg-primary-30 dark:tw-text-primary-90"
  >
    <TwIcon
      :path="mdiLoading"
      class="tw-h-[2.375rem] tw-w-[2.375rem] tw-animate-spin"
    />
  </div>
</template>

<script>
import { mdiLoading } from '@mdi/js'

export default {
  data: () => ({
    mdiLoading,
  }),
}
</script>
