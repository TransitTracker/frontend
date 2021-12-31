<template>
  <div>
    <div class="text-center py-8 px-4 warning w-full d-block">
      <v-icon size="64">{{ mdiServerNetworkOff }}</v-icon>
    </div>
    <v-card rounded="0" elevation="0">
      <v-card-title>
        {{ $t('maintenance.title') }}
      </v-card-title>
      <v-card-subtitle>
        {{ $t('error.title') }} {{ query.code }}
      </v-card-subtitle>
      <v-card-text>
        {{ $t('maintenance.description') }}
      </v-card-text>
      <v-card-text>
        <v-btn
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
</template>

<script>
import { mdiOpenInNew, mdiServerNetworkOff } from '@mdi/js'
export default {
  asyncData: ({ query }) => {
    return { mdiOpenInNew, mdiServerNetworkOff, query }
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
