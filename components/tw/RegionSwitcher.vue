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
        val && this.closeDialog()
      },
    },
    regions() {
      return this.$store.state.regions.data
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
