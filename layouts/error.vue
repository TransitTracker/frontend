<template>
  <div>
    <v-container class="align-center justify-center tt-error d-none d-md-flex">
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
    <div class="d-md-none">
      <div class="text-center py-8 px-4 warning w-full d-block">
        <v-icon size="64">{{ mdiAlert }}</v-icon>
      </div>
      <v-card rounded="0" elevation="0">
        <v-card-title>
          {{ $t(error.statusCode === 404 ? 'error.404' : 'error.500') }}
        </v-card-title>
        <v-card-subtitle>
          {{ $t('error.title') }} {{ error.statusCode }}
        </v-card-subtitle>
        <v-card-text>
          {{ error.message }}
        </v-card-text>
        <v-card-text>
          <v-btn nuxt :to="localePath('/')" depressed block color="primary">
            {{ $t('error.return') }} <v-icon right>{{ mdiHome }}</v-icon>
          </v-btn>
          <v-btn
            class="mt-4"
            block
            depressed
            color="secondary"
            :href="$t('maintenance.statusPageUrl')"
            target="_blank"
          >
            {{ $t('maintenance.statusPage') }}
            <v-icon right>{{ mdiOpenInNew }}</v-icon>
          </v-btn>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mdiAlert, mdiArrowLeft, mdiHome, mdiOpenInNew } from '@mdi/js'
export default {
  props: {
    error: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({ mdiAlert, mdiArrowLeft, mdiHome, mdiOpenInNew }),
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
