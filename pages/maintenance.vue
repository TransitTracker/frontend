<template>
  <v-container class="d-flex align-center justify-center tt-error">
    <v-card class="d-flex overflow-hidden" rounded="lg">
      <div class="warning d-flex align-center justify-center rounded-0">
        <v-icon size="64" class="mx-8 my-4">{{ mdiAlert }}</v-icon>
      </div>
      <v-card-text class="px-8 px-md-16 py-4 py-md-12">
        <h1 class="text-h4 font-weight-bold">{{ $t('maintenance.title') }}</h1>
        <h2 class="text-h6 mt-1 mb-4">
          {{ $t('maintenance.description') }} <br />
          {{ $t('maintenance.wait') }}
        </h2>
        <p class="text-subtitle-2">{{ query.code }}</p>
        <v-btn
          depressed
          color="primary"
          :href="$t('maintenance.statusPageUrl')"
          target="_blank"
        >
          {{ $t('maintenance.statusPage') }}
          <v-icon right>{{ mdiOpenInNew }}</v-icon>
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mdiAlert, mdiOpenInNew } from '@mdi/js'
export default {
  asyncData: ({ query }) => {
    return { mdiAlert, mdiOpenInNew, query }
  },
  head: {
    title: 'Maintenance',
  },
}
</script>

<style>
.tt-error {
  height: 100%;
  widows: 100%;
}
</style>
