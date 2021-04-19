/* eslint-disable lines-between-class-members */

import { v4 as uuid } from 'uuid'

// Enums
const VehicleStopStatus = {
  0: 'Incoming at',
  1: 'Stopped at',
  2: 'In transit to',
}
const ScheduleRelationship = {
  0: 'Scheduled',
  1: 'Added',
  2: 'Unscheduled',
  3: 'Canceled',
}
const CongestionLevel = {
  0: 'Unknown congestion level',
  1: 'Running smoothly',
  2: 'Stop and go',
  3: 'Congestion',
  4: 'Severe congestion',
}
const OccupancyStatus = {
  0: 'Empty',
  1: 'Many seats available',
  2: 'Few seats available',
  3: 'Standing room only',
  4: 'Crushed standing room only',
  5: 'Full',
  6: 'Not accepting passengers',
}

export class Agency {
  // Model definition
  id
  name
  shortName
  slug
  cities = []
  defaultVehicleType
  color
  textColor = '#ffffff'
  regions = ['*']
  license = {
    url: null,
    title: '',
    isDownloadable: true,
  }
  meta = {
    createdAt: null,
    updatedAt: null,
    timestamp: null,
  }

  constructor({ name, vehicleType, color }) {
    this.id = uuid()
    this.slug = this.id
    this.name = name
    this.shortName = name
    this.defaultVehicleType = vehicleType
    this.color = color
    this.meta.createdAt = new Date().toISOString()
    this.meta.updatedAt = new Date().toISOString()
  }
}

export class Vehicle {
  // Model denifition
  agency
  ref
  id
  isActive = true
  label
  timestamp
  tripId
  routeId
  startTime
  position = {
    lat: 0,
    lon: 0,
  }
  bearing
  speed
  vehicleType
  plate
  odometer
  currentStopSequence
  currentStatus = {
    data: null,
    label: null,
  }
  scheduleRelationship = {
    data: null,
    label: null,
  }
  congestionLevel = {
    data: null,
    label: null,
  }
  occupancyStatus = {
    data: null,
    label: null,
  }
  links = []
  trip = {
    id: null,
    headsign: null,
    shortName: null,
    routeColor: null,
    routeTextColor: null,
    routeShortName: null,
    routeLongName: null,
    shapeLink: null,
    serviceId: null,
  }
  tripUpdates = {}
  meta = {
    json: {},
    isLocal: true,
    geoJson: {
      type: 'Feature',
      properties: {
        id: null,
        label: null,
        'marker-symbol': null,
      },
      geometry: {
        type: 'Point',
        coordinates: [0, 0],
      },
    },
  }
  // END Model denifition

  constructor() {
    this.id = uuid()
  }

  setAgency(agency) {
    this.agency = agency.slug
    this.vehicleType = agency.defaultVehicleType
  }

  setRealtimeVehicleEntity({ id, vehicle }) {
    this.ref = vehicle.vehicle.id || id
    this.label = vehicle.vehicle.label || this.ref
    this.timestamp = vehicle.timestamp
    this.tripId = vehicle.trip.tripId
    this.routeId = vehicle.trip.routeId
    this.startTime = vehicle.trip.startTime
    this.position.lat = +parseFloat(vehicle.position.latitude).toFixed(4)
    this.position.lon = +parseFloat(vehicle.position.longitude).toFixed(4)
    this.bearing = vehicle.position.bearing
    this.speed = Math.round(vehicle.position.speed)
    this.plate = vehicle.vehicle.licensePlate
    this.odometer = vehicle.position.odometer
    this.currentStopSequence = vehicle.currentStopSequence
    this.currentStatus = this.getCurrentStatus(vehicle.currentStatus)
    this.scheduleRelationship = this.getScheduleRelationship(
      vehicle.trip.scheduleRelationship
    )
    this.congestionLevel = this.getCongestionLevel(vehicle.congestionLevel)
    this.occupancyStatus = this.getOccupancyStatus(vehicle.occupancyStatus)
    this.meta.json.realtimeVehicle = vehicle.toJSON()

    // GeoJson
    this.meta.geoJson.properties.id = this.id
    this.meta.geoJson.properties.label = this.label
    this.meta.geoJson.properties['marker-symbol'] = `tt-custom-${
      this.vehicleType || 'bus'
    }`
    this.meta.geoJson.geometry.coordinates = [
      this.position.lon,
      this.position.lat,
    ]
  }

  setStaticTrip(trip) {
    this.trip.id = trip.trip_id || null
    this.trip.headsign = trip.trip_headsign || null
    this.trip.shortName = trip.trip_short_name || null
    this.trip.serviceId = trip.service_id || null
    this.meta.json.trip = trip
  }

  setStaticRoute(route) {
    this.trip.routeColor = this.formatColor(route.route_color)
    this.trip.routeTextColor = this.formatColor(route.route_text_color)
    this.trip.routeShortName = route.route_short_name || null
    this.trip.routeLongName = route.route_long_name || null
    this.meta.json.route = route

    if (route.route_type) {
      const newType = this.getVehicleType(route.route_type)
      this.vehicleType = newType
      this.meta.geoJson.properties['marker-symbol'] = `tt-custom-${newType}`
    }
  }

  getCurrentStatus(currentStatus) {
    return {
      data: currentStatus,
      label: VehicleStopStatus[currentStatus] || null,
    }
  }

  getScheduleRelationship(scheduleRelationship) {
    return {
      data: scheduleRelationship,
      label: ScheduleRelationship[scheduleRelationship] || null,
    }
  }

  getCongestionLevel(congestionLevel) {
    return {
      data: congestionLevel,
      label: CongestionLevel[congestionLevel] || null,
    }
  }

  getOccupancyStatus(occupancyStatus) {
    return {
      data: occupancyStatus,
      label: OccupancyStatus[occupancyStatus] || null,
    }
  }

  formatColor(color) {
    if (typeof color !== 'string') return null
    if (color.startsWith('#') && color.length === 7) return color

    return '#'.concat(color)
  }

  getVehicleType(routeType) {
    let vehicleType = ''

    switch (routeType) {
      case '0':
      case '900':
      case '901':
      case '902':
      case '903':
      case '904':
      case '905':
      case '906':
        vehicleType = 'tram'
        break
      case '1':
      case '401':
      case '402':
        vehicleType = 'subway'
        break
      case '2':
      case '100':
      case '101':
      case '102':
      case '103':
      case '104':
      case '105':
      case '106':
      case '107':
      case '108':
      case '109':
      case '110':
      case '111':
      case '112':
      case '113':
      case '114':
      case '115':
      case '116':
      case '117':
      case '400':
      case '403':
      case '404':
        vehicleType = 'train'
        break
      case '3':
      case '200':
      case '201':
      case '202':
      case '203':
      case '204':
      case '205':
      case '206':
      case '207':
      case '208':
      case '209':
      case '700':
      case '701':
      case '702':
      case '703':
      case '704':
      case '705':
      case '708':
      case '709':
      case '710':
      case '711':
      case '712':
      case '713':
      case '714':
      case '715':
      case '716':
      case '800':
        vehicleType = 'bus'
        break
      case '4':
      case '1000':
      case '1200':
        vehicleType = 'ferry'
        break
      case 6:
        vehicleType = 'gondola'
        break
    }

    return vehicleType
  }
}
