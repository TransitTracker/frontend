<template>
  <div>
    <!-- :enable-infinite-scrolling="true" -->
    <ejs-grid
      ref="grid"
      :data-bound="autoFitColumns"
      :data-source="vehicles"
      :allow-filtering="true"
      :allow-sorting="true"
      :enable-sticky-header="true"
      :enable-virtualization="true"
      :filter-settings="{ type: 'Excel' }"
      :loading-indicator="{ indicatorType: 'Shimmer' }"
      :toolbar-template="gHeader"
      :locale="locale"
      :page-settings="{ pageSize: 50 }"
      height="100vh"
    >
      <e-columns>
        <e-column
          field="id"
          header-text="Transit Tracker Internal ID"
          :visible="false"
          :is-primary-key="true"
        ></e-column>
        <e-column
          v-for="column in columns"
          :key="column.field"
          :field="column.field"
          :header-text="$t(`properties.${column.field}`)"
          :template="column.template"
          :visible="column.visible"
          :allow-filtering="column.filtering"
          :sort-comparer="column.field === 'routeId' ? sortNumber : false"
        ></e-column>
        <!-- TODO: Fix filter for Agency -->
        <!-- TODO: Add tags -->
        <!-- TODO: View details -->
      </e-columns>
      <template #gHeader>
        <TwFilledButton>
          <TwIcon :path="mdiAjust" />
          Add, remove and move columns
        </TwFilledButton>
      </template>

      <template #cAgency="{ data }">
        {{ agencies[data.agency].shortName }}
      </template>
      <!-- <template #cTags="{ data }">
        <div>
          <TwTag v-for="tag in data.tags" :key="tag" :tag-id="tag" />
          {{ data.tags }}
        </div>
      </template> -->
      <template #cTimestamp="{ data }">
        <TwTimeAgo v-if="data.timestamp" :timestamp="+data.timestamp" />
      </template>
      <template #cRoute="{ data }">
        <span
          >{{ data.trip.routeShortName }} {{ data.trip.routeLongName }}</span
        >
      </template>
      <template #cPosition="{ data }">
        <span>{{ data.position.lat }}, {{ data.position.lon }}</span>
      </template>
      <template #cActions="{ data }">
        <div class="tw-flex tw-items-center tw-gap-2">
          <TwStandardIconButton @click="setSelection('links', data.id)">
            <TwIcon :path="mdiOpenInNew" />
          </TwStandardIconButton>
          <TwStandardIconButton @click="setSelection('map', data.id)">
            <TwIcon :path="mdiMapMarkerOutline" />
          </TwStandardIconButton>
        </div>
      </template>
    </ejs-grid>
    <TableLinksDialog v-model="linksDialog" />
  </div>
</template>

<script>
import { mdiAdjust, mdiOpenInNew, mdiMapMarkerOutline } from '@mdi/js'
import Vue from 'vue'
import {
  GridPlugin,
  ColumnChooser,
  Toolbar,
  Reorder,
  Resize,
  Sort,
  Filter,
  VirtualScroll,
  /* InfiniteScroll, */
} from '@syncfusion/ej2-vue-grids'
import { registerLicense } from '@syncfusion/ej2-base'
registerLicense(process.env.syncfusionKey)
Vue.use(GridPlugin)

export default {
  provide: {
    grid: [
      Reorder,
      ColumnChooser,
      Toolbar,
      Resize,
      Sort,
      Filter,
      VirtualScroll,
      /* InfiniteScroll, */
    ],
  },
  data: () => ({
    infoDialog: false,
    linksDialog: false,
  }),
  middleware: 'loadData',
  asyncData() {
    return {
      mdiAdjust,
      mdiOpenInNew,
      mdiMapMarkerOutline,
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
    columns() {
      return this.$store.state.settings.tableColumns
    },
    darkMode() {
      return this.$vuetify.theme.dark
    },
    locale() {
      return this.$i18n.locale
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
    setSelection(action, vehicleId) {
      const vehicle = this.vehicles.find(({ id }) => {
        return vehicleId === id
      })

      this.$store.commit('vehicles/setSelection', vehicle)

      switch (action) {
        case 'links':
          this.linksDialog = true
          break

        case 'map':
          this.$router.push(
            this.localePath(`/regions/${this.$route.params.region}/map`)
          )
          break

        default:
          break
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
@import '@/node_modules/@syncfusion/ej2-inputs/styles/material.css';
@import '@/node_modules/@syncfusion/ej2-navigations/styles/material.css';
@import '@/node_modules/@syncfusion/ej2-popups/styles/material.css';
@import '@/node_modules/@syncfusion/ej2-vue-grids/styles/material.css';

[class~='theme--dark'] {
  $primary: #ff80ab;
}
</style>
