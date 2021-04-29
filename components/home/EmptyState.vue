<template>
  <v-card>
    <v-card-text class="d-flex flex-column align-center">
      <v-icon size="100" color="primary">{{ mdiMapPlus }}</v-icon>
      <div class="text-h6 text-center my-2">
        {{ $t('home.emptyTitle') }}
      </div>
      <div class="text-subtitle1 text-center mb-6 tt-empty-space__body">
        {{ $t('home.emptyBody') }}
      </div>
      <v-card
        elevation="0"
        class="mb-4"
        rounded="lg"
        :color="`${randomAgency.color}26`"
        :loading="loading"
      >
        <v-card-text
          class="d-flex align-center px-3 py-2 tt-empty-state__suggestion"
        >
          <v-avatar :color="randomAgency.color">
            <v-icon size="32" :color="randomAgency.textColor">
              {{ mdi[randomAgency.defaultVehicleType] }}
            </v-icon>
          </v-avatar>
          <div class="mx-4 flex-shrink-1">
            <b class="text-subtitle-1 font-weight-medium">
              {{ randomAgency.name }}
            </b>
            <p class="text-caption mb-0 text-truncate">
              {{ randomAgency.cities.join(', ') }}
            </p>
          </div>
          <v-spacer />
          <v-btn icon @click="addAgency">
            <v-icon>{{ mdiPlusCircle }}</v-icon>
          </v-btn>
        </v-card-text>
      </v-card>
      <v-btn large color="primary" :to="localePath('/')">
        {{ $t('home.emptyButton') }}
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiBus, mdiMapPlus, mdiPlusCircle, mdiTrain, mdiTram } from '@mdi/js'

export default {
  props: {
    region: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    loading: false,
    mdi: {
      bus: mdiBus,
      train: mdiTrain,
      tram: mdiTram,
    },
    mdiMapPlus,
    mdiPlusCircle,
  }),
  computed: {
    randomAgency() {
      if (!this.region.agencies) return {}
      return this.region.agencies[
        Math.floor(Math.random() * this.region.agencies.length)
      ]
    },
  },
  methods: {
    addAgency() {
      this.loading = true

      this.$store
        .dispatch('settings/toggleAgency', this.randomAgency)
        .then(() => {
          this.loading = false
        })
    },
  },
}
</script>

<style lang="scss">
.tt-empty-state__suggestion > div {
  min-width: 0;
}

@media (min-width: 960px) {
  .tt-empty-space {
    &__suggestion {
      width: 40%;
    }

    &__body {
      max-width: 70%;
    }
  }
}
</style>
