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
  mdiBusStop,
  mdiCalendarStart,
  mdiCalendarMultiselect,
  mdiClock,
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
      trip: [
        {
          field: 'position.speed',
          icon: mdiSpeedometer,
          suffix: 'km/h',
        },
        {
          field: 'congestionLevel',
          icon: mdiTrafficLight,
        },
        {
          field: 'occupancyStatus',
          icon: mdiSeatPassenger,
        },
        {
          field: 'trip.id',
          icon: mdiIdentifier,
          help: true,
        },
        {
          field: 'route.id',
          icon: mdiMapMarkerPath,
          condition: 'shortNameDifferent',
        },
        {
          field: 'trip.headsign',
          parent: 'trip',
          icon: mdiSignDirection,
        },
        {
          field: 'trip.shortName',
          parent: 'trip',
          icon: mdiTicketConfirmation,
        },
        {
          field: 'trip.startTime',
          icon: mdiClock,
        },
        {
          field: 'trip.scheduleRelationship',
          icon: mdiTimelinePlus,
          help: true,
        },
        {
          field: 'currentStatus',
          icon: mdiBusStop,
          help: true,
        },
        {
          field: 'currentStopSequence',
          icon: mdiTimetable,
          help: true,
        },
        {
          field: 'trip.serviceId',
          parent: 'trip',
          icon: mdiCalendarMultiselect,
          help: true,
        },
      ],
      vehicle: [
        {
          field: 'vehicle.id',
          icon: mdiIdentifier,
          help: true,
          condition: 'refDifferent',
        },
        {
          field: 'vehicle.licensePlate',
          icon: mdiFormatLetterStartsWith,
        },
        {
          field: 'vehicle.odometer',
          icon: mdiCounter,
        },
        {
          field: 'firstSeenAt',
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
  },
}
</script>
