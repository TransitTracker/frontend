<template>
  <div v-if="content" class="tw-flex tw-h-14 tw-flex-col tw-items-center">
    <TwIcon
      :path="property.icon"
      class="!tw-h-6 !tw-w-6 tw-text-primary-40 dark:tw-text-primary-80"
    />
    <p class="!tw-mb-0">{{ content }}</p>
  </div>
</template>

<script>
export default {
  props: {
    property: {
      required: true,
      type: Object,
    },
    vehicle: {
      required: true,
      type: Object,
    },
  },
  computed: {
    content() {
      return this.property.content
        ? this.vehicle[this.property.content]
        : this.property.parent
        ? this.vehicle[this.property.parent][this.property.name]
        : this.vehicle[this.property.name]
    },
  },
}
</script>
