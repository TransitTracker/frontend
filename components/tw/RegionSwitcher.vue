<template>
  <TwBasicDialog
    v-model="regionSwitcherVisible"
    class="tw:md:max-w-[75vw]"
    @input="closeDialog()"
  >
    <template #header>{{ $t('heading') }}</template>
    <p>
      {{ $t('intro') }}
    </p>
    <TwRegionGrid
      :regions="regions"
      :current-region="currentRegion"
      size="lg"
      @click.native="closeDialog()"
    />
  </TwBasicDialog>
</template>

<script>
export default {
  data: () => ({
    backendHost: process.env.backendHost,
  }),
  computed: {
    currentRegion() {
      return this.$store.state.settings.currentRegion
    },
    regionSwitcherVisible: {
      get() {
        return this.$store.state.app.regionSwitcherVisible
      },
      set(val) {
        if (!val) {
          this.closeDialog()
        }
      },
    },
    regions() {
      const data = this.$store.state.regions.data || {}
      return Array.isArray(data) ? data : Object.values(data)
    },
  },
  watch: {
    $route() {
      this.closeDialog()
    },
  },
  methods: {
    closeDialog() {
      this.$store.commit('app/set', {
        key: 'regionSwitcherVisible',
        value: false,
      })
    },
  },
}
</script>
<i18n>
{
  "en": {
    "heading": "Start exploring",
    "intro": "Transit Tracker lets you discover many other Canadian cities and regions."
  },
  "fr": {
    "heading": "Partez à la découverte",
    "intro": "Transit Tracker vous permet de découvrir plusieurs autres villes et régions canadiennes."
  }
}
</i18n>
