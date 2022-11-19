<template>
  <div>
    <ejs-grid
      :data-source="vehicles"
      :allow-reordering="true"
      :show-column-chooser="true"
    >
      <e-columns>
        <e-column field="id" headerText="ID"></e-column>
        <e-column field="ref" headerText="Label"></e-column>
      </e-columns>
    </ejs-grid>
    <TableLinksDialog v-model="linksDialog" />
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
    grid: [Reorder, ColumnChooser, Toolbar],
  },
  data() {
    return {
      headers: [
        {
          text: this.$t('table.dataRef'),
          value: 'label',
          divider: true,
          filter: (value, search, item) => {
            return (value + '')
              .toLowerCase()
              .includes(this.searchLabel.toLowerCase())
          },
        },
        {
          text: this.$t('table.dataRoute'),
          value: 'routeId',
          divider: true,
          sort: this.sortNumber,
          filter: (value, search, item) => {
            if (this.filterOnlyRouteId) {
              return (value + '')
                .toLowerCase()
                .includes(this.searchRoute.toLowerCase())
            }
            return (
              value +
              ' ' +
              item.trip.routeShortName +
              ' ' +
              item.trip.routeLongName +
              ''
            )
              .toLowerCase()
              .includes(this.searchRoute.toLowerCase())
          },
        },
        {
          text: this.$t('table.dataHeadsign'),
          value: 'trip.headsign',
          divider: true,
          filter: (value) => {
            return (value + '')
              .toLowerCase()
              .includes(this.searchHeadsign.toLowerCase())
          },
        },
        {
          text: this.$t('table.dataTripId'),
          value: 'tripId',
          divider: true,
          filter: (value) => {
            return (value + '')
              .toLowerCase()
              .includes(this.searchTrip.toLowerCase())
          },
        },
        {
          text: this.$t('table.dataStartTime'),
          value: 'startTime',
          width: 105,
          divider: true,
        },
        {
          text: this.$t('table.actions'),
          value: 'actions',
          divider: true,
          sortable: false,
        },
      ],
      linksDialog: false,
      searchLabel: '',
      searchRoute: '',
      searchHeadsign: '',
      searchTrip: '',
      searchAll: '',
      filterOnlyRouteId: false,
    }
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
      return this.$store.state.agencies.data
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
