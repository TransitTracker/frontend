<template>
  <li class="-tw-mx-4 tw-flex tw-animate-pulse tw-gap-4 tw-py-2 tw-px-4">
    <div
      class="tw-relative -tw-my-2 tw-border-y-0 tw-border-l tw-border-r-0 tw-border-solid tw-border-neutralVariant-50 dark:tw-border-neutralVariant-60"
    >
      <div
        class="tw-absolute -tw-left-1.5 tw-mt-4 tw-h-3 tw-w-3 tw-rounded-full tw-bg-neutralVariant-50 dark:tw-bg-neutralVariant-60"
      ></div>
    </div>
    <div class="tw-w-full">
      <div class="tw-flex tw-items-center">
        <span
          class="tw-h-8 tw-w-12 tw-rounded-lg tw-bg-neutralVariant-50 tw-font-bold dark:tw-bg-neutralVariant-60"
        >
        </span>
        <TwIcon :path="mdiArrowRight" class="tw-ml-2 tw-mr-1" />
        <span
          class="tw-h-6 tw-w-32 tw-rounded-lg tw-bg-neutralVariant-50 dark:tw-bg-neutralVariant-60"
        ></span>
        <span class="tw-grow"></span>
        <span
          class="tw-h-5 tw-w-8 tw-rounded tw-bg-neutralVariant-50 dark:tw-bg-neutralVariant-60"
        ></span>
      </div>
      <div
        class="tw-mt-1 tw-h-4 tw-w-20 tw-rounded tw-bg-neutralVariant-50 dark:tw-bg-neutralVariant-60"
      ></div>
    </div>
  </li>
</template>

<script>
import { mdiArrowRight } from '@mdi/js'

export default {
  data: () => ({
    mdiArrowRight,
  }),
}
</script>
