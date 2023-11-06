<template>
  <ol
    v-if="vehicle.id && relatedTrips.length"
    class="tw-relative tw-mt-4 tw-list-none !tw-pl-0"
  >
    <VehicleSheetTrip
      v-for="trip in relatedTrips"
      :key="trip.id"
      :trip="trip"
      :is-current-trip="trip.id === vehicle.trip.id"
    />
  </ol>
  <ol v-else class="tw-relative tw-mt-4 tw-list-none !tw-pl-0">
    <VehicleSheetTripSkeleton />
  </ol>
</template>

<script>
export default {
  props: {
    vehicle: {
      type: Object,
      required: false,
      default: () => ({
        id: false,
      }),
    },
    agency: {
      type: Object,
      required: false,
      default: null,
    },
  },
  data: () => ({
    relatedTrips: [],
    isTripsLoaded: false,
  }),
  watch: {
    vehicle(newVehicule, oldVehicle) {
      if (oldVehicle?.id === newVehicule?.id) {
        return
      }

      if (!newVehicule) {
        return
      }

      this.loadTrips(newVehicule)
    },
  },
  mounted() {
    this.loadTrips(this.vehicle)
  },
  methods: {
    // TODO: Review this component
    async loadTrips(vehicle) {
      if (vehicle.id === this.isTripsLoaded) {
        return
      }

      if (!vehicle.properties.trip.blockId) {
        return
      }

      this.relatedTrips = []

      // Find agency
      const { data } = await this.$axios.get(
        `/agencies/${this.agency.slug}/trips/${vehicle.properties.trip.id}/blocks`
      )
      this.relatedTrips = data.data
      this.isTripsLoaded = vehicle.id
    },
  },
}
</script>
