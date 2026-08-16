<template>
  <!--  TODO: Improve accessibility-->
  <button
    class="tw:relative tw:min-w-[18rem] tw:basis-1/3 tw:rounded-xl tw:border tw:border-solid tw:border-neutral-variant-50 tw:p-4 tw:text-left tw:transition-colors tw:duration-200 tw:ease-emphasized-accelerate tw:hover:border-primary-90 tw:hover:bg-primary-90 tw:hover:text-primary-10 tw:dark:border-neutral-variant-60 tw:dark:hover:border-primary-30 tw:dark:hover:bg-primary-30 tw:dark:hover:text-primary-90 tw:md:aspect-square tw:md:max-w-16"
    @click="$emit('click')"
  >
    <b class="tw:text-[2rem] tw:font-medium tw:leading-10 tw:tracking-normal">
      {{ title }}
    </b>
    <br />
    <slot />
    <TwIcon
      :path="icon"
      class="tw:absolute tw:right-4 tw:top-4 tw:h-8! tw:w-8! tw:text-primary-40 tw:dark:text-primary-80 tw:md:h-8 tw:md:w-8"
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
