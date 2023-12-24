<template>
  <a
    :href="link"
    target="_blank"
    class="tw-group tw-rounded-t-lg tw-pt-2 !tw-text-white tw-no-underline tw-transition-colors hover:tw-bg-secondary-90 hover:!tw-text-secondary-10 md:tw-px-2 md:first:-tw-ml-2 md:last:-tw-mr-2"
  >
    <h4 class="tw-font-medium">{{ title }}</h4>
    <p>
      {{ description }}
    </p>
    <p
      class="tw-text-lg tw-font-medium !tw-text-white tw-underline tw-decoration-2 tw-underline-offset-8 group-hover:!tw-text-secondary-40 group-hover:tw-decoration-secondary-40 group-hover:tw-decoration-4"
    >
      {{ linkTitle }}
    </p>
  </a>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    linkTitle: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
}
</script>
