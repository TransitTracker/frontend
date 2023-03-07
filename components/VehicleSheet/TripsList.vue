<template>
  <TwDetails small-icon>
    <template #summary>
      <h3 class="tw-text-neutral10 tw-text-sm tw-font-medium tw-leading-5">
        {{ $t('view') }}
      </h3>
    </template>
    <ol class="tw-relative tw-mt-4 tw-list-none !tw-pl-0" v-if="isTripsLoaded">
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
    <VehicleSheetProperty
      :property="{
        field: 'trip.blockId',
        icon: mdiIdentifier,
      }"
      :vehicle="vehicle"
    />
  </TwDetails>
</template>

<script>
import { mdiIdentifier } from '@mdi/js'

export default {
  props: {
    vehicle: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    relatedTrips: [],
    mdiIdentifier,
    isTripsLoaded: false,
  }),
  mounted() {
    this.loadTrips(this.vehicle)
  },
  watch: {
    vehicle(old, newVehicule) {
      this.loadTrips(newVehicule)
    },
  },
  methods: {
    async loadTrips(vehicle) {
      this.relatedTrips = []

      const { data } = await this.$axios.get(
        `/agencies/${vehicle.agency}/trips/${vehicle.trip.id}/blocks`
      )
      this.relatedTrips = data.data
      this.isTripsLoaded = true
    },
  },
}
</script>

<i18n>
{
   "en":{
      "view":"View related trips"
   },
   "fr":{
      "view":"Voir les voyages reliés"
   }
}
  </i18n>
