<template>
  <ais-instant-search
    :search-client="searchClient"
    index-name="vehicles"
    style="max-width: 500px"
    class="mt-2"
  >
    <ais-configure :hits-per-page.camel="10" />
    <ais-search-box>
      <div slot-scope="{ currentRefinement, refine }">
        <v-text-field
          solo
          :value="currentRefinement"
          prepend-inner-icon="mdi-magnify"
          label="Search vehicles..."
          hide-details
          @input="refine($event)"
        ></v-text-field>
      </div>
    </ais-search-box>
    <ais-hits style="position: relative">
      <!-- <v-menu :value="true" offset-y> -->
      <v-list
        slot-scope="{ items }"
        dense
        nav
        elevation="8"
        style="position: absolute; top: 0; left: 0; right: 0; z-index: 10"
      >
        <v-list-item-group v-model="selection">
          <v-list-item v-for="item in items" :key="item.id">
            <v-list-item-icon>
              <v-icon v-text="`mdi-${item.vehicleType}`"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                <v-badge
                  dot
                  inline
                  :color="item.isActive ? 'success' : 'error'"
                  left
                  class="mt-0"
                >
                  {{ item.label || item.ref }}
                </v-badge>
              </v-list-item-title>
              <v-list-item-subtitle>
                <v-chip
                  class="mr-1"
                  x-small
                  :color="item.trip.routeColor || agencies[item.agency].color"
                  :text-color="
                    item.trip.routeTextColor || agencies[item.agency].textColor
                  "
                >
                  {{ item.trip.routeShortName || item.routeId }}
                  {{ item.trip.routeLongName }}
                </v-chip>
                {{ agencies[item.agency].name }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item></v-list-item-group
        >
      </v-list>
      <!-- </v-menu> -->
    </ais-hits>
  </ais-instant-search>
  <!-- <v-autocomplete
    :search-input.sync="query"
    :items="results"
    :loading="isLoading"
    hide-no-data
    hide-selected
    return-object
    solo
  ></v-autocomplete> -->
</template>

<script>
import Vue from 'vue'
import InstantSearch from 'vue-instantsearch'
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'

Vue.use(InstantSearch)

export default {
  data: () => ({
    query: '',
    results: [],
    isLoading: false,
    searchClient: instantMeiliSearch(
      process.env.meiliHost,
      process.env.meiliKey
    ),
    selection: {},
  }),
  computed: {
    agencies() {
      return this.$store.state.agencies.data
    },
  },
}
</script>
