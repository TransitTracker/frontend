<template>
  <div
    class="tw:flex tw:h-12 tw:w-12 tw:items-center tw:justify-center tw:rounded-full tw:bg-primary-90 tw:text-primary-30 tw:dark:bg-primary-30 tw:dark:text-primary-90"
  >
    <TwIcon :path="mdiLoading" class="tw:h-9.5 tw:w-9.5 tw:animate-spin" />
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
