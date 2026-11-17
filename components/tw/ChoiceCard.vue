<template>
  <button
    class="tw:relative tw:w-full tw:rounded-xl tw:border tw:border-solid tw:border-neutral-variant-50 tw:p-4 tw:text-left tw:transition-colors tw:duration-200 tw:ease-emphasized-accelerate tw:hover:border-primary-90 tw:hover:bg-primary-90 tw:hover:text-primary-10 tw:focus-visible:outline-2 tw:focus-visible:outline-offset-2 tw:focus-visible:outline-primary-40 tw:dark:border-neutral-variant-60 tw:dark:hover:border-primary-30 tw:dark:hover:bg-primary-30 tw:dark:hover:text-primary-90 tw:dark:focus-visible:outline-primary-80 tw:sm:w-auto tw:sm:min-w-[16rem] tw:md:aspect-square tw:md:basis-1/3 tw:md:min-w-[18rem] tw:md:p-6"
    @click="$emit('click')"
  >
    <div class="tw:flex tw:flex-col tw:pr-8 tw:md:pr-10">
      <b
        class="tw:text-lg tw:font-medium tw:leading-6 tw:tracking-normal tw:md:text-2xl tw:md:leading-8"
      >
        {{ title }}
      </b>
      <span
        class="tw:mt-1 tw:text-xs tw:leading-4 tw:text-neutral-variant-30 tw:dark:text-neutral-variant-80 tw:sm:text-sm tw:sm:leading-5"
      >
        <slot />
      </span>
    </div>
    <TwIcon
      :path="icon"
      class="tw:absolute tw:right-4 tw:top-4 tw:h-6! tw:w-6! tw:text-primary-40 tw:dark:text-primary-80 tw:md:h-8! tw:md:w-8!"
    />
  </button>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: false,
      default: null,
    },
  },
}
</script>
