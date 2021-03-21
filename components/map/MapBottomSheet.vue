<template>
  <v-bottom-sheet
    v-model="sheetModel"
    hide-overlay
    :persistent="persistent"
    class="map-bottom-sheet"
  >
    <v-sheet>
      <div
        class="d-flex align-center pa-4 grey"
        :class="[darkMode ? 'darken-4' : 'lighten-4']"
      >
        <div class="flex-grow-1">
          <b>
            {{ $t('mapBottomSheet.vehicle') }}
            {{ vehicle.label ? vehicle.label : vehicle.ref }}
          </b>
          <br />
          <span v-if="vehicle.timestamp">
            {{ $t('mapBottomSheet.seenAt') }}
            {{ vehicle.timestamp | timestampToTime }}
          </span>
        </div>
        <v-btn
          icon
          :color="darkMode ? 'white' : 'primary'"
          class="mx-4"
          @click="togglePersistent"
        >
          <v-icon v-if="persistent">
            {{ mdiSvg.pinOff }}
          </v-icon>
          <v-icon v-else>
            {{ mdiSvg.pin }}
          </v-icon>
        </v-btn>
        <v-btn
          outlined
          :color="darkMode ? 'white' : 'primary'"
          @click="$emit('close-sheet')"
        >
          <span class="d-none d-md-block">{{
            $t('mapBottomSheet.close')
          }}</span>
          <v-icon>{{ mdiSvg.close }}</v-icon>
        </v-btn>
      </div>
      <div class="bottom-sheet-overflow">
        <v-slide-group
          v-if="vehicle.links.length"
          class="px-4 py-2 grey"
          :class="[darkMode ? 'darken-3' : 'lighten-3']"
          show-arrows
        >
          <v-slide-item v-for="link in stateLinks" :key="link.id">
            <v-sheet
              rounded
              elevation="2"
              :class="[darkMode ? 'dark' : 'white']"
              class="pa-2 d-flex align-center mr-4 my-2 cursor-pointer"
              :light="!darkMode"
              :dark="darkMode"
              @click="openLink(link.url)"
            >
              <div>
                <p class="subtitle-2 mb-1">
                  {{ settingsLanguageEnglish ? link.title.en : link.title.fr }}
                </p>
                <p class="body-2 mb-0">
                  {{
                    settingsLanguageEnglish
                      ? link.description.en
                      : link.description.fr
                  }}
                </p>
              </div>
              <v-icon class="ml-4" size="20px">
                {{ mdiSvg.openInNew }}
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
            >
              <v-list-item-icon>
                <v-icon v-text="property.icon" />
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title
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
                        property.name === 'routeId' &&
                        vehicle.trip.routeLongName
                      "
                    >
                      {{ vehicle.trip.routeShortName }}
                      {{ vehicle.trip.routeLongName }}
                      <code
                        v-if="vehicle.trip.routeShortName !== vehicle.routeId"
                      >
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
                    <span v-if="property.name === 'bearing'">
                      &deg;
                      <v-icon
                        :style="{
                          transform: 'rotate(' + vehicle.bearing + 'deg)',
                        }"
                      >
                        {{ mdiSvg.navigation }}
                      </v-icon>
                    </span>
                    <span v-if="property.name === 'speed'">km/h</span>
                  </p>
                  <v-btn
                    v-if="property.help"
                    icon
                    small
                    class="float-right"
                    @click="
                      helpToggle[property.name] = !helpToggle[property.name]
                    "
                  >
                    <v-icon color="secondary">
                      {{
                        helpToggle[property.name]
                          ? mdiSvg.close
                          : mdiSvg.helpCircle
                      }}
                    </v-icon>
                  </v-btn>
                </v-list-item-title>
                <v-list-item-subtitle
                  v-if="helpToggle[property.name]"
                  class="pa-2 secondary darken-3 white--text rounded white-space--normal"
                >
                  {{ $t(`mapBottomSheet.help.${property.name}`) }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </div>
          <v-list-item v-if="vehicle.meta.json">
            <v-list-item-icon>
              <v-icon>mdi-code-json</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                <json-viewer :value="vehicle.meta.json" sort copyable>
                  <template #copy="slots">
                    <v-btn small icon color="secondary">
                      <v-icon v-if="slots.copied">mdi-clipboard-check</v-icon>
                      <v-icon v-else>mdi-content-copy</v-icon>
                    </v-btn>
                  </template>
                </json-viewer>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
// import collect from 'collect.js'
import JsonViewer from 'vue-json-viewer'

import {
  mdiBusClock,
  mdiBusStop,
  mdiClose,
  mdiCompass,
  mdiIdentifier,
  mdiMapMarkerPath,
  mdiNavigation,
  mdiOpenInNew,
  mdiPin,
  mdiPinOff,
  mdiSignDirection,
  mdiSpeedometer,
  mdiTicketConfirmation,
  mdiTimetable,
  mdiFormatLetterStartsWith,
  mdiCounter,
  mdiTrafficLight,
  mdiSeatPassenger,
  mdiTimelinePlus,
  mdiHelpCircle,
} from '@mdi/js'
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
    persistent: false,
    mdiSvg: {
      pinOff: mdiPinOff,
      pin: mdiPin,
      close: mdiClose,
      openInNew: mdiOpenInNew,
      navigation: mdiNavigation,
      helpCircle: mdiHelpCircle,
    },
    properties: [
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
        name: 'bearing',
        icon: mdiCompass,
      },
      {
        name: 'speed',
        icon: mdiSpeedometer,
      },
      {
        name: 'label',
        parent: 'currentStatus',
        label: 'currentStatus',
        icon: mdiBusStop,
        help: true,
      },
      {
        name: 'currentStopSequence',
        icon: mdiTimetable,
        help: true,
      },
      {
        name: 'label',
        parent: 'congestionLevel',
        label: 'congestionLevel',
        icon: mdiTrafficLight,
      },
      {
        name: 'label',
        parent: 'occupancyStatus',
        label: 'occupancyStatus',
        icon: mdiSeatPassenger,
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
    stateLinks() {
      // return collect(this.$store.state.links.data)
      //   .whereIn('id', this.vehicle.links)
      //   .all()
      return ''
    },
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
  },
}
</script>

<style scoped>
.bottom-sheet-overflow {
  max-height: calc(50vh - 80px);
  overflow: auto;
}
.cursor-pointer {
  cursor: pointer;
}
#links-list {
  overflow-x: auto;
}
#links-list > div {
  white-space: nowrap;
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
</style>
