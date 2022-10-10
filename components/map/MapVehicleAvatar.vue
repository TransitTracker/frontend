<template>
  <v-avatar
    :color="agency.color"
    :size="$vuetify.breakpoint.smAndDown ? 36 : 48"
    class="tt-map__vehicle-avatar"
  >
    <svg
      v-if="vehicle.bearing"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16.933 16.938"
      class="tt-map__vehicle-avatar__arrow d-md-block"
      :style="{ transform: `rotate(${vehicle.bearing}deg)` }"
    >
      <g :transform="`translate(-44.26 -44.948)`">
        <circle cx="52.726" cy="53.42" r="6.33" fill="none" />
        <path
          d="m 51.667608,47.188774 1.001731,-2.116158 a 0.06262326,0.06262326 0 0 1 0.113204,0 l 1.001731,2.116158 z"
          :fill="agency.color"
        />
      </g>
    </svg>
    <v-icon
      :color="agency.textColor"
      :size="$vuetify.breakpoint.smAndDown ? 24 : 28"
    >
      {{ mdi[vehicle.vehicleType] }}
    </v-icon>
  </v-avatar>
</template>

<script>
import { mdiBus, mdiBusElectric, mdiFerry, mdiTrain, mdiTram } from '@mdi/js'

export default {
  data: () => ({
    mdi: {
      bus: mdiBus,
      'bus-electric': mdiBusElectric,
      ferry: mdiFerry,
      train: mdiTrain,
      tram: mdiTram,
    },
  }),
  computed: {
    agency() {
      return this.$store.state.agencies.data[this.vehicle?.agency]
    },
    vehicle() {
      return this.$store.state.vehicles.selection
    },
  },
}
</script>

<style lang="scss" scoped>
.tt-map__vehicle-avatar {
  position: relative;
  overflow: visible;

  &__arrow {
    position: absolute;
    top: -12px;
    bottom: -12px;
    left: -12px;
    right: -12px;
    width: 72px;
    height: 72px;
  }
}
</style>
