<template>
  <div class="tt-custom">
    <div class="secondary mb-4">
      <v-container>
        <h1 class="text-h4 font-weight-medium py-4">Bring your own data</h1>
      </v-container>
    </div>
    <v-container>
      Start by upload the static GTFS, with the <code>routes.txt</code> file and
      the <code>trips.txt</code> file then upload your GTFS-RT feed here. For
      now, only
      <code>vehiclePositions</code>
      feeds are supported. <br />
      <div class="d-flex align-center justify-items-start mt-4 mb-2">
        <v-file-input
          v-model="files.routes"
          :disabled="progress.step !== 0"
          class="mr-4"
          prepend-icon="mdi-file"
          label="Routes"
          truncate-length="100"
        ></v-file-input>
        <v-btn
          color="primary"
          :disabled="!files.routes || progress.step !== 0"
          @click="loadRoutes"
        >
          Load file
        </v-btn>
      </div>
      <div class="d-flex align-center justify-items-start mt-4 mb-2">
        <v-file-input
          v-model="files.trips"
          :disabled="progress.step !== 3"
          class="mr-4"
          prepend-icon="mdi-file"
          label="Trips"
          truncate-length="100"
        ></v-file-input>
        <v-btn
          color="primary"
          :disabled="!files.trips || progress.step !== 3"
          @click="loadTrips"
        >
          Load file
        </v-btn>
      </div>
      <div class="d-flex align-center justify-items-start mt-4 mb-2">
        <v-file-input
          v-model="files.vehicles"
          :disabled="progress.step !== 6"
          class="mr-4"
          prepend-icon="mdi-file"
          label="Real time feed"
          truncate-length="100"
        ></v-file-input>
        <v-btn
          color="primary"
          :disabled="!files.vehicles || progress.step !== 6"
          @click="loadFeed"
        >
          Load file
        </v-btn>
      </div>
      <div class="d-flex align-center">
        <v-progress-circular
          :value="progress.step * 10"
          class="mr-2"
          color="secondary"
        ></v-progress-circular>
        {{ progress.text }}
      </div>
      <json-view v-if="json" :data="json" class="mt-4" />
    </v-container>
  </div>
</template>

<script>
import GtfsRealtimeBindings from 'gtfs-realtime-bindings'
import { v4 as uuid } from 'uuid'
import { JSONView } from 'vue-json-component'

export default {
  components: { 'json-view': JSONView },
  data: () => ({
    agencyUuid: null,
    files: {
      routes: null,
      trips: null,
      vehicles: null,
    },
    feed: null,
    json: null,
    progress: {
      step: 0,
      text: 'Upload the routes.txt to get started',
    },
  }),
  methods: {
    loadRoutes() {
      this.progress = {
        step: 1,
        text: 'Reading the routes.txt file...',
      }

      // Add agency to store
      this.agencyUuid = uuid()
      this.$store.commit('agencies/add', {
        id: this.agencyUuid,
        name: 'Custom Agency',
        shortName: 'Custom',
        slug: this.agencyUuid,
        defaultVehicleType: 'bus',
        color: '#4dccbd',
        textColor: '#ffffff',
        regions: [
          {
            slug: 'custom',
            name: 'Custom',
          },
        ],
        license: {
          url: null,
          title: 'None',
          isDownloadable: true,
        },
      })
      this.$store.commit('agencies/addCustom', this.agencyUuid)

      // Send file
      this.$store
        .dispatch('gtfs/processRoutes', {
          agency: this.agencyUuid,
          file: this.files.routes,
        })
        .then((result) => {
          // Next stop
          this.progress = {
            step: 3,
            text: `${result} routes have been loaded, continue with the trips file`,
          }
        })
    },
    loadTrips() {
      this.progress = {
        step: 4,
        text: 'Reading the trips.txt file...',
      }

      // Send file
      this.$store
        .dispatch('gtfs/processTrips', {
          agency: this.agencyUuid,
          file: this.files.trips,
        })
        .then((result) => {
          // Next stop
          this.progress = {
            step: 6,
            text: `${result} trips have been loaded, continue with the trips file`,
          }
        })
    },
    loadFeed() {
      this.progress = {
        step: 7,
        text: 'Reading the feed...',
      }

      const fileReader = new FileReader()
      fileReader.readAsArrayBuffer(new Blob([this.files.vehicles]))

      fileReader.onload = () => {
        const pb = new Uint8Array(fileReader.result)
        this.feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(pb)
        this.progress = {
          value: 8,
          text: 'Processing the feed...',
        }

        // Add time
        this.$store.commit('agencies/setTime', {
          agency: this.agencyUuid,
          timestamp: this.feed.header.timestamp,
        })

        this.progress = {
          value: 9,
          text: `Adding ${this.feed.entity.length} vehicles...`,
        }

        // Get all routes and trips
        const routes = this.$store.state.gtfs.routes[this.agencyUuid]
        const trips = this.$store.state.gtfs.trips[this.agencyUuid]

        // Prepare an array of vehicles
        const vehicles = this.feed.entity.map((entity) => {
          const route =
            routes.find((r) => r.route_id === entity.vehicle.trip.routeId) || {}
          const trip =
            trips.find((t) => t.trip_id === entity.vehicle.trip.tripId) || {}

          return {
            id: entity.id,
            ref: entity.vehicle.vehicle.id,
            isActive: true,
            label: entity.vehicle.vehicle.label || entity.vehicle.vehicle.id,
            timestamp: entity.vehicle.timestamp || null,
            tripId: entity.vehicle.trip.tripId || null,
            routeId: entity.vehicle.trip.routeId || null,
            startTime: entity.vehicle.trip.startTime || null,
            position: {
              lat: +parseFloat(entity.vehicle.position.latitude).toFixed(4),
              lon: +parseFloat(entity.vehicle.position.longitude).toFixed(4),
            },
            bearing: entity.vehicle.position.bearing || null,
            speed: Math.round(entity.vehicle.position.speed) || null,
            vehicleType: 'custom',
            plate: entity.vehicle.vehicle.licensePlate || null,
            odometer: entity.vehicle.position.odometer || null,
            currentStopSequence: entity.vehicle.currentStopSequence || null,
            currentStatus: {
              data: entity.vehicle.currentStatus || null,
              label: '',
            },
            scheduleRelationship: {
              data: entity.vehicle.trip.scheduleRelationship || null,
              label: '',
            },
            congestionLevel: {
              data: entity.vehicle.congestionLevel || null,
              label: '',
            },
            occupancyStatus: {
              data: entity.vehicle.occupancyStatus || null,
              label: '',
            },
            agency: {
              id: this.agencyUuid,
              slug: this.agencyUuid,
            },
            links: [],
            trip: {
              id: trip.trip_id || null,
              headsign: trip.trip_headsign || null,
              shortName: trip.trip_short_name || null,
              routeColor: route.route_color || null,
              routeTextColor: route.route_text_color || null,
              routeShortName: route.route_short_name || null,
              routeLongName: route.route_long_name || null,
              shapeLink: null,
              serviceId: trip.service_id || null,
            },
          }
        })

        // Add vehicles
        this.$store.commit('vehicles/set', {
          agency: this.agencyUuid,
          vehicles,
          features: {
            type: 'FeatureCollection',
            features: this.feed.entity.map((entity) => {
              return {
                type: 'Feature',
                properties: {
                  id: entity.id,
                  label:
                    entity.vehicle.vehicle.label || entity.vehicle.vehicle.id,
                  'marker-symbol': 'tt-custom-custom',
                },
                geometry: {
                  type: 'Point',
                  coordinates: [
                    entity.vehicle.position.longitude,
                    entity.vehicle.position.latitude,
                  ],
                },
              }
            }),
          },
        })

        this.progress = {
          value: 100,
          text:
            'Complete! Your feed is now available in the map and table tab.',
        }
      }
    },
  },
}
</script>

<style>
.settings {
  width: 100%;
  height: 100%;
}
</style>
