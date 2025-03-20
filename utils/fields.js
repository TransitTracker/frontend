// This util is required because fields path can change across version. It is easier to keep these fields in this file, and then
// For each field, here is the type definition
// object value: string, required, internal that will never change
// value: string, required
// icon: MDI icon, optional, for VehicleSheet
// help: boolean, optional, for VehicleSheet
// condition: string, optional, for VehicleSheet v-if
// format: string, optional, for VehicleSheet and Table
// group: string, optional, for VehicleSheet (trip or vehicle)
// suffix: string, optional, for VehicleSheet
// width: number, optional, for table
// sortable: boolean, optional, for table
// filterable: boolean, optional, for table
// sort: function, optional, for table

import {
  mdiBusStop,
  mdiCalendarMultiselect,
  mdiCalendarStart,
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

// TODO: Add groupOrder

export const FIELDS_DEFINITIONS = {
  agency: {
    value: 'properties.agencyId',
    width: 250,
  },
  agencyShort: {
    value: 'properties.agencyShort',
    width: 50,
  },
  ref: {
    value: 'properties.vehicle.id',
    icon: mdiIdentifier,
    help: true,
    condition: 'refDifferent',
    group: 'vehicle',
  },
  label: {
    value: 'properties.vehicle.label',
    width: 125,
  },
  tags: {
    value: 'properties.tags',
    sortable: false,
    filterable: false,
  },
  timestamp: {
    value: 'properties.lastSeenAt',
    filterable: false,
    sort: sortTimestamp,
    width: 125,
  },
  tripId: {
    value: 'properties.trip.id',
    width: 200,
    icon: mdiIdentifier,
    help: true,
    group: 'trip',
  },
  'trip.headsign': {
    value: 'properties.trip.headsign',
    width: 150,
    group: 'trip',
    icon: mdiSignDirection,
  },
  'trip.shortName': {
    value: 'properties.trip.shortName',
    width: 125,
    group: 'trip',
    icon: mdiTicketConfirmation,
  },
  startTime: {
    // TODO: Combine startTime and startDate into timestamp
    value: 'properties.trip.startTime',
    filterable: false,
    width: 125,
    icon: mdiClock,
    group: 'trip',
  },
  routeId: {
    value: 'properties.route.id',
    sort: sortNumber,
    width: 100,
    icon: mdiMapMarkerPath,
    condition: 'shortNameDifferent',
    group: 'trip',
  },
  'trip.routeShortName': {
    value: 'properties.route.shortName',
    width: 150,
    icon: mdiTicketConfirmation,
  },
  'trip.serviceId': {
    // TODO: Add to API
    value: 'properties.trip.serviceId',
    width: 125,
    icon: mdiCalendarMultiselect,
    help: true,
    group: 'trip',
  },
  'trip.blockId': {
    // TODO: Add to API
    value: 'properties.trip.blockId',
    width: 125,
  },
  'position.lat': {
    value: 'geometry.coordinates',
    sortable: false,
    filterable: false,
  },
  bearing: {
    value: 'properties.position.bearing',
    filterable: false,
    sort: sortNumber,
  },
  speed: {
    value: 'properties.position.speed',
    sort: sortNumber,
    filterable: false,
    icon: mdiSpeedometer,
    suffix: 'km/h',
    group: 'trip',
  },
  vehicleType: {
    value: 'properties.vehicle.type',
    format: 'enum',
  },
  plate: {
    value: 'properties.vehicle.licensePlate',
    group: 'vehicle',
    icon: mdiFormatLetterStartsWith,
  },
  odometer: {
    value: 'properties.position.odometer',
    sort: sortNumber,
    icon: mdiCounter,
    filterable: false,
    group: 'vehicle',
  },
  currentStopSequence: {
    value: 'properties.currentStopSequence',
    sort: sortNumber,
    filterable: false,
    icon: mdiTimetable,
    help: true,
    group: 'trip',
  },
  'currentStatus.label': {
    value: 'properties.currentStatus',
    sort: sortNumber,
    width: 150,
    format: 'enum',
    icon: mdiBusStop,
    help: true,
    group: 'trip',
  },
  'scheduleRelationship.label': {
    value: 'properties.trip.scheduleRelationship',
    sort: sortNumber,
    width: 150,
    format: 'enum',
    icon: mdiTimelinePlus,
    help: true,
    group: 'trip',
  },
  'congestionLevel.label': {
    value: 'properties.congestionLevel',
    sort: sortNumber,
    width: 150,
    format: 'enum',
    icon: mdiTrafficLight,
    group: 'trip',
  },
  'occupancyStatus.label': {
    sort: sortNumber,
    value: 'properties.occupancyStatus',
    width: 150,
    format: 'enum',
    icon: mdiSeatPassenger,
    group: 'trip',
  },
  createdAt: {
    value: 'properties.firstSeenAt',
    filterable: false,
    sort: sortDate,
    width: 150,
    icon: mdiCalendarStart,
    format: 'date',
    group: 'vehicle',
  },
  actions: {
    value: 'properties.actions',
    sortable: false,
    filterable: false,
  },
}

function sortDate(a, b) {
  return new Date(b) - new Date(a)
}

function sortTimestamp(a, b) {
  return new Date(+b * 1000) - new Date(+a * 1000)
}

function sortNumber(a, b) {
  const cook = (c) => {
    if (c === undefined || c === null) return -Infinity
    return c.indexOf('.') ? parseFloat(c) : parseInt(c, 10)
  }
  a = typeof a === 'number' ? a : cook(a)
  b = typeof b === 'number' ? b : cook(b)
  if (a < b) return -1
  if (a > b) return 1
  return 0
}
