<template>
  <div class="tw-space-y-2">
    <TwLink
      v-for="link in vehicle.links"
      :key="link"
      :link-id="link"
      :vehicle="vehicle"
    />
  </div>
</template>

<script>
export default {
  computed: {
    vehicle() {
      return this.$store.state.vehicles.selection
    },
  },
}
</script>
