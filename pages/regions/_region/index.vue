<template>
  <div
    class="tw:flex tw:min-h-screen tw:flex-col tw:bg-neutral-99 tw:dark:bg-neutral-10"
  >
    <!-- Header Banner -->
    <div
      class="tw:relative tw:flex tw:h-80 tw:w-full tw:flex-col tw:justify-between tw:bg-cover tw:bg-center tw:bg-no-repeat tw:before:absolute tw:before:inset-0 tw:before:h-full tw:before:w-full tw:before:bg-linear-to-t tw:before:from-primary-20 tw:before:to-transparent"
      :style="{
        backgroundImage: `url(${backendHost}/storage/content/regions/${region.image})`,
      }"
    >
      <div
        class="tw:absolute tw:inset-0 tw:flex tw:h-full tw:w-full tw:items-end tw:bg-linear-to-t tw:from-primary-90 tw:to-transparent tw:dark:from-primary-20"
      >
        <div
          class="tw:container tw:mx-auto tw:flex tw:w-full tw:flex-wrap tw:items-end tw:justify-between tw:gap-4 tw:px-4 tw:pb-0"
        >
          <h1
            class="tw:font-heading tw:text-4xl tw:leading-[2.75rem] tw:text-primary-20 tw:md:text-6xl tw:md:leading-[4rem] tw:dark:text-white"
          >
            {{ region.name }}
          </h1>
          <!-- Photo credits instead of change region button -->
          <div
            v-if="region.credits"
            class="tw:mb-2 tw:flex tw:max-w-md tw:items-center tw:gap-1.5 tw:rounded-full tw:bg-black/40 tw:px-3 tw:py-1 tw:text-xs tw:text-white tw:backdrop-blur-xs tw:dark:bg-black/50 [&_a]:tw:font-medium [&_a]:tw:text-white [&_a]:tw:underline"
            :title="$t('photoCreditsTitle')"
          >
            <TwIcon
              :path="mdiCameraOutline"
              class="tw:h-4 tw:w-4 tw:shrink-0"
            />
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span v-html="region.credits" />
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="tw:container tw:mx-auto tw:p-4">
      <!-- Active Vehicles Count and Latest Aggregate Update -->
      <div
        class="tw:flex tw:flex-wrap tw:items-baseline tw:justify-between tw:gap-2"
      >
        <div>
          <h2
            class="tw:text-xl tw:font-medium tw:md:text-[2rem] tw:md:leading-10"
          >
            {{ $tc('vehicleTotal', totalCount) }}
          </h2>
          <p
            v-if="lastUpdatedText"
            class="tw:mt-1 tw:text-sm tw:text-neutral-variant-30 tw:dark:text-neutral-variant-80"
          >
            {{ lastUpdatedText }}
          </p>
        </div>
        <TwLoadingIndicator v-if="isOneAgencyLoading" class="tw:shrink-0" />
      </div>

      <!-- Three Main Action Cards (Main Feature of the Page) -->
      <div class="tw:my-6 tw:grid tw:grid-cols-1 tw:gap-4 tw:md:grid-cols-3">
        <TwHomeActionCard
          :to="localePath(`/regions/${regionSlug}/map`)"
          :title="$t('viewMap')"
          :description="$t('viewMapDesc')"
          :icon="mdiMap"
          :action-text="$t('exploreNow')"
          color="primary"
        />
        <TwHomeActionCard
          :to="localePath(`/regions/${regionSlug}/table`)"
          :title="$t('viewList')"
          :description="$t('viewListDesc')"
          :icon="mdiTable"
          :action-text="$t('exploreNow')"
          color="outlined"
        />
        <TwHomeActionCard
          :to="localePath(`/regions/${regionSlug}/download`)"
          :title="$t('openDownloads')"
          :description="$t('openDownloadsDesc')"
          :icon="mdiDownload"
          :action-text="$t('openDownload')"
          color="outlined"
        />
      </div>

      <!-- Active Agencies Details (Badges & Licenses merged) OR Empty State -->
      <TwDetails
        v-if="activeAgencies.length"
        class="tw:rounded-xl tw:border tw:border-neutral-variant-50/20 tw:bg-neutral-variant-90/40 tw:p-4 tw:dark:bg-neutral-variant-30/40"
      >
        <template #summary>
          <div class="tw:flex tw:flex-wrap tw:items-center tw:gap-2">
            <span
              class="tw:text-base tw:font-medium tw:text-neutral-10 tw:dark:text-neutral-90"
            >
              {{
                $tc(
                  'visibleAgencies',
                  missingAgenciesCount > 0
                    ? 0
                    : Math.min(activeAgencies.length, 2),
                  {
                    visible: activeAgencies.length,
                    total: allRegionAgencies.length,
                  },
                )
              }}
              {{ $tc('missingAgencies', missingAgenciesCount) }}
            </span>
            <TwOutlinedIconButton
              class="tw:h-8! tw:w-8! tw:p-1"
              :title="$t('manageAgencies')"
              @click.native="openSettings()"
            >
              <TwIcon :path="mdiTune" class="tw:h-4! tw:w-4!" />
            </TwOutlinedIconButton>
          </div>
        </template>

        <div class="tw:pt-4">
          <p
            class="tw:mb-3 tw:text-xs tw:text-neutral-variant-30 tw:dark:text-neutral-variant-80"
          >
            {{ $t('creditsBody') }}
          </p>

          <!-- Merged Agency Badges and Licenses -->
          <ul
            class="tw:grid tw:list-none tw:grid-cols-1 tw:gap-3 tw:pl-0! tw:sm:grid-cols-2 tw:lg:grid-cols-3 tw:xl:grid-cols-4"
          >
            <TwHomeAgencyBadge
              v-for="agency in activeAgencies"
              :key="agency.slug"
              :agency="agency"
              :timestamp="times[agency.slug] || 0"
            />
          </ul>
        </div>
      </TwDetails>

      <!-- Empty state -->
      <div
        v-else
        class="tw:relative tw:overflow-hidden tw:rounded-xl tw:bg-secondary-90 tw:p-6 tw:text-secondary-10 tw:dark:bg-secondary-30 tw:dark:text-secondary-90"
      >
        <TwIcon
          class="tw:absolute tw:bottom-2 tw:right-2 tw:hidden tw:size-48! tw:text-secondary-10/25 tw:md:block tw:dark:text-secondary-90/25"
          :path="mdiBusMultiple"
        />
        <p class="tw:max-w-prose tw:text-3xl tw:font-bold tw:leading-tight">
          {{ $t('emptyTitle', { region: region.name }) }}
        </p>
        <p class="tw:mt-3 tw:max-w-2xl">
          {{ $tc('emptyDescription', allRegionAgencies.length) }}
        </p>
        <TwFilledButton
          with-icon
          class="tw:mt-4"
          color="secondary"
          @click="makeAllVisible"
        >
          <TwIcon :path="mdiPlus" />
          {{ $t('addAllAgencies') }}
        </TwFilledButton>
      </div>

      <!-- Change region -->
      <section class="tw:mt-8">
        <h2 class="tw:font-heading tw:text-xl tw:font-medium tw:md:text-2xl">
          {{ $t('changeRegionTitle') }}
        </h2>
        <p
          class="tw:text-sm tw:text-neutral-variant-30 tw:dark:text-neutral-variant-80"
        >
          {{ $t('changeRegionSubtitle') }}
        </p>
        <TwRegionGrid
          :regions="regions"
          :current-region="regionSlug"
          hide-current-region
          size="sm"
        />
      </section>

      <!-- Photo Contribution (Subtle and less prominent) -->
      <div
        class="tw:mt-6 tw:flex tw:flex-col tw:gap-2 tw:rounded-xl tw:border tw:border-neutral-variant-50/30 tw:bg-neutral-variant-90/20 tw:p-3 tw:text-xs tw:text-neutral-variant-30 tw:sm:flex-row tw:sm:items-center tw:sm:justify-between tw:dark:bg-neutral-variant-30/15 tw:dark:text-neutral-variant-80"
      >
        <div class="tw:flex tw:items-center tw:gap-2.5">
          <TwIcon
            :path="mdiCameraOutline"
            class="tw:h-4! tw:w-4! tw:shrink-0 tw:text-neutral-variant-30 tw:dark:text-neutral-variant-80"
          />
          <span>
            <b
              class="tw:font-medium tw:text-neutral-10 tw:dark:text-neutral-90"
            >
              {{ $t('photoTitle') }}
            </b>
            &mdash;
            {{ $t('photoBodyShort') }}
          </span>
        </div>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSecgmVPlQUGiAT4dXu4yv6i0UKtSpJfEFw_98lvoT-hqnVbSQ/viewform?usp=sf_link"
          target="_blank"
          rel="noopener noreferrer"
          class="tw:shrink-0 tw:font-medium tw:text-primary-40 tw:hover:underline tw:dark:text-primary-80"
        >
          {{ $t('photoLink') }} &rarr;
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div class="tw:grow"></div>
    <div
      class="tw:container tw:mx-auto tw:flex tw:flex-wrap tw:items-center tw:gap-x-1 tw:p-4 tw:leading-6 tw:tracking-wide"
    >
      <b class="tw:font-medium tw:text-primary-20 tw:dark:text-primary-90">
        Transit&nbsp;Tracker
        <span class="tw:text-black tw:dark:text-white">{{ version }}</span>
      </b>
      <span class="tw:hidden tw:grow tw:md:inline">
        &bull; {{ $t('brandSlogan') }}
      </span>
      <span class="tw:block tw:md:hidden">{{ $t('brandSlogan') }}</span>
      <a
        href="https://api.transittracker.ca"
        target="_blank"
        class="tw:text-primary-40 tw:no-underline tw:hover:text-primary-30 tw:hover:underline tw:dark:text-primary-80 tw:dark:hover:text-primary-90"
      >
        {{ $t('forDevelopers') }}
      </a>
      &bull;
      <a
        href="https://api.transittracker.ca/vin"
        target="_blank"
        class="tw:text-primary-40 tw:no-underline tw:hover:text-primary-30 tw:hover:underline tw:dark:text-primary-80 tw:dark:hover:text-primary-90"
      >
        {{ $t('exoVin') }}
      </a>
      &bull;
      <a
        href="https://github.com/TransitTracker"
        target="_blank"
        class="tw:text-primary-40 tw:no-underline tw:hover:text-primary-30 tw:hover:underline tw:dark:text-primary-80 tw:dark:hover:text-primary-90"
      >
        {{ $t('github') }}
      </a>
    </div>
  </div>
</template>

<script>
import {
  mdiCameraOutline,
  mdiMap,
  mdiTable,
  mdiDownload,
  mdiTune,
  mdiPlus,
  mdiBusMultiple,
} from '@mdi/js'

export default {
  middleware: 'loadData',
  asyncData({ params }) {
    return {
      regionSlug: params.region,
      backendHost: process.env.backendHost,
      mdiCameraOutline,
      mdiMap,
      mdiTable,
      mdiDownload,
      mdiTune,
      mdiPlus,
      mdiBusMultiple,
    }
  },
  data: () => ({
    currentTime: Math.floor(Date.now() / 1000),
    timer: null,
  }),
  head() {
    return {
      title: this.region.name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.region.metaDescription,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.region.name,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.region.metaDescription,
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          // eslint-disable-next-line prettier/prettier
          content: `${process.env.imageKit}/tr:n-o_tw_${
            this.$i18n.locale
          }:n-t_tw,ot-${
            this.$i18n.locale === 'en' ? 'Discover' : 'D%C3%A9couvrez'
          }%20${this.region.name}/${this.region.image || 'default.jpg'}`,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.region.name,
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.region.metaDescription,
        },
        {
          hid: 'og:image',
          name: 'og:image',
          // eslint-disable-next-line prettier/prettier
          content: `${process.env.imageKit}/tr:n-o_fb_${
            this.$i18n.locale
          }:n-t_fb,ot-${
            this.$i18n.locale === 'en' ? 'Discover' : 'D%C3%A9couvrez'
          }%20${this.region.name}/${this.region.image || 'default.jpg'}`,
        },
      ],
    }
  },
  computed: {
    activeAgencies() {
      const hiddenAgencies = this.$store.state.settings.hiddenAgencies

      return Object.values(this.$store.state.agencies.data).filter(
        ({ slug, regions, isArchived }) => {
          if (regions.includes('*')) {
            return true
          }

          if (isArchived) return false

          return (
            !hiddenAgencies.includes(slug) && regions.includes(this.regionSlug)
          )
        },
      )
    },
    allRegionAgencies() {
      return Object.values(this.$store.state.agencies.data).filter(
        ({ regions, isArchived }) => {
          if (regions.includes('*')) return true
          if (isArchived) return false
          return regions.includes(this.regionSlug)
        },
      )
    },
    missingAgenciesCount() {
      return Math.max(
        0,
        this.allRegionAgencies.length - this.activeAgencies.length,
      )
    },
    regions() {
      return Object.values(this.$store.state.regions.data)
    },
    isOneAgencyLoading() {
      return this.activeAgencies.some(
        ({ slug }) => !(slug in this.vehicleCounts),
      )
    },
    region() {
      return (
        this.$store.state.regions.data[this.regionSlug] || {
          agencies: [],
        }
      )
    },
    vehicleCounts() {
      return this.$store.getters['vehicles/counts']
    },
    version() {
      return process.env.version
    },
    totalCount() {
      let total = 0
      this.activeAgencies.forEach((agency) => {
        total += this.vehicleCounts[agency.slug] || 0
      })
      return total
    },
    times() {
      return this.$store.state.agencies.times
    },
    lastUpdatedText() {
      if (!this.activeAgencies.length) return ''

      const loadedTimes = this.activeAgencies
        .map(({ slug }) => this.times[slug])
        .filter((timestamp) => typeof timestamp === 'number' && timestamp > 0)

      if (!loadedTimes.length) return ''

      const now = this.currentTime
      const minutesAgo = loadedTimes.map((timestamp) =>
        Math.max(0, Math.floor((now - timestamp) / 60)),
      )

      const minMinutes = Math.min(...minutesAgo)
      const maxMinutes = Math.max(...minutesAgo)

      if (maxMinutes === 0) {
        return this.$t('dataUpdatedJustNow')
      }

      if (minMinutes === maxMinutes) {
        return this.$tc('dataUpdatedMinutesAgo', minMinutes, {
          count: minMinutes,
        })
      }

      return this.$t('dataUpdatedRange', {
        min: minMinutes,
        max: maxMinutes,
      })
    },
  },
  mounted() {
    this.timer = setInterval(() => {
      this.currentTime = Math.floor(Date.now() / 1000)
    }, 10000)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  methods: {
    makeAllVisible() {
      this.$store.dispatch(
        'settings/makeAllAgenciesVisible',
        this.allRegionAgencies.map((agency) => agency.slug),
      )
    },
    openSettings() {
      this.$store.commit('app/set', {
        key: 'settingsView',
        value: 'hiddenAgencies',
      })
    },
  },
}
</script>

<i18n>
{
  "en": {
    "vehicleTotal": "No vehicle | 1 vehicle is active | {n} vehicles are active",
    "dataUpdatedJustNow": "Data updated just now",
    "dataUpdatedMinutesAgo": "Data updated 1 min ago | Data updated {count} min ago",
    "dataUpdatedRange": "Data updated {min}-{max} min ago",
    "photoCreditsTitle": "Photo credits",
    "viewMap": "Map",
    "viewMapDesc": "Explore all active vehicles on a real-time interactive map",
    "viewList": "List",
    "viewListDesc": "Browse, filter and view details for all active vehicles",
    "openDownloads": "Downloads",
    "openDownloadsDesc": "Download current live data or full historical recordings",
    "exploreNow": "Open",
    "openDownload": "Download",
    "visibleAgencies": "{visible} of {total} agencies visible | The agency is visible | All {total} agencies are visible",
    "missingAgencies": " | ({n} missing)",
    "manageAgencies": "Manage visible agencies",
    "creditsBody": "For each agency, all intellectual property rights relating to the data belong to them. Respective data licenses:",
    "emptyTitle": "Welcome here!",
    "emptyDescription": "All agencies in this region are currently hidden. To get the most out of Transit Tracker, we recommend showing the {n} available agencies. You can easily hide them again anytime in your settings.",
    "addAllAgencies": "Show All Agencies",
    "changeRegionTitle": "Explore other regions",
    "changeRegionSubtitle": "Discover transit networks across Canadian cities and regions.",
    "photoTitle": "Photos are welcome!",
    "photoBodyShort": "Submit a photo representing transit in your area to be featured here.",
    "photoLink": "Submit a photo",
    "brandSlogan": "Making real time transit data accessible",
    "forDevelopers": "For Developers",
    "exoVin": "exo VIN Project",
    "github": "On GitHub"
  },
  "fr": {
    "vehicleTotal": "Aucun véhicule | 1 véhicule est actif | {n} véhicules sont actifs",
    "dataUpdatedJustNow": "Données mises à jour à l'instant",
    "dataUpdatedMinutesAgo": "Données mises à jour il y a 1 min | Données mises à jour il y a {count} min",
    "dataUpdatedRange": "Données mises à jour il y a {min}-{max} min",
    "photoCreditsTitle": "Crédits photo",
    "viewMap": "Carte",
    "viewMapDesc": "Explorez tous les véhicules actifs sur une carte interactive en temps réel",
    "viewList": "Liste",
    "viewListDesc": "Consultez, filtrez et affichez les détails de tous les véhicules actifs",
    "openDownloads": "Données",
    "openDownloadsDesc": "Téléchargez un instantané en direct ou les archives complètes",
    "exploreNow": "Ouvrir",
    "openDownload": "Télécharger",
    "visibleAgencies": "{visible} sur {total} agences visibles | L'agence est visible | Toutes les {visible} agences sont visibles",
    "missingAgencies": " | ({n} manquante) | ({n} manquantes)",
    "manageAgencies": "Gérer les agences visibles",
    "creditsBody": "Pour chaque agence, tous les droits de propriété intellectuelle relatifs aux données leur appartiennent. Licences respectives des données :",
    "emptyTitle": "Bienvenue ici !",
    "emptyDescription": "Toutes les agences de cette région sont actuellement masquées. Pour profiter pleinement de Transit Tracker, nous vous recommandons d'afficher les {n} agences disponibles. Vous pourrez facilement les masquer à tout moment dans vos paramètres.",
    "addAllAgencies": "Afficher toutes les agences",
    "changeRegionTitle": "Explorer d'autres régions",
    "changeRegionSubtitle": "Découvrez les réseaux de transport en commun dans d'autres villes et régions canadiennes.",
    "photoTitle": "Les photos sont les bienvenues !",
    "photoBodyShort": "Proposez une photo de transport en commun dans votre région pour l'afficher ici.",
    "photoLink": "Proposer une photo",
    "brandSlogan": "Rendre accessibles les données de transport en temps réel",
    "forDevelopers": "Site pour les développeurs",
    "exoVin": "Projet exo VIN",
    "github": "Sur GitHub"
  }
}
</i18n>
