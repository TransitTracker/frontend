<template>
  <div
    class="tw:flex tw:min-h-screen tw:flex-col tw:bg-neutral-99 tw:dark:bg-neutral-10"
  >
    <div class="tw:container tw:mx-auto tw:p-4">
      <h1
        class="tw:font-heading tw:text-3xl tw:leading-9 tw:md:text-5xl tw:lg:text-6xl tw:md:leading-14 tw:lg:leading-16"
      >
        {{ $t('title') }}
      </h1>
      <div class="tw:prose tw:prose-sm tw:dark:prose-invert tw:md:prose-base">
        <p class="tw:mb-2! tw:mt-3 tw:md:mt-4">
          {{ $t('description') }}
        </p>
        <b>{{ $t('notice') }}</b>
        <ul>
          <li>
            {{ $t('noticeLicense') }}
          </li>
          <li>
            {{ $t('noticeAccuracy') }}
          </li>
        </ul>
      </div>
      <div class="tw:mt-6 tw:overflow-x-hidden tw:md:mt-8">
        <Transition
          :enter-class="transitionEnterClass"
          :enter-from-class="transitionEnterClass"
          enter-to-class="tw:translate-x-0 tw:opacity-1"
          enter-active-class="tw:transition tw:duration-300 tw:ease-standard-effects-slow"
          leave-class="tw:translate-x-0 tw:opacity-1"
          leave-from-class="tw:translate-x-0 tw:opacity-1"
          leave-active-class="tw:transition tw:duration-300 tw:ease-standard-effects-slow"
          :leave-to-class="transitionLeaveToClass"
          mode="out-in"
        >
          <section v-if="step === 0" key="step0">
            <h2
              class="tw:text-2xl tw:font-medium tw:leading-8 tw:md:text-[2rem] tw:md:leading-10"
            >
              {{ $t('step0Title') }}
            </h2>
            <div
              class="tw:mt-4 tw:flex tw:flex-col tw:gap-3 tw:sm:flex-row tw:sm:flex-wrap tw:sm:gap-4"
            >
              <TwChoiceCard
                :title="$t('allAgencies')"
                :icon="mdiBusMultiple"
                @click="selectAllAgency"
              >
                {{ $t('allAgenciesDesc') }}
              </TwChoiceCard>
              <TwChoiceCard
                :title="$t('oneAgency')"
                :icon="mdiBus"
                @click="step = 1"
              >
                {{ $t('oneAgencyDesc') }}
              </TwChoiceCard>
            </div>
          </section>
          <section v-else-if="step === 1" key="step1">
            <div class="tw:flex tw:items-center tw:gap-2">
              <TwFilledIconButton @click="step = 0">
                <TwIcon :path="mdiArrowLeft" />
              </TwFilledIconButton>
              <h2
                class="tw:text-2xl tw:font-medium tw:leading-8 tw:md:text-[2rem] tw:md:leading-10"
              >
                {{ $t('selectAgency') }}
              </h2>
            </div>
            <div
              class="tw:mt-4 tw:flex tw:flex-col tw:divide-y tw:divide-solid tw:divide-neutral-variant-80 tw:*:border-x-0 tw:*:py-2 tw:dark:divide-neutral-variant-30"
            >
              <TwDetails
                v-for="region in regions"
                :key="region.id"
                :open="currentRegion === region.slug"
              >
                <template #summary>
                  <h3
                    class="tw:text-base tw:font-semibold tw:leading-6 tw:md:text-lg"
                  >
                    {{ region.name }}
                  </h3>
                </template>
                <ul
                  class="tw:mt-2 tw:grid tw:grid-cols-2 tw:gap-2 tw:pl-0! tw:sm:gap-3 tw:md:grid-cols-3 tw:md:gap-4 tw:xl:grid-cols-4"
                >
                  <li
                    v-for="agency in region.agencies"
                    :key="agency.slug"
                    class="tw:relative tw:cursor-pointer tw:overflow-hidden tw:rounded-lg tw:py-1.5 tw:pl-2.5 tw:pr-8 tw:text-xs tw:font-medium tw:leading-4 tw:transition-colors tw:hover:bg-neutral-10! tw:hover:text-neutral-98! tw:dark:hover:bg-neutral-90! tw:dark:hover:text-neutral-6! tw:sm:text-sm tw:sm:leading-5 tw:md:py-2 tw:md:pl-3 tw:md:pr-10"
                    :style="{
                      backgroundColor: `${agency.color}26`,
                    }"
                    @click="selectAgency(agency)"
                  >
                    <b class="tw:hidden tw:md:block">{{ agency.name }}</b>
                    <b class="tw:md:hidden">{{ agency.shortName }}</b>
                    <p
                      v-if="agency.isArchived"
                      class="tw:mb-0! tw:text-2xs tw:font-normal tw:italic tw:sm:text-xs"
                    >
                      {{ $t('archived') }}
                    </p>
                    <div
                      class="tw:absolute tw:inset-y-0 tw:-right-4 tw:h-full tw:w-8 tw:skew-x-18 tw:md:w-10"
                      :style="{ backgroundColor: agency.color }"
                    ></div>
                  </li>
                </ul>
              </TwDetails>
            </div>
          </section>
          <section v-else-if="step === 2" key="step2">
            <div class="tw:flex tw:items-center tw:gap-2">
              <TwFilledIconButton
                @click="step = selectedAgency.slug === 'all' ? 0 : 1"
              >
                <TwIcon :path="mdiArrowLeft" />
              </TwFilledIconButton>
              <h2
                class="tw:text-2xl tw:font-medium tw:leading-8 tw:md:text-[2rem] tw:md:leading-10"
              >
                {{ $t('selectPeriod') }}
              </h2>
            </div>
            <div
              class="tw:mt-4 tw:flex tw:flex-col tw:gap-3 tw:sm:flex-row tw:sm:flex-wrap tw:sm:gap-4"
            >
              <TwChoiceCard
                :title="$t('currentlyActive')"
                :icon="mdiMotionPlayOutline"
                @click="startDownload('active')"
              >
                {{ $t('currentlyActiveDesc') }}
              </TwChoiceCard>
              <TwChoiceCard
                :title="$t('historicalData')"
                :icon="mdiHistory"
                @click="startDownload('history')"
              >
                {{ $t('historicalDataDesc') }}
              </TwChoiceCard>
            </div>
          </section>
          <section v-else-if="step === 3" key="step3">
            <h2
              class="tw:text-2xl tw:font-medium tw:leading-8 tw:md:text-[2rem] tw:md:leading-10"
            >
              {{ $t('preparingData') }}
            </h2>
            <p
              class="tw:mt-2 tw:text-sm tw:leading-5 tw:text-neutral-variant-30 tw:dark:text-neutral-variant-80 tw:md:text-base"
            >
              {{ $t('automaticDownload') }}
              <br />
              <span
                class="tw:font-medium tw:text-neutral-10 tw:dark:text-neutral-90"
              >
                {{ paginationCurrent }} / {{ paginationTotal }}
              </span>
            </p>
            <TwLinearProgress
              :max="paginationTotal"
              :value="paginationCurrent"
              class="tw:mt-4"
            />
          </section>
          <section
            v-else-if="step === 4"
            key="step4"
            class="tw:flex tw:w-full tw:flex-col tw:items-center tw:gap-6 tw:py-6 tw:md:gap-8 tw:md:py-10"
          >
            <h2
              class="tw:text-center tw:text-2xl tw:font-medium tw:leading-8 tw:md:text-[2rem] tw:md:leading-10"
            >
              {{ $t('downloadComplete') }}
            </h2>
            <TwIcon
              :path="mdiCheckCircle"
              class="tw:h-14! tw:w-14! tw:text-primary-40 tw:dark:text-primary-80 tw:md:h-20! tw:md:w-20!"
            />
            <TwFilledButton @click="startNewDownload">
              {{ $t('startNewDownload') }}
            </TwFilledButton>
          </section>
        </Transition>
      </div>
    </div>
    <div class="tw:grow"></div>
    <div class="tw:container tw:mx-auto tw:md:px-4">
      <div
        class="tw:rounded-t-xl tw:bg-neutral-90 tw:p-4 tw:dark:bg-neutral-20 tw:md:p-6"
      >
        <h2
          class="tw:text-base tw:font-medium tw:leading-6 tw:md:text-[1.375rem] tw:md:font-normal tw:md:leading-7"
        >
          {{ $t('selection') }}
        </h2>
        <div class="tw:grid tw:grid-cols-2 tw:gap-3 tw:md:gap-6">
          <div v-if="selectedAgency.slug" class="tw:mt-3 tw:md:mt-4">
            <b
              class="tw:block tw:text-2xs tw:font-medium tw:leading-4 tw:tracking-normal tw:text-neutral-variant-30 tw:dark:text-neutral-variant-70 tw:sm:text-xs"
            >
              {{ $t('agency') }}
            </b>
            <span
              class="tw:mt-0.5 tw:block tw:text-sm tw:font-medium tw:leading-5 tw:md:text-base"
            >
              {{
                selectedAgency.slug === 'all'
                  ? $t('allAgencies')
                  : selectedAgency.name
              }}
            </span>
          </div>
          <div v-if="period" class="tw:mt-3 tw:md:mt-4">
            <b
              class="tw:block tw:text-2xs tw:font-medium tw:leading-4 tw:tracking-normal tw:text-neutral-variant-30 tw:dark:text-neutral-variant-70 tw:sm:text-xs"
            >
              {{ $t('period') }}
            </b>
            <span
              class="tw:mt-0.5 tw:block tw:text-sm tw:font-medium tw:leading-5 tw:md:text-base"
            >
              {{
                period === 'active'
                  ? $t('currentlyActive')
                  : $t('historicalData')
              }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jsonToCsvExport from 'json-to-csv-export'
import {
  mdiArrowLeft,
  mdiBus,
  mdiBusMultiple,
  mdiMotionPlayOutline,
  mdiHistory,
  mdiRestart,
  mdiCheckCircle,
} from '@mdi/js'

export default {
  name: 'Download',
  middleware: 'loadData',
  data: () => ({
    direction: 'forward',
    selectedAgency: { slug: null },
    step: 0,
    period: null,
    downloadFinished: false,
    data: [],
    paginationTotal: null,
    paginationCurrent: null,
    mdiArrowLeft,
    mdiBus,
    mdiBusMultiple,
    mdiMotionPlayOutline,
    mdiHistory,
    mdiRestart,
    mdiCheckCircle,
  }),
  head() {
    return {
      title: this.$t('title'),
    }
  },
  computed: {
    currentRegion() {
      return this.$store.state.settings.currentRegion
    },
    regions() {
      return this.$store.state.regions.data
    },
    vehicles() {
      return this.$store.state.vehicles.features
    },
    downloadFilename() {
      const now = new Date()
      const dateTime =
        now.getFullYear() +
        String(now.getMonth() + 1).padStart(2, '0') +
        String(now.getDate()).padStart(2, '0') +
        '_' +
        String(now.getHours()).padStart(2, '0') +
        String(now.getMinutes()).padStart(2, '0')
      return `tt-export-${this.selectedAgency.slug}-${this.period}-${dateTime}.csv`
    },
    transitionEnterClass() {
      return this.direction === 'forward'
        ? 'tw:translate-x-full tw:opacity-0'
        : 'tw:-translate-x-full tw:opacity-0'
    },
    transitionLeaveToClass() {
      return this.direction === 'forward'
        ? 'tw:-translate-x-full tw:opacity-0'
        : 'tw:translate-x-full tw:opacity-0'
    },
  },
  watch: {
    step(newStep, oldStep) {
      this.direction = newStep > oldStep ? 'forward' : 'backward'
    },
  },
  methods: {
    selectAllAgency() {
      this.selectedAgency.slug = 'all'
      this.step = 2
    },
    selectAgency(agency) {
      this.selectedAgency = agency
      this.step = 2
    },
    async downloadPartOfHistory(url) {
      const response = await this.$axios.get(url)

      this.data.push(...response.data.features)

      this.paginationTotal = response.data.meta.total
      this.paginationCurrent = response.data.meta.to

      if (response.data.links?.next) {
        await this.downloadPartOfHistory(response.data.links.next)
      } else {
        this.finalizeDownload()
        this.step = 4
      }

      return this.data
    },
    startDownload(period) {
      this.period = period
      this.data = []
      this.step = 3
      let url = '/vehicles.geojson?label=true'

      if (this.selectedAgency.slug !== 'all') {
        url = `/agencies/${this.selectedAgency.slug}/vehicles.geojson?label=true`
      }

      if (this.period === 'history') {
        this.downloadPartOfHistory(`${url}&history=true`)
      } else if (this.selectAgency === 'all') {
        // For every agency, there is always pagination, thus require this method
        this.downloadPartOfHistory(url)
      } else {
        // Always re-download the data to have the enum label
        // One request, there is no pagination
        this.$axios.get(url).then((response) => {
          this.data = response.data.features
          this.finalizeDownload()
          this.step = 4
        })
      }
    },
    finalizeDownload() {
      // Flatten properties in object
      const isPlainObj = (o) =>
        Boolean(
          o &&
          o.constructor &&
          o.constructor.prototype &&
          // eslint-disable-next-line no-prototype-builtins
          o.constructor.prototype.hasOwnProperty('isPrototypeOf'),
        )

      const flattenObj = (obj, keys = []) => {
        return Object.keys(obj).reduce((acc, key) => {
          const value = obj[key]
          const newKeys = keys.concat(key)

          if (Array.isArray(value)) {
            if (value.length === 0) {
              return Object.assign(acc, { [newKeys.join('.')]: '' })
            }

            if (value.every((item) => isPlainObj(item))) {
              // Array of objects: flatten each and prefix keys with index
              value.forEach((item, index) => {
                const flatItem = flattenObj(item, newKeys.concat(String(index)))
                Object.assign(acc, flatItem)
              })
              return acc
            }

            // Array of primitives: join as comma-separated string
            return Object.assign(acc, { [newKeys.join('.')]: value.join(', ') })
          }

          return Object.assign(
            acc,
            isPlainObj(value)
              ? flattenObj(value, newKeys)
              : { [newKeys.join('.')]: value },
          )
        }, {})
      }

      jsonToCsvExport({
        data: this.data.map((vehicle) => flattenObj(vehicle)),
        filename: this.downloadFilename,
      })

      this.step = 4
    },
    startNewDownload() {
      this.selectedAgency = { slug: null }
      this.period = null
      this.paginationTotal = null
      this.paginationCurrent = null
      this.step = 0
    },
  },
}
</script>
<i18n>
{
  "en": {
    "title": "Download Data",
    "description": "This page allows you to download Transit Tracker data in CSV format, compatible with third-party applications or spreadsheet software like Excel. You can choose to download data for currently active vehicles or an archive of server data.",
    "notice": "Please note:",
    "noticeLicense": "Some agencies are not available for download due to license restrictions.",
    "noticeAccuracy": "The accuracy of the data cannot be fully guaranteed, especially for historical records.",
    "step0Title": "What would you like to download?",
    "allAgencies": "All agencies",
    "allAgenciesDesc": "A file containing data for 30+ Transit Tracker agencies.",
    "oneAgency": "A specific agency",
    "oneAgencyDesc": "Select one agency at a time.",
    "selectAgency": "Select an agency",
    "archived": "Archived",
    "selectPeriod": "Select a period",
    "currentlyActive": "Active vehicles",
    "currentlyActiveDesc": "Download only currently active vehicles.",
    "historicalData": "Historical data",
    "historicalDataDesc": "Download all recorded vehicles in Transit Tracker, in their last known state.",
    "preparingData": "Preparing data...",
    "automaticDownload": "The download will start automatically once the data is ready.",
    "downloadComplete": "Download complete!",
    "startNewDownload": "Start a new download",
    "selection": "Your selection",
    "agency": "Agency",
    "period": "Period"
  },
  "fr": {
    "title": "Télécharger des données",
    "description": "Cette page vous permet de télécharger les données de Transit Tracker au format CSV, compatible avec des applications tierces ou des tableurs comme Excel. Vous pouvez choisir de télécharger les données des véhicules actuellement actifs ou une archive des données du serveur.",
    "notice": "À noter :",
    "noticeLicense": "Certaines agences ne sont pas disponibles au téléchargement en raison de restrictions liées à leur licence.",
    "noticeAccuracy": "L'exactitude des données ne peut être totalement garantie, en particulier pour les enregistrements historiques.",
    "step0Title": "Que souhaitez-vous télécharger?",
    "allAgencies": "Toutes les agences",
    "allAgenciesDesc": "Un fichier contenant les données des 30+ agences de Transit Tracker.",
    "oneAgency": "Une agence spécifique",
    "oneAgencyDesc": "Sélectionnez une agence à la fois.",
    "selectAgency": "Sélectionner une agence",
    "archived": "Archivée",
    "selectPeriod": "Sélectionner une période",
    "currentlyActive": "Véhicules actifs",
    "currentlyActiveDesc": "Télécharger uniquement les véhicules actuellement actifs.",
    "historicalData": "Données historiques",
    "historicalDataDesc": "Télécharger toutes les données des véhicules enregistrés dans Transit Tracker, dans leur dernier état connu.",
    "preparingData": "Préparation des données...",
    "automaticDownload": "Le téléchargement commencera automatiquement dès que les données seront prêtes.",
    "downloadComplete": "Téléchargement terminé!",
    "startNewDownload": "Lancer un nouveau téléchargement",
    "selection": "Votre sélection",
    "agency": "Agence",
    "period": "Période"
  }
}
</i18n>
