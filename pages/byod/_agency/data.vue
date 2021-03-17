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
    <v-sheet>
      <v-container class="d-flex align-center">
        <v-btn icon nuxt :to="localePath(`/byod/${agency.slug}`)" exact>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        Back to {{ agency.name }}
      </v-container>
    </v-sheet>
    <v-data-table
      class="mt-0"
      group-by="type"
      :headers="[
        { text: 'ID', value: 'ref' },
        { text: 'Type', value: 'type' },
        { text: 'Entity', value: 'entity' },
      ]"
      :items="allData"
      :items-per-page="50"
    >
      <!-- eslint-disable-next-line -->
      <template v-slot:item.entity="{ item }">
        <json-viewer :value="item.entity" sort></json-viewer>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import JsonViewer from 'vue-json-viewer'

export default {
  components: {
    JsonViewer,
  },
  async asyncData({ params, store, redirect }) {
    const agency = await store.dispatch('agencies/getLocal', params.agency)
    if (!agency) redirect('/byod')
    return { agency }
  },
  data: () => ({
    allData: [],
  }),
  mounted() {
    this.loadAlertsAndTripUpdates()
  },
  methods: {
    async loadAlertsAndTripUpdates() {
      const vehicles =
        (await this.$store.state.vehicles.data[this.agency.slug]) ?? []
      const alerts = await this.$store.dispatch(
        'gtfs/getAlertsByAgency',
        this.agency
      )
      const tripUpdates = await this.$store.dispatch(
        'gtfs/getTripUpdatesByAgency',
        this.agency
      )

      vehicles.forEach((vehicle) => {
        if (!vehicle.meta) {
          console.log('meta missing!', vehicle)
        }
      })

      this.allData = [
        ...vehicles.map((vehicle) => ({
          id: vehicle.id,
          ref: vehicle.ref,
          type: 'vehiclePosition',
          entity: vehicle.meta.json.realtimeVehicle,
        })),
        ...alerts.map((alert) => ({
          id: alert.id,
          ref: alert.ref,
          type: 'alert',
          entity: alert,
        })),
        ...tripUpdates.map((tripUpdate) => ({
          id: tripUpdate.id,
          ref: tripUpdate.ref,
          type: 'tripUpdate',
          entity: tripUpdate,
        })),
      ]
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