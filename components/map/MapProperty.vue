<template>
  <div
    class="align-center flex-column justify-space-around tt-map-property"
    :class="[desktop ? 'd-none d-md-flex' : 'd-flex d-md-none']"
  >
    <v-progress-linear
      v-if="progress"
      height="11px"
      class="tt-map-property__progress"
      :title="valueTitle"
      :value="value"
      :color="darkMode ? 'white' : 'primary'"
    ></v-progress-linear>
    <b v-else class="mt-3">{{ value }}</b>
    <v-icon :title="iconTitle" class="tt-map-property__icon mb-3">
      {{ icon }}
    </v-icon>
  </div>
</template>

<script>
export default {
  props: {
    progress: {
      type: Boolean,
      required: false,
      default: false,
    },
    icon: {
      type: String,
      required: true,
    },
    iconTitle: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
      required: true,
    },
    valueTitle: {
      type: String,
      required: false,
      default: '',
    },
    desktop: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    darkMode() {
      return this.$vuetify.theme.dark
    },
  },
}
</script>

<style lang="scss">
.tt-map-property {
  height: 100%;

  &__progress {
    width: 40px;
    height: 12px;
    margin-top: 18px;
    margin-bottom: 6px;
  }
}
</style>
