<template>
  <div>
    <h4 class="font-medium">{{ title }}</h4>
    <p>
      {{ description }}
    </p>
    <a
      class="md:max-w-[75%] tw-block tw-w-full tw-rounded-full tw-bg-primary-30 tw-p-2 tw-text-center tw-text-lg tw-leading-none !tw-text-white tw-no-underline hover:tw-underline hover:tw-decoration-2 hover:tw-underline-offset-8 md:tw-py-4"
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
