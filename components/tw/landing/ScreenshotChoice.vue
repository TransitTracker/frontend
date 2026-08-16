<template>
  <button
    class="tw:cursor-pointer tw:space-y-2 tw:rounded-lg tw:px-4 tw:py-2 tw:transition-colors tw:duration-200 tw:ease-emphasized tw:md:rounded-2xl tw:md:px-8 tw:md:py-6"
    :class="[
      isTabActive
        ? 'tw:bg-primary-40 tw:text-white tw:focus:outline tw:focus:outline-3 tw:focus:outline-offset-2 tw:focus:outline-secondary-80 tw:dark:bg-primary-80 tw:dark:text-primary-10 '
        : 'tw:hover:bg-primary-90 tw:focus:bg-primary-90 tw:dark:hover:bg-primary-30 tw:dark:focus:bg-primary-30',
    ]"
  >
    <div class="tw:flex tw:items-center tw:gap-2 tw:md:gap-4">
      <TwIcon :path="icon" class="tw:md:h-12! tw:md:w-12!" />
      <h4 class="tw:text-lg">{{ title }}</h4>
    </div>
    <p class="tw:mb-0! tw:text-left">
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
