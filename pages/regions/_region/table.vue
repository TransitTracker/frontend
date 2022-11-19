<template>
  <div>
    <v-data-table
      group-by="agency"
      :custom-filter="filterAllFields"
      :headers="headers"
      :items="vehicles"
      :items-per-page="100"
      :footer-props="{
        itemsPerPageOptions: [25, 50, 100, 150, 200, -1],
      }"
      :search="searchAll"
      m
      :mobile-breakpoint="preferDesktopView ? 1 : 600"
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
      <template v-slot:body.prepend="{ headers, isMobile }">
        <tr v-if="isMobile">
          <td colspan="6">
            <v-text-field
              v-model="searchAll"
              :prepend-icon="mdiMagnify"
              :placeholder="$t('table.filter')"
              dense
              hide-details
              single-line
            />
          </td>
        </tr>
        <tr v-else class="tt-table__filters">
          <td>
            <v-text-field
              v-model="searchLabel"
              :prepend-inner-icon="mdiMagnify"
              :placeholder="$t('table.filter')"
              dense
              hide-details
              single-line
            />
          </td>
          <td>
            <v-text-field
              v-model="searchRoute"
              :prepend-inner-icon="mdiMagnify"
              :placeholder="$t('table.filter')"
              dense
              hide-details
              single-line
            ></v-text-field>
            <v-checkbox
              v-model="filterOnlyRouteId"
              hide-details
              class="mt-0"
              color="secondary"
              :ripple="false"
            >
              <template #label>
                <div class="text-caption">{{ $t('table.filterRouteId') }}</div>
              </template>
            </v-checkbox>
          </td>
          <td>
            <v-text-field
              v-model="searchHeadsign"
              :prepend-inner-icon="mdiMagnify"
              :placeholder="$t('table.filter')"
              dense
              hide-details
              single-line
            ></v-text-field>
          </td>
          <td>
            <v-text-field
              v-model="searchTrip"
              :prepend-inner-icon="mdiMagnify"
              :placeholder="$t('table.filter')"
              dense
              hide-details
              single-line
            ></v-text-field>
          </td>
          <td colspan="2"></td>
        </tr>
      </template>
      <!-- eslint-disable-next-line -->
      <template v-slot:item.actions="{ item }">
        <div class="d-flex items-center">
          <v-btn
            small
            icon
            color="secondary"
            :title="$t('table.viewOnMap')"
            @click="setSelection(item)"
          >
            <v-icon>{{ mdiMapMarker }}</v-icon>
          </v-btn>
          <v-btn
            v-if="item.links.length"
            small
            icon
            color="secondary"
            :title="$t('table.openLinks')"
            @click="setSelection(item, true)"
          >
            <v-icon>{{ mdiOpenInNew }}</v-icon>
          </v-btn>
        </div>
      </template>
      <!-- eslint-disable-next-line -->
      <template v-slot:item.label="{ item }">
        <div class="d-flex align-center flex-wrap gap-2">
          {{ item.label || item.ref }}
          <Tag
            v-for="tag in item.tags"
            :key="tag"
            :tag-id="tag"
            :small="true"
          ></Tag>
        </div>
      </template>
      <!-- eslint-disable-next-line -->
      <template v-slot:item.routeId="{ item }">
        <div>
          <span
            v-if="
              item.trip.routeShortName &&
              item.trip.routeShortName !== item.routeId
            "
            :title="$t('table.routeId')"
            class="text-caption grey px-1 rounded mr-2 d-inline-flex items-center"
            :class="[darkMode ? 'darken-3' : 'lighten-3']"
          >
            {{ item.routeId }}
          </span>
          <span>{{ item.trip.routeShortName || item.routeId }}</span>
          <span v-if="item.trip.routeLongName">
            &nbsp;{{ item.trip.routeLongName }}
          </span>
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
} from '@mdi/js'

export default {
  middleware: 'loadData',
  asyncData() {
    return { mdiMagnify, mdiMapMarker, mdiMinus, mdiOpenInNew, mdiPlus }
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
    preferDesktopView() {
      return this.$store.state.settings.preferDesktopView
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
.tt-table__filters td {
  vertical-align: top;
}
.gap-2 {
  gap: 0.5rem;
}
</style>
