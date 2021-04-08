<template>
  <v-footer
    v-if="vehicle && vehicle.id"
    :color="darkMode ? '' : 'grey lighten-4'"
    height="80px"
    class="d-flex align-center tt-footer px-4"
  >
    <v-avatar
      :color="agency.color"
      :size="$vuetify.breakpoint.mdAndDown ? 36 : 48"
      class="tt-footer-vehicle"
    >
      <svg
        v-if="vehicle.bearing"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16.933 16.938"
        class="arrow d-none d-md-block"
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
      <v-icon :color="agency.textColor"> mdi-{{ vehicle.vehicleType }} </v-icon>
    </v-avatar>
    <div>
      <p class="mb-0 text-subtitle-1 text-md-h6">
        {{ vehicle.label || vehicle.ref }}
      </p>
      <p class="mb-0 text-caption d-md-none">
        {{ agency.shortName }}
      </p>
      <p class="mb-0 text-caption d-none d-md-block">
        <timeago
          :datetime="(parseInt(vehicle.timestamp) || 0) * 1000"
          :auto-update="30"
        />
        &bull;
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
    >
      <b class="mb-0">
        {{ vehicle.trip.routeShortName || vehicle.routeId }}
      </b>
      <p class="mb-0 text-body-2 d-none d-md-block">
        {{ vehicle.trip.routeLongName }}
      </p>
    </div>
    <div v-if="vehicle.speed" class="text-center d-none d-md-block">
      <b class="mb-0">{{ vehicle.speed }} km/h</b>
      <p class="mb-0 mt-1 text-caption">
        <v-icon>mdi-speedometer</v-icon>
      </p>
    </div>
    <div
      v-if="vehicle.occupancyStatus.data"
      class="text-center tt-footer-occupancy d-none d-md-block"
    >
      <v-progress-linear
        height="11px"
        class="progress my-1"
        :value="(vehicle.occupancyStatus.data / 5) * 100"
        :color="darkMode ? 'white' : 'primary'"
        :title="vehicle.occupancyStatus.label"
      />
      <p class="mb-0 mt-2 text-caption">
        <v-icon>mdi-seat-passenger</v-icon>
      </p>
    </div>
    <div
      v-if="vehicle.congestionLevel.data"
      class="text-center tt-footer-congestion d-none d-md-block"
    >
      <v-progress-linear
        height="11px"
        class="progress my-1"
        :value="(vehicle.congestionLevel.data / 5) * 100"
        :color="darkMode ? 'white' : 'primary'"
        :title="vehicle.congestionLevel.label"
      />
      <p class="mb-0 mt-2 text-caption">
        <v-icon>mdi-traffic-light</v-icon>
      </p>
    </div>
    <v-spacer />
    <v-btn text icon @click="$emit('open-sheet')">
      <v-icon>
        {{ mdiSvg.chevronUp }}
      </v-icon>
    </v-btn>
  </v-footer>
  <v-footer v-else class="d-flex align-center justify-center">
    <span class="select">{{ $t('mapFooter.select') }}</span>
  </v-footer>
</template>

<script>
import Vue from 'vue'
import VueTimeago from 'vue-timeago'
import { mdiNavigation, mdiChevronUp } from '@mdi/js'

Vue.use(VueTimeago, {})

export default {
  filters: {
    uppercase: (value) => {
      return value.toUpperCase()
    },
  },
  data: () => ({
    mdiSvg: {
      navigation: mdiNavigation,
      chevronUp: mdiChevronUp,
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
.v-footer {
  padding: 0 16px;
  min-height: 76px;
}
.col {
  margin: auto;
  text-align: center;
}
.agency {
  text-align: left;
}
.trip {
  white-space: nowrap;
  overflow: hidden;
}
.trip .route {
  padding: 5px;
  border-radius: 3px;
  font-size: 14px;
  text-align: center;
  border-width: 3px;
  border-style: solid;
}
.trip .route span,
.trip .route {
  overflow: hidden;
  text-overflow: ellipsis;
}
.trip .second-line {
  text-align: center;
}
.expand {
  text-align: right;
}
.bearing {
  max-width: 105px;
}
.speed {
  max-width: 105px;
}
.tt-footer {
  column-gap: 32px;
}
.tt-footer-vehicle {
  margin-right: -16px;
  position: relative;
  overflow: visible;
  .arrow {
    position: absolute;
    top: -8px;
    bottom: -8px;
    left: -8px;
    right: -8px;
    width: 64px;
    height: 64px;
  }
}
@media (min-width: 600px) {
  .tt-footer-line {
    min-width: 200px;
  }
}
.tt-footer-occupancy .progress,
.tt-footer-congestion .progress {
  width: 40px;
}
</style>
