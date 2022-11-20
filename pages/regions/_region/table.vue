<template>
  <div>
    <ejs-grid
      ref="grid"
      :data-bound="autoFitColumns"
      :data-source="vehicles"
      :allow-filtering="true"
      :allow-reordering="true"
      :allow-sorting="true"
      :show-column-chooser="true"
      :enable-infinite-scrolling="true"
      :filter-settings="{ type: 'Excel' }"
      :toolbar="['ColumnChooser']"
    >
      <e-columns>
        <e-column
          field="id"
          header-text="Transit Tracker Internal ID"
          :visible="false"
        ></e-column>
        <!-- hidden -->
        <e-column
          field="agency"
          header-text="Agency"
          :value-accessor="cAgency"
        ></e-column>
        <!-- fix -->
        <e-column field="ref" header-text="Ref"></e-column>
        <e-column field="label" header-text="Label"></e-column>
        <e-column
          field="timestamp"
          header-text="Last seen"
          :template="'cTimestamp'"
        ></e-column>
        <!-- timeago -->
        <e-column field="tripId" header-text="Trip ID"></e-column>
        <e-column field="trip.headsign" header-text="Trip headsign"></e-column>
        <e-column
          field="trip.shortName"
          header-text="Trip Short Name"
        ></e-column>
        <e-column field="trip.routeShortName" header-text="Route"></e-column>
        <!-- shortname + longname -->
        <e-column field="trip.serviceId" header-text="Service ID"></e-column>
        <e-column field="routeId" header-text="Route ID"></e-column>
        <e-column
          field="position.lat"
          header-text="Position"
          :template="'cPosition'"
          :allow-filtering="false"
        ></e-column>
        <!-- add lon -->
        <e-column
          field="bearing"
          header-text="Bearing"
          type="number"
        ></e-column>
        <e-column field="speed" header-text="Speed" type="number"></e-column>
        <e-column field="vehicleType" header-text="Type"></e-column>
        <!-- add icon? -->
        <e-column field="plate" header-text="License Plate"></e-column>
        <e-column
          field="odometer"
          header-text="Odometer"
          type="number"
        ></e-column>
        <e-column
          field="currentStopSequence"
          header-text="Stop Sequence"
        ></e-column>
        <e-column field="currentStatus.label" header-text="Status"></e-column>
        <e-column
          field="scheduleRelationship.label"
          header-text="Schedule Relationship"
        ></e-column>
        <e-column
          field="congestionLevel.label"
          header-text="Congestion Level"
        ></e-column>
        <e-column
          field="occupancyStatus.label"
          header-text="Occupancy Status"
        ></e-column>
        <!-- tags? -->
        <!-- view on map -->
        <!-- view details -->
        <!-- view links -->
      </e-columns>
      <template #cAgency="{ data }">
        {{ agencies[data.agency].shortName }}
      </template>
      <template #cTimestamp="{ data }">
        <TwTimeAgo v-if="data.timestamp" :timestamp="+data.timestamp" />
      </template>
      <template #cPosition="{ data }">
        <span>{{ data.position.lat }}, {{ data.position.lon }}</span>
      </template>
    </ejs-grid>
    <!--<TableLinksDialog v-model="linksDialog" />-->
  </div>
</template>

<script>
import {
  mdiMagnify,
  mdiMapMarker,
  mdiMinus,
  mdiOpenInNew,
  mdiPlus,
} from '@mdi/js'
import Vue from 'vue'
import {
  GridPlugin,
  ColumnChooser,
  Toolbar,
  Reorder,
  Resize,
  Sort,
  Filter,
  InfiniteScroll,
} from '@syncfusion/ej2-vue-grids'
import { registerLicense } from '@syncfusion/ej2-base'
registerLicense(process.env.syncfusionKey)
Vue.use(GridPlugin)

export default {
  middleware: 'loadData',
  asyncData() {
    return { mdiMagnify, mdiMapMarker, mdiMinus, mdiOpenInNew, mdiPlus }
  },
  provide: {
    grid: [
      Reorder,
      ColumnChooser,
      Toolbar,
      Resize,
      Sort,
      Filter,
      InfiniteScroll,
    ],
  },
  head() {
    return {
      title: this.$t('table.seoTitle', { region: this.region.name }),
      meta: [
        {
          hid: 'robots',
          name: 'robots',
          content: 'noindex',
        },
      ],
    }
  },
  computed: {
    agencies() {
      return Object.values(this.$store.state.agencies.data)
    },
    darkMode() {
      return this.$vuetify.theme.dark
    },
    region() {
      return this.$store.state.regions.data[this.$route.params.region] || {}
    },
    vehicles() {
      let vehicles = []
      const state = this.$store.state.vehicles.data
      Object.keys(state).forEach((agency) => {
        vehicles = [...vehicles, ...state[agency]]
      })
      return vehicles
    },
  },
  methods: {
    autoFitColumns() {
      this.$refs.grid.autoFitColumns()
    },
    filterAllFields(value, search, item) {
      if (!search) return true
      return [
        item.ref,
        item.label,
        item.routeId,
        item.routeId,
        item.trip.routeLongName,
        item.trip.headsign,
        item.tripId,
      ]
        .filter(Boolean)
        .join('')
        .toLowerCase()
        .includes(search.toLowerCase())
    },
    setSelection(vehicle, openLinks = false) {
      this.$store.commit('vehicles/setSelection', vehicle)
      if (openLinks) {
        this.linksDialog = true
      } else {
        this.$router.push(
          this.localePath(`/regions/${this.$route.params.region}/map`)
        )
      }
    },
    sortNumber(a, b) {
      const cook = (c) => {
        if (c === undefined || c === null) return -Infinity
        return c.indexOf('.') ? parseFloat(c) : parseInt(c, 10)
      }
      a = typeof a === 'number' ? a : cook(a)
      b = typeof b === 'number' ? b : cook(b)
      if (a < b) return -1
      if (a > b) return 1
      return 0
    },
    cAgency(field, data) {
      return this.agencies[data.agency]
        ? this.agencies[data.agency].shortName
        : null
    },
  },
}
</script>

<style lang="scss">
@import '@/node_modules/@syncfusion/ej2-base/styles/material.css';
@import '@/node_modules/@syncfusion/ej2-buttons/styles/material.css';
@import '@/node_modules/@syncfusion/ej2-calendars/styles/material.css';
@import '@/node_modules/@syncfusion/ej2-dropdowns/styles/material.css';
@import '@/node_modules/@syncfusion/ej2-inputs/styles/material.css';
@import '@/node_modules/@syncfusion/ej2-navigations/styles/material.css';
@import '@/node_modules/@syncfusion/ej2-popups/styles/material.css';
@import '@/node_modules/@syncfusion/ej2-splitbuttons/styles/material.css';
@import '@/node_modules/@syncfusion/ej2-notifications/styles/material.css';
@import '@/node_modules/@syncfusion/ej2-vue-grids/styles/material.css';
</style>
