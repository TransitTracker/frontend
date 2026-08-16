<template>
  <div class="tw:space-y-2">
    <TwIcon
      :path="icon"
      class="tw:h-8! tw:w-8! tw:text-secondary-40 tw:dark:text-secondary-80"
    />
    <h4 class="tw:font-medium">{{ title }}</h4>
    <p class="tw:mt-0!">{{ description }}</p>
    <small class="tw:text-neutral-variant-30 tw:dark:text-neutral-variant-80">
      {{ note }}
    </small>
  </div>
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
    note: {
      type: String,
      required: false,
      default: null,
    },
  },
}
</script>
