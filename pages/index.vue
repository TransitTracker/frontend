<template>
  <div>
    <div
      class="tw-relative tw-flex tw-h-full tw-w-full tw-flex-col md:tw-h-[75vh] md:tw-flex-row"
    >
      <div
        id="tt-landing-map"
        class="tw-z-0 tw-grow md:tw-order-2 md:tw-w-[55%]"
      >
        <div ref="popup" class="tw-min-w-[12rem]">
          <NuxtLink
            :to="localePath(`/regions/${currentPopup.slug}`)"
            class="tw-flex tw-items-center tw-font-heading tw-text-xl tw-font-medium tw-leading-7"
            :class="[`umami--click--landing-${currentPopup.slug}`]"
          >
            {{ currentPopup.name }}
            <svg
              style="width: 20px; height: 20px"
              class="ml-1 tt-landing-map-popup__arrow"
              viewBox="0 0 24 24"
            >
              <path fill="currentColor" :d="mdiArrowRight" />
            </svg>
          </NuxtLink>
          <b class="tw-text-sm tw-font-medium tw-leading-5">
            {{ $tc('landing.agencies', currentPopup.agencies) }}
            <br />
            <span class="tt-landing-map-popup__dot success d-inline-block mr-1">
              <div class="tt-landing-map-popup__dot--animate success"></div>
            </span>
            {{ $tc('landing.vehicles', currentPopup.vehicles) }}
          </b>
          <div class="d-flex secondark-dark--text mt-1">
            <NuxtLink
              :to="localePath(`/regions/${currentPopup.slug}/map`)"
              class="mr-2 secondary-dark--text"
              :class="[`umami--click--landing-${currentPopup.slug}-map`]"
              style="height: 24px"
              :title="$t('landing.openMap', { region: currentPopup.name })"
            >
              <v-btn icon small>
                <v-icon>{{ mdiMap }}</v-icon>
              </v-btn>
            </NuxtLink>
            <NuxtLink
              :to="localePath(`/regions/${currentPopup.slug}/table`)"
              class="tw-text-primary-10 dark:tw-text-primary-90"
              :class="[`umami--click--landing-${currentPopup.slug}-table`]"
              style="height: 24px"
              :title="$t('landing.openTable', { region: currentPopup.name })"
            >
              <v-btn icon small>
                <v-icon>{{ mdiTable }}</v-icon>
              </v-btn>
            </NuxtLink>
          </div>
          <div
            class="tt-landing-map-popup__border tw-bg-primary-40 dark:tw-bg-primary-80"
          ></div>
        </div>
      </div>
      <div
        class="tw-relative tw-z-[2] tw-flex tw-shrink-0 tw-grow tw-flex-col tw-space-y-8 tw-overflow-hidden tw-bg-primary-90 tw-p-8 tw-text-primary-10 dark:tw-bg-primary-30 dark:tw-text-primary-90 md:tw-order-1 md:tw-mb-0 md:tw-w-[45%] md:tw-justify-center md:tw-pb-0 md:tw-pt-0"
      >
        <!-- eslint-disable vue/no-v-html -->
        <h1
          class="tw-font-heading tw-text-4xl tw-font-bold tw-leading-[2.75rem] md:tw-text-5xl"
          v-html="$t('welcome')"
        ></h1>
        <!-- eslint-enable vue/no-v-html -->
        <h2
          class="tw-mt-2 tw-min-h-[4.5rem] tw-font-heading tw-text-2xl tw-font-medium md:tw-text-3xl"
        >
          {{ $t('intro') }} <br />
          <span
            class="tt-cities tw-relative tw-inline-block tw-font-bold tw-text-primary-40 !tw-opacity-100 dark:tw-text-primary-80"
          >
            <span
              class="tt-cities-line tw-absolute tw-left-0 tw-h-full tw-w-1 tw-origin-[0_50%] tw-bg-current"
            ></span>
            <span ref="letters" class="tt-cities-letters tw-inline-block">
              Montréal
            </span>
          </span>
        </h2>
        <div class="tw-flex tw-items-start tw-gap-x-4">
          <!--          TODO: Get stats from backend-->
          <TwLandingStatistic
            :label="$t('vehicles')"
            :number="2687"
            :label-sr="$t('rightNow')"
            has-ping
          />
          <TwLandingStatistic :label="$t('agencies')" :number="43" />
          <TwLandingStatistic :label="$t('vehiclesSince')" :number="13904" />
        </div>
        <div>
          <p class="!tw-mb-0 tw-flex tw-items-end tw-gap-x-2 tw-leading-8">
            {{ $t('explore') }}
            <TwIcon :path="mdiArrowDownRight" />
          </p>
          <!--          TODO: Convertir chip-->
          <v-chip-group column>
            <v-chip
              v-for="feature in regionsFeatures.features"
              :key="feature.properties.slug"
              label
              outlined
              nuxt
              :to="localePath(`/regions/${feature.properties.slug}/`)"
            >
              {{ feature.properties.name }}
            </v-chip>
          </v-chip-group>
        </div>
      </div>
      <div class="tt-landing-overlay"></div>
      <div
        class="tw-pointer-events-none tw-absolute tw-inset-0 tw-z-[1] tw-bg-gradient-100 tw-from-primary-90 tw-from-50% tw-to-transparent tw-to-70%"
      ></div>
    </div>
    <section
      class="tw-w-full tw-bg-neutral-99 tw-text-neutral-10 dark:tw-bg-neutral-10 dark:tw-text-neutral-90"
    >
      <div class="tw-container tw-mx-auto tw-p-8">
        <h3 class="tw-font-heading tw-text-3xl tw-font-bold">
          {{ $t('headline') }}
        </h3>
        <p class="!tw-mb-0 tw-mt-1 tw-max-w-prose tw-text-lg">
          {{ $t('descriptionPt1') }} <b>{{ $t('descriptionPt2Bold') }}</b>
          {{ $t('descriptionPt3') }}
        </p>
        <div
          class="tw-mt-8 tw-items-center tw-gap-x-8 tw-space-y-4 md:tw-flex md:tw-space-y-0"
        >
          <div class="tw-group tw-relative tw-flex md:tw-w-2/3">
            <img
              :src="`/img/screenshots/${activeTab}-${locale}-${
                darkMode ? 'dark' : 'light'
              }.png`"
              :alt="$t('imageAlt')"
              class="tw-block tw-w-full tw-rounded-lg tw-shadow-xl"
            />
            <NuxtLink
              :to="localePath(`/regions/mtl/${activeTab}`)"
              class="tw-absolute tw-inset-0 tw-h-full tw-w-full"
            >
              <TwFilledButton
                color="tonal"
                with-icon-right
                class="!tw-absolute -tw-right-4 -tw-top-4"
                @click="$router.push(localePath(`/regions/mtl/${activeTab}`))"
              >
                {{ $t('exploreNow') }}
                <TwIcon :path="mdiArrowTopRight" />
              </TwFilledButton>
            </NuxtLink>
          </div>
          <div
            class="tw-space-y-2 md:tw-w-1/3 md:tw-space-y-4"
            role="tablist"
            aria-orientation="vertical"
          >
            <TwLandingScreenshotChoice
              :title="$t('onMap')"
              :is-tab-active="activeTab === 'map'"
              :description="$t('onMapDesc')"
              :icon="mdiMap"
              @click="activeTab = 'map'"
            />
            <TwLandingScreenshotChoice
              :title="$t('onList')"
              :is-tab-active="activeTab === 'table'"
              :description="$t('onListDesc')"
              :icon="mdiTable"
              @click.prevent="activeTab = 'table'"
            />
          </div>
        </div>
      </div>
    </section>
    <section
      class="tw-w-full tw-bg-neutral-99 tw-pt-8 tw-text-neutral-10 dark:tw-bg-neutral-10 dark:tw-text-neutral-90"
    >
      <div class="tw-container tw-mx-auto tw-p-8">
        <h3 class="tw-text-center tw-font-heading tw-text-3xl tw-font-bold">
          {{ $t('andMore') }}
        </h3>
        <p class="tw-mt-1 tw-text-center tw-text-lg">
          {{ $t('andMoreDesc') }}
        </p>
        <div class="tw-mt-4 tw-grid tw-gap-4 md:tw-grid-cols-4">
          <TwLandingFeature
            :icon="mdiBell"
            :title="$t('notifications')"
            :description="$t('notificationsDesc')"
            :note="$t('notificationsNote')"
          />
          <TwLandingFeature
            :icon="mdiDownload"
            :title="$t('download')"
            :description="$t('downloadDesc')"
            :note="$t('downloadNote')"
          />
          <TwLandingFeature
            :icon="mdiTimeline"
            :title="$t('departures')"
            :description="$t('departuresDesc')"
            :note="$t('departuresNote')"
          />
          <TwLandingFeature
            :icon="mdiOpenInNew"
            :title="$t('external')"
            :description="$t('externalDesc')"
            :note="$t('externalNote')"
          />
        </div>
      </div>
    </section>
    <section
      class="tw-w-full tw-bg-primary-10 tw-text-center tw-text-primary-90"
    >
      <div class="tw-container tw-mx-auto tw-p-8">
        <h3 class="tw-font-heading tw-text-3xl tw-font-bold">
          {{ $t('goFurther') }}
        </h3>
        <p class="tw-mx-auto !tw-mb-0 tw-mt-1 tw-max-w-prose tw-text-lg">
          {{ $t('goFurtherDesc') }}
        </p>
        <div
          class="tw-mx-auto tw-mt-4 tw-grid tw-gap-4 md:tw-mt-8 md:tw-max-w-[75%] md:tw-grid-cols-2"
        >
          <TwLandingFurtherBlock
            :title="$t('vin')"
            subdomain="vin"
            :description="$t('vinDesc')"
          />
          <TwLandingFurtherBlock
            :title="$t('api')"
            subdomain="api"
            :description="$t('apiDesc')"
          />
        </div>
      </div>
    </section>
    <section
      class="tw-w-full tw-bg-neutral-99 tw-pt-8 tw-text-neutral-10 dark:tw-bg-neutral-10 dark:tw-text-neutral-90"
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
          <h3 class="tw-font-heading tw-text-3xl tw-font-bold">
            {{ $t('openSource') }}
          </h3>
          <p class="tw-mt-1 tw-text-lg">
            {{ $t('openSourceDesc') }}
          </p>
          <TwFilledButton
            with-icon
            tag="a"
            href="https://github.com/TransitTracker"
            target="_blank"
            class="!tw-inline-flex"
          >
            <TwIcon :path="mdiOpenInNew" />
            {{ $t('github') }}
          </TwFilledButton>
        </div>
      </div>
    </section>
    <div
      class="tw-container tw-relative tw-mx-auto tw-flex tw-flex-wrap tw-items-center tw-gap-x-1 tw-p-4 tw-leading-6 tw-tracking-wide"
    >
      <b class="tw-font-medium tw-text-primary-20 dark:tw-text-primary-90">
        Transit&nbsp;Tracker
      </b>
      <span class="tw-hidden tw-grow md:tw-inline">
        &bull; {{ $t('brandSlogan') }}
      </span>
      <span class="tw-block md:tw-hidden"> {{ $t('brandSlogan') }}</span>
      {{ $t('by') }}
      <a
        href="https://felixinx.me"
        target="_blank"
        class="tw-group tw-text-primary-40 tw-no-underline hover:tw-text-primary-30 hover:tw-underline dark:tw-text-primary-80 dark:hover:tw-text-primary-90"
      >
        @FelixINX - Félix Desjardins
      </a>
    </div>
  </div>
</template>

<script>
import anime from 'animejs/lib/anime.es'
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
  mdiArrowTopRight,
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
  async asyncData({ app }) {
    const mapStyle = {
      dark: 'mapbox://styles/felixinx/ckv0dpig31p0516omjnkhbg4m?optimize=true',
      light: 'mapbox://styles/felixinx/cklvgeorj2t4417rtcbtk8lki?optimize=true',
    }
    const mapAccessToken = process.env.mapboxAccessToken

    const regionsResponse = await app.$axios.get('/landing')
    let totalVehicles = 0
    let totalAgencies = 0
    regionsResponse.data.features.forEach((region) => {
      totalAgencies += region.properties.agencies
      totalVehicles += region.properties.vehicles
    })

    const vehiclesResponse = await app.$axios.get('/landing/vehicles')

    return {
      mapAccessToken,
      mapStyle,
      regionsFeatures: regionsResponse.data,
      vehiclesFeatures: vehiclesResponse.data,
      totalAgencies,
      totalVehicles,
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
      mdiArrowTopRight,
    }
  },
  data: () => ({
    regionsFeatures: {
      type: 'FeatureCollection',
      features: [],
    },
    currentPopup: {},
    activeTab: 'map',
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
    dataIsLoaded() {
      return this.$store.state.app.dataIsLoaded
    },
    darkMode() {
      return this.$vuetify.theme.dark
    },
    locale() {
      return this.$i18n.locale
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

    cities.push(this.$t('introCities'))

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
    changeCity(city) {
      if (!this.$refs.letters) return
      this.$refs.letters.innerHTML = city.replace(
        // eslint-disable-next-line
        /([^\x00-\x80]|[^ ]|\w)/g,
        "<span class='tt-cities-letters'>$&</span>"
      )
      anime
        .timeline()
        .add({
          target: '.tt-cities-line',
          scaleY: [0, 1],
          opacity: [0.5, 1],
          easing: 'easeOutExpo',
          duration: 700,
        })
        .add({
          targets: '.tt-cities-line',
          translateX: [
            0,
            this.$refs.letters.getBoundingClientRect().width + 10,
          ],
          skewX: [0, -10],
          easing: 'easeOutExpo',
          duration: 700,
          delay: 100,
        })
        .add({
          targets: '.tt-cities-letters',
          opacity: [0, 1],
          easing: 'easeOutExpo',
          duration: 600,
          offset: '-=775',
          delay: (el, i) => 34 * (i + 1),
        })
        .add({
          targets: '.tt-cities',
          opacity: 0,
          duration: 1000,
          easing: 'easeOutExpo',
          delay: 1000,
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

      this.map.on('load', () => {
        this.map.addSource('regions-source', {
          type: 'geojson',
          data: this.regionsFeatures,
        })
        this.map.addSource('vehicles-source', {
          type: 'geojson',
          data: this.vehiclesFeatures,
        })

        this.loadMapLayers()
      })
    },
    loadMapLayers() {
      this.map.addLayer({
        id: 'vehicles-layer',
        type: 'circle',
        source: 'vehicles-source',
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

      this.map.addLayer({
        id: 'regions-layer',
        type: 'circle',
        source: 'regions-source',
        paint: {
          'circle-radius': ['max', 5, ['get', 'range']],
          'circle-stroke-color': this.darkMode ? '#009a8d' : '#006a61',
          'circle-stroke-width': ['get', 'range'],
          'circle-color': this.darkMode ? '#006a61' : '#73f8e7',
        },
      })
      const popup = new mapboxgl.Popup({
        closeButton: true,
        closeOnMove: true,
        anchor: 'bottom',
        className: 'tt-landing-map-popup cursor-click rounded-lg shadow-lg',
      })

      popup.setDOMContent(this.$refs.popup)

      this.map.on('click', 'regions-layer', (e) => {
        this.currentPopup = e.features[0].properties

        popup
          .setLngLat(e.features[0].geometry.coordinates.slice())
          .addTo(this.map)
      })

      this.map.on('mouseenter', 'regions-layer', (e) => {
        this.map.getCanvas().style.cursor = 'pointer'
      })
      this.map.on('mouseleave', 'regions-layer', (e) => {
        this.map.getCanvas().style.cursor = ''
      })
      this.map.moveLayer('regions-layer')

      this.map.getSource('regions-source').setData(this.regionsFeatures)
    },
  },
}
</script>

<style lang="scss">
//.theme--light .tt-landing-content {
//  color: #011d32;
//  background-color: #deecf9;
//
//  &__cities {
//    color: #2374ab;
//    &__line {
//      background-color: #2374ab;
//    }
//  }
//}
//
//.theme--dark .tt-landing-content {
//  color: #cbe5ff;
//  background-color: #003c5e;
//
//  &__cities {
//    color: #91ccff;
//    &__line {
//      background-color: #91ccff;
//    }
//  }
//}

.tt-landing {
  &-map {
    &-popup {
      min-width: 200px;

      .mapboxgl-popup-content {
        padding: 8px 32px 8px 12px;
        box-shadow: none;
        clip-path: polygon(0 0, 95% 0, 85% 100%, 0 100%);
        position: relative;
        border-radius: 8px;
      }

      &:hover &__arrow path {
        transform: translateX(0px);
      }

      &__arrow {
        overflow: hidden;
        path {
          transform: translateX(-20px);
          transition: transform ease-in 0.1s;
        }
      }

      &__border {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        clip-path: polygon(91% 0, 95% 0, 85% 100%, 81% 100%);
      }

      &__dot {
        position: relative;
        width: 8px;
        height: 8px;
        border-radius: 100%;
        margin-bottom: 1px;

        &--animate {
          animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
          position: absolute;
          inset: 0 0 0 0;
          border-radius: 100%;
          opacity: 0.75;
        }
      }
    }
  }
}

.theme--dark .tt-landing-map-popup {
  .mapboxgl-popup-tip {
    border-top-color: #121212;
  }

  .mapboxgl-popup-content {
    background: #121212;
  }
}

// From Tailwind
@keyframes ping {
  75%,
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

@media (min-width: 960px) {
  .theme--light .tt-landing-overlay {
    background: linear-gradient(
      100deg,
      rgba(222, 236, 249, 1) 0%,
      rgba(222, 236, 249, 1) 50%,
      rgba(222, 236, 249, 0) 70%,
      rgba(222, 236, 249, 0) 100%
    );
  }

  .theme--dark .tt-landing-overlay {
    background: linear-gradient(
      100deg,
      rgba(0, 60, 94, 1) 0%,
      rgba(0, 60, 94, 1) 50%,
      rgba(0, 60, 94, 0) 70%,
      rgba(0, 60, 94, 0) 100%
    );
  }
  .tt-landing {
    &-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
    }
    &-content {
      pointer-events: none;
      background-color: transparent !important;
      height: 100%;
      z-index: 2;
      width: 45%;

      h1,
      h2 {
        max-width: 85%;
      }

      &__subtitle {
        min-height: 64px;
      }

      .v-item-group {
        pointer-events: all;
      }
    }

    &-map {
      width: 55%;
      position: absolute;
      left: 45%;
      height: 100%;
    }
  }
}
</style>

<i18n>
{
  "en": {
    "welcome": "Welcome to Transit Tracker",
    "intro": "An overview of the public transit network for",
    "introCities": "several Canadian cities",
    "brandSlogan": "Making real-time transit data accessible",
    "by": "Made by",
    "vehicles": "vehicles",
    "rightNow": "right now",
    "agencies": "agencies",
    "vehiclesSince": "vehicles since 2018",
    "explore": "Explore for yourself!",
    "headline": "All your favorite vehicles, in one place",
    "descriptionPt1": "Your transit agency might show vehicles on a line, but Transit Tracker lets you see",
    "descriptionPt2Bold": "all vehicles in a region",
    "descriptionPt3": "! Discover your area from a whole new angle.",
    "imageAlt": "Screenshot of the application",
    "exploreNow": "Explore now",
    "onMap": "On a map",
    "onMapDesc": "Get a full view of your region. Zoom in, click on any vehicle, and access all its details.",
    "onList": "Or in a list",
    "onListDesc": "Use filters to quickly find vehicles that interest you. Add or remove columns to show only the info that matters to you.",
    "andMore": "And even more",
    "andMoreDesc": "Transit Tracker offers tons of features to help you access",
    "notifications": "Notifications",
    "notificationsDesc": "Get notified on your device when a new vehicle is added to your agency’s fleet.",
    "notificationsNote": "When supported by your browser.",
    "download": "Download",
    "downloadDesc": "Export data collected by Transit Tracker about each vehicle’s latest status.",
    "downloadNote": "When permitted by the agency’s license.",
    "departures": "Upcoming departures",
    "departuresDesc": "Check previous and upcoming departures and follow your favorite vehicle throughout the day.",
    "departuresNote": "When provided by the agency.",
    "external": "External links",
    "externalDesc": "Transit Tracker integrates with services like FleetSighter to bring you an even more complete experience.",
    "externalNote": "For select agencies.",
    "goFurther": "Go further",
    "goFurtherDesc": "Transit Tracker is more than just an app — it’s a data-sharing platform for many uses.",
    "vin": "Exo VIN project",
    "vinDesc": "Look up VINs and technical specifications for every exo bus, and track their usage across sectors and operators.",
    "api": "API for developers",
    "apiDesc": "Developers can use a simple JSON API to connect with Transit Tracker data — a simpler alternative to Protocol Buffers.",
    "openSource": "Proudly Open Source",
    "openSourceDesc": "Transit Tracker's source code is fully open and available on our GitHub. Feel free to contribute or build upon it!",
    "github": "Our GitHub page"
  },
  "fr": {
    "welcome": "Bienvenue dans Transit&nbsp;Tracker",
    "intro": "Une vue d'ensemble du réseau de transport en commun pour",
    "introCities": "plusieurs villes canadiennes",
    "brandSlogan": "Rendre accessibles les données de transport en temps réel",
    "by": "Conçu par",
    "vehicles": "véhicules",
    "rightNow": "en ce moment",
    "agencies": "agences",
    "vehiclesSince": "véhicules depuis 2018",
    "explore": "Explorez par vous-même!",
    "headline": "Tous vos véhicules préférés, réunis en un seul endroit",
    "descriptionPt1": "Votre société de transport permet peut-être de voir les véhicules présents sur une ligne, Transit Tracker vous permet de voir",
    "descriptionPt2Bold": "tous les véhicules d'une région",
    "descriptionPt3": " ! Découvrez votre région sous un tout nouvel angle.",
    "imageAlt": "Capture d'écran de l'application",
    "exploreNow": "Explorer maintenant",
    "onMap": "Sur une carte",
    "onMapDesc": "Obtenez une vue d'ensemble de votre région. Zoomez, cliquez sur un véhicule et consultez tous ses détails.",
    "onList": "Ou dans une liste",
    "onListDesc": "Utilisez les filtres pour trouver rapidement les véhicules qui vous intéressent. Ajoutez ou retirez des colonnes pour afficher les informations pertinentes.",
    "andMore": "Et bien plus encore",
    "andMoreDesc": "Transit Tracker offre une multitude de fonctionnalités pour vous permettre d'accéder à",
    "notifications": "Notifications",
    "notificationsDesc": "Recevez des notifications sur votre appareil lorsqu’un nouveau véhicule est ajouté à la flotte de votre agence.",
    "notificationsNote": "Si compatible avec votre navigateur.",
    "download": "Téléchargement",
    "downloadDesc": "Exportez les données recueillies par Transit Tracker sur le dernier statut de chaque véhicule.",
    "downloadNote": "Si permis par la licence de l’agence.",
    "departures": "Prochains départs",
    "departuresDesc": "Consultez les départs précédents et à venir, suivez votre véhicule préféré au fil de sa journée.",
    "departuresNote": "Lorsque fourni par l’agence.",
    "external": "Liens externes",
    "externalDesc": "Transit Tracker collabore avec d'autres services, comme FleetSighter, pour vous offrir une expérience encore plus riche.",
    "externalNote": "Pour certaines agences.",
    "goFurther": "Pour aller plus loin",
    "goFurtherDesc": "Transit Tracker est plus qu’une simple application — c’est une plateforme de partage de données pour divers usages.",
    "vin": "Projet VIN d’exo",
    "vinDesc": "Consultez les VIN et les spécifications techniques de chaque bus d’exo, puis suivez leur utilisation dans les différents secteurs et opérateurs du réseau.",
    "api": "API pour développeurs",
    "apiDesc": "Les développeurs peuvent utiliser une API JSON simple pour accéder aux données de Transit Tracker — une alternative à la complexité de Protocol Buffers.",
    "openSource": "Un projet fièrement Open Source",
    "openSourceDesc": "Le code source de Transit Tracker est totalement ouvert et disponible sur notre GitHub. Contribuez ou inspirez-vous-en!",
    "github": "Notre page GitHub"
  }
}
</i18n>
