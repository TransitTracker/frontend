<template>
  <div class="tw-flex tw-flex-col tw-items-center">
    <h4 class="tw-font-medium">{{ title }}</h4>
    <p class="tw-mt-1 tw-grow">
      {{ description }}
    </p>
    <a
      class="tw-block tw-w-full tw-rounded-full tw-bg-primary-30 tw-p-2 tw-text-center tw-text-lg tw-leading-none !tw-text-white tw-no-underline hover:tw-underline hover:tw-decoration-2 hover:tw-underline-offset-8 focus:tw-underline focus:tw-decoration-2 focus:tw-underline-offset-8 focus:tw-outline focus:tw-outline-3 focus:tw-outline-offset-2 focus:tw-outline-secondary-30 dark:focus:tw-outline-secondary-80 md:tw-max-w-[75%] md:tw-py-4"
      :href="`https://${subdomain}.transittracker.ca`"
      target="_blank"
    >
      <b>{{ subdomain }}</b
      >.transittracker.ca
    </a>
  </div>
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
    subdomain: {
      type: String,
      required: true,
    },
  },
}
</script>
