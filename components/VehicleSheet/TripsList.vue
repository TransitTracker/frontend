<template>
  <ol
    v-if="relatedTrips.length"
    class="tw-relative tw-mt-4 tw-list-none !tw-pl-0"
  >
    <VehicleSheetTrip
      v-for="trip in relatedTrips"
      :key="trip.id"
      :trip="trip"
      :is-current-trip="trip.id === vehicle.properties.trip.id"
    />
  </ol>
  <ol v-else class="tw-relative tw-mt-4 tw-list-none !tw-pl-0">
    <VehicleSheetTripSkeleton />
  </ol>
</template>

<script>
export default {
  data: () => ({
    relatedTrips: [],
    isTripsLoaded: false,
  }),
  computed: {
    agency() {
      return this.$store.state.agencies.selection
    },
    vehicle() {
      return this.$store.state.vehicles.selection
    },
  },
  watch: {
    vehicle(newVehicule, oldVehicle) {
      oldVehicle.id !== newVehicule.id && this.loadTrips(newVehicule)
    },
  },
  mounted() {
    this.loadTrips(this.vehicle)
  },
  methods: {
    async loadTrips(vehicle) {
      if (vehicle.id === this.isTripsLoaded) {
        return
      }

      if (!vehicle?.properties?.trip?.blockId) {
        return
      }

      this.relatedTrips = []

      const { data } = await this.$axios.get(
        `/agencies/${this.agency.slug}/trips/${vehicle.properties.trip.id}/blocks`
      )
      this.relatedTrips = data.data
      this.isTripsLoaded = vehicle.id
    },
  },
}
</script>
