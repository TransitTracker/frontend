import { agencies, definitions, realtimeGtfs } from '@/utils/byod'
import { protoParser } from '@/utils/byod/converters'

export default {
  methods: {
    // Agencies store
    loadAgency(agency) {
      this.$store.commit('agencies/add', agency)

      this.$store.commit('agencies/setTime', {
        agency,
        timestamp: agency.meta.timestamp,
      })
    },
    setTimestamp(agency, timestamp) {
      this.$store.commit('agencies/setTime', { agency, timestamp })

      agency.meta.timestamp = timestamp

      agencies.put(agency)
    },
    removeAgency(agency) {
      this.$store.commit('agencies/remove', agency)

      this.$store.commit('agencies/removeTime', agency)
    },

    // Vehicles store
    loadVehicles(agency, vehicles) {
      this.$store.commit('vehicles/emptyData', agency)

      this.$store.commit('vehicles/set', {
        agency,
        vehicles,
        features: {
          type: 'FeatureCollection',
          features: vehicles.map((vehicle) => ({
            ...vehicle.meta.geoJson,
          })),
        },
      })
    },
    removeVehicles(agency) {
      this.$store.commit('vehicles/emptyData', agency)
    },

    // Realtime entities
    fetchRemoteFeeds(agency) {
      // TODO: Handle errors
      agency.meta.remoteUrls.forEach((url) => {
        this.$axios
          .get(url, { responseType: 'arraybuffer' })
          .then(async ({ data }) => {
            await this.saveEntities(agency, data)
          })
      })
    },
    async saveEntities(agency, buffer) {
      // Convert then save
      const entities = await protoParser(agency, buffer)

      // Mark as inactive or delete
      await realtimeGtfs.delete(definitions.Alerts, agency)
      await realtimeGtfs.delete(definitions.TripUpdates, agency)
      await realtimeGtfs.bulkUpdate(definitions.Vehicles, agency, {
        isActive: false,
      })

      await realtimeGtfs.bulkPut(definitions.Alerts, agency, entities.alerts)

      await realtimeGtfs.bulkPut(
        definitions.TripUpdates,
        agency,
        entities.tripUpdates
      )

      await realtimeGtfs.bulkPut(
        definitions.Vehicles,
        agency,
        entities.vehicles
      )

      // Load vehicles in the app
      this.setTimestamp(agency, entities.timestamp)
      this.loadVehicles(agency, entities.vehicles)

      return entities
    },
  },
}
