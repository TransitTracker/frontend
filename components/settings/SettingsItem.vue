<template>
  <v-col cols="6">
    <v-item v-slot="{ active, toggle }" :value="value">
      <v-card
        class="px-4 py-3 d-flex flex-column justify-center tt-settings-card"
        :color="
          active ? 'secondary' : darkMode ? 'grey darken-3' : 'grey lighten-3'
        "
        flat
        @click="toggle"
      >
        <div class="d-flex justify-space-between align-center">
          <slot />
          <v-icon v-if="icon" class="ml-1">{{ icon }}</v-icon>
        </div>
        <div v-if="description">
          <small class="mb-0">{{ description }}</small>
        </div>
      </v-card>
    </v-item>
  </v-col>
</template>

<script>
export default {
  props: {
    description: {
      type: String,
      required: false,
      default: null,
    },
    icon: {
      type: String,
      required: false,
      default: null,
    },
    value: {
      type: [Boolean, String],
      required: true,
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
.tt-settings-card {
  height: 100%;
}
</style>
