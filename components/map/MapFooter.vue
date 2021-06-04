<template>
  <div v-if="vehicle && vehicle.id" class="tt-backdrop overflow-hidden">
    <!-- <v-sheet class="d-flex align-center justify-center">
    </v-sheet> -->
    <v-footer
      :color="darkMode ? '' : 'grey lighten-4'"
      height="80px"
      class="d-flex align-center tt-footer px-4"
    >
      <div class="d-flex justify-center tt-footer__slider">
        <div
          class="py-0.5 px-10 my-1 rounded-xl"
          :class="[darkMode ? 'grey darken-3' : 'grey lighten-2']"
        ></div>
      </div>
      <v-avatar
        :color="agency.color"
        :size="$vuetify.breakpoint.smAndDown ? 36 : 48"
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
          :size="$vuetify.breakpoint.smAndDown ? 24 : 28"
        >
          {{ mdi[vehicle.vehicleType] }}
        </v-icon>
      </v-avatar>
      <div class="ml-4 ml-md-0">
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
      <div
        :style="{
          color: vehicle.trip.routeTextColor,
          backgroundColor: vehicle.trip.routeColor,
        }"
        class="py-1.5 px-3 rounded tt-footer__line ml-4 ml-md-0"
        :class="[!vehicle.trip.routeLongName && 'text-center']"
      >
        <small
          v-if="!vehicle.trip.routeLongName"
          class="text-caption text-uppercase"
        >
          {{ $t('mapBottomSheet.properties.routeId') }}
          <br class="d-md-none" />
        </small>
        <span class="font-weight-bold">
          {{ vehicle.trip.routeShortName || vehicle.routeId }}
        </span>
        <span class="text-body-2 d-none d-md-block text-truncate">
          {{ vehicle.trip.routeLongName }}
          {{
            vehicle.trip.headsign !== vehicle.trip.routeLongName
              ? `&rsaquo; ${vehicle.trip.headsign}`
              : ''
          }}
        </span>
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
      <div class="d-flex flex-column align-center">
        <span class="text-caption">{{ $t('mapFooter.scroll') }}</span>
        <v-btn
          :title="$t('mapFooter.scroll')"
          icon
          @click="scrollToBottomSheet"
        >
          <v-icon class="tt-footer__chevron" size="20">
            {{ mdiArrowDown }}
          </v-icon>
        </v-btn>
      </div>
    </v-footer>
    <MapBottomSheet ref="bottomSheet" />
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
  mdiArrowDown,
  mdiBus,
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
    mdiArrowDown,
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
    scrollToBottomSheet() {
      this.$refs.bottomSheet?.$el?.scrollIntoView({
        behavior: 'smooth',
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.tt-backdrop {
  position: absolute;
  width: 100%;
  padding-bottom: 56px;
  top: calc(100vh - 64px - 80px - 56px);
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  z-index: 3;
}

.tt-footer {
  padding: 0 16px;
  position: relative;

  &__chevron {
    animation: bounce 1s infinite;
  }

  &__slider {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }

  &__vehicle {
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
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(-15%);
    animationtimingfunction: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animationtimingfunction: cubic-bezier(0, 0, 0.2, 1);
  }
}

@media (min-width: 960px) {
  .tt-footer {
    column-gap: 32px;

    &__line {
      min-width: 200px;
      max-width: 250px;
    }
  }
}

@media only screen and (max-width: 960px) {
  .tt-backdrop {
    top: calc(100vh - 56px - 80px - 56px);
  }
  .tt-footer__vehicle__arrow {
    top: -10px;
    bottom: -10px;
    left: -10px;
    right: -10px;
    height: 56px;
    width: 56px;
  }
}
</style>
