<template>
  <v-avatar
    :color="agency.color"
    :size="$vuetify.breakpoint.smAndDown ? 36 : 48"
    class="tt-map__vehicle-avatar"
  >
    <svg
      v-if="vehicle.properties.position.bearing"
      :viewBox="$vuetify.breakpoint.smAndDown ? '0 0 64 64' : '0 0 85 85'"
      fill="none"
      class="tt-map__vehicle-avatar__arrow d-md-block"
      xmlns="http://www.w3.org/2000/svg"
      :style="{
        transform: `rotate(${vehicle.properties.position.bearing}deg)`,
      }"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        :fill="agency.color"
        :d="
          $vuetify.breakpoint.smAndDown
            ? 'M32.3923 0L40.3799 13.8349C37.831 12.6571 34.9923 12 32 12C29.4095 12 26.9341 12.4925 24.6622 13.389L32.3923 0ZM32 14C35.8628 14 39.4415 15.2168 42.3735 17.288C46.9872 20.5471 50 25.9217 50 32C50 41.9411 41.9411 50 32 50C22.0589 50 14 41.9411 14 32C14 25.388 17.5651 19.6086 22.878 16.4793C25.5529 14.9038 28.6709 14 32 14Z'
            : 'M43.5231 0L54.1732 18.4466C50.7747 16.8762 46.9897 16 43 16C39.546 16 36.2454 16.6567 33.2162 17.8519L43.5231 0ZM43.9611 18.6856C48.7435 18.8739 53.1663 20.4617 56.8314 23.0507C62.983 27.3962 67 34.5623 67 42.6667C67 55.9215 56.2548 66.6667 43 66.6667C29.7452 66.6667 19 55.9215 19 42.6667C19 33.8506 23.7535 26.1448 30.8373 21.9724L30.8373 21.9724C32.1748 21.1846 33.5953 20.5228 35.0826 20.0033C37.5615 19.1374 40.2257 18.6667 43 18.6667C43 18.6667 43 18.6667 43 18.6667C43.3219 18.6667 43.6423 18.673 43.9611 18.6856Z'
        "
      />
    </svg>
    <v-icon
      :color="agency.textColor"
      :size="$vuetify.breakpoint.smAndDown ? 24 : 28"
    >
      {{ mdi[vehicle.properties.vehicle.type] }}
    </v-icon>
  </v-avatar>
</template>

<script>
import { mdiBus, mdiSubway, mdiFerry, mdiTrain, mdiTram } from '@mdi/js'

export default {
  data: () => ({
    mdi: {
      0: mdiTram,
      1: mdiSubway,
      2: mdiTrain,
      3: mdiBus,
      4: mdiFerry,
    },
  }),
  computed: {
    agency() {
      return this.$store.state.agencies.selection ?? {}
    },
    vehicle() {
      return this.$store.state.vehicles.selection ?? {}
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
    width: 64px;
    height: 64px;

    @media (min-width: 768px) {
      width: 85px;
      height: 85px;
    }
  }
}
</style>
