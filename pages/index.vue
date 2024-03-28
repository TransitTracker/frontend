<template>
  <div>
    <div
      class="tw-relative tw-flex tw-h-full tw-w-full tw-flex-col md:tw-h-[85vh] md:tw-flex-row"
    >
      <div
        id="tt-landing-map"
        class="tw-relative tw-grow md:tw-order-2 md:tw-w-[55%]"
      >
        <div
          v-if="currentPopup.slug"
          class="tw-absolute tw-bottom-4 tw-left-4 tw-z-[2] tw-min-w-[12rem] tw-rounded-lg tw-bg-neutral-99 tw-px-6 tw-py-4 dark:tw-bg-neutral-12"
        >
          <NuxtLink
            :to="localePath(`/regions/${currentPopup.slug}`)"
            class="tw-group tw-flex tw-items-center tw-font-heading tw-text-lg tw-font-bold tw-leading-7 tw-no-underline md:tw-text-xl"
            :class="[`umami--click--landing-${currentPopup.slug}`]"
          >
            {{ currentPopup.name }}
            <svg
              class="ml-1 tw-h-5 tw-w-5 tw-overflow-hidden"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                class="-tw-translate-x-full tw-transition-transform group-hover:tw-translate-x-0"
                :d="mdiArrowRight"
              />
            </svg>
          </NuxtLink>
          <div class="md:tw-text-lg">
            {{ $tc('landing.agencies', currentPopup.agencies) }}
            <div class="tw-flex tw-items-center tw-gap-3">
              <span class="tw-relative tw-flex tw-h-3 tw-w-3">
                <span
                  class="tw-absolute tw-inline-flex tw-h-full tw-w-full tw-animate-ping tw-rounded-full tw-bg-secondary-50/75"
                ></span>
                <span
                  class="tw-relative tw-inline-flex tw-h-3 tw-w-3 tw-rounded-full tw-bg-secondary-40"
                ></span>
              </span>
              {{ $tc('landing.vehicles', currentPopup.vehicles) }}
            </div>
          </div>
          <div class="tw-flex">
            <TwStandardIconButton
              tag="NuxtLink"
              :to="localePath(`/regions/${currentPopup.slug}/map`)"
              :class="[`umami--click--landing-${currentPopup.slug}-map`]"
              :title="$t('landing.openMap', { region: currentPopup.name })"
            >
              <TwIcon :path="mdiMap" />
            </TwStandardIconButton>
            <TwStandardIconButton
              tag="NuxtLink"
              :to="localePath(`/regions/${currentPopup.slug}/table`)"
              :class="[`umami--click--landing-${currentPopup.slug}-table`]"
              :title="$t('landing.openTable', { region: currentPopup.name })"
            >
              <TwIcon :path="mdiTable" />
            </TwStandardIconButton>
          </div>
        </div>
      </div>
      <div
        class="tw-relative tw-z-[2] tw-flex tw-shrink-0 tw-grow tw-flex-col tw-space-y-8 tw-overflow-hidden tw-bg-primary-90 tw-p-8 tw-text-primary-10 dark:tw-bg-primary-30 dark:tw-text-primary-90 md:tw-order-1 md:tw-mb-0 md:tw-w-[45%] md:tw-justify-center md:tw-pb-0 md:tw-pt-0"
      >
        <!-- eslint-disable vue/no-v-html -->
        <h1
          class="tw-font-heading tw-text-[2rem] tw-font-bold tw-leading-10 md:tw-text-5xl md:tw-leading-[2.75rem]"
          v-html="$t('welcome')"
        ></h1>
        <!-- eslint-enable vue/no-v-html -->
        <TwLandingCities :cities="[]" />
        <div class="tw-flex tw-items-start tw-gap-x-4">
          <h3
            class="tw-relative tw-rounded tw-bg-white tw-p-2 tw-font-heading tw-text-xl tw-font-bold tw-text-primary-40 dark:tw-bg-primary-20 dark:tw-text-primary-80"
          >
            <span
              class="tw-absolute tw-right-0 tw-top-0 -tw-mr-1 -tw-mt-1 tw-flex tw-h-3 tw-w-3"
            >
              <span
                class="tw-absolute tw-inline-flex tw-h-full tw-w-full tw-animate-ping tw-rounded-full tw-bg-secondary-50/75"
              ></span>
              <span
                class="tw-relative tw-inline-flex tw-h-3 tw-w-3 tw-rounded-full tw-bg-secondary-40"
              ></span>
            </span>
            {{ totalVehicles }} <br />
            <small
              class="tw-text-md tw-font-medium tw-text-primary-10 dark:tw-text-primary-90"
            >
              {{ $t('vehicles') }}
              <span class="tw-sr-only">{{ $t('atThisTime') }}</span>
            </small>
          </h3>
          <h3
            class="tw-rounded tw-bg-white tw-p-2 tw-font-heading tw-text-xl tw-font-bold tw-text-primary-40 dark:tw-bg-primary-20 dark:tw-text-primary-80"
          >
            {{ totalAgencies }} <br />
            <small
              class="tw-text-md tw-font-medium tw-text-primary-10 dark:tw-text-primary-90"
            >
              {{ $t('agencies') }}
            </small>
          </h3>
          <h3
            class="tw-rounded tw-bg-white tw-p-2 tw-font-heading tw-text-xl tw-font-bold tw-text-primary-40 dark:tw-bg-primary-20 dark:tw-text-primary-80"
          >
            13904 <br />
            <small
              class="tw-text-md tw-font-medium tw-text-primary-10 dark:tw-text-primary-90"
            >
              {{ $t('vehiclesSince') }}
            </small>
          </h3>
        </div>
        <div>
          <p class="!tw-mb-1 tw-flex tw-items-end tw-gap-x-2 tw-leading-8">
            {{ $t('exploreYourself') }}
            <TwIcon :path="mdiArrowDownRight" />
          </p>
          <div class="tw-flex tw-flex-wrap tw-gap-2">
            <TwSuggestionChip
              v-for="feature in regionsFeatures.features"
              :key="feature.properties.slug"
              tag="NuxtLink"
              :to="localePath(`/regions/${feature.properties.slug}`)"
              class="!tw-no-underline"
            >
              {{ feature.properties.name }}
            </TwSuggestionChip>
          </div>
        </div>
      </div>
      <div
        class="tw-pointer-events-none tw-absolute tw-inset-0 tw-z-[1] tw-bg-gradient-100 tw-from-primary-90 tw-from-50% tw-to-transparent tw-to-70% dark:tw-from-primary-30"
      ></div>
    </div>
    <section
      class="tw-w-full tw-bg-neutral-99 tw-text-neutral-10 dark:tw-bg-neutral-10 dark:tw-text-neutral-90"
    >
      <div class="tw-container tw-mx-auto tw-p-8">
        <h3 class="tw-font-heading tw-text-xl tw-font-bold md:tw-text-3xl">
          {{ $t('screens.headline') }}
        </h3>
        <p
          class="!tw-mb-0 tw-mt-1 tw-max-w-prose md:tw-text-lg"
          v-html="$t('screens.headline')"
        />
        <div
          class="tw-mt-8 tw-flex tw-flex-col tw-items-center tw-gap-x-8 md:tw-flex-row"
        >
          <div class="tw-flex md:tw-w-2/3">
            <div
              class="tw-w-full tw-items-center tw-justify-start tw-shadow-xl"
            >
              <div
                class="tw-flex tw-h-4 tw-w-full tw-items-center tw-justify-end tw-gap-2 tw-rounded-t-lg tw-bg-neutralVariant-90 tw-px-2"
              >
                <div
                  class="tw-h-2 tw-w-2 tw-rounded-full tw-bg-neutralVariant-30"
                ></div>
                <div
                  class="tw-h-2 tw-w-2 tw-rounded-full tw-bg-neutralVariant-30"
                ></div>
                <div
                  class="tw-h-2 tw-w-2 tw-rounded-full tw-bg-neutralVariant-30"
                ></div>
              </div>
              <img
                src="https://i.imgur.com/BH01Fpz.png"
                alt=""
                class="tw-aspect-video tw-w-full tw-rounded-b-lg"
              />
            </div>
          </div>
          <div
            class="tw-space-y-4 md:tw-w-1/3"
            role="tablist"
            aria-orientation="vertical"
          >
            <div
              class="tw-cursor-pointer tw-space-y-2 tw-rounded-2xl tw-px-4 tw-py-2 tw-transition-colors tw-duration-200 tw-ease-emphasized md:tw-px-8 md:tw-py-6"
              :class="[
                activeTab === 'map'
                  ? 'tw-bg-primary-40 tw-text-white dark:tw-bg-primary-80 dark:tw-text-primary-10'
                  : 'hover:tw-bg-primary-90 hover:dark:tw-bg-primary-30',
              ]"
              @click="activeTab = 'map'"
            >
              <div class="tw-flex tw-items-center tw-gap-4">
                <TwIcon :path="mdiMap" class="!tw-h-12 !tw-w-12" />
                <h4 class="md:tw-text-lg">{{ $t('screens.map') }}</h4>
              </div>
              <p class="!tw-mb-0 tw-text-sm md:tw-text-base">
                {{ $t('screens.mapDesc') }}
              </p>
            </div>
            <div
              class="tw-cursor-pointer tw-space-y-2 tw-rounded-2xl tw-px-4 tw-py-2 tw-transition-colors tw-duration-200 tw-ease-emphasized md:tw-px-8 md:tw-py-6"
              :class="[
                activeTab === 'table'
                  ? 'tw-bg-primary-40 tw-text-white dark:tw-bg-primary-80 dark:tw-text-primary-10'
                  : 'hover:tw-bg-primary-90 hover:dark:tw-bg-primary-30',
              ]"
              @click="activeTab = 'table'"
            >
              <div class="tw-flex tw-items-center tw-gap-4">
                <TwIcon :path="mdiTable" class="!tw-h-12 !tw-w-12" />
                <h4 class="md:tw-text-lg">{{ $t('screens.table') }}</h4>
              </div>
              <p class="!tw-mb-0 tw-text-sm md:tw-text-base">
                {{ $t('screens.tableDesc') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section
      class="tw-w-full tw-bg-neutral-99 tw-pt-8 tw-text-neutral-10 dark:tw-bg-neutral-10 dark:tw-text-neutral-90"
    >
      <div class="tw-container tw-mx-auto tw-p-8">
        <h3
          class="tw-text-center tw-font-heading tw-text-xl tw-font-bold md:tw-text-3xl"
        >
          {{ $t('features.headline') }}
        </h3>
        <p class="tw-mt-1 tw-text-center md:tw-text-lg">
          {{ $t('features.subhead') }}
        </p>
        <div
          class="tw-mt-4 tw-grid tw-gap-x-4 tw-gap-y-8 md:tw-grid-cols-2 lg:tw-grid-cols-4"
        >
          <TwLandingFeature
            :icon="mdiBell"
            :title="$t('features.1t')"
            :description="$t('features.1d')"
            :note="$t('features.1n')"
          />
          <TwLandingFeature
            :icon="mdiDownload"
            :title="$t('features.2t')"
            :description="$t('features.2d')"
            :note="$t('features.2n')"
          />
          <TwLandingFeature
            :icon="mdiTimeline"
            :title="$t('features.3t')"
            :description="$t('features.3d')"
            :note="$t('features.3n')"
          />
          <TwLandingFeature
            :icon="mdiOpenInNew"
            :title="$t('features.4t')"
            :description="$t('features.4d')"
            :note="$t('features.4n')"
          />
          <TwLandingFeature
            :icon="mdiFilter"
            :title="$t('features.5t')"
            :description="$t('features.5d')"
            :note="$t('features.5n')"
          />
          <TwLandingFeature
            :icon="mdiSync"
            :title="$t('features.6t')"
            :description="$t('features.6d')"
          />
          <TwLandingFeature
            :icon="mdiWrench"
            :title="$t('features.7t')"
            :description="$t('features.7d')"
          />
        </div>
      </div>
    </section>
    <section class="tw-relative tw-w-full tw-bg-secondary-40 tw-text-white">
      <div class="tw-container tw-mx-auto tw-px-8 tw-pt-8">
        <h3 class="tw-font-heading tw-text-xl tw-font-bold md:tw-text-3xl">
          {{ $t('ecosystem.headline') }}
        </h3>
        <p class="tw-mt-1 tw-max-w-prose md:tw-text-lg">
          {{ $t('ecosystem.subhead') }}
        </p>
        <div class="tw-grid tw-gap-4 md:tw-grid-cols-3">
          <TwLandingService
            :title="$t('ecosystem.vin')"
            :link="$t('ecosystem.vinHref')"
            :description="$t('ecosystem.vinDesc')"
            link-title="vin.transittracker.ca"
          />
          <!--          <TwLandingService-->
          <!--            title="Transit Performance"-->
          <!--            link="https://performance.transittracker.ca"-->
          <!--            link-title="performance.transittracker.ca"-->
          <!--            description="Comparez les performances des sociétés de transport entre elles. La vitesse commerciale, l'espacement entre les arrêts, la zone de détesserte : plein de données intéressantes pour améliorer nos services de bus!"-->
          <!--          />-->
          <TwLandingService
            :title="$t('ecosystem.api')"
            :link="$t('ecosystem.apiHref')"
            :description="$t('ecosystem.apiDesc')"
            link-title="api.transittracker.ca"
          />
        </div>
      </div>
    </section>
    <section
      class="tw-w-full tw-bg-neutral-99 tw-py-8 tw-text-neutral-10 dark:tw-bg-neutral-10 dark:tw-text-neutral-90"
    >
      <div
        class="tw-container tw-mx-auto tw-flex tw-flex-col tw-items-center tw-gap-8 tw-p-8 md:tw-flex-row"
      >
        <div class="tw-flex tw-gap-x-2">
          <TwIcon
            :path="mdiHeart"
            class="!tw-h-16 !tw-w-16 tw-rotate-12 tw-self-start tw-text-error-40"
          />
          <TwIcon :path="mdiPlus" class="!tw-h-10 !tw-w-10 tw-self-center" />
          <TwIcon
            :path="mdiCodeTags"
            class="!tw-h-16 !tw-w-16 -tw-rotate-6 tw-self-end tw-text-primary-40"
          />
        </div>
        <div>
          <h3 class="tw-font-heading tw-text-xl tw-font-bold md:tw-text-3xl">
            {{ $t('opensource.headline') }}
          </h3>
          <p class="tw-mt-1 md:tw-text-lg">
            {{ $t('opensource.subhead') }}
          </p>
          <TwFilledButton
            with-icon
            tag="a"
            href="https://github.com/TransitTracker"
            target="_blank"
            class="!tw-inline-flex !tw-text-white !tw-no-underline dark:!tw-text-primary-20"
          >
            <TwIcon :path="mdiOpenInNew" />
            {{ $t('opensource.button') }}
          </TwFilledButton>
        </div>
      </div>
    </section>
    <TwFooter />
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import {
  mdiArrowRight,
  mdiArrowDown,
  mdiArrowDownRight,
  mdiMap,
  mdiTable,
  mdiBell,
  mdiDownload,
  mdiTimeline,
  mdiOpenInNew,
  mdiHeart,
  mdiPlus,
  mdiCodeTags,
  mdiSync,
  mdiWrench,
  mdiFilter,
} from '@mdi/js'

export default {
  name: 'Landing',
  middleware: ({ store, redirect }) => {
    // Redirct users if they want to
    if (!store.state.app.firstLoad) return

    store.commit('app/set', { key: 'firstLoad', value: false })

    const launch = store.state.settings.launch

    // If no settings or settings is no, don't redirect
    if (!launch || launch === 'no') return

    return redirect(
      `${store.state.settings.lang === 'fr' ? '/fr' : ''}/regions/${
        store.state.settings.currentRegion
      }${launch}`
    )
  },
  asyncData({ app }) {
    const mapStyle = {
      dark: 'mapbox://styles/felixinx/ckv0dpig31p0516omjnkhbg4m?optimize=true',
      light: 'mapbox://styles/felixinx/cklvgeorj2t4417rtcbtk8lki?optimize=true',
    }
    const mapAccessToken = process.env.mapboxAccessToken

    return {
      mapAccessToken,
      mapStyle,
      mdiArrowRight,
      mdiArrowDown,
      mdiArrowDownRight,
      mdiTable,
      mdiMap,
      mdiBell,
      mdiDownload,
      mdiTimeline,
      mdiOpenInNew,
      mdiHeart,
      mdiPlus,
      mdiCodeTags,
      mdiSync,
      mdiWrench,
      mdiFilter,
    }
  },
  data: () => ({
    regionsFeatures: {
      type: 'FeatureCollection',
      features: [],
    },
    currentPopup: {},
    activeTab: 'map',
    totalVehicles: 0,
    totalAgencies: 0,
    vehiclesFeatures: null,
  }),
  head() {
    return {
      titleTemplate: `Transit Tracker - ${this.$t('landing.seoTitle')}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('landing.seoDescription'),
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.$t('landing.seoTitle'),
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.$t('landing.seoDescription'),
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: `https://transittracker.ca/img/tw-landing-${this.$i18n.locale}.png`,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.$t('landing.seoTitle'),
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.$t('landing.seoDescription'),
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: `https://transittracker.ca/img/og-landing-${this.$i18n.locale}.png`,
        },
      ],
    }
  },
  computed: {
    darkMode() {
      return this.$vuetify.theme.dark
    },
  },
  mounted() {
    setTimeout(() => {
      this.createMap()
    }, 10)

    const cities = []

    this.regionsFeatures.features.forEach((feature) => {
      cities.push(...feature.properties.cities)
    })

    // Randomize array
    for (let i = cities.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i)
      const temp = cities[i]
      cities[i] = cities[j]
      cities[j] = temp
    }

    cities.push(this.$t('landing.introCities'))

    const delayLoop = (fn, delay) => {
      return (x, i) => {
        setTimeout(() => {
          fn(x)
        }, i * delay)
      }
    }

    cities.forEach(delayLoop(this.changeCity, 3875))
  },
  methods: {
    async loadData() {
      let totalVehicles = 0
      let totalAgencies = 0

      const regionsFeatures = (await this.$axios.get('/landing')).data

      regionsFeatures.features.forEach(({ properties }) => {
        totalAgencies += properties.agencies
        totalVehicles += properties.vehicles
      })

      this.totalVehicles = totalVehicles
      this.totalAgencies = totalAgencies

      this.loadRegionsOnMap(regionsFeatures)

      const vehiclesFeatures = (await this.$axios.get('/landing/vehicles')).data
      this.loadVehiclesOnMap(vehiclesFeatures)
    },
    loadRegionsOnMap(features) {
      this.map.addSource('regions-s', {
        type: 'geojson',
        data: features,
      })
      this.map.addLayer({
        id: 'regions-l',
        type: 'circle',
        source: 'regions-s',
        paint: {
          'circle-radius': ['get', 'range'],
          'circle-stroke-color': this.darkMode ? '#009a8d' : '#006a61',
          'circle-stroke-width': ['get', 'range'],
          'circle-color': this.darkMode ? '#006a61' : '#73f8e7',
        },
      })

      this.map.on('click', 'regions-l', ({ features }) => {
        this.currentPopup = features[0].properties
        this.map.flyTo({
          center: features[0].geometry.coordinates,
          zoom: 8,
        })
      })

      this.map.on('mouseenter', 'regions-l', (e) => {
        this.map.getCanvas().style.cursor = 'pointer'
      })
      this.map.on('mouseleave', 'regions-l', (e) => {
        this.map.getCanvas().style.cursor = ''
      })
      // this.map.moveLayer('regions-layer')
      //
      // this.map.getSource('regions-source').setData(this.regionsFeatures)
    },
    loadVehiclesOnMap(features) {
      this.map.addSource('vehicles-s', {
        type: 'geojson',
        data: features,
      })

      this.map.addLayer({
        id: 'vehicles-l',
        type: 'circle',
        source: 'vehicles-s',
        paint: {
          'circle-radius': {
            stops: [
              [8, 1],
              [11, 5],
              [16, 10],
            ],
          },
          'circle-color': this.darkMode ? '#94ccff' : '#001d32',
        },
      })
    },
    createMap() {
      mapboxgl.accessToken = this.mapAccessToken
      this.map = new mapboxgl.Map({
        container: 'tt-landing-map',
        style: this.darkMode ? this.mapStyle.dark : this.mapStyle.light,
        bounds: [
          [-85.9, 41.5],
          [-66.7, 49.7],
        ],
        maxPitch: 0,
        pitchWithRotate: false,
        scollZoom: false,
        dragRotate: false,
        doubleClickZoom: false,
        touchZoomRotate: false,
        touchPich: false,
        logoPosition: 'top-right',
      })

      this.map.on('load', async () => {
        await this.loadData()
      })
    },
  },
}
</script>

<i18n>
{
  "en": {
    "welcome": "Welcome to Transit Tracker",
    "intro": "An overview of the public transportation network for",
    "vehicles": "vehicles",
    "atThisTime": "at this time",
    "agencies": "agencies",
    "vehiclesSince": "vehicles since 2018",
    "exploreYourself": "Explore on your own",
    "screens": {
      "headline": "All your favorite vehicles, gathered in one place",
      "subhead": "Your transit agency might offer to see all vehicles on a route, Transit Tracker lets you see <b>all vehicles in a region</b>! Discover your region from a whole new perspective.",
      "map": "On a map",
      "mapDesc": "Get an overview of your region. Explore closely, click on a vehicle, and view all its details.",
      "table": "On a list",
      "tableDesc": "Use filters to quickly find the vehicles that interest you. Add or remove columns to display information that matters to you."
    },
    "features": {
      "headline": "And even more",
      "subhead": "Transit Tracker offers a ton of features to provide you with a complete experience",
      "1t": "Notifications",
      "1d": "Receive notifications on your phone when a new vehicle is added to your agency's fleet.",
      "1n": "When compatible with your browser.",
      "2t": "Download",
      "2d": "Export data collected by Transit Tracker on the latest status of each vehicle.",
      "2n": "When permitted by the agency's license.",
      "3t": "Next departures",
      "3d": "Check previous and upcoming departures, follow your favorite vehicle throughout its day.",
      "3n": "When provided by the agency.",
      "4t": "External links",
      "4d": "Transit Tracker collaborates with other services, such as FleetStats, to offer you an even more comprehensive experience.",
      "4n": "For certain agencies.",
      "5t": "Filters",
      "5d": "Both on the map and the list, apply filters to easily find the vehicles you are looking for.",
      "5n": "Soon, it will also be possible to save filters for later use.",
      "6t": "Automatic refresh",
      "6d": "Data is automatically updated at intervals between 60 and 180 seconds, depending on the agencies.",
      "7t": "Multiple settings",
      "7d": "For a personalized experience, Transit Tracker offers plenty of settings: application theme, satellite view on the map, column order, startup page, and more!"
    },
    "ecosystem": {
      "headline": "The Transit Tracker Ecosystem",
      "subhead": "More than just an application",
      "vin": "exo VIN Database",
      "vinDesc": "Check the VINs of each exo bus and find their usage across different sectors of the network.",
      "vinHref": "https://vin.transittracker.ca/",
      "api": "Developer API",
      "apiDesc": "Developers can use the Transit Tracker JSON API to easily access real-time data. Knowledge of Protobuf not required!",
      "apiHref": "https://api.transittracker.ca/docs"
    },
    "opensource": {
      "headline": "A proudly open-source project",
      "subhead": "The source code of Transit Tracker is fully open and available on our GitHub. Feel free to contribute to the project or be inspired by it!",
      "button": "Our GitHub Page"
    }
  },
  "fr": {
    "welcome": "Bienvenue dans Transit&nbsp;Tracker",
    "intro": "Une vue d'ensemble du réseau de transport en commun pour",
    "vehicles": "véhicules",
    "atThisTime": "en ce moment",
    "agencies": "agences",
    "vehiclesSince": "véhicules depuis 2018",
    "exploreYourself": "Explorez par vous même",
    "screens": {
      "headline": "Tous vos véhicules préférés, réunis en un seul endroit",
      "subhead": "Votre société de transport offre peut-être de voir tous les véhicules présent sur une ligne, Transit&nbsp;Tracker vous offre de voir <b>tous les véhicules d'une région</b>! Découvrez votre région, sous un tout nouvelle angle.",
      "map": "Sur une carte",
      "mapDesc": "Obtenez une vue d'ensemble de votre région. Explorez de plus près, cliquez sur un véhicule et consultez-y tous ses détails.",
      "table": "Sur une liste",
      "tableDesc": "Utilisez les filtres pour trouvez rapidement les véhicules qui vous intéressent. Ajoutez ou supprimez des colonnes pour afficher les informations intéressantes pour vous."
    },
    "features": {
      "headline": "Et encore plus",
      "subhead": "Transit Tracker offre une tonne de fonctionnalités pour vous permettre d'obtenir une expérience complète",
      "1t": "Notifications",
      "1d": "Recevez des notifications sur votre téléphone lorsqu'un nouveau véhicule est ajouté à la flotte de votre agence.",
      "1n": "Lorsque compatible avec votre navigateur.",
      "2t": "Téléchargement",
      "2d": "Exportez les données récoltés par Transit Tracker, sur le dernier statut de chaque véhicule.",
      "2n": "Lorsque permis par la license de l'agence.",
      "3t": "Prochains départs",
      "3d": "Consultez les départs précédents et suivants, suivez votre véhicule préféré pendant sa journée.",
      "3n": "Lorsque fourni par l'agence.",
      "4t": "Liens externes",
      "4d": "Transit Tracker collabore avec d'autres services, tel que FleetStats afin de vous offrir une expérience encore plus complète.",
      "4n": "Pour certaines agences.",
      "5t": "Filtres",
      "5d": "Autant sur la carte que sur la liste, appliquez des filtres pour trouver facilement les véhicules que vous cherchez.",
      "5n": "Prochainement, il sera aussi possible de sauvegarder les filtres pour les utiliser ultérieurement.",
      "6t": "Rafraichissement automatique",
      "6d": "Les données sont automatiquement mises à jour, dans une intervalle entre 60 et 180 secondes, selon les agences.",
      "7t": "Plusieurs paramètres",
      "7d": "Pour une expérience personnalisée, Transit Tracker offre plein de paramètres : thème de l'application, vue satellite sur la carte, ordre des colonnes, page au démarrage, et plus!"
    },
    "ecosystem": {
      "headline": "L'écosystème Transit Tracker",
      "subhead": "Bien plus qu'une application",
      "vin": "Base de données exo VIN",
      "vinDesc": "Consultez les VIN de chaque autobus d'exo et retrouvez leur utilisation à travers les différents secteurs du réseau.",
      "vinHref": "https://vin.transittracker.ca/locale/fr",
      "api": "API pour développeurs",
      "apiDesc": "Les développeurs peuvent utiliser l'API JSON Transit Tracker afin d'accéder facilement aux données en temps réel. Conaissance du Protobuf non nécéssaire!",
      "apiHref": "https://api.transittracker.ca/docs"
    },
    "opensource": {
      "headline": "Un projet fièrement open source",
      "subhead": "Le code source de Transit Tracker est pleinement ouvert et disponible sur notre GitHub. N'hésitez pas à contribuer au projet ou à vous en inspirer!",
      "button": "Notre page GitHub"
    }
  }
}
</i18n>
