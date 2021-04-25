<template>
  <v-expansion-panels flat tile>
    <v-expansion-panel class="tt-settings__agencies">
      <v-expansion-panel-header class="pa-0">
        <div class="d-flex align-center">
          <h2 class="text-subtitle-1 font-weight-bold">
            {{ $t('settings.agenciesTitle') }}
          </h2>
          <v-chip
            class="ml-2"
            :color="darkMode ? 'grey darken-3' : 'grey lighten-4'"
            small
            label
          >
            {{
              activeAgencies.length +
              Object.entries(availableAgencies).filter((agency) =>
                agency[1].regions.includes('*')
              ).length
            }}
            /
            {{ Object.entries(availableAgencies).length }}
          </v-chip>
        </div>
      </v-expansion-panel-header>
      <v-expansion-panel-content class="">
        <v-text-field
          v-model="search"
          :label="$t('settings.searchAgency')"
          clearable
          :prepend-inner-icon="mdiMagnify"
          :color="darkMode ? 'white' : 'primary'"
        ></v-text-field>
        <v-list>
          <v-list-item v-for="(agency, slug) in filteredAgencies" :key="slug">
            <v-list-item-avatar :color="agency.color">
              <v-icon
                class="px-0"
                size="24"
                :style="{ color: agency.textColor }"
                dark
              >
                {{ mdi[agency.defaultVehicleType] }}
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ agency.name }}
              </v-list-item-title>
              <v-list-item-subtitle>
                <p class="mb-2 mt-1 text-truncate">
                  {{ agency.cities && agency.cities.join(', ') }}
                </p>
                <v-chip
                  v-for="region in agency.regions"
                  :key="region"
                  :color="region === '*' ? 'secondary-dark white--text' : null"
                  label
                  small
                >
                  {{
                    region === '*'
                      ? 'Local'
                      : regions[region]
                      ? regions[region].name
                      : region
                  }}
                </v-chip>
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action v-if="!agency.regions.includes('*')">
              <v-btn icon @click="toggleAgency(agency)">
                <v-icon v-if="activeAgencies.includes(slug)">
                  {{ mdiMinus }}
                </v-icon>
                <v-icon v-else>{{ mdiPlus }}</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import {
  mdiBus,
  mdiFerry,
  mdiMagnify,
  mdiMinus,
  mdiPlus,
  mdiTrain,
  mdiTram,
} from '@mdi/js'

export default {
  data: () => ({
    search: null,
    mdiMagnify,
    mdiMinus,
    mdiPlus,
    mdi: { bus: mdiBus, ferry: mdiFerry, train: mdiTrain, tram: mdiTram },
  }),
  computed: {
    activeAgencies() {
      return this.$store.state.settings.activeAgencies
    },
    availableAgencies() {
      return this.$store.state.agencies.data
    },
    currentRegion() {
      return this.$store.state.settings.currentRegion
    },
    filteredAgencies() {
      return Object.fromEntries(
        Object.entries(this.$store.state.agencies.data)
          .filter((value) => {
            if (!this.search) return true
            return value[1].name
              .toUpperCase()
              .includes(this.search.toUpperCase())
          })
          .sort((a, b) => {
            const aIsPart = a[1].regions.includes(this.currentRegion)
            const bIsPart = b[1].regions.includes(this.currentRegion)

            return aIsPart === bIsPart ? 0 : aIsPart ? -1 : 1
          })
      )
    },
    regions() {
      return this.$store.state.regions.data
    },
  },
  methods: {
    toggleAgency(agency) {
      this.$store.dispatch('settings/toggleAgency', agency)
    },
  },
}
</script>
