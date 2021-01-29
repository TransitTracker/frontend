<template>
  <v-col cols="6">
    <v-item v-slot="{ active, toggle }" :value="value">
      <v-card
        class="d-flex justify-space-between align-center px-4 py-3 tt-settings-card"
        :color="
          active ? 'secondary' : darkMode ? 'grey darken-3' : 'grey lighten-3'
        "
        flat
        @click="toggle"
      >
        <div v-if="description">
          <p class="mb-0"><slot /></p>
          <small class="mb-0">{{ description }}</small>
        </div>
        <slot v-else />
        <v-icon v-if="icon">mdi-{{ icon }}</v-icon>
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

<style>
.tt-settings-card {
  height: 100%;
}
</style>
