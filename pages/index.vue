<template>
  <div
    class="tt-landing flex-column flex-md-row"
    :class="[dataIsLoaded && 'tt-landing__short']"
  >
    <div
      id="tt-landing-map"
      class="flex-grow-1"
      :class="[dataIsLoaded && 'tt-landing__short']"
    ></div>
    <div
      class="tt-landing-content d-flex flex-column justify-md-center px-8 pt-8 pt-md-0 mb-14 mb-md-0 pb-4 pb-md-0"
    >
      <!-- eslint-disable vue/no-v-html -->
      <h1
        class="text-h4 text-md-h3 font-weight-bold"
        v-html="$t('landing.welcome')"
      ></h1>
      <!-- eslint-enable vue/no-v-html -->
      <h2 class="text-h6 text-md-h5 my-4 tt-landing-content__subtitle">
        {{ $t('landing.intro') }} <br />
        <span
          class="font-weight-medium tt-landing-content__cities"
          :class="[darkMode ? 'secondary--text' : 'primary-dark--text']"
        >
          <span
            class="tt-landing-content__cities__line"
            :class="[darkMode ? 'secondary' : 'primary-dark']"
          ></span>
          <span ref="letters" class="tt-landing-content__cities__letters"
            >Montréal</span
          >
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
      <v-card
        class="mt-4 tt-landing-content-message"
        :color="darkMode ? 'secondary-dark' : 'secondary'"
      >
        <v-badge
          color="primary"
          :content="$t('landing.byodNew')"
          left
          overlap
          class="tt-landing-content-message__badge"
        >
          <v-card-text class="pb-0 pt-4">
            <b> {{ $t('landing.byodTitle') }} </b><br />
            <span class="d-none d-md-block">
              {{ $t('landing.byodBody') }}
            </span>
          </v-card-text>
        </v-badge>
        <v-card-actions>
          <v-btn text small nuxt to="/byod">
            {{ $t('landing.byodStart') }}
            <v-icon right>mdi-arrow-right</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
      <LandingAnimations />
    </div>
    <div
      class="tt-landing-content__border secondary-dark"
      :class="[dataIsLoaded && 'tt-landing__short']"
    ></div>
  </div>
</template>

<script>
import anime from 'animejs/lib/anime.es'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

export default {
  name: 'Landing',
  async asyncData({ app }) {
    const mapStyle = {
      dark: process.env.mabboxStyleDark,
      light:
        'mapbox://styles/felixinx/cklvgeorj2t4417rtcbtk8lki/draft?optimize=true',
    }
    const mapAccessToken = process.env.mapboxAccessToken

    const landingResponse = await app.$axios.get('/landing')
    let totalVehicles = 0
    let totalAgencies = 0
    landingResponse.data.features.forEach((region) => {
      totalAgencies += region.properties.agencies
      totalVehicles += region.properties.vehicles
    })

    return {
      mapAccessToken,
      mapStyle,
      features: landingResponse.data,
      totalAgencies,
      totalVehicles,
    }
  },
  data: () => ({
    mapLoaded: true,
    features: {
      type: 'FeatureCollection',
      features: [],
    },
  }),
  head() {
    return {}
  },
  computed: {
    dataIsLoaded() {
      return this.$store.state.app.dataIsLoaded
    },
    darkMode() {
      return this.$vuetify.theme.dark
    },
  },
  watch: {
    // TODO: fix
    // darkMode(value) {
    //   if (this.mapLoaded) {
    //     this.map.setStyle(value ? this.mapStyle.dark : this.mapStyle.light)
    //     if (this.mapLoaded) this.map.moveLayer('landing-layer')
    //   }
    // },
  },
  mounted() {
    setTimeout(() => {
      this.createMap()
    }, 10)

    const cities = []

    this.features.features.forEach((feature) => {
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
        interactive: false,
        logoPosition: 'top-right',
      })

      this.map.on('load', () => {
        this.mapLoaded = true
        this.map.addSource('landing-source', {
          type: 'geojson',
          data: this.features,
        })

        this.loadMapLayers()
      })
    },
    loadMapLayers() {
      this.map.addLayer({
        id: 'landing-layer',
        type: 'circle',
        source: 'landing-source',
        paint: {
          'circle-radius': ['max', 5, ['get', 'range']],
          'circle-stroke-color': this.darkMode ? '#009a8d' : '#2374ab',
          'circle-stroke-width': ['get', 'range'],
          'circle-stroke-opacity': 0.5,
          'circle-color': this.darkMode ? '#009a8d' : '#2374ab',
        },
      })
      const popup = new mapboxgl.Popup({
        closeButton: true,
        closeOnMove: true,
        anchor: 'bottom',
        className: 'tt-tt-landing-map-popup rounded-lg shadow-lg',
      })

      this.map.on('click', 'landing-layer', (e) => {
        popup
          .setLngLat(e.features[0].geometry.coordinates.slice())
          .setHTML(
            `
              <h2 class="text-h6">${e.features[0].properties.name}</h2>
              <b class="text-subtitle-2">
                ${this.$t('landing.agencies', {
                  n: e.features[0].properties.agencies,
                })}
                <br>
                <span class="tt-tt-landing-map-popup__dot success d-inline-block mr-1">
                  <div class="tt-tt-landing-map-popup__dot--animate success"></div>
                </span>
                ${this.$t('landing.vehicles', {
                  n: e.features[0].properties.vehicles,
                })}
              </b>
              <div class="d-flex secondark-dark--text mt-1">
                <a 
                  href="${this.localePath(
                    `/regions/${e.features[0].properties.slug}/map`
                  )}"
                  class="mr-2 secondary-dark--text"
                  style="height: 24px;"
                  title="${this.$t('landing.openMap', {
                    region: e.features[0].properties.name,
                  })}"
                >
                  <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M15,19L9,16.89V5L15,7.11M20.5,3C20.44,3 20.39,3 20.34,3L15,5.1L9,3L3.36,4.9C3.15,4.97 3,5.15 3,5.38V20.5A0.5,0.5 0 0,0 3.5,21C3.55,21 3.61,21 3.66,20.97L9,18.9L15,21L20.64,19.1C20.85,19 21,18.85 21,18.62V3.5A0.5,0.5 0 0,0 20.5,3Z" />
                  </svg>
                </a>
                <a
                  href="${this.localePath(
                    `/regions/${e.features[0].properties.slug}/table`
                  )}"
                  class="secondary-dark--text"
                  style="height: 24px;"
                  title="${this.$t('landing.openTable', {
                    region: e.features[0].properties.name,
                  })}"
                >
                  <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M5,4H19A2,2 0 0,1 21,6V18A2,2 0 0,1 19,20H5A2,2 0 0,1 3,18V6A2,2 0 0,1 5,4M5,8V12H11V8H5M13,8V12H19V8H13M5,14V18H11V14H5M13,14V18H19V14H13Z" />
                  </svg>
                </a>
              </div>
              <div class="tt-tt-landing-map-popup__border primary"></div>
            `
          )
          .addTo(this.map)
      })
      this.map.on('mouseenter', 'landing-layer', (e) => {
        this.map.getCanvas().style.cursor = 'pointer'
      })
      this.map.on('mouseleave', 'landing-layer', (e) => {
        this.map.getCanvas().style.cursor = ''
      })
      this.map.moveLayer('landing-layer')

      this.map.getSource('landing-source').setData(this.features)
    },
  },
}
</script>

<style lang="scss">
.tt-landing {
  width: 100%;
  height: 100%;
  display: flex;

  &-content {
    overflow: hidden;
    position: relative;

    h1,
    h2,
    &-message {
      z-index: 2;
    }

    &-message {
      .v-badge__badge {
        inset: auto auto calc(100% - 12px) 12px !important;
      }
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

.theme--dark .tt-tt-landing-map-popup {
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

.theme--light .tt-landing-content {
  background: #c0ede7;
}

@media (min-width: 960px) {
  .tt-landing {
    &-content {
      height: 100%;
      z-index: 2;
      width: 55%;
      clip-path: polygon(0 0, 95% 0, 85% 100%, 0 100%);

      h1,
      h2,
      .tt-landing-content-message {
        max-width: 85%;
      }

      &__border {
        position: absolute;
        width: 55%;
        clip-path: polygon(95% 0, 98% 0, 88% 100%, 85% 100%);
        top: 0;
        left: 0;
        bottom: 0;
        z-index: 2;
      }

      &__subtitle {
        min-height: 64px;
      }
    }
  }

  .tt-landing__short {
    height: calc(100% - 56px);
  }

  #tt-landing-map {
    width: 55%;
    position: absolute;
    left: 45%;
  }

  .theme--dark .tt-landing-content {
    background: #121212;
  }
}
</style>
