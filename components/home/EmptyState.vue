<template>
  <v-card :loading="loading" :disabled="loading">
    <v-card-text class="d-flex flex-column align-center">
      <v-icon size="100" color="primary">{{ mdiMapPlus }}</v-icon>
      <div class="text-h6 text-center my-2">
        {{ $t('home.emptyTitle') }}
      </div>
      <div class="text-subtitle1 text-center tt-empty-space__body">
        {{ $t('home.emptyBody') }}
      </div>
    </v-card-text>
    <v-card-text>
      <div class="d-flex align-center justify-center tt-empty-state__agencies">
        <v-slide-group center-active show-arrows="always" class="flex-grow-1">
          <v-slide-item v-for="agency in agencies" :key="agency.slug">
            <v-tooltip bottom>
              <template #activator="{ on, attrs }">
                <v-hover v-slot="{ hover }">
                  <v-avatar
                    :color="agency.color"
                    class="mx-2"
                    v-bind="attrs"
                    v-on="on"
                    @click="addAgency(agency)"
                  >
                    <v-icon v-if="hover" :color="agency.textColor" size="32">
                      {{ mdiPlus }}
                    </v-icon>
                    <v-icon v-else :color="agency.textColor" size="32">
                      {{ mdi[agency.defaultVehicleType] }}
                    </v-icon>
                  </v-avatar>
                </v-hover>
              </template>
              <span>{{ agency.name }}</span>
            </v-tooltip>
          </v-slide-item>
        </v-slide-group>
        <v-btn
          rounded
          color="primary"
          class="ml-4 flex-shrink-0"
          :small="$vuetify.breakpoint.smAndDown"
          @click="addAll"
        >
          <v-icon left>{{ mdiPlus }}</v-icon>
          <span class="d-md-none">{{ $t('home.emptyButtonShort') }}</span>
          <span class="d-none d-md-inline">{{ $t('home.emptyButton') }}</span>
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiBus, mdiMapPlus, mdiPlus, mdiTrain, mdiTram } from '@mdi/js'

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
    mdiPlus,
  }),
  computed: {
    activeAgencies() {
      return this.$store.state.settings.activeAgencies
    },
    agencies() {
      if (!this.region.agencies) return []
      return this.region.agencies
    },
  },
  methods: {
    addAgency(agency) {
      this.loading = true

      this.$store.dispatch('settings/toggleAgency', agency).then(() => {
        this.loading = false
      })
    },
    addAll() {
      this.loading = true
      setTimeout(() => {
        Object.keys(this.agencies)
          .filter((slug) => !this.activeAgencies.includes(slug))
          .forEach((slug) => {
            this.$store.dispatch('settings/toggleAgency', this.agencies[slug])
          })

        this.loading = false
      }, 1000)
    },
  },
}
</script>

<style lang="scss">
.tt-empty-state__agencies {
  width: 100%;

  div {
    min-width: 0;
  }
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
