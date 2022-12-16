<template>
  <div>
    <div
      class="tw-flex tw-items-center tw-justify-end tw-gap-x-2 tw-px-4 tw-py-2"
    >
      <p class="!tw-mb-0">Filrer par</p>
      <select v-model="searchColumn">
        <option
          v-for="column in filterableColumns"
          :key="column.value"
          :value="column.value"
        >
          {{ column.text }}
        </option>
      </select>
      <input type="text" v-model="searchTerm" />
      <TwStandardIconButton>
        <TwIcon :path="mdiMagnify" />
      </TwStandardIconButton>
    </div>
    <v-data-table
      group-by="agency"
      :headers="columns"
      :items="vehicles"
      :items-per-page="100"
      :footer-props="{
        itemsPerPageOptions: [25, 50, 100, 150, 200, -1],
      }"
      :mobile-breakpoint="1"
      :fixed-header="true"
      :search="searchTerm"
    >
      <!-- eslint-disable-next-line -->
      <template v-slot:group.header="{ group, headers, toggle, isOpen }">
        <td :colspan="headers.length">
          <v-btn icon class="mr-2" @click="toggle">
            <v-icon>{{ isOpen ? mdiMinus : mdiPlus }}</v-icon>
          </v-btn>
          {{ agencies[group].name }}
        </td>
      </template>
      <!-- eslint-disable-next-line -->
      <template v-slot:item.tags="{ item }">
        <div>
          <TwTag
            :tag-id="tagId"
            v-for="tagId in item.tags"
            :key="tagId"
            small
          />
        </div>
      </template>
      <!-- eslint-disable-next-line -->
      <template v-slot:item.timestamp="{ item }">
        <TwTimeAgo :timestamp="+item.timestamp" />
      </template>
      <!-- eslint-disable-next-line -->
      <template v-slot:item.trip.routeShortName="{ item }">
        {{ item.trip.routeShortName }} {{ item.trip.routeLongName }}
      </template>
      <!-- eslint-disable-next-line -->
      <template v-slot:item.createdAt="{ item }">
        {{ formatDate(item.createdAt) }}
      </template>
      <!-- eslint-disable-next-line -->
      <template v-slot:item.actions="{ item }">
        <div class="tw-flex tw-items-center tw-gap-2">
          <TwStandardIconButton @click="setSelection('links', item)">
            <TwIcon :path="mdiOpenInNew" />
          </TwStandardIconButton>
          <TwStandardIconButton @click="setSelection('map', item)">
            <TwIcon :path="mdiMapMarkerOutline" />
          </TwStandardIconButton>
        </div>
      </template>
    </v-data-table>
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
  mdiMapMarkerOutline,
} from '@mdi/js'

export default {
  middleware: 'loadData',
  asyncData() {
    return {
      mdiMagnify,
      mdiMapMarker,
      mdiMinus,
      mdiOpenInNew,
      mdiPlus,
      mdiMapMarkerOutline,
    }
  },
  data() {
    return {
      availableColumns: [
        'agency',
        'ref',
        'label',
        'tags',
        'timestamp',
        'tripId',
        'trip.headsign',
        'trip.shortName',
        'startTime',
        'routeId',
        'trip.routeShortName',
        'trip.serviceId',
        'position.lat',
        'bearing',
        'speed',
        'vehicleType',
        'plate',
        'odometer',
        'currentStopSequence',
        'currentStatus.label',
        'scheduleRelationship.label',
        'congestionLevel.label',
        'occupancyStatus.label',
        'createdAt',
        'actions',
      ],
      linksDialog: false,
      searchColumn: 'ref',
      searchTerm: null,
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
      return this.availableColumns.map((column) => {
        const header = {
          text: this.$t(`properties.${column}`),
          value: column,
          divider: true,
          filterable: true,
        }

        if (column === 'tags' || column === 'position.lat') {
          header.sortable = false
          header.filterable = false
        }

        if (column === 'timestamp') {
          header.sort = this.sortTimestamp
          header.filterable = false
        }

        if (column === 'routeId') {
          header.sort = this.sortNumber
        }

        if (column === 'createdAt') {
          header.sort = this.sortDate
          header.filterable = false
        }

        return header
      })
    },
    darkMode() {
      return this.$vuetify.theme.dark
    },
    filterableColumns() {
      return this.columns.filter((column) => column.filterable)
    },
    region() {
      return this.$store.state.regions.data[this.$route.params.region] || {}
    },
    vehicles() {
      // Get all vehicles
      let vehicles = []
      const state = this.$store.state.vehicles.data
      Object.keys(state).forEach((agency) => {
        vehicles = [...vehicles, ...state[agency]]
      })

      return vehicles
      // Filter vehicles
      /* return vehicles.filter((vehicle) => {
        if (!this.searchTerm || !this.searchColumn) return true

        return vehicle[this.searchColumn]
          .toUpperCase()
          .includes(this.searchTerm.toUpperCase())
      }) */
    },
  },
  methods: {
    customFilter(value, search, item) {
      if (!search) return true

      return item[this.searchColumn]
        .toUpperCase()
        .includes(search.toUpperCase())
    },
    formatDate(value) {
      if (!value) return ''

      const date = new Date(value)

      if (date instanceof Date && !isNaN(date)) {
        const formatted = Intl.DateTimeFormat(this.$i18n.locale, {
          dateStyle: 'long',
          timeStyle: 'short',
        }).format(date)
        return formatted
      }

      return ''
    },
    setSelection(action, vehicle) {
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
    sortDate(a, b) {
      return new Date(b) - new Date(a)
    },
    sortTimestamp(a, b) {
      return new Date(+b * 1000) - new Date(+a * 1000)
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
.tt-table__filters td {
  vertical-align: top;
}
.gap-2 {
  gap: 0.5rem;
}
</style>
