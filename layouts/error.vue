<template>
  <v-container class="d-flex align-center justify-center tt-error">
    <v-card class="d-flex tt-error__card" rounded="lg">
      <div class="warning tt-error__icon d-flex align-center justify-center">
        <v-icon size="64" class="mx-8 my-4">{{ mdiAlert }}</v-icon>
      </div>
      <v-card-text class="pa-16">
        <h1 class="text-h4 font-weight-bold">
          {{ $t(error.statusCode === 404 ? 'error.404' : 'error.500') }}
        </h1>
        <h2 class="text-h6 mb-4 mt-1">{{ error.message }}</h2>
        <p class="text-subtitle-2">
          {{ $t('error.title') }} {{ error.statusCode }}
        </p>
        <v-btn nuxt :to="localePath('/')" depressed>
          <v-icon left>{{ mdiArrowLeft }}</v-icon> {{ $t('error.return') }}
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mdiAlert, mdiArrowLeft } from '@mdi/js'
export default {
  props: {
    error: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({ mdiAlert, mdiArrowLeft }),
  head() {
    return { title: this.$t('error.title') }
  },
}
</script>

<style lang="scss" scoped>
.tt-error {
  height: 100%;
  widows: 100%;
  &__card {
    overflow: hidden;
  }
  &__icon {
    border-radius: 0 !important;
  }
}
</style>
