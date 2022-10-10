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
      <MapVehicleAvatar />
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
          <span v-if="vehicle.vehicleType === 'bus-electric'">
            &bull;
            <span class="tt-footer__electric-bus px-1 py-0.5 rounded">
              <v-icon size="16" color="white">{{ mdiLightningBolt }}</v-icon>
              {{ $t('mapTag.electric') }}
            </span>
          </span>
          <span
            v-if="
              (vehicle.ref === '39050' || vehicle.ref === '39055') &&
              vehicle.agency === 'stm'
            "
          >
            &bull;
            <span class="tt-footer__camera-bus px-1 py-0.5 rounded">
              <v-icon size="16" color="black">{{ mdiCctv }}</v-icon>
              {{ $t('mapTag.mirrorCameras') }}
            </span>
          </span>
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
    <div
      v-if="
        vehicle.vehicleType === 'bus-electric' ||
        ((vehicle.ref === '39050' || vehicle.ref === '39055') &&
          vehicle.agency === 'stm')
      "
      class="px-4 py-2 d-md-none"
      :class="[darkMode ? '' : 'grey lighten-4']"
    >
      <span
        v-if="vehicle.vehicleType === 'bus-electric'"
        class="tt-footer__electric-bus px-1 py-0.5 rounded"
      >
        <v-icon size="16" color="white">{{ mdiLightningBolt }}</v-icon>
        {{ $t('mapTag.electric') }}
      </span>
      <span
        v-if="
          (vehicle.ref === '39050' || vehicle.ref === '39055') &&
          vehicle.agency === 'stm'
        "
        class="tt-footer__camera-bus px-1 py-0.5 rounded"
      >
        <v-icon size="16" color="black">{{ mdiCctv }}</v-icon>
        {{ $t('mapTag.mirrorCameras') }}
      </span>
    </div>
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
  mdiBusElectric,
  mdiCctv,
  mdiFerry,
  mdiLightningBolt,
  mdiNavigation,
  mdiSeatPassenger,
  mdiSpeedometer,
  mdiTrafficLight,
  mdiTrain,
  mdiTram,
} from '@mdi/js'
import MapVehicleAvatar from './MapVehicleAvatar.vue'

export default {
  filters: {
    uppercase: (value) => {
      return value.toUpperCase()
    },
  },
  data: () => ({
    mdiArrowDown,
    mdiCctv,
    mdiLightningBolt,
    mdiNavigation,
    mdiSeatPassenger,
    mdiSpeedometer,
    mdiTrafficLight,
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
  components: { MapVehicleAvatar },
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

  &__camera-bus {
    background-color: #82cad1;
    color: black;
  }

  &__chevron {
    animation: bounce 1s infinite;
  }

  &__electric-bus {
    background-color: #5cbf1a;
    color: white;
  }

  &__slider {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
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
