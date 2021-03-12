<template>
  <div class="tt-custom">
    <div class="secondary tt-background-texture">
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
        <v-btn text color="error" @click="deleteAgency">
          <v-icon left>mdi-delete</v-icon>
          Delete agency
        </v-btn>
      </v-container>
    </v-sheet>
    <v-container class="mb-14">
      <v-card rounded="lg">
        <v-card-title>Routes</v-card-title>
        <v-card-subtitle v-if="lengths.routes" class="pb-0">
          {{ lengths.routes }} routes saved in your browser.
        </v-card-subtitle>
        <v-card-text v-else class="d-flex align-center pb-0">
          <v-icon color="warning">mdi-alert</v-icon>
          <p class="mb-0 text-body-1 ml-2">
            You don't have imported any routes yet.
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
            messages="Importing a new file will overwrite any existing routes."
          ></v-file-input>
          <v-btn
            color="primary"
            text
            :disabled="!files.routes"
            :loading="loading.routes"
            @click="importRoutes"
          >
            Import routes
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
            You don't have imported any trips yet.
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
            messages="Importing a new file will overwrite any existing trips."
          ></v-file-input>
          <v-btn
            color="primary"
            text
            :disabled="!files.trips"
            :loading="loading.trips"
            @click="importTrips"
          >
            Import trips
          </v-btn>
        </v-card-actions>
      </v-card>
      <!-- <v-card rounded="lg" class="my-6">
        <v-card-title>Shapes</v-card-title>
        <v-card-subtitle v-if="lengths.trips" class="pb-0">
          {{ lengths.shapes }} shapes saved in your browser.
        </v-card-subtitle>
        <v-card-text v-else class="d-flex align-center pb-0">
          <v-icon color="warning">mdi-alert</v-icon>
          <p class="mb-0 text-body-1 ml-2">
            You don't have imported any shapes yet.
          </p>
        </v-card-text>
        <v-card-actions class="px-4 pb-4">
          <v-file-input
            v-model="files.shapes"
            :disabled="loading.shapes"
            class="mr-4"
            label="Click to select the shapes.txt file"
            truncate-length="50"
            :prepend-icon="null"
            messages="Importing a new file will overwrite any existing shapes."
          ></v-file-input>
          <v-btn
            color="primary"
            text
            :disabled="!files.shapes"
            :loading="loading.shapes"
            @click="importShapes"
          >
            Import trips
          </v-btn>
        </v-card-actions>
      </v-card> -->
      <v-card rounded="lg">
        <v-card-title>GTFS Realtime entities</v-card-title>
        <v-card-subtitle class="pb-0">
          Upload a GTFS-RT feed in the protocol buffer format.
        </v-card-subtitle>
        <v-card-text>
          <div class="d-flex align-center mt-2">
            <b class="mb-0">Empty exisisting entities: </b>
            <v-btn
              color="error"
              x-small
              class="ml-2"
              @click="emptyEntities('vehicles')"
            >
              <v-icon left>mdi-delete</v-icon>
              vehiclePositions
            </v-btn>
            <v-btn
              color="error"
              x-small
              class="ml-1"
              @click="emptyEntities('alerts')"
            >
              <v-icon left>mdi-delete</v-icon>
              alerts
            </v-btn>
            <v-btn
              color="error"
              x-small
              class="ml-1"
              @click="emptyEntities('tripUpdates')"
            >
              <v-icon left>mdi-delete</v-icon>
              tripUpdates
            </v-btn>
          </div>
          <v-tabs v-model="rtTab">
            <v-tab>Local</v-tab>
            <v-tab>Remote</v-tab>
          </v-tabs>
          <v-tabs-items v-model="rtTab">
            <v-tab-item>
              <div class="d-flex align-center">
                <v-file-input
                  v-model="files.entities"
                  :disabled="loading.entities"
                  class="mr-4"
                  label="Click to select the vehiclePosition file"
                  messages="You can import as many file as you want. Entity with the same ID will be updated."
                  truncate-length="50"
                  :prepend-icon="null"
                ></v-file-input>
                <v-btn
                  color="primary"
                  text
                  :disabled="!files.entities"
                  :loading="loading.entities"
                  @click="importEntities"
                >
                  Import entities
                </v-btn>
              </div>
            </v-tab-item>
            <v-tab-item>
              <v-alert
                v-if="remote.showError"
                type="error"
                dense
                text
                class="my-4"
              >
                There was an error while fetching this URL:
                <b>{{ remote.error }}</b>
                This could be a CORS error.
              </v-alert>
              <v-text-field v-model="remote.url" label="Remote URL" />
              <v-switch
                v-model="remote.autoRefresh"
                label="Auto refresh every minute"
                prepend-icon="mdi-sync"
              />
              <v-btn color="primary" @click="saveRemoteUrl">
                Save and fetch feed
              </v-btn>
            </v-tab-item>
          </v-tabs-items>
        </v-card-text>
      </v-card>
      <nuxt-link
        v-if="hasEntities"
        :to="localePath(`/byod/${agency.slug}/data`)"
        tag="div"
        class="cursor-pointer"
      >
        <v-sheet rounded="lg" class="my-6 d-flex justify-space-around">
          <div
            v-if="lengths.vehicles"
            class="d-flex flex-column align-center py-6"
          >
            <div class="text-h3">
              {{ lengths.vehicles }}
              <v-icon color="primary">mdi-bus</v-icon>
            </div>
            <p class="text-subtitle-1 mb-0">vehicle positions</p>
          </div>
          <div
            v-if="lengths.alerts"
            class="d-flex flex-column align-center py-6"
          >
            <div class="text-h3">
              {{ lengths.alerts }}
              <v-icon color="primary">mdi-alert</v-icon>
            </div>
            <p class="text-subtitle-1 mb-0">alerts</p>
          </div>
          <div
            v-if="lengths.tripUpdates"
            class="d-flex flex-column align-center py-6"
          >
            <div class="text-h3">
              {{ lengths.tripUpdates }}
              <v-icon color="primary">mdi-timeline-clock</v-icon>
            </div>
            <p class="text-subtitle-1 mb-0">trip updates</p>
          </div>
        </v-sheet>
      </nuxt-link>
      <p class="mt-4">
        Once imported, your vehicles are accessible in every region of Transit
        Tracker. All data is saved in your browser.
      </p>
    </v-container>
    <v-dialog v-model="deleteDialog" persistent width="400">
      <v-card>
        <v-card-text class="d-flex flex-column align-center">
          <span class="my-4">
            Please wait. It could take a couple of minutes.
          </span>
          <v-progress-circular indeterminate />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  async asyncData({ params, store, redirect }) {
    const agency = await store.dispatch('agencies/getLocal', params.agency)
    if (!agency) redirect('/byod')
    return { agency }
  },
  data: () => ({
    files: {
      routes: undefined,
      trips: undefined,
      entities: undefined,
      // shapes: undefined,
    },
    lengths: {
      routes: 0,
      trips: 0,
      vehicles: 0,
      // shapes: 0,
    },
    loading: {
      routes: false,
      trips: false,
      entities: false,
      // shapes: false,
    },
    feed: null,
    json: null,
    rtTab: null,
    remote: {
      url: '',
      autoRefresh: false,
      showError: false,
      error: null,
    },
    deleteDialog: false,
  }),
  computed: {
    hasEntities() {
      // TODO: Cleanup
      if (this.lengths.vehicles) return true
      if (this.lengths.alerts) return true
      if (this.lengths.tripUpdates) return true
      return false
    },
  },
  mounted() {
    this.refreshStats()
    this.remote = {
      url: this.agency.meta.remoteUrl || '',
      autoRefresh: this.agency.meta.remoteAutoRefresh || false,
    }
  },
  methods: {
    async deleteAgency() {
      this.deleteDialog = true
      await this.$store.dispatch('gtfs/delete', {
        agency: this.agency,
        model: 'routes',
      })
      await this.$store.dispatch('gtfs/delete', {
        agency: this.agency,
        model: 'trips',
      })
      await this.$store.dispatch('gtfs/delete', {
        agency: this.agency,
        model: 'vehicles',
      })
      await this.$store.dispatch('gtfs/delete', {
        agency: this.agency,
        model: 'alerts',
      })
      await this.$store.dispatch('gtfs/delete', {
        agency: this.agency,
        model: 'tripUpdates',
      })
      await this.$store.dispatch('agencies/delete', {
        agency: this.agency,
      })
      this.deleteDialog = false
      this.$router.push('/byod')
    },
    async emptyEntities(type) {
      this.deleteDialog = true
      await this.$store.dispatch('gtfs/delete', {
        agency: this.agency,
        model: type,
      })
      this.deleteDialog = false
      this.refreshStats([type])
    },
    refreshStats(
      types = ['routes', 'trips', 'vehicles', 'alerts', 'tripUpdates']
    ) {
      types.forEach((type) => {
        this.$database[type]
          .where({ agency: this.agency.slug })
          .count((result) => {
            this.lengths[type] = result
          })
      })
    },
    importRoutes() {
      this.loading.routes = true

      // Send file
      this.$store
        .dispatch('gtfs/saveRoutes', {
          agency: this.agency,
          file: this.files.routes,
        })
        .then(() => {
          this.files.routes = undefined
          this.loading.routes = false
          this.refreshStats(['routes'])
        })
    },
    importTrips() {
      this.loading.trips = true

      // Send file
      this.$store
        .dispatch('gtfs/saveTrips', {
          agency: this.agency,
          file: this.files.trips,
        })
        .then((result) => {
          this.files.trips = undefined
          this.loading.trips = false
          this.refreshStats(['trips'])
        })
    },
    // importShapes() {
    //   this.loading.shapes = true

    //   // Send file
    //   this.$store
    //     .dispatch('gtfs/saveShapes', {
    //       agency: this.agency,
    //       file: this.files.shapes,
    //     })
    //     .then((result) => {
    //       this.files.shapes = undefined
    //       this.loading.shapes = false
    //       this.refreshStats()
    //     })
    // },
    importEntities() {
      this.loading.entities = true

      // Open and read file
      const fileReader = new FileReader()
      fileReader.readAsArrayBuffer(new Blob([this.files.entities]))

      fileReader.onload = () => {
        // Save vehicles
        this.$store
          .dispatch('gtfs/saveRealtimeFeed', {
            agency: this.agency,
            file: new Uint8Array(fileReader.result),
          })
          .then(() => {
            this.files.entities = undefined
            this.loading.entities = false
            this.refreshStats(['vehicles', 'alerts', 'tripUpdates'])
          })
      }
    },
    saveRemoteUrl() {
      this.$store
        .dispatch('agencies/updateLocal', {
          agency: this.agency,
          fields: {
            'meta.remoteUrl': this.remote.url,
            'meta.remoteAutoRefresh': this.remote.autoRefresh,
          },
        })
        .then((agency) => {
          this.agency = agency
          this.fetchRemoteUrl()
        })
    },
    fetchRemoteUrl() {
      this.$store
        .dispatch('vehicles/loadRemote', this.agency)
        .then(() => {})
        .catch((error) => {
          // Reset the remote url
          this.remote = {
            url: '',
            autoRefresh: '',
          }
          this.$store.dispatch('agencies/updateLocal', {
            agency: this.agency,
            fields: {
              'meta.remoteUrl': this.remote.url,
              'meta.remoteAutoRefresh': this.remote.autoRefresh,
            },
          })

          this.remote.showError = true
          this.remote.error = error
        })
    },
  },
}
</script>

<style>
.cursor-pointer {
  cursor: pointer;
}
</style>
