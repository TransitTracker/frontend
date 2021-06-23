<template>
  <div>
    <div v-if="vehicle.meta.habsBus" class="d-flex items-center tt-habs">
      <div class="tt-habs__box tt-habs__box--blue ml-n4"></div>
      <div class="ml-4 py-1">
        <p class="text-subtitle-2 mb-0">GO HABS GO!</p>
        <p class="text-body-2 mb-0">
          {{ $t('mapBottomSheet.habs') }}
        </p>
      </div>
      <div class="flex-grow-1"></div>
      <div class="tt-habs__box tt-habs__box--red mr-n4"></div>
    </div>
    <v-slide-group
      v-if="Object.keys(links).length"
      class="px-4 pt-2 tt-links-slider"
      :class="[darkMode ? 'dark' : 'white']"
      show-arrows
      :prev-icon="null"
    >
      <v-slide-item v-for="(link, index) in links" :key="index">
        <v-skeleton-loader
          v-if="link.loading || !link.url"
          class="mr-4 my-2"
          width="200px"
          min-height="62px"
          max-height="62px"
          type="image"
        ></v-skeleton-loader>
        <v-sheet
          v-else
          rounded
          elevation="2"
          :class="[darkMode ? 'grey darken-3' : 'white']"
          class="pa-2 d-flex align-center mr-4 my-2 cursor-pointer"
          :light="!darkMode"
          :dark="darkMode"
          :title="$t('mapBottomSheet.openLink')"
          @click="openLink(link.url)"
        >
          <div>
            <p class="subtitle-2 mb-1">
              {{ link.title }}
            </p>
            <p class="body-2 mb-0">
              {{ link.description }}
            </p>
          </div>
          <v-icon class="ml-4" size="20px">
            {{ mdiOpenInNew }}
          </v-icon>
        </v-sheet>
      </v-slide-item>
    </v-slide-group>

    <v-list :dense="$vuetify.breakpoint.mdAndDown">
      <div v-for="(property, index) in properties" :key="index">
        <v-list-item
          v-if="
            property.parent
              ? vehicle[property.parent][property.name]
              : vehicle[property.name]
          "
          :class="[
            property.mobileOnly && 'd-md-none',
            // The API will always return a label, even if it's the same as ref.
            // Do not show if label and ref are equal.
            property.name === 'label' &&
              vehicle.label === vehicle.ref &&
              'd-md-none',
          ]"
        >
          <v-list-item-icon>
            <v-icon v-text="property.icon" />
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              v-if="property.name !== 'timestamp'"
              class="d-flex align-center justify-space-between"
            >
              <p class="mb-0 white-space--normal">
                <b>
                  {{
                    $t(
                      `mapBottomSheet.properties.${
                        property.label || property.name
                      }`
                    )
                  }}
                </b>
                <span
                  v-if="
                    property.name === 'routeId' && vehicle.trip.routeLongName
                  "
                >
                  {{ vehicle.trip.routeShortName }}
                  {{ vehicle.trip.routeLongName }}
                  <code v-if="vehicle.trip.routeShortName !== vehicle.routeId">
                    {{ vehicle.routeId }}
                  </code>
                </span>
                <span v-else :class="property.css">
                  {{
                    property.content
                      ? vehicle[property.content]
                      : property.parent
                      ? vehicle[property.parent][property.name]
                      : vehicle[property.name]
                  }}
                </span>
                <span v-if="property.name === 'odometer'">km</span>
                <span v-if="property.name === 'speed'">km/h</span>
                <code v-if="property.showRaw">
                  {{ vehicle[property.parent].data }}
                </code>
              </p>
              <v-btn
                v-if="property.help"
                icon
                small
                class="float-right"
                @click="helpToggle[property.name] = !helpToggle[property.name]"
              >
                <v-icon color="secondary-dark">
                  {{ helpToggle[property.name] ? mdiClose : mdiHelpCircle }}
                </v-icon>
              </v-btn>
            </v-list-item-title>
            <v-list-item-title v-else>
              <TimestampAgo :timestamp="parseInt(vehicle.timestamp)" />
            </v-list-item-title>
            <v-list-item-subtitle
              v-if="helpToggle[property.name]"
              class="
                pa-2
                secondary-dark
                white--text
                rounded
                white-space--normal
              "
            >
              {{ $t(`mapBottomSheet.help.${property.name}`) }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </div>
      <v-list-item v-if="vehicle.meta.json">
        <v-list-item-icon>
          <v-icon>{{ mdiCodeJson }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            <json-viewer :value="vehicle.meta.json" sort copyable>
              <template #copy="slots">
                <v-btn small icon color="secondary">
                  <v-icon v-if="slots.copied">{{ mdiClipboardCheck }}</v-icon>
                  <v-icon v-else>{{ mdiContentCopy }}</v-icon>
                </v-btn>
              </template>
            </json-viewer>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <!-- </div> -->
  </div>
  <!-- </v-bottom-sheet> -->
</template>

<script>
// import collect from 'collect.js'
import JsonViewer from 'vue-json-viewer'
import Vue from 'vue'
import VueTimeago from 'vue-timeago'
import {
  mdiBusClock,
  mdiBusStop,
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
} from '@mdi/js'

Vue.use(VueTimeago, {})

export default {
  components: { JsonViewer },
  filters: {
    timestampToTime(timestamp) {
      const date = new Date(timestamp * 1000)
      const minutes =
        date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
      const seconds =
        date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
      return `${date.getHours()}:${minutes}:${seconds}`
    },
  },
  props: {
    sheetOpen: Boolean,
  },
  data: () => ({
    mdiBusClock,
    mdiBusStop,
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
    properties: [
      {
        name: 'timestamp',
        icon: mdiClock,
        mobileOnly: true,
      },
      {
        name: 'label',
        content: 'ref',
        icon: mdiIdentifier,
        help: true,
      },
      {
        name: 'plate',
        icon: mdiFormatLetterStartsWith,
      },
      {
        name: 'tripId',
        icon: mdiIdentifier,
        help: true,
      },
      {
        name: 'routeId',
        icon: mdiMapMarkerPath,
        mobileOnly: true,
      },
      {
        name: 'headsign',
        parent: 'trip',
        icon: mdiSignDirection,
      },
      {
        name: 'shortName',
        parent: 'trip',
        icon: mdiTicketConfirmation,
      },
      {
        name: 'startTime',
        icon: mdiBusClock,
      },
      {
        name: 'label',
        parent: 'scheduleRelationship',
        label: 'scheduleRelationship',
        icon: mdiTimelinePlus,
        help: true,
      },
      {
        name: 'odometer',
        icon: mdiCounter,
      },
      {
        name: 'label',
        parent: 'currentStatus',
        label: 'currentStatus',
        icon: mdiBusStop,
        help: true,
        showRaw: true,
      },
      {
        name: 'currentStopSequence',
        icon: mdiTimetable,
        help: true,
      },
      {
        name: 'speed',
        icon: mdiSpeedometer,
      },
      {
        name: 'label',
        parent: 'occupancyStatus',
        label: 'occupancyStatus',
        icon: mdiSeatPassenger,
        showRaw: true,
      },
      {
        name: 'label',
        parent: 'congestionLevel',
        label: 'congestionLevel',
        icon: mdiTrafficLight,
        showRaw: true,
      },
    ],
    helpToggle: {
      label: false,
      tripId: false,
      scheduleRelationship: false,
      currentStatus: false,
      currentStopSequence: false,
    },
  }),
  computed: {
    agency() {
      return this.$store.state.agencies.data[this.vehicle?.agency?.slug]
    },
    vehicle() {
      return this.$store.state.vehicles.selection
    },
    darkMode() {
      return this.$vuetify.theme.dark
    },
    sheetModel: {
      get() {
        return this.sheetOpen
      },
      set() {
        !this.persistent && this.$emit('close-sheet')
      },
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
    clickOutsideSheet() {
      if (!this.persistent) {
        this.$emit('close-sheet')
      }
    },
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
.tt-habs {
  background-color: rgba(175, 30, 45, 0.15);

  &__box {
    transform: skewX(-15deg);
    width: 50px;

    &--red {
      background-color: #af1e2d;
    }
    &--blue {
      background-color: #192168;
    }
  }
}

.bottom-sheet-overflow {
  max-height: calc(50vh - 80px);
  overflow: auto;
}
.dark {
  background-color: #1e1e1e;
}
.white-space--normal {
  white-space: normal;
}
</style>
<style>
.jv-light .jv-code {
  padding: 0;
}
.jv-light .jv-button {
  padding: 0;
}
.jv-light .jv-tooltip.right {
  right: 0;
}
.tt-links-slider .v-slide-group__prev {
  display: none;
}
.tt-links-slider .v-slide-group__next {
  min-width: unset;
}
.tt-links-slider .v-slide-group__content .v-sheet:first-child {
  margin-left: 4px;
}
</style>
