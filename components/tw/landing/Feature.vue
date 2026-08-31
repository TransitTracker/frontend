<template>
  <div class="tw:space-y-2 tw:p-4">
    <TwIcon
      :path="icon"
      class="tw:h-8! tw:w-8! tw:text-secondary-40 tw:dark:text-secondary-80"
    />
    <h4 class="tw:font-medium tw:text-lg tw:mt-4">{{ title }}</h4>
    <p class="tw:mt-1! tw:text-neutral-30 tw:dark:text-neutral-80">
      {{ description }}
    </p>
    <small
      class="tw:block tw:text-neutral-variant-40 tw:dark:text-neutral-variant-70"
    >
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
