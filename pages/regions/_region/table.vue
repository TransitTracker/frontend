<template>
  <v-data-table
    group-by="agency"
    :headers="headers"
    :items="vehicles"
    :items-per-page="100"
    :search="search"
    class="mb-14"
  >
    <!-- eslint-disable-next-line -->
    <template v-slot:group.header="{ group, headers, toggle, isOpen }">
      <td class="text-start" :colspan="headers.length">
        <v-btn icon class="mr-2" @click="toggle">
          <v-icon>{{ isOpen ? 'mdi-minus' : 'mdi-plus' }}</v-icon>
        </v-btn>
        {{ agencies[group].name }}
      </td>
    </template>
    <!-- eslint-disable-next-line -->
    <template v-slot:body.prepend="{ headers }">
      <tr>
        <td :colspan="headers.length">
          <v-text-field
            v-model="search"
            prepend-icon="mdi-magnify"
            dense
            label="Rechercher"
            single-line
            hide-details=""
          ></v-text-field>
        </td>
      </tr>
    </template>
    <!-- eslint-disable-next-line -->
    <template v-slot:item.actions="{ item }">
      <v-btn small icon color="secondary" @click="setSelection(item)">
        <v-icon>mdi-map-marker</v-icon>
      </v-btn>
    </template>
    <!-- eslint-disable-next-line -->
    <template v-slot:item.label="{ item }">
      {{ item.label || item.ref }}
    </template>
    <!-- eslint-disable-next-line -->
    <template v-slot:item.routeId="{ item }">
      <v-chip
        :color="colorFilter(item.trip.routeColor)"
        :text-color="colorFilter(item.trip.routeTextColor)"
      >
        {{ item.routeId }}
        <span v-if="item.trip.routeLongName">
          &nbsp;{{ item.trip.routeLongName }}
        </span>
      </v-chip>
    </template>
  </v-data-table>
</template>

<script>
export default {
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
        },
        {
          text: this.$t('table.dataRoute'),
          value: 'routeId',
          sort: this.sortNumber,
        },
        {
          text: this.$t('table.dataHeadsign'),
          value: 'trip.headsign',
        },
        {
          text: this.$t('table.dataTripId'),
          value: 'tripId',
        },
        {
          text: this.$t('table.dataStartTime'),
          value: 'startTime',
        },
        {
          text: this.$t('table.actions'),
          value: 'actions',
          sortable: false,
        },
      ],
      search: '',
    }
  },
  computed: {
    agencies() {
      return this.$store.state.agencies.data
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
    colorFilter(value) {
      if (typeof value !== 'string') return null
      if (value.startsWith('#')) return value
      return '#'.concat(value)
    },
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
