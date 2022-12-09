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
      :filter-settings="{ type: 'Excel' }"
      :loading-indicator="{ indicatorType: 'Shimmer' }"
      :locale="locale"
      :allow-paging="true"
      :page-settings="{ pageSize: 100 }"
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
        <!-- TODO: View details -->
      </e-columns>

      <template #cAgency="{ data }">
        {{ agencies[data.agency].shortName }}
      </template>
      <template #cTags="{ data }">
        <div>
          <span :key="tag.id" v-for="(tag, index) in data.tags">
            {{ tags[tag]?.label }}
            <span v-if="index + 1 < data.tags.length"> &bull; </span>
          </span>
        </div>
      </template>
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
  Page,
  /* VirtualScroll, */
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
      Page,
      /* VirtualScroll, */
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
      link: [
        {
          rel: 'stylesheet',
          href: `/ej2/ej2-base/styles/${this.cssPath}`,
        },
        {
          rel: 'stylesheet',
          href: `/ej2/ej2-buttons/styles/${this.cssPath}`,
        },
        {
          rel: 'stylesheet',
          href: `/ej2/ej2-inputs/styles/${this.cssPath}`,
        },
        {
          rel: 'stylesheet',
          href: `/ej2/ej2-navigations/styles/${this.cssPath}`,
        },
        {
          rel: 'stylesheet',
          href: `/ej2/ej2-notifications/styles/${this.cssPath}`,
        },
        {
          rel: 'stylesheet',
          href: `/ej2/ej2-popups/styles/${this.cssPath}`,
        },
        {
          rel: 'stylesheet',
          href: `/ej2/ej2-vue-grids/styles/${this.cssPath}`,
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
    cssPath() {
      return this.$vuetify.theme.dark ? 'material-dark.css' : 'material.css'
    },
    locale() {
      return this.$i18n.locale
    },
    region() {
      return this.$store.state.regions.data[this.$route.params.region] || {}
    },
    tags() {
      return this.$store.state.tags.data ?? { label: null }
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
