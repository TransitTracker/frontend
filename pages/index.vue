<template>
  <div class="landing-container flex-column flex-md-row">
    <div id="landing-map" class="flex-grow-1"></div>
    <div
      class="content d-flex flex-column justify-md-center px-8 pt-8 pt-md-0 mb-14 mb-md-0 pb-4 pb-md-0"
    >
      <!-- eslint-disable vue/no-v-html -->
      <h1
        class="text-h4 text-md-h3 font-weight-bold"
        v-html="$t('landing.welcome')"
      ></h1>
      <!-- eslint-enable vue/no-v-html -->
      <h2 class="text-h6 text-md-h5 my-4 tt-subtitle">
        {{ $t('landing.intro') }}
        <span
          class="font-weight-medium tt-cities"
          :class="[darkMode ? 'secondary--text' : 'primary-dark--text']"
        >
          <span
            class="tt-cities__line"
            :class="[darkMode ? 'secondary' : 'primary-dark']"
          ></span>
          <span ref="letters" class="tt-cities__letters">Montréal</span>
        </span>
      </h2>
      <h2 class="text-subtitle-2 text-md-subtitle-1">
        {{ $t('landing.body', { vehicles: 3567, agencies: 32 }) }}
      </h2>
      <v-card
        class="mt-4 tt-landing--byod"
        :color="darkMode ? 'secondary-dark' : 'secondary'"
      >
        <v-badge
          color="primary"
          :content="$t('landing.byodNew')"
          left
          overlap
          class="tt-landing--byod--badge"
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
    <div class="angled-border secondary-dark"></div>
  </div>
</template>

<script>
import anime from 'animejs/lib/anime.es'
import mapboxgl from 'mapbox-gl'

const geojson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'Montréal',
        slug: 'mtl',
        vehicles: 690,
        agencies: 16,
      },
      geometry: {
        type: 'Point',
        coordinates: [-73.5663, 45.5],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'Toronto',
        slug: 'to',
        vehicles: 1989,
        agencies: 11,
      },
      geometry: {
        type: 'Point',
        coordinates: [-79.3811, 43.6455],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'Sherbrooke',
        slug: 'sh',
        vehicles: 26,
        agencies: 1,
      },
      geometry: {
        type: 'Point',
        coordinates: [-71.8926, 45.4043],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'Outaouais',
        slug: 'outaouais',
        vehicles: 1,
        agencies: 1,
      },
      geometry: {
        type: 'Point',
        coordinates: [-75.6986, 45.4236],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'Lévis',
        slug: 'quebec',
        vehicles: 10,
        agencies: 1,
      },
      geometry: {
        type: 'Point',
        coordinates: [-71.2056, 46.8124],
      },
    },
  ],
}

export default {
  name: 'Landing',
  asyncData({ store }) {
    const mapStyle = {
      dark: process.env.mabboxStyleDark,
      light: 'mapbox://styles/felixinx/cklvgeorj2t4417rtcbtk8lki?optimize=true',
    }
    const mapAccessToken = process.env.mapboxAccessToken
    return { mapAccessToken, mapStyle }
  },
  data: () => ({
    mapLoaded: true,
  }),
  computed: {
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
    mapboxgl.accessToken = this.mapAccessToken
    this.map = new mapboxgl.Map({
      container: 'landing-map',
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
        data: geojson,
      })

      this.map.addLayer({
        id: 'landing-layer',
        type: 'symbol',
        source: 'landing-source',
        layout: {
          'icon-allow-overlap': true,
          'icon-anchor': 'bottom',
          'icon-image': 'tt-custom-custom',
          'icon-size': 1,
        },
      })
      const popup = new mapboxgl.Popup({
        closeButton: false,
        anchor: 'center',
        className: 'pa-1 tt-landing--popup',
      })

      this.map.on('click', 'landing-layer', (e) => {
        popup
          .setLngLat(e.features[0].geometry.coordinates.slice())
          .setHTML(
            `
              <h2>${e.features[0].properties.name}</h2>
              <b>${e.features[0].properties.agencies} agences</b><br>
              <b>${e.features[0].properties.vehicles} vehicules</b>
              <div class="d-flex secondark-dark--text mt-1">
                <a href="/app/${e.features[0].properties.slug}/map/" class="mr-2" style="height: 24px;">
                  <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M15,19L9,16.89V5L15,7.11M20.5,3C20.44,3 20.39,3 20.34,3L15,5.1L9,3L3.36,4.9C3.15,4.97 3,5.15 3,5.38V20.5A0.5,0.5 0 0,0 3.5,21C3.55,21 3.61,21 3.66,20.97L9,18.9L15,21L20.64,19.1C20.85,19 21,18.85 21,18.62V3.5A0.5,0.5 0 0,0 20.5,3Z" />
                  </svg>
                </a>
                <a href="/app/${e.features[0].properties.slug}/table/" style="height: 24px;">
                  <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M5,4H19A2,2 0 0,1 21,6V18A2,2 0 0,1 19,20H5A2,2 0 0,1 3,18V6A2,2 0 0,1 5,4M5,8V12H11V8H5M13,8V12H19V8H13M5,14V18H11V14H5M13,14V18H19V14H13Z" />
                  </svg>
                </a>
              </div>
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

      this.map.setStyle(
        this.darkMode ? this.mapStyle.dark : this.mapStyle.light
      )
      this.map.moveLayer('landing-layer')
    })

    const cities = [
      'Montréal',
      'Toronto',
      'Terrebonne',
      'Sherbrooke',
      'Hamilton',
      'Lévis',
      'Gatineau',
      'Longueuil',
      'York',
      'Chelsea',
      this.$t('landing.introCities'),
    ]
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
        /([^\x00-\x80]|\w)/g,
        "<span class='tt-cities__letter'>$&</span>"
      )
      anime
        .timeline()
        .add({
          target: '.tt-cities__line',
          scaleY: [0, 1],
          opacity: [0.5, 1],
          easing: 'easeOutExpo',
          duration: 700,
        })
        .add({
          targets: '.tt-cities__line',
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
          targets: '.tt-cities__letter',
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
  },
}
</script>

<style>
.tt-cities {
  position: relative;
  display: inline-block;
  opacity: 1 !important;
}
.tt-cities__line {
  position: absolute;
  left: 0;
  height: 100%;
  width: 4px;
  /* opacity: 0; */
  transform-origin: 0 50%;
}
.tt-cities__letter {
  display: inline-block;
}
.landing-container {
  width: 100%;
  height: 100%;
  display: flex;
}
.content {
  overflow: hidden;
  position: relative;
}
.content h1,
.content h2,
.content .tt-landing--byod {
  z-index: 2;
}
.theme--dark .tt-landing--popup .mapboxgl-popup-content {
  background: #121212;
}
.theme--light .content {
  background: #c0ede7;
}
.tt-subtitle {
  min-height: 96px;
}

@media (min-width: 960px) {
  .landing-container,
  .angled-border,
  #landing-map {
    height: calc(100% - 56px);
  }
  .content {
    height: 100%;
    z-index: 2;
    width: 55%;
    clip-path: polygon(0 0, 95% 0, 85% 100%, 0 100%);
    backdrop-filter: blur(3px);
  }
  .theme--dark .content {
    background: #121212;
  }
  .content h1,
  .content h2,
  .content .tt-landing--byod {
    max-width: 85%;
  }
  .angled-border {
    position: absolute;
    width: 55%;
    clip-path: polygon(95% 0, 98% 0, 88% 100%, 85% 100%);
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 2;
  }
  .tt-landing--byod {
    max-width: 85%;
  }
  #landing-map {
    width: 55%;
    position: absolute;
    left: 45%;
  }
  .tt-subtitle {
    min-height: 64px;
  }
}
.tt-landing--byod .v-badge__badge {
  inset: auto auto calc(100% - 12px) 12px !important;
}
</style>
