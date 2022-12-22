<template>
  <div>
    <div
      class="tw-flex tw-items-center tw-justify-between tw-gap-x-2 tw-bg-neutral-99 tw-px-4 tw-py-2 dark:tw-bg-neutral-10"
    >
      <div
        class="tw-flex tw-flex-wrap tw-gap-2 tw-text-sm tw-font-medium tw-leading-5 tw-text-neutralVariant-30 dark:tw-text-neutralVariant-80"
      >
        <div
          v-for="(term, column) in searchTermNotEmpty"
          :key="column"
          class="pr-2 tw-flex tw-h-8 tw-items-center tw-gap-x-2 tw-rounded-lg tw-border tw-border-solid tw-border-neutralVariant-50 tw-pl-3 dark:tw-border-neutralVariant-60"
        >
          <span>
            {{ $t(`properties.${column}`) }}
            : {{ term }}
          </span>
          <button
            @click="removeSearchTerm(column)"
            :title="$t('removeFilter')"
            class="tw-h-[1.125rem] tw-w-[1.125rem]"
          >
            <TwIcon
              :path="mdiClose"
              class="!tw-h-[1.125rem] !tw-w-[1.125rem]"
            />
          </button>
        </div>
      </div>
      <TwStandardIconButton>
        <TwIcon :path="mdiTune" />
      </TwStandardIconButton>
    </div>
    <v-data-table
      class="tt-table tw-border-x-0 tw-border-t tw-border-b-0 tw-border-solid tw-border-t-[#e0e0e0] dark:tw-border-t-[#393939]"
      group-by="agency"
      :headers="columns"
      :items="vehicles"
      :items-per-page="100"
      :footer-props="{
        itemsPerPageOptions: [25, 50, 100, 150, 200, -1],
      }"
      :mobile-breakpoint="1"
      :fixed-header="true"
    >
      <template
        v-for="column in columns"
        v-slot:[`header.${column.value}`]="{}"
      >
        <div
          :key="column.value"
          class="tw-inline-flex tw-items-center tw-gap-x-1"
        >
          <TwStandardIconButton
            v-if="column.filterable"
            @click="filterModal = column.value"
            class="!tw-h-6 !tw-w-6"
          >
            <TwIcon
              class="!tw-h-5 !tw-w-5"
              :class="[
                searchTerm[column.value] &&
                  'tw-text-primary-40 dark:tw-text-primary-80',
              ]"
              :path="searchTerm[column.value] ? mdiFilter : mdiFilterOutline"
            />
          </TwStandardIconButton>
          {{ column.text }}
          <div
            v-if="filterModal === column.value"
            v-on-clickaway="resetFilterModal"
            class="tw-absolute tw-top-full tw-z-10 -tw-ml-4 tw-bg-neutralVariant-90 tw-p-2 dark:tw-bg-neutralVariant-30"
          >
            <select v-model="searchTerm[column.value]" v-if="column.choices">
              <option
                v-for="option in filterOptions[column.value]"
                :key="option.value"
                :value="option.value"
              >
                {{ option.text }}
              </option>
            </select>
            <TwFilledTextField
              v-model="searchTerm[column.value]"
              :placeholder="$t('filterBy', { column: column.text })"
              supporting-text="You can use operators like % to refine your search."
              :clear-text="$t('clearFilter')"
              @text-cleared="removeSearchTerm(column.value)"
              color="background"
              v-else
            />
          </div>
        </div>
      </template>
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
        <div class="tw-flex tw-gap-2">
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
  mdiTune,
  mdiFilter,
  mdiFilterOutline,
  mdiClose,
} from '@mdi/js'
import { mixin as clickaway } from 'vue-clickaway'

export default {
  middleware: 'loadData',
  mixins: [clickaway],
  asyncData() {
    return {
      mdiTune,
      mdiMagnify,
      mdiMapMarker,
      mdiMinus,
      mdiOpenInNew,
      mdiPlus,
      mdiMapMarkerOutline,
      mdiFilter,
      mdiFilterOutline,
      mdiClose,
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
      columnsProperties: {
        routeId: {
          sort: this.sortNumber,
        },
        bearing: {
          sort: this.sortNumber,
        },
        speed: {
          sort: this.sortNumber,
        },
        odometer: {
          sort: this.sortNumber,
        },
        stopSequence: {
          sort: this.sortNumber,
        },
        timestamp: {
          filterable: false,
          sort: this.sortTimestamp,
          width: 125,
        },
        createdAt: {
          filterable: false,
          sort: this.sortDate,
          width: 150,
        },
        startTime: {
          filterable: false,
          width: 125,
        },
        tags: {
          sortable: false,
          filterable: false,
        },
        'position.lat': {
          sortable: false,
          filterable: false,
        },
        actions: {
          sortable: false,
          filterable: false,
        },
        label: {
          width: 125,
        },
        tripId: {
          width: 200,
        },
        'trip.shortName': {
          width: 125,
        },
        'scheduleRelationship.label': {
          width: 150,
        },
        'occupancyStatus.label': {
          width: 125,
        },

        // TODO: add choices to agency, currentStatus, scheduleRelationship, congestionLevel, occupancyStatus
      },
      linksDialog: false,
      searchColumn: 'ref',
      searchTerm: {},
      filterModal: null,
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
      return this.availableColumns.map((column) => ({
        text: this.$t(`properties.${column}`),
        value: column,
        divider: true,
        filterable: true,
        ...this.columnsProperties[column],
      }))
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
    searchTermNotEmpty() {
      return Object.fromEntries(
        Object.entries(this.searchTerm).filter(([key, value]) => value !== '')
      )
    },
    vehicles() {
      // Get all vehicles
      let vehicles = []
      const state = this.$store.state.vehicles.data
      Object.keys(state).forEach((agency) => {
        vehicles = [...vehicles, ...state[agency]]
      })

      return vehicles.filter((item) => {
        return Object.entries(this.searchTerm).every(([key, value]) => {
          if (key === 'trip.routeShortName') {
            return (
              `${item.trip.routeShortName} ${item.trip.routeLongName}` ?? ''
            )
              .toUpperCase()
              .includes(value.toString().toUpperCase())
          }

          if (key.includes('.')) {
            const [parent, child] = key.split('.')
            return (item[parent][child] ?? '')
              .toUpperCase()
              .includes(value.toString().toUpperCase())
          }

          return (item[key] ?? '')
            .toUpperCase()
            .includes(value.toString().toUpperCase())
        })
      })
    },
  },
  methods: {
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
    resetFilterModal() {
      this.filterModal = ''
    },
    removeSearchTerm(column) {
      this.$delete(this.searchTerm, column)
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
.tt-table th {
  position: relative;
}
</style>

<i18n>
  {
    "en": {
      "filterBy": "Filter by {column}",
      "clearFilter": "Clear fitler",
      "removeFilter": "Remove filter"
    },
    "fr": {
      "filterBy": "Filtrer par {column}",
      "clearFilter": "Vider le filtre",
      "removeFilter": "Retirer le filtre"
    }
  }
</i18n>
