<template>
  <dl>
    <VehicleSheetProperty
      v-for="(property, index) in properties"
      :key="index"
      :property="property"
      :vehicle="vehicle"
    />
    <VehicleSheetQuickProperty
      v-for="(property, index) in quickProperties"
      :key="index"
      :property="property"
      :vehicle="vehicle"
    />
  </dl>
</template>

<script>
import {
  mdiBusClock,
  mdiBusStop,
  mdiCalendarStart,
  mdiCounter,
  mdiFormatLetterStartsWith,
  mdiIdentifier,
  mdiMapMarkerPath,
  mdiSeatPassenger,
  mdiSignDirection,
  mdiSpeedometer,
  mdiTicketConfirmation,
  mdiTimelinePlus,
  mdiTimetable,
  mdiTrafficLight,
} from '@mdi/js'

export default {
  props: {
    vehicle: {
      type: Object,
      required: true,
    },
    group: {
      type: String,
      required: false,
      default: 'vehicle',
    },
  },
  data: () => ({
    groups: {
      // TODO: add suffix
      trip: [
        {
          field: 'speed',
          icon: mdiSpeedometer,
          isQuick: true,
          suffix: 'km/h',
        },
        {
          field: 'congestionLevel.data',
          icon: mdiTrafficLight,
          isQuick: true,
          onlyProgress: true,
        },
        {
          field: 'occupancyStatus.data',
          icon: mdiSeatPassenger,
          isQuick: true,
          onlyProgress: true,
        },
        {
          field: 'tripId',
          icon: mdiIdentifier,
          help: true,
        },
        {
          field: 'routeId',
          icon: mdiMapMarkerPath,
          mobileOnly: true,
        },
        {
          field: 'headsign',
          parent: 'trip',
          icon: mdiSignDirection,
          mobileOnly: true,
        },
        {
          field: 'shortName',
          parent: 'trip',
          icon: mdiTicketConfirmation,
        },
        {
          field: 'startTime',
          icon: mdiBusClock,
        },
        {
          field: 'scheduleRelationship.label',
          icon: mdiTimelinePlus,
          help: true,
        },
        {
          field: 'currentStatus.label',
          icon: mdiBusStop,
          help: true,
        },
        {
          field: 'currentStopSequence',
          icon: mdiTimetable,
          help: true,
        },
        // TODO: show only on mobile
        {
          field: 'speed',
          icon: mdiSpeedometer,
          mobileOnly: true,
        },
        {
          field: 'occupancyStatus.label',
          icon: mdiSeatPassenger,
          showRaw: true,
          mobileOnly: true,
        },
        {
          field: 'congestionLevel.label',
          icon: mdiTrafficLight,
          showRaw: true,
          mobileOnly: true,
        },
      ],
      vehicle: [
        {
          field: 'ref',
          icon: mdiIdentifier,
          help: true,
          condition: 'refDifferent',
        },
        {
          field: 'plate',
          icon: mdiFormatLetterStartsWith,
        },
        {
          field: 'odometer',
          icon: mdiCounter,
        },
        {
          field: 'createdAt',
          icon: mdiCalendarStart,
          format: 'date',
        },
      ],
    },
  }),
  computed: {
    properties() {
      return this.groups[this.group].filter((property) => {
        return !property.isQuick
      })
    },
    quickProperties() {
      return this.groups[this.group].filter((property) => {
        return property.isQuick
      })
    },
  },
}
</script>
