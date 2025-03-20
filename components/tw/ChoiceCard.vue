<template>
  <!--  TODO: Improve accessibility-->
  <button
    class="tw-relative tw-min-w-[18rem] tw-basis-1/3 tw-rounded-xl tw-border tw-border-solid tw-border-neutralVariant-50 tw-p-4 tw-text-left tw-transition-colors tw-duration-200 tw-ease-emphasized-accelerate hover:tw-border-primary-90 hover:tw-bg-primary-90 hover:tw-text-primary-10 dark:tw-border-neutralVariant-60 dark:hover:tw-border-primary-30 dark:hover:tw-bg-primary-30 dark:hover:tw-text-primary-90 md:tw-aspect-square md:tw-max-w-16"
    @click="$emit('click')"
  >
    <b class="text-[2rem] tw-font-medium tw-leading-10 tw-tracking-normal">
      {{ title }}
    </b>
    <br />
    <slot />
    <TwIcon
      :path="icon"
      class="tw-absolute tw-right-4 tw-top-4 !tw-h-8 !tw-w-8 tw-text-primary-40 dark:tw-text-primary-80 md:tw-h-8 md:tw-w-8"
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
