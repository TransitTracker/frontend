<template>
  <div class="tt-links">
    <Link
      v-for="(link, index) in links"
      :key="index"
      :vehicle="vehicle"
      :link="link"
    />
  </div>
</template>

<script>
export default {
  props: {
    vehicle: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    links: {},
  }),
  watch: {
    vehicle(value) {
      this.getLinks(value)
    },
  },
  mounted() {
    this.getLinks(this.vehicle)
  },
  methods: {
    toggle(value = false) {
      if (typeof value !== 'boolean') {
        value = false
      }
      this.$emit('input', value)
    },
    getLinks(vehicle) {
      // ⚡ Bolt Optimization: Batch initial reactive update and prevent async race conditions
      // By replacing $delete loop with direct assignment, we reduce initial reactivity overhead.
      // We use a tracking ID to prevent race conditions during rapid component updates,
      // while preserving the original UX of updating links individually as they resolve.
      this.links = {}
      if (!vehicle || !vehicle.links) return

      const currentVehicleId = vehicle.id
      this._currentVehicleLinksId = currentVehicleId

      const loadingLinks = {}
      vehicle.links.forEach((id) => {
        loadingLinks[id] = { loading: true }
      })
      this.links = loadingLinks

      vehicle.links.forEach(async (id) => {
        try {
          const link = await this.$store.dispatch('links/get', id)
          if (this._currentVehicleLinksId === currentVehicleId) {
            this.$set(this.links, id, link)
          }
        } catch (e) {
          // preserve failure state or ignore depending on app design, but don't crash others
          // console.error('Failed to fetch link', id, e)
        }
      })
    },
  },
}
</script>

<style lang="scss">
.tt-links {
  gap: 16px;
}
</style>
