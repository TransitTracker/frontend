<template>
  <div class="tt-custom">
    <div class="secondary">
      <v-container class="py-4 d-flex">
        <v-icon class="text-h4">mdi-folder-upload</v-icon>
        <div class="ml-4">
          <h1 class="text-h4 font-weight-medium">Bring your own data</h1>
          <p class="text-subtitle-1 font-weight-medium mb-0">
            {{ agency.name }}
          </p>
        </div>
      </v-container>
    </div>
    <v-sheet class="mb-4">
      <v-container class="d-flex align-center">
        <v-btn icon nuxt to="/byod/" exact>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        Back to all custom agencies
        <v-spacer></v-spacer>
        <v-btn text color="error">
          <v-icon left>mdi-delete</v-icon>
          Delete agency
        </v-btn>
      </v-container>
    </v-sheet>
    <v-container>
      <v-card rounded="lg">
        <v-card-title>Routes</v-card-title>
        <v-card-subtitle v-if="lengths.routes" class="pb-0">
          {{ lengths.routes }} routes saved in your browser.
        </v-card-subtitle>
        <v-card-text v-else class="d-flex align-center pb-0">
          <v-icon color="warning">mdi-alert</v-icon>
          <p class="mb-0 text-body-1 ml-2">
            You don't have uploaded any routes yet.
          </p>
        </v-card-text>
        <v-card-actions class="px-4 pb-4">
          <v-file-input
            v-model="files.routes"
            :disabled="loading.routes"
            class="mr-4"
            label="Click to select the routes.txt file"
            truncate-length="50"
            :prepend-icon="null"
            messages="Uploading a new file will overwrite any existing routes."
          ></v-file-input>
          <v-btn
            color="primary"
            text
            :disabled="!files.routes"
            :loading="loading.routes"
            @click="uploadRoutes"
          >
            Upload routes
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card rounded="lg" class="my-6">
        <v-card-title>Trips</v-card-title>
        <v-card-subtitle v-if="lengths.trips" class="pb-0">
          {{ lengths.trips }} trips saved in your browser.
        </v-card-subtitle>
        <v-card-text v-else class="d-flex align-center pb-0">
          <v-icon color="warning">mdi-alert</v-icon>
          <p class="mb-0 text-body-1 ml-2">
            You don't have uploaded any trips yet.
          </p>
        </v-card-text>
        <v-card-actions class="px-4 pb-4">
          <v-file-input
            v-model="files.trips"
            :disabled="loading.trips"
            class="mr-4"
            label="Click to select the trips.txt file"
            truncate-length="50"
            :prepend-icon="null"
            messages="Uploading a new file will overwrite any existing trips."
          ></v-file-input>
          <v-btn
            color="primary"
            text
            :disabled="!files.trips"
            :loading="loading.trips"
            @click="uploadTrips"
          >
            Upload trips
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card rounded="lg">
        <v-card-title>Vehicles (GTFS Realtime)</v-card-title>
        <v-card-subtitle class="pb-0">
          <span v-if="lengths.vehicles">
            {{ lengths.vehicles }} vehicles saved in your browser (active and
            not active).
          </span>
          vehiclePosition in the protocol buffer format.
        </v-card-subtitle>
        <v-card-text
          v-if="lengths.vehicles === 0"
          class="d-flex align-center pb-0 pt-2"
        >
          <v-icon color="warning">mdi-alert</v-icon>
          <p class="mb-0 text-body-1 ml-2">
            You don't have uploaded any vehicles yet.
          </p>
        </v-card-text>
        <v-card-actions class="px-4 pb-0">
          <v-file-input
            v-model="files.vehicles"
            :disabled="loading.vehicles"
            class="mr-4"
            label="Click to select the vehiclePosition file"
            truncate-length="50"
            :prepend-icon="null"
          ></v-file-input>
          <v-btn
            color="primary"
            text
            :disabled="!files.vehicles"
            :loading="loading.vehicles"
            @click="uploadVehicles"
          >
            Upload vehicles
          </v-btn>
        </v-card-actions>
      </v-card>
      <p class="mt-4">
        Once uploaded, your vehicles are accessible in every region of Transit
        Tracker. All data is saved in your browser.
      </p>
    </v-container>
  </div>
</template>

<script>
export default {
  async asyncData({ params, store, redirect }) {
    const agency = await store.dispatch('agencies/getCustomById', params.agency)
    if (!agency) redirect('/byod')
    return { agency }
  },
  data: () => ({
    files: {
      routes: undefined,
      trips: undefined,
      vehicles: undefined,
    },
    lengths: {
      routes: 0,
      trips: 0,
      vehicles: 0,
    },
    loading: {
      routes: false,
      trips: false,
      vehicles: false,
    },
    feed: null,
    json: null,
  }),
  mounted() {
    this.refreshStats()
  },
  methods: {
    refreshStats() {
      this.$database.routes
        .where({ agency: this.agency.id })
        .count((result) => {
          this.lengths.routes = result
        })
      this.$database.trips.where({ agency: this.agency.id }).count((result) => {
        this.lengths.trips = result
      })
      this.$database.vehicles
        .where({ agency: this.agency.id })
        .count((result) => {
          this.lengths.vehicles = result
        })
    },
    uploadRoutes() {
      this.loading.routes = true

      // Send file
      this.$store
        .dispatch('gtfs/processRoutes', {
          agency: this.agency.id,
          file: this.files.routes,
        })
        .then(() => {
          this.files.routes = undefined
          this.loading.routes = false
          this.refreshStats()
        })
    },
    uploadTrips() {
      this.loading.trips = true

      // Send file
      this.$store
        .dispatch('gtfs/processTrips', {
          agency: this.agency.id,
          file: this.files.trips,
        })
        .then((result) => {
          this.files.trips = undefined
          this.loading.trips = false
          this.refreshStats()
        })
    },
    uploadVehicles() {
      this.loading.vehicles = true

      // Open and read file
      const fileReader = new FileReader()
      fileReader.readAsArrayBuffer(new Blob([this.files.vehicles]))

      fileReader.onload = () => {
        // Save vehicles
        this.$store
          .dispatch('vehicles/processCustomFeed', {
            agency: this.agency,
            file: new Uint8Array(fileReader.result),
          })
          .then(() => {
            this.files.vehicles = undefined
            this.loading.vehicles = false
            this.refreshStats()
          })
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
