<template>
  <div>
    <div class="tw-relative">
      <input
        id="filterAgencies"
        v-model="search"
        type="text"
        class="tw-bg tw-peer tw-form-input tw-block tw-w-full tw-appearance-none tw-rounded-t-lg tw-border-0 tw-border-b-2 tw-border-gray-300 tw-bg-neutral-90 tw-px-2.5 tw-pb-2.5 tw-pt-5 tw-text-sm tw-text-neutral-10 focus:tw-border-primary-40 focus:tw-outline-none focus:tw-ring-0 dark:tw-bg-neutral-22 dark:tw-text-neutral-90 focus:dark:tw-border-primary-80"
        placeholder=" "
      />
      <label
        for="filterAgencies"
        class="tw-absolute tw-left-2.5 tw-top-4 tw-z-10 tw-origin-[0] -tw-translate-y-4 tw-scale-75 tw-transform tw-text-sm tw-text-neutralVariant-30 tw-duration-300 peer-placeholder-shown:tw-translate-y-0 peer-placeholder-shown:tw-scale-100 peer-focus:-tw-translate-y-4 peer-focus:tw-scale-75 peer-focus:tw-text-primary-40 dark:tw-text-neutralVariant-80 peer-focus:dark:tw-text-primary-80"
      >
        {{ $t('settings.searchAgency') }}
      </label>
    </div>
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
                <small>{{ agency.cities && agency.cities.join(', ') }}</small>
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
  </div>
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
