<template>
  <div
    class="tw-flex tw-min-h-screen tw-flex-col tw-bg-neutral-99 dark:tw-bg-neutral-10"
  >
    <div class="tw-container tw-mx-auto tw-p-4">
      <h1
        class="leading-[2.75rem] md:leading-[4rem] tw-font-heading tw-text-4xl md:tw-text-6xl"
      >
        {{ $t('title') }}
      </h1>
      <p class="!tw-mb-2 tw-mt-4">
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
      <div class="tw-mt-8 tw-min-h-96 md:tw-min-h-[unset]">
        <Transition
          enter-active-class="tw-transition tw-duration-250 tw-absolute"
          enter-from-class="tw-translate-x-full tw-opacity-0"
          enter-to-class="tw-translate-x-0 tw-opacity-1"
          leave-active-class="tw-transition tw-duration-250 tw-absolute"
          leave-from-class="tw-translate-x-0 tw-opacity-1"
          leave-to-class="-tw-translate-x-full tw-opacity-0"
          mode="out-in"
        >
          <section v-if="step === 0" key="step0">
            <h2 class="tw-text-[2rem] tw-font-medium tw-leading-10">
              {{ $t('step0Title') }}
            </h2>
            <div class="tw-mt-4 tw-flex tw-flex-wrap tw-gap-4">
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
            <div class="tw-mt-8 tw-flex tw-items-center tw-gap-2">
              <TwFilledIconButton @click="step = 0">
                <TwIcon :path="mdiArrowLeft" />
              </TwFilledIconButton>
              <h2 class="tw-text-[2rem] tw-font-medium tw-leading-10">
                {{ $t('selectAgency') }}
              </h2>
            </div>
            <div
              class="tw-mt-4 tw-flex tw-flex-col tw-divide-y tw-divide-solid tw-divide-neutralVariant-80 *:tw-border-x-0 *:tw-py-2 dark:tw-divide-neutralVariant-30"
            >
              <TwDetails
                v-for="region in regions"
                :key="region.id"
                :open="currentRegion === region.slug"
              >
                <template #summary>
                  <h3>{{ region.name }}</h3>
                </template>
                <ul
                  class="tw-mt-2 tw-grid tw-grid-cols-2 tw-gap-4 !tw-pl-0 md:tw-grid-cols-3 xl:tw-grid-cols-4"
                >
                  <li
                    v-for="agency in region.agencies"
                    :key="agency.slug"
                    class="tw-relative tw-cursor-pointer tw-overflow-hidden tw-rounded-lg tw-py-1 tw-pl-2 tw-pr-10 tw-text-sm tw-font-medium tw-leading-5 tw-transition-colors hover:!tw-bg-neutral-10 hover:!tw-text-neutral-98 dark:hover:!tw-bg-neutral-90 dark:hover:!tw-text-neutral-6 md:tw-py-2"
                    :style="{
                      backgroundColor: `${agency.color}26`,
                    }"
                    @click="selectAgency(agency)"
                  >
                    <b class="tw-hidden md:tw-block">{{ agency.name }}</b>
                    <b class="md:tw-hidden">{{ agency.shortName }}</b>
                    <p
                      v-if="agency.isArchived"
                      class="!tw-mb-0 tw-font-normal tw-italic"
                    >
                      {{ $t('archived') }}
                    </p>
                    <div
                      class="tw-absolute tw-inset-y-0 -tw-right-4 tw-h-full tw-w-10 tw-skew-x-[18deg]"
                      :style="{ backgroundColor: agency.color }"
                    ></div>
                  </li>
                </ul>
              </TwDetails>
            </div>
          </section>
          <section v-else-if="step === 2" key="step2">
            <div class="tw-flex tw-items-center tw-gap-2">
              <TwFilledIconButton
                @click="step = selectedAgency.slug === 'all' ? 0 : 1"
              >
                <TwIcon :path="mdiArrowLeft" />
              </TwFilledIconButton>
              <h2 class="tw-text-[2rem] tw-font-medium tw-leading-10">
                {{ $t('selectPeriod') }}
              </h2>
            </div>
            <div class="tw-mt-4 tw-flex tw-flex-wrap tw-gap-4">
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
            <h2 class="tw-text-[2rem] tw-font-medium tw-leading-10">
              {{ $t('preparingData') }}
            </h2>
            <p>
              {{ $t('automaticDownload') }}
              <br />
              {{ paginationCurrent }} / {{ paginationTotal }}
            </p>
            <TwLinearProgress
              :max="paginationTotal"
              :value="paginationCurrent"
            />
          </section>
          <section
            v-else-if="step === 4"
            key="step4"
            class="tw-flex tw-flex-col tw-items-center tw-gap-8"
          >
            <h2 class="tw-text-[2rem] tw-font-medium tw-leading-10">
              {{ $t('downloadComplete') }}
            </h2>
            <TwIcon :path="mdiCheckCircle" class="!tw-h-20 !tw-w-20" />
            <TwFilledButton @click="startNewDownload">
              {{ $t('startNewDownload') }}
            </TwFilledButton>
          </section>
        </Transition>
      </div>
    </div>
    <div class="tw-grow"></div>
    <div class="tw-container tw-mx-auto md:tw-px-4">
      <div
        class="tw-min-h-32 tw-rounded-t-xl tw-bg-neutral-90 tw-p-4 dark:tw-bg-neutral-20"
      >
        <h2 class="tw-text-[1.375rem] tw-font-normal tw-leading-7">
          {{ $t('selection') }}
        </h2>
        <div class="md:tw-grid md:tw-grid-cols-2">
          <div v-if="selectedAgency.slug" class="tw-mt-4">
            <b
              class="tw-block tw-text-xs tw-font-medium tw-leading-4 tw-tracking-normal"
            >
              {{ $t('agency') }}
            </b>
            {{
              selectedAgency.slug === 'all'
                ? $t('allAgencies')
                : selectedAgency.name
            }}
          </div>
          <div v-if="period" class="tw-mt-4">
            <b
              class="tw-block tw-text-xs tw-font-medium tw-leading-4 tw-tracking-normal"
            >
              {{ $t('period') }}
            </b>
            {{
              period === 'active' ? $t('currentlyActive') : $t('historicalData')
            }}
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
            o.constructor.prototype.hasOwnProperty('isPrototypeOf')
        )

      const flattenObj = (obj, keys = []) => {
        return Object.keys(obj).reduce((acc, key) => {
          return Object.assign(
            acc,
            isPlainObj(obj[key])
              ? flattenObj(obj[key], keys.concat(key))
              : { [keys.concat(key).join('.')]: obj[key] }
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
