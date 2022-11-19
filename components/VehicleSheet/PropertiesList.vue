<template>
  <dl>
    <VehicleSheetProperty
      v-for="(property, index) in properties"
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
      default: null,
    },
  },
  data: () => ({
    groups: {
      vehicle: [
        {
          name: 'label',
          content: 'ref',
          icon: mdiIdentifier,
          help: 'label',
        },
        {
          name: 'plate',
          icon: mdiFormatLetterStartsWith,
        },
        {
          name: 'odometer',
          icon: mdiCounter,
        },
        {
          name: 'createdAt',
          icon: mdiCalendarStart,
          format: 'date',
        },
      ],
      trip: [
        {
          name: 'tripId',
          icon: mdiIdentifier,
          help: 'tripId',
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
          mobileOnly: true,
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
          help: 'scheduleRelationship',
        },
        {
          name: 'label',
          parent: 'currentStatus',
          label: 'currentStatus',
          icon: mdiBusStop,
          help: 'currentStatus',
          showRaw: true,
        },
        {
          name: 'currentStopSequence',
          icon: mdiTimetable,
          help: 'currentStopSequence',
        },
        {
          name: 'speed',
          icon: mdiSpeedometer,
          mobileOnly: true,
        },
        {
          name: 'label',
          parent: 'occupancyStatus',
          label: 'occupancyStatus',
          icon: mdiSeatPassenger,
          showRaw: true,
          mobileOnly: true,
        },
        {
          name: 'label',
          parent: 'congestionLevel',
          label: 'congestionLevel',
          icon: mdiTrafficLight,
          showRaw: true,
          mobileOnly: true,
        },
      ],
    },
  }),
  computed: {
    properties() {
      if (!(this.group in this.groups)) {
        return [...this.groups.vehicle, ...this.groups.trip]
      }

      return this.groups[this.group]
    },
  },
}
</script>
