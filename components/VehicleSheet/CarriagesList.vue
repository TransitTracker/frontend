<template>
  <ol class="tw:mt-2 tw:space-y-4">
    <TwCarriage
      v-for="(carriage, index) in vehicle.properties.carriageDetails"
      :key="carriage.id"
      :carriage="carriage"
      :is-first="index === 0"
      :is-last="index === vehicle.properties.carriageDetails.length - 1"
    />
  </ol>
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
