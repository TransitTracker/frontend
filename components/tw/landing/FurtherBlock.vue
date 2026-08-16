<template>
  <div class="tw:flex tw:flex-col tw:items-center tw:space-y-2">
    <h4 class="tw:font-medium">{{ title }}</h4>
    <p class="tw:mt-1 tw:grow">
      {{ description }}
    </p>
    <a
      class="tw:block tw:w-full tw:rounded-full tw:bg-primary-30 tw:p-2 tw:text-center tw:text-lg tw:leading-none tw:text-white! tw:no-underline tw:hover:underline tw:hover:decoration-2 tw:hover:underline-offset-8 tw:focus:underline tw:focus:decoration-2 tw:focus:underline-offset-8 tw:focus:outline tw:focus:outline-3 tw:focus:outline-offset-2 tw:focus:outline-secondary-30 tw:dark:focus:outline-secondary-80 tw:md:max-w-[75%] tw:md:py-4"
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
