<template>
  <v-data-table
    group-by="agency"
    :headers="headers"
    :items="vehicles"
    :items-per-page="100"
    :footer-props="{
      itemsPerPageOptions: [25, 50, 100, 150, 200, -1],
    }"
    :search="searchAll"
    class="mb-14"
  >
    <!-- eslint-disable-next-line -->
    <template v-slot:group.header="{ group, headers, toggle, isOpen }">
      <td class="text-start" :colspan="headers.length">
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
      <tr v-else>
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
      <v-btn small icon color="secondary" @click="setSelection(item)">
        <v-icon>{{ mdiMapMarker }}</v-icon>
      </v-btn>
    </template>
    <!-- eslint-disable-next-line -->
    <template v-slot:item.label="{ item }">
      {{ item.label || item.ref }}
    </template>
    <!-- eslint-disable-next-line -->
    <template v-slot:item.routeId="{ item }">
      {{ item.trip.routeShortName || item.routeId }}
      <span v-if="item.trip.routeLongName">
        &nbsp;{{ item.trip.routeLongName }}
      </span>
    </template>
  </v-data-table>
</template>

<script>
import { mdiMagnify, mdiMapMarker, mdiMinus, mdiPlus } from '@mdi/js'

export default {
  asyncData() {
    return { mdiMagnify, mdiMapMarker, mdiMinus, mdiPlus }
  },
  filter: {
    color(value) {
      if (typeof value !== 'string') return null
      if (value.startsWith('#')) return value
      return '#'.concat(value)
    },
  },
  data() {
    return {
      headers: [
        {
          text: this.$t('table.dataRef'),
          value: 'label',
          divider: true,
          filter: (value, search, item) => {
            return (value || item.ref + '')
              .toLowerCase()
              .includes(this.searchLabel.toLowerCase())
          },
        },
        {
          text: this.$t('table.dataRoute'),
          value: 'routeId',
          divider: true,
          sort: this.sortNumber,
          filter: (value) => {
            return (value + '')
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
          divider: true,
        },
        {
          text: this.$t('table.actions'),
          value: 'actions',
          divider: true,
          sortable: false,
        },
      ],
      searchLabel: '',
      searchRoute: '',
      searchHeadsign: '',
      searchTrip: '',
      searchAll: '',
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
    setSelection(vehicle) {
      this.$store.commit('vehicles/setSelection', vehicle)
      this.$router.push(
        this.localePath(`/regions/${this.$route.params.region}/map`)
      )
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
