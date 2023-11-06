<template>
  <div>
    <div
      class="tw-flex tw-items-center tw-justify-between tw-gap-x-2 tw-bg-neutral-99 tw-px-4 tw-py-2 dark:tw-bg-[#1e1e1e]"
    >
      <div
        class="tw-flex tw-flex-wrap tw-gap-2 tw-text-sm tw-font-medium tw-leading-5 tw-text-neutralVariant-30 dark:tw-text-neutralVariant-80"
      >
        <div
          v-for="(value, column) in filters"
          :key="column"
          class="pr-2 tw-flex tw-h-8 tw-items-center tw-gap-x-2 tw-rounded-lg tw-border tw-border-solid tw-border-neutralVariant-50 tw-pl-3 dark:tw-border-neutralVariant-60"
        >
          <span>
            {{ $t(`properties.${column}`) }}
            : {{ value }}
          </span>
          <button
            :title="$t('removeFilter')"
            class="tw-h-[1.125rem] tw-w-[1.125rem]"
            @click="removeFilter(column)"
          >
            <TwIcon
              :path="mdiClose"
              class="!tw-h-[1.125rem] !tw-w-[1.125rem]"
            />
          </button>
        </div>
      </div>
      <TwStandardIconButton
        class="tw-cursor-pointer"
        :title="$t('openSettings')"
        @click="openSettings"
      >
        <TwIcon :path="mdiTune" />
      </TwStandardIconButton>
    </div>
    <v-data-table
      v-if="columns && columns.length >= 1"
      class="tt-table tw-border-x-0 tw-border-b-0 tw-border-t tw-border-solid tw-border-t-[#e0e0e0] dark:tw-border-t-[#fff]/12"
      :headers="columns"
      :items="vehicles"
      :items-per-page="100"
      :footer-props="{
        itemsPerPageOptions: [25, 50, 100, 150, 200, -1],
      }"
      :mobile-breakpoint="1"
      :fixed-header="true"
      :sort-by="sortBy"
      :sort-desc="sortDesc"
    >
      <template #header="{ props }">
        <thead class="v-data-table-header tt-table-header">
          <tr>
            <th
              v-for="column in props.headers"
              :key="column.value"
              class="v-data-table__divider tw-relative"
              role="columnheader"
              scope="col"
              :aria-sort="
                sortBy !== column.value
                  ? 'none'
                  : sortDesc
                  ? 'descending'
                  : 'ascending'
              "
              :aria-label="
                $t('columnAria', {
                  column: column.text,
                  sort: !column.sortable
                    ? $t('sortDisabled')
                    : sortBy !== column.value
                    ? $t('sortActivate')
                    : !sortDesc
                    ? $t('sortDesc')
                    : $t('sortRemove'),
                  filter: filters[column.value]
                    ? $t('filterActivated', { value: filters[column.value] })
                    : '',
                })
              "
              :style="{
                width: `${column.width}px`,
                minWidth: `${column.width}px`,
              }"
            >
              <div class="tw-inline-flex tw-w-full tw-items-center tw-gap-x-1">
                <TwStandardIconButton
                  v-if="column.filterable"
                  class="!tw-h-6 !tw-w-6"
                  @click="filterModal = column.value"
                >
                  <TwIcon
                    class="!tw-h-5 !tw-w-5"
                    :class="[
                      filters[column.value] &&
                        'tw-text-primary-40 dark:tw-text-primary-80',
                    ]"
                    :path="filters[column.value] ? mdiFilter : mdiFilterOutline"
                  />
                </TwStandardIconButton>
                <span
                  class="tw-peer tw-grow"
                  :class="[
                    sortBy === column.value &&
                      'tw-text-black/87 dark:tw-text-white',
                    column.sortable &&
                      'hover:tw-text-black/87 tw-cursor-pointer dark:hover:tw-text-white',
                  ]"
                  @click="toggleSort(column)"
                  >{{ column.text }}</span
                >
                <TwStandardIconButton
                  v-if="column.sortable"
                  class="peer-hover:tw-text-black/87 !tw-h-6 !tw-w-6 tw-opacity-0 tw-transition hover:tw-text-white hover:tw-opacity-100 focus:tw-opacity-100 peer-hover:tw-opacity-100 dark:peer-hover:tw-text-white"
                  :class="[
                    sortBy === column.value &&
                      'tw-text-primary-40 tw-opacity-100 dark:tw-text-primary-80',
                  ]"
                  @click="toggleSort(column)"
                >
                  <TwIcon
                    class="!tw-h-5 !tw-w-5 tw-transition-transform"
                    :class="[
                      sortBy === column.value && sortDesc && 'tw-rotate-180',
                    ]"
                    :path="mdiArrowUp"
                  />
                </TwStandardIconButton>
                <div
                  v-if="filterModal === column.value"
                  v-on-clickaway="resetFilterModal"
                  class="tw-absolute tw-top-full tw-z-10 -tw-ml-4 tw-bg-neutralVariant-90 tw-p-2 dark:tw-bg-neutralVariant-30"
                >
                  <select
                    v-if="column.choices"
                    :value="filters[column.value]"
                    @input="setFilter(column.value, $event)"
                  >
                    <option
                      v-for="option in filterOptions[column.value]"
                      :key="option.value"
                      :value="option.value"
                    >
                      {{ option.text }}
                    </option>
                  </select>
                  <TwFilledTextField
                    v-else
                    :value="filters[column.value]"
                    :placeholder="$t('filterBy', { column: column.text })"
                    :clear-text="$t('clearFilter')"
                    color="background"
                    @input="setFilter(column.value, $event)"
                    @text-cleared="removeFilter(column.value)"
                  />
                </div>
              </div>
            </th>
          </tr>
        </thead>
      </template>
      <!-- eslint-disable-next-line -->
      <template v-slot:item.properties.tags="{ item }">
        <div class="tw-flex tw-gap-2">
          <TwTag
            v-for="tagId in item.tags"
            :key="tagId"
            :tag-id="tagId"
            small
          />
        </div>
      </template>
      <!-- eslint-disable-next-line -->
      <template v-slot:item.properties.lastSeenAt="{ item }">
        <TwTimeAgo :timestamp="+item.properties.lastSeenAt" />
      </template>
      <!-- eslint-disable-next-line -->
      <template v-slot:item.properties.route.shortName="{ item }">
        {{ item.properties.route.shortName }}
        {{ item.properties.route.longName }}
      </template>
      <!-- eslint-disable-next-line -->
      <template v-slot:item.properties.firstSeenAt="{ item }">
        {{ formatDate(item.properties.firstSeenAt) }}
      </template>
      <!-- eslint-disable-next-line -->
      <template v-slot:item.actions="{ item }">
        <div class="tw-flex tw-items-center tw-gap-2">
          <TwStandardIconButton
            :title="$t('see', { see: $t('externalLinks') })"
            @click="setSelection('links', item)"
          >
            <TwIcon :path="mdiOpenInNew" />
          </TwStandardIconButton>
          <TwStandardIconButton
            :title="$t('viewMap')"
            @click="setSelection('map', item)"
          >
            <TwIcon :path="mdiMapMarkerOutline" />
          </TwStandardIconButton>
          <TwStandardIconButton
            v-if="item.properties.trip.blockId"
            :title="$t('see', { see: $t('relatedTrips') })"
            @click="setSelection('blocks', item)"
          >
            <TwIcon :path="mdiTimelineText" />
          </TwStandardIconButton>
          <TwFilledIconButton
            v-if="adminMode"
            tag="a"
            :href="`https://admin.transittracker.ca/vehicles/${item.id}/edit`"
            target="_blank"
            class="tw-inline-flex"
            color="primary"
          >
            <TwIcon :path="mdiTooltipEdit" />
          </TwFilledIconButton>
        </div>
      </template>
    </v-data-table>
    <div
      v-else
      class="tw-flex tw-w-full tw-flex-col tw-items-center tw-justify-center tw-gap-4 tw-px-4 tw-py-8 tw-text-center"
    >
      <TwIcon
        :path="mdiTableColumnPlusBefore"
        class="tw-h-12 tw-w-12 tw-text-primary-10 dark:tw-text-primary-90 md:tw-h-32 md:tw-w-32"
      />
      <h1
        class="tw-font-medium tw-leading-8 md:tw-text-[1.75rem] md:tw-font-normal md:tw-leading-9"
      >
        {{ $t('noColumns') }}
      </h1>
      <p class="tw-font-medium tw-leading-6">
        {{ $t('noColumnsInstructions') }}
      </p>
      <TwFilledButton with-icon @click="openSettings">
        <TwIcon :path="mdiTune" />
        {{ $t('openSettingsShort') }}
      </TwFilledButton>
    </div>
    <TwBasicDialog v-model="linksDialog" @input="closeDialog($event)">
      <template #header> {{ $t('externalLinks') }} </template>
      <VehicleSheetLinksList />
      <template #footer>
        <div class="tw-flex tw-items-center tw-justify-between">
          <VehicleSheetReportButton />

          <TwTextButton class="tw-float-right" value="cancel">
            {{ $t('close') }}
          </TwTextButton>
        </div>
      </template>
    </TwBasicDialog>
    <TwBasicDialog v-model="blocksDialog" @input="closeDialog($event)">
      <template #header>{{ $t('relatedTrips') }}</template>
      <VehicleSheetTripsList class="-tw-mx-2" />
    </TwBasicDialog>
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
  mdiTableColumnPlusBefore,
  mdiTimelineText,
  mdiArrowUp,
  mdiTooltipEdit,
} from '@mdi/js'
import { mixin as clickaway } from 'vue-clickaway'

export default {
  mixins: [clickaway],
  middleware: 'loadData',
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
      mdiTableColumnPlusBefore,
      mdiTimelineText,
      mdiArrowUp,
      mdiTooltipEdit,
    }
  },
  data() {
    return {
      availableColumns: ['agency'],
      columnsProperties: {
        'properties.route.id': {
          sort: this.sortNumber,
          width: 100,
        },
        'properties.position.bearing': {
          sort: this.sortNumber,
        },
        'properties.position.speed': {
          sort: this.sortNumber,
        },
        'properties.position.odometer': {
          sort: this.sortNumber,
        },
        'properties.customStopSequence': {
          sort: this.sortNumber,
        },
        'properties.lastSeenAt': {
          filterable: false,
          sort: this.sortTimestamp,
          width: 125,
        },
        'properties.firstSeenAt': {
          filterable: false,
          sort: this.sortTimestamp,
          width: 150,
        },
        'properties.trip.startTime': {
          filterable: false,
          width: 125,
        },
        'properties.tags': {
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
        'properties.vehicle.label': {
          width: 125,
        },
        'properties.trip.id': {
          width: 200,
        },
        'properties.trip.shortName': {
          width: 125,
        },
        'properties.trip.headsign': {
          width: 150,
        },
        'properties.route.shortName': {
          width: 150,
        },
        'properties.currentStatus': {
          width: 150,
        },
        'properties.trip.scheduleRelationship': {
          width: 150,
        },
        'properties.congestionLevel': {
          width: 150,
        },
        'properties.occupancyStatus': {
          width: 150,
        },

        // TODO: add choices to agency, currentStatus, scheduleRelationship, congestionLevel, occupancyStatus
      },
      linksDialog: false,
      blocksDialog: false,
      searchColumn: 'ref',
      filterModal: null,
      sortBy: null,
      sortDesc: true,
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
    adminMode() {
      return this.$store.state.settings.adminMode
    },
    columns() {
      return [
        {
          text: this.$t(`vehicleFields.properties.agencyId`),
          value: 'properties.agencyId',
          divider: true,
          filterable: true,
          sortable: true,
          ...this.columnsProperties['properties.agencyId'],
        },
        ...this.$store.getters['settings/visibleTableColumns'].map(
          (column) => ({
            text: this.$t(`vehicleFields.${column}`),
            value: column,
            divider: true,
            filterable: true,
            sortable: true,
            ...this.columnsProperties[column],
          })
        ),
      ]
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
    filters() {
      return this.$store.state.app.filters
    },
    vehicles() {
      // Get all vehicles
      let vehicles = []
      const state = this.$store.state.vehicles.data
      Object.keys(state).forEach((agency) => {
        vehicles = [...vehicles, ...state[agency].features]
      })

      return vehicles.filter((item) => {
        return Object.entries(this.filters).every(([key, searchTerm]) => {
          // Exception for route short name since it's used with route long name
          if (key === 'trip.routeShortName') {
            return (
              `${item.properties.route.shortName} ${item.properties.route.longName}` ??
              ''
            )
              .toUpperCase()
              .includes(searchTerm.toString().toUpperCase())
          }

          // Custom return for nested column
          if (key.includes('.')) {
            const [parent, child] = key.split('.')
            return (item[parent][child] ?? '')
              .toUpperCase()
              .includes(searchTerm.toString().toUpperCase())
          }

          let value = item[key] ?? ''

          // For numbers
          if (typeof item[key] === 'number') {
            value = item[key] + ''
          }

          // Everything else
          return value
            .toUpperCase()
            .includes(searchTerm.toString().toUpperCase())
        })
      })
    },
  },
  methods: {
    closeDialog($event) {
      console.log($event)
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
    resetFilterModal() {
      this.filterModal = ''
    },
    openSettings() {
      this.$store.commit('app/set', { key: 'openSettingsDrawer', value: true })
    },
    removeFilter(column) {
      this.$store.commit('app/removeFilter', column)
    },
    setFilter(column, value) {
      this.$store.commit('app/setFilter', { column, value })
    },
    setSelection(action, vehicle) {
      this.$store.commit('vehicles/setSelection', vehicle)

      switch (action) {
        case 'links':
          this.linksDialog = true
          break

        case 'blocks':
          this.blocksDialog = true
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
    toggleSort({ value, sortable }) {
      if (!sortable) {
        return false
      }

      if (this.sortBy === value && !this.sortDesc) {
        // Current column is sorting asc, sort desc
        this.sortDesc = true
      } else if (this.sortBy === value && this.sortDesc) {
        // Current column is sorting desc, resert sort
        this.sortDesc = false
        this.sortBy = null
      } else {
        // New column sorting
        this.sortBy = value
        this.sortDesc = false
      }
    },
  },
}
</script>

<style lang="scss">
.tt-table .v-data-table-header:not(.tt-table-header) {
  display: none;
}
</style>

<i18n>
  {
    "en": {
      "openSettings": "Open settings to choose columns",
      "filterBy": "Filter by {column}",
      "clearFilter": "Clear fitler",
      "removeFilter": "Remove filter",
      "noColumns": "You don't have any columns visible yet!",
      "noColumnsInstructions": "Go to the settings to add the columns of your choice. You can also choose the order of the columns.",
      "openSettingsShort": "Open settings",
      "columnAria": "{column}: {sort} {filter}",
      "sortActivate": "Not sorted. Activate to sort ascending.",
      "sortDesc": "Sorted ascending. Activate to sort descending.",
      "sortRemove": "Sorted descending. Activate to remove sorting.",
      "sortDisabled": "It is not possible to sort this column.",
      "filterActivated": "Filtered using the term: {value}.",
      "see": "See {see}",
      "externalLinks": "External Links",
      "viewMap": "View on the map",
      "relatedTrips": "Related Trips",
      "close": "Close"
    },
    "fr": {
      "openSettings": "Ouvrir les paramètres pour choisir les colonnes",
      "filterBy": "Filtrer par {column}",
      "clearFilter": "Vider le filtre",
      "removeFilter": "Retirer le filtre",
      "noColumns": "Vous n'avez pas encore de colonnes visibles!",
      "noColumnsInstructions": "Rendez-vous dans les paramètres afin d'ajouter les colonnes de votre choix. Vous pouvez également choisir l'ordre des colonnes.",
      "openSettingsShort": "Ouvrir les paramètres",
      "columnAria": "{column} : {sort} {filter}",
      "sortActivate": "Non trié. Activer pour trier par ordre croissant.",
      "sortDesc": "Tri croissant. Activer pour trier par ordre décroissant.",
      "sortRemove": "Tri décroissant. Activer pour retirer le tri.",
      "sortDisabled": "Il n'est pas possible de trier cette colonne.",
      "filterActivated": "Filtré avec le terme : {value}.",
      "see": "Voir les {see}",
      "externalLinks": "Liens externes",
      "viewMap": "Voir sur la carte",
      "relatedTrips": "Voyages reliés",
      "close": "Fermer"
    }
  }
</i18n>
