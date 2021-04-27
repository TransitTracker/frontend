<template>
  <div v-if="vehicle && vehicle.id" class="tt-backdrop overflow-hidden">
    <!-- <v-sheet class="d-flex align-center justify-center">
      <div
        class="py-1 px-12 my-1 rounded-xl"
        :class="[darkMode ? 'grey darken-3' : 'grey lighten-3']"
      ></div>
    </v-sheet> -->
    <v-footer
      :color="darkMode ? '' : 'grey lighten-4'"
      height="80px"
      class="d-flex align-center tt-footer px-4"
    >
      <v-avatar
        :color="agency.color"
        :size="$vuetify.breakpoint.mdAndDown ? 36 : 48"
        class="tt-footer__vehicle"
      >
        <svg
          v-if="vehicle.bearing"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16.933 16.938"
          class="tt-footer__vehicle__arrow d-md-block"
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
          :size="$vuetify.breakpoint.mdAndDown ? 24 : 28"
        >
          {{ mdi[vehicle.vehicleType] }}
        </v-icon>
      </v-avatar>
      <div class="ml-4">
        <p class="mb-0 text-subtitle-1 text-md-h6">
          {{ vehicle.label || vehicle.ref }}
        </p>
        <p class="mb-0 text-caption d-md-none">
          {{ agency.shortName }}
        </p>
        <p class="mb-0 text-caption text-md-body-2 d-none d-md-block">
          <TimestampAgo
            v-if="vehicle.timestamp"
            :timestamp="parseInt(vehicle.timestamp)"
          />
          <span v-if="vehicle.timestamp">&bull;</span>
          {{ agency.name }}
        </p>
      </div>
      <v-spacer></v-spacer>
      <div
        :style="{
          color: vehicle.trip.routeTextColor,
          backgroundColor: vehicle.trip.routeColor,
        }"
        class="py-2 px-3 rounded tt-footer-line"
        :class="[!vehicle.trip.routeLongName && 'text-center']"
      >
        <small
          v-if="!vehicle.trip.routeLongName"
          class="text-caption text-uppercase"
        >
          {{ $t('mapBottomSheet.properties.routeId') }}
          <br class="d-md-none" />
        </small>
        <b class="mb-0">
          {{ vehicle.trip.routeShortName || vehicle.routeId }}
        </b>
        <p class="mb-0 text-body-2 d-none d-md-block">
          {{ vehicle.trip.routeLongName }}
        </p>
      </div>
      <MapProperty
        v-if="vehicle.speed"
        desktop
        :icon="mdiSpeedometer"
        :icon-title="$t('mapBottomSheet.properties.speed')"
        :value="`${vehicle.speed} km/h`"
      />
      <MapProperty
        v-if="vehicle.occupancyStatus.data"
        desktop
        progress
        :icon="mdiSeatPassenger"
        :icon-title="$t('mapBottomSheet.properties.occupancyStatus')"
        :value="(vehicle.occupancyStatus.data / 5) * 100"
        :value-title="vehicle.occupancyStatus.label"
      />
      <MapProperty
        v-if="vehicle.congestionLevel.data"
        desktop
        progress
        :icon="mdiTrafficLight"
        :icon-title="$t('mapBottomSheet.properties.congestionLevel')"
        :value="(vehicle.congestionLevel.data / 5) * 100"
        :value-title="vehicle.congestionLevel.label"
      />
      <v-spacer />
      <v-icon class="tt-footer__chevron">{{ mdiChevronDown }}</v-icon>
    </v-footer>
    <MapBottomSheet />
  </div>
  <v-footer
    v-else
    height="80px"
    class="justify-center text-center tt-backdrop py-0"
  >
    {{ $t('mapFooter.select') }}
  </v-footer>
</template>

<script>
import {
  mdiBus,
  mdiChevronDown,
  mdiChevronUp,
  mdiFerry,
  mdiNavigation,
  mdiSeatPassenger,
  mdiSpeedometer,
  mdiTrafficLight,
  mdiTrain,
  mdiTram,
} from '@mdi/js'

export default {
  filters: {
    uppercase: (value) => {
      return value.toUpperCase()
    },
  },
  data: () => ({
    mdiChevronDown,
    mdiChevronUp,
    mdiNavigation,
    mdiSeatPassenger,
    mdiSpeedometer,
    mdiTrafficLight,
    mdi: {
      bus: mdiBus,
      ferry: mdiFerry,
      train: mdiTrain,
      tram: mdiTram,
    },
  }),
  computed: {
    agency() {
      return this.$store.state.agencies.data[this.vehicle?.agency]
    },
    darkMode() {
      return this.$vuetify.theme.dark
    },
    vehicle() {
      return this.$store.state.vehicles.selection
    },
    tripStyle() {
      return {
        backgroundColor: this.colorFilter(this.vehicle.trip.routeColor),
        color: this.colorFilter(this.vehicle.trip.routeTextColor),
        borderColor:
          this.colorFilter(this.vehicle.trip.routeColor) || this.agency.color,
      }
    },
  },
  methods: {
    colorFilter(value) {
      if (typeof value !== 'string') return null
      if (value.startsWith('#')) return value
      return '#'.concat(value)
    },
  },
}
</script>

<style lang="scss" scoped>
.tt-backdrop {
  position: absolute;
  width: 100%;
  padding-bottom: 56px;
  // top: calc(100vh - 64px - 88px - 56px);
  top: calc(100vh - 64px - 80px - 56px);
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  z-index: 3;
}

.tt-footer {
  padding: 0 16px;

  &__vehicle {
    position: relative;
    overflow: visible;

    &__arrow {
      position: absolute;
      top: -8px;
      bottom: -8px;
      left: -8px;
      right: -8px;
      width: 64px;
      height: 64px;
    }
  }
}

@media (min-width: 600px) {
  .tt-footer-line {
    min-width: 200px;
  }
}

@media only screen and (max-width: 960px) {
  .tt-backdrop {
    // top: calc(100vh - 56px - 88px - 56px);
    top: calc(100vh - 56px - 80px - 56px);
  }
  .tt-footer__vehicle__arrow {
    top: -6px;
    bottom: -6px;
    left: -6px;
    right: -6px;
    height: 48px;
    width: 48px;
  }
}
</style>
