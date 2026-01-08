<template>
  <TwBasicDialog :value="regionSwitcherVisible" @input="closeDialog()">
    RegionSwitcher
  </TwBasicDialog>
</template>

<script>
export default {
  computed: {
    regionSwitcherVisible() {
      return this.$store.state.app.regionSwitcherVisible
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
