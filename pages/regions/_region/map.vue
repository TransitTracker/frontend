<template>
  <div>
    <div id="map"></div>
    <MapFooter @open-sheet="sheetOpen = true" />
    <MapBottomSheet
      v-if="sheetOpen"
      :sheet-open="sheetOpen"
      @close-sheet="sheetOpen = false"
    />
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'

const defaultGeojsonShapeData = {
  type: 'Feature',
  properties: {},
  geometry: { type: 'LineString', coordinates: [] },
}

export default {
  name: 'PagesRegionMap',
  middleware: 'loadapi',
  async asyncData({ params, store }) {
    const regionSlug = params.region

    const mapStyle = (await store.state.settings.darkMode)
      ? process.env.mabboxStyleDark
      : process.env.mabboxStyleLight

    const mapAccessToken = process.env.mapboxAccessToken

    return { regionSlug, mapStyle, mapAccessToken }
  },
  data: () => ({
    map: {},
    mapReady: false,
    mapStyleReady: false,
    sheetOpen: false,
  }),
  computed: {
    agencies() {
      return this.$store.state.agencies.data
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
    agencies(oldValue, value) {
      Object.keys(value).forEach((agencySlug) => {
        // Create the source if it dosen't exist
        if (!this.map.getSource(`source-${agencySlug}`)) {
          this.addAgencyLayers(this.features[agencySlug], value[agencySlug])
        }
      })
    },
    features(oldValue, value) {
      Object.keys(value).forEach((agencySlug) => {
        const features = value[agencySlug]

        // If the source dosen't exist, create it
        if (!this.map.getSource(`source-${agencySlug}`)) {
          this.addAgencyLayers(
            features,
            Object.values(this.agencies).find(
              (agency) => agency.slug === agencySlug
            )
          )
        } else {
          // Update the source data
          this.map.getSource(`source-${agencySlug}`).setData(features)
        }
      })
    },
    currentRegion(value) {
      this.map.flyTo({
        center: value.mapCenter,
        zoom: value.mapZoom,
      })
    },
  },
  mounted() {
    mapboxgl.accessToken = this.mapAccessToken
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.mapStyle,
      center: this.currentRegion.mapCenter || {
        lat: 58.27,
        lon: -96.56,
      },
      zoom: 3,
      attributionControl: false,
      maxPitch: 0,
      pitchWithRotate: false,
      dragRotate: false,
      touchZoomRotate: false,
    })
    this.map.addControl(new mapboxgl.AttributionControl(), 'top-right')
    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      }),
      'top-left'
    )
    this.map.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      'top-left'
    )

    this.map.on('styledata', () => {
      // console.log('Map style ready!')
      this.mapStyleReady = true
    })

    this.map.on('load', () => {
      // console.log('Map ready!')
      this.mapReady = true

      // Add route shape source and layer
      this.map.addSource('shape-source', {
        type: 'geojson',
        data: defaultGeojsonShapeData,
      })
      this.map.addLayer({
        id: 'shape-layer',
        type: 'line',
        source: 'shape-source',
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
      if (this.map.getSource(`source-${agency.slug}`)) {
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
      this.map.addSource(`source-${agency.slug}`, {
        type: 'geojson',
        data: features,
      })
      // Add map layers
      this.map.addLayer({
        id: `layer-${agency.slug}`,
        type: 'symbol',
        source: `source-${agency.slug}`,
        minzoom: 11,
        layout: {
          'icon-allow-overlap': true,
          'icon-anchor': 'bottom',
          'icon-image': `{marker-symbol}`,
        },
      })
      this.map.addLayer({
        id: `circles-${agency.slug}`,
        type: 'circle',
        source: `source-${agency.slug}`,
        maxzoom: 11,
        paint: {
          'circle-radius': 5,
          'circle-stroke-color': agency.textColor,
          'circle-stroke-width': 0.5,
          'circle-color': agency.color,
        },
      })
      // Add map events
      this.map.on('click', `layer-${agency.slug}`, (e) => {
        this.$store
          .dispatch('vehicles/setSelectionById', {
            id: e.features[0].properties.id,
            agency,
          })
          .then((vehicle) => {
            if (vehicle.id) this.selectVehicle(vehicle)
          })
      })
      this.map.on('mouseenter', `layer-${agency.slug}`, () => {
        this.map.getCanvas().style.cursor = 'pointer'
      })
      this.map.on('mouseleave', `layer-${agency.slug}`, () => {
        this.map.getCanvas().style.cursor = ''
      })
    },
    selectVehicle(vehicle) {
      this.map.flyTo({ center: vehicle.position, zoom: 12 })
      if (vehicle.trip.shapeLink) {
        this.map
          .getSource('shape-source')
          .setData(`${process.env.shapesEndpoint}${vehicle.trip.shapeLink}`)
        this.map.setPaintProperty(
          'shape-layer',
          'line-color',
          vehicle.trip.routeColor || '#000000'
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
        this.map.getSource('shape-source').setData(defaultGeojsonShapeData)
      }

      new mapboxgl.Popup({ offset: [0, -35], closeButton: false })
        .setLngLat(vehicle.position)
        .setHTML(
          `<p class="text-caption black--text mb-0">
          ${vehicle.label || vehicle.ref}
          </p>`
        )
        .addTo(this.map)
    },
  },
  head: () => ({
    link: [],
  }),
}
</script>

<style scoped>
#map {
  height: calc(100vh - 200px);
  width: 100%;
}
@media only screen and (max-width: 960px) {
  #map {
    height: calc(100vh - 192px);
  }
}
</style>
