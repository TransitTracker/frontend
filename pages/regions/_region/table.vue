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
          <span v-if="!(column in filterOptions)">
            {{ $t(column) }}
            : {{ value }}
          </span>
          <span v-else>
            {{ $t(column) }}
            : {{ filterOptions[column][value] }}
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
        <TwIcon :path="mdiTableColumnPlusAfter" />
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
      :group-by="tableGroupBy"
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
                  <TwSelect
                    v-if="column.value in filterOptions"
                    :id="column.value"
                    :value="filters[column.value]"
                    :name="column.value"
                    :label="$t('filterBy', { column: column.text })"
                    @input="setFilter(column.value, $event)"
                  >
                    <option value=""></option>
                    <option
                      v-for="(item, index) in filterOptions[column.value]"
                      :key="index"
                      :value="index"
                    >
                      {{ item }}
                    </option>
                  </TwSelect>
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
      <template v-slot:group.header="{ group, headers, toggle, isOpen }">
        <td :colspan="headers.length">
          <v-btn icon class="mr-2" @click="toggle">
            <v-icon>{{ isOpen ? mdiMinus : mdiPlus }}</v-icon>
          </v-btn>
          {{ agencies[group].name }}
        </td>
      </template>
      <!-- eslint-disable-next-line -->
      <template v-slot:item.properties.tags="{ item }">
        <div class="tw-flex tw-gap-2">
          <TwTag
            v-for="tagId in item.properties.tags"
            :key="tagId"
            :tag-id="tagId"
            small
          />
        </div>
      </template>
      <!-- eslint-disable-next-line -->
      <template v-slot:item.properties.agencyId="{ item }">
        {{ agencies[item.properties.agencyId].name }}
      </template>
      <!-- eslint-disable-next-line -->
      <template v-slot:item.properties.agencyShort="{ item }">
        {{ agencies[item.properties.agencyId].shortName }}
      </template>
      <!-- eslint-disable-next-line -->
      <template v-slot:item.properties.lastSeenAt="{ item }">
        <TwTimeAgo :timestamp="+item.properties.lastSeenAt" />
      </template>
      <!-- eslint-disable-next-line -->
      <template v-slot:item.properties.firstSeenAt="{ item }">
        <TwTimestamp :timestamp="+item.properties.firstSeenAt" />
      </template>
      <!-- eslint-disable-next-line -->
      <template v-slot:item.properties.route.shortName="{ item }">
        {{ item.properties.route.shortName }}
        {{ item.properties.route.longName }}
      </template>
      <!-- eslint-disable-next-line -->
      <template v-slot:item.createdAt="{ item }">
        {{ formatDate(item.properties.firstSeenAt) }}
      </template>
      <!-- eslint-disable-next-line -->
      <template v-slot:item.properties.vehicle.type="{ item }">
        {{
          item.properties.vehicle.type !== null
            ? $t(`enums.vehicleType.label.${item.properties.vehicle.type}`)
            : ''
        }}
      </template>
      <!-- eslint-disable-next-line -->
      <template v-slot:item.properties.currentStatus="{ item }">
        {{
          item.properties.currentStatus !== null
            ? $t(`enums.currentStatus.label.${item.properties.currentStatus}`)
            : ''
        }}
      </template>
      <!-- eslint-disable-next-line -->
      <template v-slot:item.properties.trip.scheduleRelationship="{ item }">
        {{
          item.properties.trip.scheduleRelationship !== null
            ? $t(
                `enums.scheduleRelationship.label.${item.properties.trip.scheduleRelationship}`
              )
            : ''
        }}
      </template>
      <!-- eslint-disable-next-line -->
      <template v-slot:item.properties.congestionLevel="{ item }">
        <!--        TODO: Verify to remove or not 0 enum value-->
        {{
          item.properties.congestionLevel !== null
            ? $t(
                `enums.congestionLevel.label.${item.properties.congestionLevel}`
              )
            : ''
        }}
      </template>
      <!-- eslint-disable-next-line -->
      <template v-slot:item.properties.occupancyStatus="{ item }">
        {{
          item.properties.occupancyStatus !== null
            ? $t(
                `enums.occupancyStatus.label.${item.properties.occupancyStatus}`
              )
            : ''
        }}
      </template>
      <!-- eslint-disable-next-line -->
      <template v-slot:item.properties.actions="{ item }">
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
          <!--          <TwFilledIconButton-->
          <!--            v-if="adminMode"-->
          <!--            tag="a"-->
          <!--            :href="`https://admin.transittracker.ca/vehicles/${item.id}/edit`"-->
          <!--            target="_blank"-->
          <!--            class="tw-inline-flex"-->
          <!--            color="primary"-->
          <!--          >-->
          <!--            <TwIcon :path="mdiTooltipEdit" />-->
          <!--          </TwFilledIconButton>-->
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
        <TwIcon :path="mdiTableColumnPlusAfter" />
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
  mdiTableColumnPlusAfter,
  mdiFilter,
  mdiFilterOutline,
  mdiClose,
  mdiTableColumnPlusBefore,
  mdiTimelineText,
  mdiArrowUp,
  mdiTooltipEdit,
  mdiFormatListGroup,
  mdiMenu,
} from '@mdi/js'
import { mixin as clickaway } from 'vue-clickaway'
import { FIELDS_DEFINITIONS } from '~/utils/fields'

export default {
  mixins: [clickaway],
  middleware: 'loadData',
  asyncData() {
    return {
      mdiTableColumnPlusAfter,
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
      mdiFormatListGroup,
      mdiMenu,
    }
  },
  data() {
    return {
      availableColumns: ['agency'],
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
    agencies() {
      return Object.fromEntries(
        Object.values(this.$store.state.agencies.data).map((item) => [
          item.id,
          item,
        ])
      )
    },
    columns() {
      return this.$store.getters['settings/visibleTableColumns'].map(
        (column) => ({
          text: this.$t(FIELDS_DEFINITIONS[column].value),
          divider: true,
          filterable: true,
          sortable: true,
          ...FIELDS_DEFINITIONS[column],
        })
      )
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
    filterOptions() {
      return {
        'properties.vehicle.type': this.$t('enums.vehicleType.label'),
        'properties.trip.scheduleRelationship': this.$t(
          'enums.scheduleRelationship.label'
        ),
        'properties.currentStatus': this.$t('enums.currentStatus.label'),
        'properties.congestionLevel': this.$t('enums.congestionLevel.label'),
        'properties.occupancyStatus': this.$t('enums.occupancyStatus.label'),
      }
    },
    tableGroupBy() {
      return this.$store.state.settings.tableGroupBy
    },
    vehicles() {
      // Get all vehicles
      const vehicles = Object.values(this.$store.state.vehicles.features)
        .flatMap(({ features }) => features)
        .filter((item) => {
          return Object.entries(this.filters).every(([key, searchTerm]) => {
            // Ignore empty searchTerm
            if (!searchTerm) return true

            // Exception for agencies column
            if (key.includes('agency')) {
              return (
                `${this.agencies[item.properties.agencyId].name} ${
                  this.agencies[item.properties.agencyId].shortName
                }` ?? ''
              )
                .toUpperCase()
                .includes(searchTerm.toString().toUpperCase())
            }

            // Exception for route short name since it's used with route long name
            if (key === 'properties.route.shortName') {
              return (
                `${item.properties.route.shortName} ${item.properties.route.longName}` ??
                ''
              )
                .toUpperCase()
                .includes(searchTerm.toString().toUpperCase())
            }

            return key
              .split('.')
              .reduce((acc, part) => acc?.[part] ?? '', item)
              .toString()
              .toUpperCase()
              .includes(searchTerm.toString().toUpperCase())
          })
        })

      return vehicles
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
      const stringValue = value?.target?.value ?? value
      this.$store.commit('app/setFilter', { column, stringValue })
    },
    setSelection(action, vehicle) {
      this.$store.dispatch('vehicles/setSelectionAndAgency', vehicle)

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
