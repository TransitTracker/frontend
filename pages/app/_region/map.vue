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
    sheetOpen: false,
  }),
  computed: {
    activeAgencies() {
      const activeAgencies = this.$store.state.settings.activeAgencies
      const customAgencies = this.$store.state.agencies.custom

      return [
        ...customAgencies.map((slug) => {
          return this.$store.state.agencies.data[slug]
        }),
        ...this.currentRegion?.agencies?.filter(({ slug }) =>
          activeAgencies.includes(slug)
        ),
      ]
    },
    agenciesFeatures() {
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
    agenciesFeatures(oldValue, value) {
      Object.keys(value).forEach((agencySlug) => {
        const features = value[agencySlug]

        // If the source dosen't exist, create it
        if (!this.map.getSource(`source-${agencySlug}`)) {
          this.addAgencyLayers(
            features,
            this.activeAgencies.find((agency) => agency.slug === agencySlug)
          )
        }

        // Update the source data
        this.map.getSource(`source-${agencySlug}`).setData(features)
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

    this.map.on('load', () => {
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

      Object.keys(this.agenciesFeatures).forEach((agencySlug) => {
        this.addAgencyLayers(
          this.agenciesFeatures[agencySlug],
          this.activeAgencies.find(({ slug }) => slug === agencySlug)
        )
      })

      if (this.selectedVehicle.id) {
        this.selectVehicle(this.selectedVehicle)
      }
    })
  },
  methods: {
    addAgencyLayers(features, agency) {
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
        this.selectMarker(e.features[0], agency)
      })
      this.map.on('mouseenter', `layer-${agency.slug}`, (e) => {
        this.map.getCanvas().style.cursor = 'pointer'
      })
      this.map.on('mouseleave', `layer-${agency.slug}`, (e) => {
        this.map.getCanvas().style.cursor = ''
      })
    },
    selectMarker({ source, properties }) {
      this.$store
        .dispatch('vehicles/setSelectionById', {
          id: properties.id,
          agencySlug: source.substring(7),
        })
        .then((vehicle) => {
          this.selectVehicle(vehicle)
        })
    },
    selectVehicle(vehicle) {
      this.map.flyTo({ center: vehicle.position, zoom: 12 })
      if (vehicle.trip.shapeLink) {
        this.map
          .getSource('shape-source')
          .setData(`${process.env.apiEndpoint}/${vehicle.trip.shapeLink}`)
        this.map.setPaintProperty(
          'shape-layer',
          'line-color',
          vehicle.trip.routeColor || '#000000'
        )
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
