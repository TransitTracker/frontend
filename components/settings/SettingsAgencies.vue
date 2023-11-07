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
        <button
          v-if="activeAgencies.length !== availableAgencies.length"
          :loading="addAllLoading"
          class="tw-mt-2 tw-flex tw-h-8 tw-items-center tw-gap-x-2 tw-rounded-lg tw-border tw-border-solid tw-border-neutralVariant-50 tw-pl-2 tw-pr-4 tw-text-sm tw-leading-8 dark:tw-border-neutralVariant-60"
          @click="addAll"
        >
          <TwIcon :path="mdiPlus" class="!tw-h-[1.125rem] !tw-w-[1.125rem]" />
          <span>{{ $t('addAll') }}</span>
        </button>

        <div>
          <ul class="tw-list-outside tw-list-none tw-space-y-4">
            <li v-for="(agencies, section) in filteredAgencies" :key="section">
              <b class="-tw-ml-6">
                <div class="tw-flex tw-items-center">
                  <input
                    type="checkbox"
                    class="tw-form-checkbox tw-rounded-sm tw-border-primary-40 tw-text-primary-10"
                  />
                </div>
                {{ $t(section, { region: regions[currentRegion].name }) }}
              </b>
              <div class="tw-space-y-2">
                <div
                  v-for="agency in agencies"
                  :key="agency.slug"
                  class="tw-flex tw-items-center tw-gap-4"
                  :checked="agency.slug in activeAgencies"
                >
                  <input
                    :id="agency.slug"
                    v-model="activeAgencies"
                    type="checkbox"
                    :name="agency.slug"
                    :value="agency.slug"
                  />
                  <label :for="agency.slug">
                    <p class="!tw-mb-0 tw-font-medium">{{ agency.name }}</p>
                    <small>{{
                      agency.cities && agency.cities.join(', ')
                    }}</small>
                  </label>
                  <div class="tw-grow"></div>
                  <span
                    class="tw-h-4 tw-w-4 tw-rounded-full"
                    :style="{
                      backgroundColor: agency.color,
                      color: agency.textColor,
                    }"
                  ></span>
                </div>
              </div>
            </li>
          </ul>
        </div>
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
    addAllLoading: false,
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
    darkMode() {
      return this.$vuetify.theme.dark
    },
    filteredAgencies() {
      return Object.values(this.$store.state.agencies.data)
        .map((agency) => {
          return {
            ...agency,
            isInCurrentRegion: agency.regions.includes(this.currentRegion),
            searchString: `${agency.name} ${agency.shortName} ${
              agency.slug
            } ${agency.cities.join(' ')}`.toUpperCase(),
          }
        })
        .filter(({ searchString }) => {
          if (!this.search) return true
          return searchString.includes(this.search.toUpperCase())
        })
        .sort((a, b) => {
          return a.isInCurrentRegion === b.isInCurrentRegion
            ? 0
            : a.isInCurrentRegion
            ? -1
            : 1
        })
        .reduce((storage, agency) => {
          const group = agency.isArchived
            ? 'archived'
            : agency.isInCurrentRegion
            ? 'inRegion'
            : 'outsideRegion'
          storage[group] = storage[group] || []
          storage[group].push(agency)
          return storage
        }, {})
    },
    regions() {
      return this.$store.state.regions.data
    },
  },
  methods: {
    addAll() {
      this.addAllLoading = true

      Object.keys(this.availableAgencies)
        .filter((slug) => !this.activeAgencies.includes(slug))
        .forEach((slug) => {
          this.$store.dispatch(
            'settings/toggleAgency',
            this.availableAgencies[slug]
          )
        })

      this.addAllLoading = false
    },
    toggleAgency(agency) {
      this.$store.dispatch('settings/toggleAgency', agency)
    },
  },
}
</script>

<i18n>
{
  "en": {
    "addAll": "Add all agencies from all regions",
    "archived": "Archived",
    "inRegion": "In this region ({region})",
    "outsideRegion": "Outside this region"
  },
  "fr": {
    "addAll": "Ajouter toutes les agences de toutes les régions",
    "archived": "Archivées",
    "inRegion": "Dans cette région ({region})",
    "outsideRegion": "À l'extérieur de cette région"
  }
}
</i18n>
