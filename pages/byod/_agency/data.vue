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
    alerts: [],
    tripUpdates: [],
  }),
  computed: {
    allData() {
      return [
        ...this.vehicles.map((vehicle) => ({
          id: vehicle.id,
          ref: vehicle.ref,
          type: 'vehiclePosition',
          entity: vehicle.meta.json.realtimeVehicle,
        })),
        ...this.alerts.map((alert) => ({
          id: alert.id,
          ref: alert.ref,
          type: 'alert',
          entity: alert,
        })),
        ...this.tripUpdates.map((tripUpdate) => ({
          id: tripUpdate.id,
          ref: tripUpdate.ref,
          type: 'tripUpdate',
          entity: tripUpdate,
        })),
      ]
    },
    vehicles() {
      return this.$store.state.vehicles.data[this.agency.slug]
    },
  },
  mounted() {
    this.loadAlertsAndTripUpdates()
  },
  methods: {
    async loadAlertsAndTripUpdates() {
      this.alerts = await this.$store.dispatch(
        'gtfs/getAlertsByAgency',
        this.agency
      )
      this.tripUpdates = await this.$store.dispatch(
        'gtfs/getTripUpdatesByAgency',
        this.agency
      )
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
