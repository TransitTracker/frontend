<template>
  <li
    class="tw:-mx-4 tw:flex tw:animate-pulse tw:gap-3 tw:px-4 tw:py-1.5 tw:md:gap-4 tw:md:py-2"
  >
    <div
      class="tw:relative tw:-my-1.5 tw:border-y-0 tw:border-l tw:border-r-0 tw:border-solid tw:border-neutral-variant-50 tw:dark:border-neutral-variant-60 tw:md:-my-2"
    >
      <div
        class="tw:absolute tw:-left-1.5 tw:mt-3.5 tw:h-3 tw:w-3 tw:rounded-full tw:bg-neutral-variant-50 tw:dark:bg-neutral-variant-60 tw:md:mt-4"
      ></div>
    </div>
    <div class="tw:min-w-0 tw:w-full">
      <div class="tw:flex tw:items-center tw:gap-1.5 tw:md:gap-2">
        <span
          class="tw:h-6 tw:w-10 tw:shrink-0 tw:rounded-md tw:bg-neutral-variant-50 tw:dark:bg-neutral-variant-60 tw:md:h-7 tw:md:w-12 tw:md:rounded-lg"
        ></span>
        <TwIcon
          :path="mdiArrowRight"
          class="tw:h-4 tw:w-4 tw:shrink-0 tw:md:h-5 tw:md:w-5"
        />
        <span
          class="tw:h-5 tw:w-28 tw:rounded-md tw:bg-neutral-variant-50 tw:dark:bg-neutral-variant-60 tw:md:h-6 tw:md:w-36"
        ></span>
        <span class="tw:grow"></span>
        <span
          class="tw:h-4 tw:w-10 tw:shrink-0 tw:rounded tw:bg-neutral-variant-50 tw:dark:bg-neutral-variant-60 tw:md:h-5 tw:md:w-12"
        ></span>
      </div>
      <div
        class="tw:mt-1 tw:h-3 tw:w-20 tw:rounded tw:bg-neutral-variant-50 tw:dark:bg-neutral-variant-60 tw:md:h-4 tw:md:w-24"
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
