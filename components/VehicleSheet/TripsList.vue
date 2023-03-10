<template>
  <ol
    class="tw-relative tw-mt-4 tw-list-none !tw-pl-0"
    v-if="relatedTrips.length"
  >
    <VehicleSheetTrip
      v-for="trip in relatedTrips"
      :key="trip.id"
      :trip="trip"
      :is-current-trip="trip.id === vehicle.trip.id"
    />
  </ol>
  <ol class="tw-relative tw-mt-4 tw-list-none !tw-pl-0" v-else>
    <VehicleSheetTripSkeleton />
  </ol>
</template>

<script>
export default {
  data: () => ({
    relatedTrips: [],
    isTripsLoaded: false,
  }),
  mounted() {
    this.loadTrips(this.vehicle)
  },
  computed: {
    vehicle() {
      return this.$store.state.vehicles.selection
    },
  },
  watch: {
    vehicle(newVehicule, oldVehicle) {
      oldVehicle.id !== newVehicule.id && this.loadTrips(newVehicule)
    },
  },
  methods: {
    async loadTrips(vehicle) {
      if (vehicle.id === this.isTripsLoaded) {
        return
      }

      if (!vehicle.trip.blockId) {
        return
      }

      this.relatedTrips = []

      const { data } = await this.$axios.get(
        `/agencies/${vehicle.agency}/trips/${vehicle.trip.id}/blocks`
      )
      this.relatedTrips = data.data
      this.isTripsLoaded = vehicle.id
    },
  },
}
</script>
