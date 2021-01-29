<template>
  <div class="landing-container">
    <div id="map"></div>
    <div class="content d-flex flex-column justify-center px-8">
      <h1 class="text-h3 font-weight-bold">
        Bienvenue dans Transit&nbsp;Tracker
      </h1>
      <h2 class="text-h5 my-4">
        Une vue d'ensemble du réseau de transport en commun pour
        <span class="font-weight-medium primary-dark--text tt-cities">
          <span class="tt-cities__line primary-dark"></span>
          <span ref="letters" class="tt-cities__letters">Montréal</span>
        </span>
      </h2>
      <h2 class="text-subtitle-1">
        En ce moment, il y a <b>3237</b> véhicules actifs à travers
        <b>32 agences</b>
      </h2>
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
  async asyncData({ store }) {
    const mapStyle = (await store.state.settings.darkMode)
      ? process.env.mabboxStyleDark
      : process.env.mabboxStyleLight

    const mapAccessToken = process.env.mapboxAccessToken
    return { mapAccessToken, mapStyle }
  },
  mounted() {
    mapboxgl.accessToken = this.mapAccessToken
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.mapStyle,
      center: [-82.5, 47.4],
      zoom: 5,
      interactive: false,
    })

    this.map.on('load', () => {
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
        className: 'pa-1',
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
                <a href="/${e.features[0].properties.slug}/map/" class="mr-2">
                  <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M15,19L9,16.89V5L15,7.11M20.5,3C20.44,3 20.39,3 20.34,3L15,5.1L9,3L3.36,4.9C3.15,4.97 3,5.15 3,5.38V20.5A0.5,0.5 0 0,0 3.5,21C3.55,21 3.61,21 3.66,20.97L9,18.9L15,21L20.64,19.1C20.85,19 21,18.85 21,18.62V3.5A0.5,0.5 0 0,0 20.5,3Z" />
                  </svg>
                </a>
                <a href="/${e.features[0].properties.slug}/table/">
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
      'plusieurs villes Canadiennes',
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
  height: 100%;
  width: 55%;
  clip-path: polygon(0 0, 95% 0, 85% 100%, 0 100%);
  background: rgba(77, 204, 189, 0.75);
  z-index: 2;
  backdrop-filter: blur(3px);
  position: relative;
}
.content h1,
.content h2 {
  max-width: 90%;
}
.angled-border {
  position: absolute;
  width: 55%;
  height: 100%;
  clip-path: polygon(95% 0, 98% 0, 88% 100%, 85% 100%);
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 2;
}
#map {
  width: 100%;
  height: 100%;
  position: absolute;
}
/* .tt-landing-cities {
  display: inline;
  position: relative;
  margin-top: -2px;
  line-height: 32px;
  height: 32px;
  width: 256px;
  overflow: hidden;
}
.tt-landing-cities ul {
  position: absolute;
  left: 0;
  top: 0;
  list-style: none;
  padding: 0;
  animation-name: change;
  animation-duration: 20s;
  animation-iteration-count: infinite;
  height: 32px;
  width: 256px;
  overflow: hidden;
}
.tt-landing-cities li {
  line-height: 32px;
  margin: 0;
}
@keyframes change {
  0%,
  95%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  5%,
  90% {
    transform: translate3d(0, -10%, 0);
  }
  10%,
  85% {
    transform: translate3d(0, -20%, 0);
  }
  15%,
  80% {
    transform: translate3d(0, -30%, 0);
  }
  20%,
  75% {
    transform: translate3d(0, -40%, 0);
  }
  25%,
  70% {
    transform: translate3d(0, -50%, 0);
  }
} */
</style>
