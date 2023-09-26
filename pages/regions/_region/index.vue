<template>
  <div
    class="tw-flex tw-min-h-screen tw-flex-col tw-bg-neutral-99 dark:tw-bg-neutral-10"
  >
    <div
      class="tw-full tw-relative tw-flex tw-h-80 tw-flex-col tw-justify-between tw-bg-cover tw-bg-center tw-bg-no-repeat after:tw-absolute after:tw-inset-0 after:tw-h-full after:tw-w-full after:tw-bg-gradient-to-t after:tw-from-primary-20 after:tw-to-transparent"
      :style="{
        backgroundImage: `url(${backendHost}/storage/content/regions/${region.image})`,
      }"
    >
      <div
        class="tw-h-[4.5rem] tw-bg-neutral-99/75 tw-text-neutral-10 tw-backdrop-blur-md dark:tw-bg-neutral-10/75 dark:tw-text-neutral-90"
      >
        <div
          class="tw-container tw-mx-auto tw-flex tw-h-full tw-items-center tw-justify-between tw-px-4"
        >
          <p class="!tw-mb-0">
            {{ $t('welcome') }} <b>Transit&nbsp;Tracker</b>
          </p>
          <small class="tw-mb-0">
            {{ $t('version', { version }) }}
          </small>
        </div>
      </div>
      <div
        class="tw-absolute tw-inset-0 tw-flex tw-h-full tw-w-full tw-items-end tw-bg-gradient-to-t tw-from-primary-20 tw-to-transparent"
      >
        <div
          class="tw-container tw-mx-auto tw-flex tw-w-full tw-items-center tw-justify-between tw-px-4"
        >
          <h1
            class="leading-[2.75rem] md:leading-[4rem] tw-font-heading tw-text-4xl tw-text-white md:tw-text-6xl"
          >
            {{ region.name }}
          </h1>
          <TwFilledButton
            color="tonal"
            class="tw-hidden md:tw-flex"
            with-icon
            @click="open('RegionSwitcher')"
          >
            <TwIcon :path="mdiCity" />
            {{ $t('changeRegion') }}
          </TwFilledButton>
        </div>
      </div>
    </div>
    <div class="tw-container tw-mx-auto tw-p-4">
      <div class="tw-flex tw-items-center tw-gap-x-2">
        <h2 class="text-[2rem] tw-font-medium tw-leading-10">
          {{ $tc('vehicleTotal', totalCount) }}
        </h2>
        <div class="tw-grow"></div>
        <small
          class="tw-hidden tw-text-2xs tw-font-medium tw-leading-4 tw-tracking-wide md:tw-block"
        >
          {{ $t('manageAgenciesTrick') }}
        </small>
        <TwOutlinedIconButton
          class="tw-float-right"
          :title="$t('manageAgencies')"
          @click="open('SettingsDrawer')"
        >
          <TwIcon :path="mdiTune" />
        </TwOutlinedIconButton>
      </div>
      <ul
        v-if="activeAgencies.length"
        class="tw-mt-4 tw-grid tw-list-none tw-grid-cols-2 tw-gap-2 !tw-pl-0 md:tw-grid-cols-3 md:tw-gap-4 xl:tw-grid-cols-4"
      >
        <TwHomeAgencyBadge
          v-for="agency in activeAgencies"
          :key="agency.slug"
          :agency="agency"
          :timestamp="times[agency.slug] || 0"
        />
      </ul>
      <div
        v-else
        class="tw-relative -tw-mx-4 tw-mt-4 tw-space-y-4 tw-bg-secondary-90 tw-p-4 tw-text-center tw-text-secondary-10 dark:tw-bg-secondary-30 dark:tw-text-secondary-90 md:tw-mx-0 md:tw-rounded-xl md:tw-text-left"
      >
        <!-- TODO come back icon! -->
        <!-- <TwIcon
          class="tw-absolute -tw-right-4 -tw-bottom-4 !tw-h-64 !tw-w-64 tw-bg-opacity-50"
          :path="mdiBusMultiple"
        /> -->
        <p class="tw-mb-0 tw-text-4xl tw-font-bold tw-leading-[2.75rem]">
          {{ $t('emptyTitle', { region: region.name }) }}
        </p>
        <p class="tw-mb-0 tw-leading-6 tw-tracking-wide">
          {{ $tc('emptyDescription', region.agencies.length) }}
        </p>
        <TwFilledButton
          with-icon
          class="tw-mx-auto md:tw-mx-0"
          color="secondary"
          @click="addAll"
        >
          <TwIcon :path="mdiPlus" />
          {{ $t('addAllAgencies') }}
        </TwFilledButton>
      </div>
    </div>
    <div
      class="md:tw-container md:tw-mx-auto md:tw-mt-8 md:tw-grid md:tw-grid-cols-2 md:tw-flex-wrap md:tw-items-start md:tw-gap-4 md:tw-px-4 lg:tw-flex lg:tw-flex-nowrap lg:tw-justify-center"
    >
      <!--
      <div
        class="tw-bg-primary-90 tw-p-4 tw-text-primary-10 dark:tw-bg-primary-30 dark:tw-text-primary-90 md:tw-rounded-xl"
      >
        <h2 class="text-[2rem] tw-font-medium tw-leading-10">
          Vos véhicules favoris
        </h2>
        <p class="tw-leading-6 tw-tracking-wide">
          Suivez vos préférés juste ici.
        </p>
      </div>
      -->
      <details
        class="tw-bg-neutralVariant-90 tw-p-4 tw-leading-6 tw-tracking-wide tw-text-neutralVariant-30 dark:tw-bg-neutralVariant-30 dark:tw-text-neutral-80 md:tw-order-3 md:tw-col-span-full md:tw-min-w-[18rem] md:tw-basis-1/3 md:tw-rounded-xl"
        :open="creditsOpen"
      >
        <summary class="tw-list-none">
          <h2
            class="text-[2rem] tw-font-medium tw-leading-10 tw-tracking-normal"
          >
            {{ $t('creditsTitle') }}
            <TwStandardIconButton
              :class="{ 'tw-rotate-180': creditsOpen }"
              class="tw-float-right tw-transition-transform tw-duration-200 tw-ease-linear"
              @click="creditsOpen = !creditsOpen"
            >
              <TwIcon :path="mdiChevronDown" />
            </TwStandardIconButton>
          </h2>
        </summary>
        <p class="mt-4" v-html="region.credits"></p>
        <p>{{ $t('creditsBody') }}</p>
        <ul>
          <li v-for="agency in activeAgencies" :key="agency.slug">
            {{ agency.name }}<br />
            <a target="_blank" :href="agency.license.url">
              {{ agency.license.title }}
            </a>
          </li>
        </ul>
      </details>
      <div
        class="tw-p-4 tw-leading-6 tw-tracking-wide dark:tw-border-neutralVariant-60 md:tw-order-2 md:tw-min-w-[18rem] md:tw-basis-1/3 md:tw-rounded-xl md:tw-border md:tw-border-solid md:tw-border-neutralVariant-50"
      >
        <h2 class="text-[2rem] tw-font-medium tw-leading-10 tw-tracking-normal">
          {{ $t('downloadTitle') }}
        </h2>
        <p class="tw-mt-4">
          {{ $t('downloadBody') }}
        </p>
        <TwTextButton
          with-icon
          class="-tw-ml-4"
          @click="open('DownloadAssistant')"
        >
          <TwIcon :path="mdiDownload" />
          {{ $t('openDownload') }}
        </TwTextButton>
      </div>
      <div
        class="tw-relative tw-bg-primary-90 tw-p-4 tw-leading-6 tw-tracking-wide tw-text-primary-10 dark:tw-bg-primary-30 dark:tw-text-primary-90 md:tw-order-1 md:tw-min-w-[18rem] md:tw-basis-1/3 md:tw-rounded-xl"
      >
        <h2 class="text-[2rem] tw-font-medium tw-leading-10 tw-tracking-normal">
          {{ $t('photoTitle') }}
        </h2>
        <p class="tw-mt-4">
          {{ $t('photoBody') }}
        </p>
        <TwTextButton
          class="-tw-ml-3 tw-text-primary-10 dark:tw-text-primary-95"
          href="https://docs.google.com/forms/d/e/1FAIpQLSecgmVPlQUGiAT4dXu4yv6i0UKtSpJfEFw_98lvoT-hqnVbSQ/viewform?usp=sf_link"
          tag="a"
          target="_blank"
        >
          {{ $t('photoLink') }}
        </TwTextButton>
        <TwIcon
          :path="mdiCameraOutline"
          class="tw-absolute tw-bottom-4 tw-right-4 !tw-h-8 !tw-w-8 tw-text-primary-40 dark:tw-text-primary-80 lg:tw-h-10 lg:tw-w-10 xl:tw-h-12 xl:tw-w-12"
        />
      </div>
    </div>
    <div class="tw-grow"></div>
    <div
      class="tw-container tw-mx-auto tw-flex tw-flex-wrap tw-items-center tw-gap-x-1 tw-p-4 tw-leading-6 tw-tracking-wide"
    >
      <b class="tw-font-medium tw-text-primary-20 dark:tw-text-primary-90">
        Transit&nbsp;Tracker
      </b>
      <span class="tw-hidden tw-grow md:tw-inline">
        &bull; {{ $t('brandSlogan') }}
      </span>
      <span class="tw-block md:tw-hidden"> {{ $t('brandSlogan') }}</span>
      <a
        href="https://api.transittracker.ca"
        target="_blank"
        class="tw-text-primary-40 tw-no-underline hover:tw-text-primary-30 hover:tw-underline dark:tw-text-primary-80 dark:hover:tw-text-primary-90"
      >
        {{ $t('forDevelopers') }} </a
      >&bull;
      <a
        href="https://api.transittracker.ca/vin"
        target="_blank"
        class="tw-text-primary-40 tw-no-underline hover:tw-text-primary-30 hover:tw-underline dark:tw-text-primary-80 dark:hover:tw-text-primary-90"
      >
        {{ $t('exoVin') }} </a
      >&bull;
      <a
        href="https://github.com/TransitTracker"
        target="_blank"
        class="tw-text-primary-40 tw-no-underline hover:tw-text-primary-30 hover:tw-underline dark:tw-text-primary-80 dark:hover:tw-text-primary-90"
      >
        {{ $t('github') }}
      </a>
    </div>
  </div>
</template>

<script>
import {
  mdiCity,
  mdiTune,
  mdiBusMultiple,
  mdiPlus,
  mdiChevronDown,
  mdiDownload,
  mdiCameraOutline,
} from '@mdi/js'

export default {
  middleware: 'loadData',
  asyncData({ params }) {
    return {
      regionSlug: params.region,
      creditsOpen: false,
      mdiCity,
      mdiTune,
      mdiBusMultiple,
      mdiPlus,
      mdiChevronDown,
      mdiDownload,
      mdiCameraOutline,
      backendHost: process.env.backendHost,
    }
  },
  data: () => ({
    changelogDialog: false,
    downloadDialog: false,
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
      const activeAgencies = this.$store.state.settings.activeAgencies

      return Object.values(this.$store.state.agencies.data)
        .filter(({ slug, regions }) => {
          if (regions.includes('*')) {
            return true
          }
          return (
            activeAgencies.includes(slug) && regions.includes(this.regionSlug)
          )
        })
        .sort((x, y) => {
          return x.isArchived - y.isArchived
        })
    },
    availableAgencies() {
      return this.$store.state.agencies.data
    },
    darkMode() {
      return this.$vuetify.theme.dark
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
      Object.values(this.vehicleCounts).forEach((count) => {
        total += count
      })
      return total
    },
    times() {
      return this.$store.state.agencies.times
    },
  },
  methods: {
    addAll() {
      Object.keys(this.availableAgencies)
        .filter((slug) => !this.activeAgencies.includes(slug))
        .forEach((slug) => {
          this.$store.dispatch(
            'settings/toggleAgency',
            this.availableAgencies[slug]
          )
        })
    },
    open(setting) {
      this.$store.commit('app/set', { key: 'open' + setting, value: true })
    },
  },
}
</script>

<i18n>
{
  "en": {
    "welcome": "Welcome to",
    "version": "Version {version}",
    "changeRegion": "Change region",
    "vehicleTotal": "No vehicle | 1 vehicle is active | {n} vehicles are active",
    "manageAgenciesTrick": "Add or remove agencies right here ⟶",
    "manageAgencies": "Add or remove currently visible agencies",
    "emptyTitle": "Welcome here!",
    "emptyDescription": "It looks like you haven't added any agencies for this region yet. To get the full Transit Tracker experience, we recommend adding the {n} available agencies. Don't worry, you can change your available agencies at any time in the settings.",
    "addAllAgencies": "Add all agencies",
    "creditsTitle": "Credits and licenses",
    "creditsBody": "For each agency, all intellectual property rights relating to the data belong to them. Here are the respective licenses for agencies in this region:",
    "downloadTitle": "Download data",
    "downloadBody": "Transit Tracker allows you to download either the data you see on the screen or an archive of all the data recorded by the server.",
    "openDownload": "Open download wizard",
    "photoTitle": "Photos are welcome!",
    "photoBody": "Submit your photo representing public transit in your area! It could be posted on Transit Tracker, at the top of your region's page.",
    "photoLink": "Submit a photo",
    "brandSlogan": "Making real time transit data accessible",
    "forDevelopers": "For Developers",
    "exoVin": "exo VIN Project",
    "github": "On GitHub"
  },
  "fr": {
    "welcome": "Bienvenue sur",
    "version": "Version {version}",
    "changeRegion": "Changer de région",
    "vehicleTotal": "Aucun véhicule | 1 véhicule est actif | {n} véhicules sont actifs",
    "manageAgenciesTrick": "Ajouter ou retirer des agences juste ici ⟶",
    "manageAgencies": "Ajouter ou retirer les agences présentement visible",
    "emptyTitle": "Bienvenue ici!",
    "emptyDescription": "Il semble que vous n'avez pas encore ajouté d'agences pour cette région. Pour vivre l'expérience complète de Transit Tracker, nous vous recommandons d'ajouter les {n} agences disponibles. Pas de panique, vous pouvez changer vos agences disponibles en tout temps dans les paramètres.",
    "addAllAgencies": "Ajouter toutes les agences",
    "creditsTitle": "Crédits et licences",
    "creditsBody": "Pour chaque agence, tous les droits de propriété intellectuelle relatifs aux données leur appartiennent. Voici les licenses respectivent pour les agences de cette région :",
    "downloadTitle": "Télécharger des données",
    "downloadBody": "Transit Tracker vous permet de télécharger soit les données que vous voyez à l'écran, soit une archive de toutes les données enregistrées par le serveur. ",
    "openDownload": "Ouvrir l'assistant de téléchargement",
    "photoTitle": "Les photos sont les bienvenues !",
    "photoBody": "Proposez votre photo représentant le transport en commun dans votre région! Elle pourrait être affiché sur Transit Tracker, au haut de la page de votre région.",
    "photoLink": "Proposer une photo",
    "brandSlogan": "Rendre accessibles les données de transport en temps réel",
    "forDevelopers": "Site pour les développeurs",
    "exoVin": "Projet exo VIN",
    "github": "Sur GitHub"
  }
}
</i18n>
