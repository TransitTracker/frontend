<template>
  <div
    class="tt-landing flex-column flex-md-row"
    :class="[dataIsLoaded && 'tt-landing__short']"
  >
    <div
      id="tt-landing-map"
      class="tt-landing-map tt-landing-map--dynamic flex-grow-1"
      :class="[dataIsLoaded && 'tt-landing__short']"
    >
      <div
        ref="popup"
        class="tt-landing-map-popup tt-landing-map-popup--inactive"
      >
        <NuxtLink
          :to="localePath(`/regions/${currentPopup.slug}`)"
          class="text-h6 text-decoration-none d-flex align-center"
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
        <b class="text-subtitle-2">
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
            class="secondary-dark--text"
            :class="[`umami--click--landing-${currentPopup.slug}-table`]"
            style="height: 24px"
            :title="$t('landing.openTable', { region: currentPopup.name })"
          >
            <v-btn icon small>
              <v-icon>{{ mdiTable }}</v-icon>
            </v-btn>
          </NuxtLink>
        </div>
        <div class="tt-landing-map-popup__border primary"></div>
      </div>
    </div>
    <div
      class="tt-landing-content flex-shrink-0 flex-grow-1 d-flex flex-column justify-md-center px-8 pt-8 pt-md-0 mb-md-0 pb-4 pb-md-0"
      :class="[dataIsLoaded && '']"
    >
      <!-- eslint-disable vue/no-v-html -->
      <h1
        class="text-h4 text-md-h3 font-weight-bold"
        v-html="$t('landing.welcome')"
      ></h1>
      <!-- eslint-enable vue/no-v-html -->
      <h2 class="text-h6 text-md-h5 my-4 tt-landing-content__subtitle">
        {{ $t('landing.intro') }} <br />
        <span class="font-weight-medium tt-landing-content__cities">
          <span class="tt-landing-content__cities__line"></span>
          <span ref="letters" class="tt-landing-content__cities__letters">
            Montréal
          </span>
        </span>
      </h2>
      <h2 class="text-subtitle-2 text-md-subtitle-1">
        {{
          $t('landing.body', {
            totalAgencies,
            totalVehicles,
          })
        }}
      </h2>
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
    <div class="tt-landing-overlay"></div>
  </div>
</template>

<script>
import anime from 'animejs/lib/anime.es'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { mdiArrowRight, mdiMap, mdiTable } from '@mdi/js'

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
      mdiTable,
      mdiMap,
    }
  },
  data: () => ({
    regionsFeatures: {
      type: 'FeatureCollection',
      features: [],
    },
    currentPopup: {},
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
@use 'sass:selector';

@mixin nest($parent) {
  @at-root #{selector.nest($parent, &)} {
    @content;
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

    @include nest('.theme--light') {
      color: #011d32;
      background-color: #deecf9;

      &__cities {
        color: #2374ab;
        &__line {
          background-color: #2374ab;
        }
      }
    }

    @include nest('.theme--dark') {
      color: #cbe5ff;
      background-color: #003c5e;

      &__cities {
        color: #91ccff;
        &__line {
          background-color: #91ccff;
        }
      }
    }

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
  .tt-landing {
    &-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;

      @include nest('.theme--light') {
        background: linear-gradient(
          100deg,
          rgba(222, 236, 249, 1) 0%,
          rgba(222, 236, 249, 1) 50%,
          rgba(222, 236, 249, 0) 70%,
          rgba(222, 236, 249, 0) 100%
        );
      }

      @include nest('.theme--dark') {
        background: linear-gradient(
          100deg,
          rgba(0, 60, 94, 1) 0%,
          rgba(0, 60, 94, 1) 50%,
          rgba(0, 60, 94, 0) 70%,
          rgba(0, 60, 94, 0) 100%
        );
      }
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
