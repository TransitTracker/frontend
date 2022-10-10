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
  data: () => ({
    links: {},
  }),
  props: {
    vehicle: {
      type: Object,
      required: true,
    },
  },
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
      if (Object.keys(this.links).length) {
        Object.keys(this.links).forEach((key) => this.$delete(this.links, key))
      }
      if (!vehicle || !vehicle.links) return

      vehicle.links.forEach(async (id) => {
        this.$set(this.links, id, { loading: true })
        const link = await this.$store.dispatch('links/get', id)

        this.$set(this.links, id, link)
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
