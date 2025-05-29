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
          v-html="$t('landing.welcome')"
        ></h1>
        <!-- eslint-enable vue/no-v-html -->
        <h2
          class="tw-mt-2 tw-min-h-[4.5rem] tw-font-heading tw-text-2xl tw-font-medium md:tw-text-3xl"
        >
          {{ $t('landing.intro') }} <br />
          <span
            class="tt-landing-content__cities tw-font-bold tw-text-primary-40 dark:tw-text-primary-80"
          >
            <span class="tt-landing-content__cities__line"></span>
            <span ref="letters" class="tt-landing-content__cities__letters">
              Montréal
            </span>
          </span>
        </h2>
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
            2687 <br />
            <small
              class="tw-text-md tw-font-medium tw-text-primary-10 dark:tw-text-primary-90"
            >
              véhicules <span class="tw-sr-only">en ce moment</span>
            </small>
          </h3>
          <h3
            class="tw-rounded tw-bg-white tw-p-2 tw-font-heading tw-text-xl tw-font-bold tw-text-primary-40 dark:tw-bg-primary-20 dark:tw-text-primary-80"
          >
            43 <br />
            <small
              class="tw-text-md tw-font-medium tw-text-primary-10 dark:tw-text-primary-90"
              >agences</small
            >
          </h3>
          <h3
            class="tw-rounded tw-bg-white tw-p-2 tw-font-heading tw-text-xl tw-font-bold tw-text-primary-40 dark:tw-bg-primary-20 dark:tw-text-primary-80"
          >
            13904 <br />
            <small
              class="tw-text-md tw-font-medium tw-text-primary-10 dark:tw-text-primary-90"
              >véhicules depuis 2018</small
            >
          </h3>
        </div>
        <div>
          <p class="!tw-mb-0 tw-flex tw-items-end tw-gap-x-2 tw-leading-8">
            Explorez par vous même!
            <TwIcon :path="mdiArrowDownRight" />
          </p>
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
          Tous vos véhicules préférés, réunis en un seul endroit
        </h3>
        <p class="!tw-mb-0 tw-mt-1 tw-max-w-prose tw-text-lg">
          Votre société de transport offre peut-être de voir tous les véhicules
          présent sur une ligne, Transit&nbsp;Tracker vous offre de voir
          <b>tous les véhicules d'une région</b>! Découvrez votre région, sous
          un tout nouvelle angle.
        </p>
        <div class="tw-mt-8 tw-items-center tw-gap-x-8 md:tw-flex">
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
              class="tw-cursor-pointer tw-space-y-2 tw-rounded-2xl tw-px-8 tw-py-6 tw-transition-colors tw-duration-200 tw-ease-emphasized"
              :class="[
                activeTab === 'map'
                  ? 'tw-bg-primary-40 tw-text-white dark:tw-bg-primary-80 dark:tw-text-primary-10'
                  : 'hover:tw-bg-primary-90 hover:dark:tw-bg-primary-30',
              ]"
              @click="activeTab = 'map'"
            >
              <div class="tw-flex tw-items-center tw-gap-4">
                <TwIcon :path="mdiMap" class="!tw-h-12 !tw-w-12" />
                <h4 class="tw-text-lg">Sur une carte</h4>
              </div>
              <p class="!tw-mb-0">
                Obtenez une vue d'ensemble de votre région. Explorez de plus
                près, cliquez sur un véhicule et consultez-y tous ses détails.
              </p>
            </div>
            <div
              class="tw-cursor-pointer tw-space-y-2 tw-rounded-xl tw-px-8 tw-py-6 tw-transition-colors tw-duration-200 tw-ease-emphasized"
              :class="[
                activeTab === 'table'
                  ? 'tw-bg-primary-40 tw-text-white dark:tw-bg-primary-80 dark:tw-text-primary-10'
                  : 'hover:tw-bg-primary-90 hover:dark:tw-bg-primary-30',
              ]"
              @click="activeTab = 'table'"
            >
              <div class="tw-flex tw-items-center tw-gap-4">
                <TwIcon :path="mdiTable" class="!tw-h-12 !tw-w-12" />
                <h4 class="tw-text-lg">Ou une liste</h4>
              </div>
              <p class="!tw-mb-0">
                Utilisez les filtres pour trouvez rapidement les véhicules qui
                vous intéressent. Ajoutez ou supprimez des colonnes pour
                afficher les informations intéressantes pour vous.
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
        <h3 class="tw-text-center tw-font-heading tw-text-3xl tw-font-bold">
          Et encore plus
        </h3>
        <p class="tw-mt-1 tw-text-center tw-text-lg">
          Transit Tracker offre une tonne de fonctionnalités pour vous permettre
          d'obtenir
        </p>
        <div class="tw-mt-4 tw-grid tw-gap-4 md:tw-grid-cols-4">
          <TwLandingFeature
            :icon="mdiBell"
            title="Notifications"
            description="Recevez des notifications sur votre téléphone lorsqu'un nouveau véhicule est ajouté à la flotte de votre agence."
            note="Lorsque compatible avec votre navigateur."
          />
          <TwLandingFeature
            :icon="mdiDownload"
            title="Téléchargement"
            description="Exportez les données récoltés par Transit Tracker, sur le dernier statut de chaque véhicule."
            note="Lorsque permis par la license de l'agence."
          />
          <TwLandingFeature
            :icon="mdiTimeline"
            title="Prochains départs"
            description="Consultez les départs précédents et suivants, suivez votre véhicule préféré pendant sa journée."
            note="Lorsque fourni par l'agence."
          />
          <TwLandingFeature
            :icon="mdiOpenInNew"
            title="Liens externes"
            description="Transit Tracker collabore avec d'autres services, tel que Fleets Stats afin de vous offrir une expérience encore plus complète."
            note="Pour certaines agences."
          />
        </div>
      </div>
    </section>
    <section
      class="tw-w-full tw-bg-primary-10 tw-text-center tw-text-primary-90"
    >
      <div class="tw-container tw-mx-auto tw-p-8 md:tw-pb-0">
        <h3 class="tw-font-heading tw-text-3xl tw-font-bold">
          Pour aller plus loin
        </h3>
        <p class="tw-mx-auto !tw-mb-0 tw-mt-1 tw-max-w-prose tw-text-lg">
          Transit Tracker est plus qu'une simple application, c'est un service
          qui permet un partage de données pour plusieurs usages.
        </p>
        <div
          class="tw-mx-auto tw-mt-4 tw-grid tw-gap-4 md:tw-max-w-[75%] md:tw-grid-cols-2"
        >
          <div>
            <h4 class="font-medium">Projet exo VIN</h4>
            <p>
              Consultez les VIN et la spécification technique de chaque bus
              d'exo, puis retrouvez leur utilisation à travers les différents
              secteurs et opérateurs du réseau.
            </p>
            <a
              class="md:max-w-[75%] tw-block tw-w-full tw-rounded-full tw-bg-primary-30 tw-p-2 tw-text-center tw-text-lg tw-leading-none !tw-text-white tw-no-underline hover:tw-underline hover:tw-decoration-2 hover:tw-underline-offset-8 md:tw-rounded-b-none md:tw-rounded-t-xl md:tw-py-4"
              href="https://vin.transittracker.ca"
              target="_blank"
            >
              <b>vin</b>.transittracker.ca
            </a>
          </div>
          <div>
            <h4 class="font-medium">API pour développeurs</h4>
            <p>
              Les développeurs peuvent utiliser une API JSON simple pour se
              connecter aux données de Transit Tracker. Une alternative simple à
              la complexité de Protocol Buffers.
            </p>
            <a
              class="md:max-w-[75%] tw-block tw-w-full tw-rounded-full tw-bg-primary-30 tw-p-2 tw-text-center tw-text-lg tw-leading-none !tw-text-white tw-no-underline hover:tw-underline hover:tw-decoration-2 hover:tw-underline-offset-8 md:tw-rounded-b-none md:tw-rounded-t-xl md:tw-py-4"
              href="https://api.transittracker.ca"
              target="_blank"
            >
              <b>api</b>.transittracker.ca
            </a>
          </div>
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
            Un projet fièrement Open Source
          </h3>
          <p class="tw-mt-1 tw-text-lg">
            Le code source de Transit Tracker est pleinement ouvert et
            disponible sur notre GitHub. N'hésitez pas à contribuer au projet ou
            à vous en inspirer!
          </p>
          <TwFilledButton
            with-icon
            tag="a"
            href="https://github.com/TransitTracker"
            target="_blank"
            class="!tw-inline-flex"
          >
            <TwIcon :path="mdiOpenInNew" />
            Notre page GitHub
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
    changeCity(city) {
      if (!this.$refs.letters) return
      this.$refs.letters.innerHTML = city.replace(
        // eslint-disable-next-line
        /([^\x00-\x80]|[^ ]|\w)/g,
        "<span class='tt-landing-content__cities__letter'>$&</span>"
      )
      anime
        .timeline()
        .add({
          target: '.tt-landing-content__cities__line',
          scaleY: [0, 1],
          opacity: [0.5, 1],
          easing: 'easeOutExpo',
          duration: 700,
        })
        .add({
          targets: '.tt-landing-content__cities__line',
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
          targets: '.tt-landing-content__cities__letter',
          opacity: [0, 1],
          easing: 'easeOutExpo',
          duration: 600,
          offset: '-=775',
          delay: (el, i) => 34 * (i + 1),
        })
        .add({
          targets: '.tt-landing-content__cities',
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
.theme--light .tt-landing-content {
  color: #011d32;
  background-color: #deecf9;

  &__cities {
    color: #2374ab;
    &__line {
      background-color: #2374ab;
    }
  }
}

.theme--dark .tt-landing-content {
  color: #cbe5ff;
  background-color: #003c5e;

  &__cities {
    color: #91ccff;
    &__line {
      background-color: #91ccff;
    }
  }
}

.tt-landing {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;

  &-content {
    overflow: hidden;
    position: relative;

    h1,
    h2 {
      z-index: 2;
    }

    &__subtitle {
      min-height: 96px;
    }

    &__cities {
      position: relative;
      display: inline-block;
      opacity: 1 !important;

      &__line {
        position: absolute;
        left: 0;
        height: 100%;
        width: 4px;
        transform-origin: 0 50%;
      }

      &__letter {
        display: inline-block;
      }
    }
  }

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
    "brandSlogan": "Making real time transit data accessible",
    "by": "Made by"
  },
  "fr": {
    "brandSlogan": "Rendre accessibles les données de transport en temps réel",
    "by": "Conçu par"
  }
}
</i18n>
