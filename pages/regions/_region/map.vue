<template>
  <div class="tt-map-container">
    <div id="tt-map"></div>
    <VehicleSheetLargeSheet
      v-if="selectedVehicle.id"
      :vehicle="selectedVehicle"
    />
    <div
      ref="mapPopup"
      class="tt-map__popup black--text text-subtitle-1 d-flex align-center mt-n1 mb-n2"
    >
      <v-icon
        v-if="selectedVehicle.bearing"
        color="black"
        size="20"
        class="mr-1"
        :style="{ transform: `rotate(${selectedVehicle.bearing}deg)` }"
      >
        {{ mdiNavigation }}
      </v-icon>
      <span>{{ selectedVehicle.label || selectedVehicle.ref }}</span>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line
import { mdiNavigation } from '@mdi/js'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const defaultGeojsonShapeData = {
  type: 'Feature',
  properties: {},
  geometry: { type: 'LineString', coordinates: [] },
}

export default {
  name: 'PagesRegionMap',
  middleware: 'loadData',
  async asyncData({ $axios, params, query, store }) {
    if (query.vehicle) {
      const { data } = await $axios.get(`/vehicles/${query.vehicle}`)

      if (data.data.isActive) {
        store.commit('vehicles/setSelection', data.data)
      }
    }

    if (query.ref && query.agency) {
      const { data } = await $axios.get(
        `/agencies/${query.agency}/vehicles/${query.ref}`
      )

      if (data.data.isActive) {
        store.commit('vehicles/setSelection', data.data)
      }
    }

    return {
      regionSlug: params.region,
      mapStyle: {
        dark: process.env.mabboxStyleDark,
        light: process.env.mabboxStyleLight,
      },
      mapAccessToken: process.env.mapboxAccessToken,
      mdiNavigation,
    }
  },
  data: () => ({
    map: {},
    mapReady: false,
    mapStyleReady: false,
    sheetOpen: false,
    baseSources: [],
    baseLayers: [],
  }),
  head() {
    return {
      title: this.$t('map.seoTitle', { region: this.currentRegion.name }),
      meta: [
        {
          hid: 'robots',
          name: 'robots',
          content: 'noindex',
        },
      ],
    }
  },
  computed: {
    agencies() {
      return this.$store.state.agencies.data
    },
    darkMode() {
      return this.$vuetify.theme.dark
    },
    features() {
      return this.$store.state.vehicles.features
    },
    selectedVehicle() {
      return this.$store.state.vehicles.selection
    },
    currentRegion() {
      return this.$store.state.regions.data[this.regionSlug] || {}
    },
  },
  watch: {
    agencies(value) {
      Object.keys(value).forEach((agencySlug) => {
        // Create the source if it dosen't exist
        if (!this.map.getSource(`tt-source-${agencySlug}`)) {
          this.addAgencyLayers(this.features[agencySlug], value[agencySlug])
        }
      })
    },
    darkMode(value) {
      if (!this.mapReady) return

      this.switchBaseStyle(value ? this.mapStyle.dark : this.mapStyle.light)
    },
    features: {
      deep: true,
      handler(value) {
        Object.keys(value).forEach((agencySlug) => {
          const features = value[agencySlug]

          // If not valid GeoJSON
          if (
            !features.type ||
            !features.features ||
            typeof features.features !== 'object'
          ) {
            return
          }

          // If the source dosen't exist, create it
          if (!this.map.getSource(`tt-source-${agencySlug}`)) {
            this.addAgencyLayers(features, this.agencies[agencySlug])
          } else {
            // Update the source data
            this.map.getSource(`tt-source-${agencySlug}`).setData(features)
          }
        })
      },
    },
  },
  mounted() {
    mapboxgl.accessToken = this.mapAccessToken
    this.map = new mapboxgl.Map({
      container: 'tt-map',
      style: this.darkMode ? this.mapStyle.dark : this.mapStyle.light,
      bounds: this.currentRegion.mapBox || [
        [-85.9, 41.5],
        [-66.7, 49.7],
      ],
      attributionControl: false,
      maxPitch: 0,
      pitchWithRotate: false,
      dragRotate: false,
      touchZoomRotate: false,
      hash: true,
    })
    this.map.addControl(new mapboxgl.AttributionControl(), 'top-right')
    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      }),
      'bottom-right'
    )
    this.map.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      'bottom-right'
    )

    this.map.on('styledata', () => {
      this.mapStyleReady = true

      // After a base style change (light to dark, dark to light)
      // Add the previous layers
      this.baseLayers.forEach((layer) => {
        // If the layer is still there, don't change it
        if (this.map.getLayer(layer.id)) return

        // If the source isn't there anymore, add it
        if (!this.map.getSource(layer.source)) {
          this.map.addSource(layer.source, {
            type: 'geojson',
            data: this.baseSources[layer.source],
          })
        }

        this.map.addLayer(layer)
      })

      this.baseSources = []
      this.baseLayers = []
    })

    this.map.on('load', () => {
      // console.log('Map ready!')
      this.mapReady = true

      // Add route shape source and layer
      this.map.addSource('tt-shape-source', {
        type: 'geojson',
        data: defaultGeojsonShapeData,
      })
      this.map.addLayer({
        id: 'tt-shape-layer',
        type: 'line',
        source: 'tt-shape-source',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#000000',
          'line-width': 3,
        },
      })

      Object.keys(this.features).forEach((agencySlug) => {
        const agency = Object.values(this.agencies).find(
          ({ slug }) => slug === agencySlug
        )
        if (agency) {
          this.addAgencyLayers(this.features[agencySlug], agency)
        }
      })

      if (this.selectedVehicle.id) {
        this.selectVehicle(this.selectedVehicle)
      }

      // Dark mode can change after the initial loading
      // If it's the case, switch the base style now
      // TODO: fix this
    })
  },
  methods: {
    addAgencyLayers(features, agency) {
      // Don't continue if map is not ready
      if (!this.mapReady || !this.mapStyleReady) {
        // console.log('reject map or style not ready', agency.name)
        return
      }

      // Don't create a second source if it already exists
      if (this.map.getSource(`tt-source-${agency.slug}`)) {
        // console.log('reject no source', agency.name)
        return
      }

      // Don't create if the features or agency is undefined
      if (!features || !agency) {
        // if (!features) console.log('reject no features', agency.name)
        // if (!agency) console.log('reject no agency', agency.name)
        return
      }

      // console.log('continue')

      // console.log(features, agency)
      // Add map source
      this.map.addSource(`tt-source-${agency.slug}`, {
        type: 'geojson',
        data: features,
      })
      // Add map layers
      this.map.addLayer({
        id: `tt-layer-${agency.slug}`,
        type: 'symbol',
        source: `tt-source-${agency.slug}`,
        minzoom: 11,
        layout: {
          'icon-allow-overlap': true,
          'icon-anchor': 'bottom',
          'icon-image': `{marker-symbol}`,
        },
      })
      this.map.addLayer({
        id: `tt-circles-${agency.slug}`,
        type: 'circle',
        source: `tt-source-${agency.slug}`,
        maxzoom: 11,
        paint: {
          'circle-radius': 5,
          'circle-stroke-color': agency.textColor,
          'circle-stroke-width': 0.5,
          'circle-color': agency.color,
        },
      })
      // Add map events
      this.map.on('click', `tt-layer-${agency.slug}`, (e) => {
        this.$store
          .dispatch('vehicles/setSelectionById', {
            id: e.features[0].properties.id,
            agency,
          })
          .then((vehicle) => {
            if (vehicle.id) this.selectVehicle(vehicle)
          })
      })
      this.map.on('mouseenter', `tt-layer-${agency.slug}`, () => {
        this.map.getCanvas().style.cursor = 'pointer'
      })
      this.map.on('mouseleave', `tt-layer-${agency.slug}`, () => {
        this.map.getCanvas().style.cursor = ''
      })
    },
    selectVehicle(vehicle) {
      // Zoom only if map only if zoom < 12
      if (this.map.getZoom() < 12) {
        this.map.flyTo({
          center: vehicle.position,
          zoom: 12,
          padding: {
            left: this.$vuetify.breakpoint.mdAndUp ? 188 : 0,
          },
        })
      } else {
        this.map.panTo(vehicle.position, {
          offset: [this.$vuetify.breakpoint.mdAndUp ? 188 : 0, 0],
        })
      }

      if (vehicle.trip.shapeLink) {
        this.map
          .getSource('tt-shape-source')
          .setData(`${process.env.backendHost}${vehicle.trip.shapeLink}`)

        const routeColor = vehicle.trip.routeColor.toLowerCase()

        this.map.setPaintProperty(
          'tt-shape-layer',
          'line-color',
          routeColor === '#ffffff'
            ? this.agencies[vehicle.agency].color
            : routeColor ?? '#000000'
        )
        // } else if (vehicle.meta.json?.trip?.shape_id) {
        //   this.$store
        //     .dispatch('gtfs/getShape', {
        //       agency: vehicle.agency,
        //       shapeId: vehicle.meta.json.trip.shape_id,
        //     })
        //     .then((result) => {
        //       this.map.getSource('shape-source').setData(result)
        //       this.map.setPaintProperty(
        //         'shape-layer',
        //         'line-color',
        //         '#'.concat(vehicle.trip.routeColor) || '#000000'
        //       )
        //     })
      } else {
        this.map.getSource('tt-shape-source').setData(defaultGeojsonShapeData)
      }

      new mapboxgl.Popup({ offset: [0, -35], closeButton: false })
        .setLngLat(vehicle.position)
        .setDOMContent(this.$refs.mapPopup)
        .addTo(this.map)
    },
    switchBaseStyle(to) {
      // Changing the base style will remove existing layers
      // Save them and add them after the style change
      this.map
        .getStyle()
        .layers.filter(({ id }) => {
          return id.includes('tt-')
        })
        .forEach((layer) => {
          this.baseLayers.push(layer)
        })

      this.baseLayers
        .map(({ source }) => {
          return source
        })
        .forEach((sourceId) => {
          this.baseSources[sourceId] = this.map.getSource(sourceId)._data
        })

      this.map.setStyle(to)
    },
  },
}
</script>

<style lang="scss">
#tt-map {
  height: 100vh;
  width: 100%;
}

.mapboxgl-ctrl-logo {
  margin-bottom: 0.5rem !important;
}

.tt-map {
  &-container {
    position: relative;
  }

  &__popup {
    display: none;
  }
}

@media only screen and (max-width: 960px) {
  #tt-map {
    height: calc(100vh - 56px - 80px - 56px + 12px);
  }
}
</style>
