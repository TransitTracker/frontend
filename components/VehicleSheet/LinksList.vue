<template>
  <div v-if="vehicle.id" class="tw-space-y-2">
    <TwLink
      v-for="link in vehicle.properties.links"
      :key="link"
      :link-id="link"
      :vehicle="vehicle"
    />
  </div>
</template>

<script>
export default {
  props: {
    vehicle: {
      type: Object,
      required: true,
    },
  },
}
</script>
