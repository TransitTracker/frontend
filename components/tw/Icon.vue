<template>
  <svg class="tw-h-6 tw-w-6" viewBox="0 0 24 24">
    <path class="tw-fill-current" :d="path" />
  </svg>
</template>

<script>
export default {
  props: {
    path: {
      required: true,
      type: String,
    },
  },
}
</script>
