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

export default (context, inject) => {
  class Vehicle {
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
    }
    // END Model denifition

    constructor() {
      this.id = uuid()
    }

    setAgency(agency) {
      this.agency = agency.slug
      if (!this.vehicleType) this.vehicleType = agency.defaultVehicleType
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
    }

    setStaticTrip(trip) {
      this.trip.id = trip.trip_id || null
      this.trip.headsign = trip.trip_headsign || null
      this.trip.shortName = trip.trip_short_name || null
      this.trip.serviceId = trip.service_id || null
      this.meta.json.trip = trip
    }

    setStaticRoute(route) {
      this.trip.routeColor = route.route_color || null
      this.trip.routeTextColor = route.route_text_color || null
      this.trip.routeShortName = route.route_short_name || null
      this.trip.routeLongName = route.route_long_name || null
      this.meta.json.route = route
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
  }

  inject('byod', {
    Vehicle,
  })
}
