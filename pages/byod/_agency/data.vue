<template>
  <div class="mb-14">
    <div class="secondary tt-texture--icons">
      <v-container class="py-4 d-flex">
        <v-icon class="text-h5">{{ mdiFolderUpload }}</v-icon>
        <div class="ml-4">
          <h1 class="text-h5 font-weight-medium">
            {{ $t('byod.title') }}
          </h1>
          <p class="text-subtitle-2 text-md-subtitle-1 font-weight-medium mb-0">
            {{ agency.name }}
          </p>
        </div>
      </v-container>
    </div>
    <v-sheet>
      <v-container class="d-flex align-center">
        <v-btn icon nuxt :to="localePath(`/byod/${agency.slug}`)" exact>
          <v-icon>{{ mdiArrowLeft }}</v-icon>
        </v-btn>
        {{ $t('byod.data.backTo') }} {{ agency.name }}
      </v-container>
    </v-sheet>
    <v-data-table
      class="mt-0"
      group-by="type"
      :headers="[
        { text: $t('byod.data.id'), value: 'ref' },
        { text: $t('byod.data.type'), value: 'type' },
        { text: $t('byod.data.entity'), value: 'entity' },
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
import { agencies, definitions, realtimeGtfs } from '@/utils/byod'
import { mdiArrowLeft, mdiFolderUpload } from '@mdi/js'

export default {
  components: {
    JsonViewer,
  },
  async asyncData({ params, store, redirect }) {
    const agency = await agencies.get(params.agency)
    if (!agency) redirect('/byod')
    return { agency, mdiArrowLeft, mdiFolderUpload }
  },
  data: () => ({
    allData: [],
  }),
  head() {
    return {
      title: this.$t('byod.data.seoTitle'),
    }
  },
  mounted() {
    this.loadAlertsAndTripUpdates()
  },
  methods: {
    async loadAlertsAndTripUpdates() {
      const vehicles = await realtimeGtfs.all(definitions.Vehicles, this.agency)
      const alerts = await realtimeGtfs.all(definitions.Alerts, this.agency)
      const trips = await realtimeGtfs.all(definitions.TripUpdates, this.agency)

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
        ...trips.map((tripUpdate) => ({
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
