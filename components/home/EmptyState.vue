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
      <div class="d-flex align-center">
        <v-slide-group multiple show-arrows>
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
                    <v-icon v-if="hover" size="32">
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
        <v-btn rounded color="primary" class="ml-4">
          <v-icon left>{{ mdiPlus }}</v-icon>
          Ajouter toutes les agences
        </v-btn>
      </div>
      <v-btn
        large
        color="secondary"
        :to="localePath('/')"
        depressed
        class="mt-8"
      >
        {{ $t('home.emptyButton') }}
      </v-btn>
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
