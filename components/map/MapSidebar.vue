<template>
  <v-card class="tt-map-sidebar" width="360" rounded="12" v-if="vehicle.id">
    <v-row class="mx-4" align="center">
      <MapVehicleAvatar />
      <v-col>
        <v-card-title>{{ vehicle.label ?? vehicle.ref }}</v-card-title>
        <v-card-subtitle>
          {{ agency.name }} <br />
          <TimestampAgo
            v-if="vehicle.timestamp"
            :timestamp="parseInt(vehicle.timestamp)"
          />
        </v-card-subtitle>
      </v-col>
    </v-row>
    <v-card-text>
      <div
        v-if="vehicle.trip.routeShortName"
        :style="{
          color: vehicle.trip.routeTextColor,
          backgroundColor: vehicle.trip.routeColor,
        }"
        class="px-2 py-1 rounded-lg d-flex"
      >
        <b class="mr-1">{{ vehicle.trip.routeShortName }}</b>
        <span class="font-weight-medium">
          <b>{{ vehicle.trip.routeLongName }}</b> <br />
          <v-icon
            small
            v-if="vehicle.trip.headsign"
            :color="vehicle.trip.routeTextColor"
          >
            {{ mdiArrowRight }}
          </v-icon>
          {{ vehicle.trip.headsign }}
        </span>
      </div>
      <div
        v-else
        :style="{
          border: `1px solid ${agency.color}`,
          color: agency.color,
          backgroundColor: agency.textColor,
        }"
        class="px-2 py-1 rounded-lg font-weight-bold"
      >
        Route
        {{ vehicle.routeId }}
      </div>
    </v-card-text>
    <v-divider />
    <v-card-text>
      <v-row align="center" justify="space-around" class="mx-0">
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
      </v-row>
    </v-card-text>
    <v-divider />
    <div class="px-4 py-4">
      <p class="text-subheader mb-2">Étiquettes</p>
      <Tag
        v-for="tag in vehicle.tags"
        :key="tag"
        :tag-id="tag"
        class="mr-2"
      ></Tag>
    </div>
    <v-divider />
    <v-expansion-panels>
      <v-expansion-panel class="tt-map-sidebar__expansion-panel">
        <v-expansion-panel-header class="px-4 text-subheader">
          Liens
          <template v-slot:actions>
            <small class="text-caption mr-1">{{ vehicle.links.length }}</small>
            <v-icon>{{ mdiChevronDown }}</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <Links :vehicle="vehicle" class="mt-n4 mx-n2" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-divider />
    <VehicleSheetPropertiesList :vehicle="vehicle" class="pt-4 pb-2" />
  </v-card>
</template>

<script>
import {
  mdiArrowRight,
  mdiBusClock,
  mdiBusStop,
  mdiChevronDown,
  mdiClipboardCheck,
  mdiClock,
  mdiClose,
  mdiCodeJson,
  mdiContentCopy,
  mdiCounter,
  mdiFormatLetterStartsWith,
  mdiHelpCircle,
  mdiIdentifier,
  mdiMapMarkerPath,
  mdiNavigation,
  mdiOpenInNew,
  mdiPin,
  mdiPinOff,
  mdiSeatPassenger,
  mdiSignDirection,
  mdiSpeedometer,
  mdiTicketConfirmation,
  mdiTimelinePlus,
  mdiTimetable,
  mdiTrafficLight,
  mdiBus,
  mdiBusElectric,
  mdiFerry,
  mdiTrain,
  mdiTram,
} from '@mdi/js'

export default {
  data: () => ({
    mdiArrowRight,
    mdiBusClock,
    mdiBusStop,
    mdiChevronDown,
    mdiClipboardCheck,
    mdiClock,
    mdiClose,
    mdiCodeJson,
    mdiContentCopy,
    mdiCounter,
    mdiFormatLetterStartsWith,
    mdiHelpCircle,
    mdiIdentifier,
    mdiMapMarkerPath,
    mdiNavigation,
    mdiOpenInNew,
    mdiPin,
    mdiPinOff,
    mdiSeatPassenger,
    mdiSignDirection,
    mdiSpeedometer,
    mdiTicketConfirmation,
    mdiTimelinePlus,
    mdiTimetable,
    mdiTrafficLight,
    persistent: false,
    links: {},
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
    darkMode() {
      return this.$vuetify.theme.dark
    },
  },
  watch: {
    vehicle(value) {
      this.getLinks(value)
    },
  },
  mounted() {
    this.getLinks(this.vehicle)
  },
  methods: {
    openLink(url) {
      const tab = window.open(
        url
          .replace(':id', this.vehicle.id)
          .replace(':ref', this.vehicle.ref)
          .replace(':trip', this.vehicle.tripId),
        '_blank'
      )
      tab.focus()
    },
    togglePersistent() {
      this.persistent ? (this.persistent = false) : (this.persistent = true)
    },
    getLinks(vehicle) {
      if (Object.keys(this.links).length) {
        Object.keys(this.links).forEach((key) => this.$delete(this.links, key))
      }
      if (!vehicle || !vehicle.links) return
      vehicle.links.forEach(async (id) => {
        this.$set(this.links, id, { loading: true })
        const link = await this.$store.dispatch('links/get', id)
        this.$set(this.links, id, link)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.tt-map-sidebar {
  position: absolute;
  left: 16px;
  top: 16px;
  // 64px (toolbar) + 56px (bottom bar) + 41px (Mapbox logo) + 32px vertical padding
  max-height: calc(100vh - 64px - 56px - 41px - 32px);
  overflow-y: auto;

  &__expansion-panel::before {
    box-shadow: none !important;
  }
}
</style>
