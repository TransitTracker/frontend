<template>
  <div class="tt-home">
    <div class="secondary tt-background-texture">
      <v-container class="d-flex align-center pa-6">
        <div class="flex-grow-1">
          <h1 class="text-h5 font-weight-medium">
            {{ $t('home.welcome') }} Transit&nbsp;Tracker
          </h1>
          <h2 class="text-subtitle-1">
            {{ $t('home.version') }} {{ version }}
          </h2>
          <v-btn icon color="black" href="https://twitter.com/ttrackerca">
            <v-icon>mdi-twitter</v-icon>
          </v-btn>
          <v-btn
            icon
            color="black"
            href="http://github.com/felixinx/transit-tracker"
          >
            <v-icon>mdi-github</v-icon>
          </v-btn>
        </div>
        <img
          src="/img/logo.svg"
          alt="Logo Transit Tracker"
          height="75px"
          class="welcome-logo ml-4"
        />
      </v-container>
    </div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card v-if="activeAgencies" class="mt-4">
            <v-card-title>
              <span class="flex-grow-1">
                {{ totalCount }} {{ $t('home.vehicleTotal') }}
              </span>
              <v-btn color="primary" @click="downloadDialog = true">
                <v-icon left>mdi-download</v-icon>
                {{ $t('home.download') }}
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col
                  v-for="agency in activeAgencies"
                  :key="agency.slug"
                  cols="12"
                  md="4"
                  lg="3"
                >
                  <v-card
                    elevation="0"
                    width="100%"
                    height="100%"
                    :color="darkMode ? 'grey darken-3' : 'grey lighten-3'"
                    :loading="
                      agency.slug in vehicleCounts ? false : agency.textColor
                    "
                    class="tt-agencies-card"
                  >
                    <v-card-text class="d-flex px-1 py-2">
                      <div
                        v-if="agency.slug in vehicleCounts"
                        class="align-self-center ml-2 px-1 text-center"
                        style="width: 40px"
                      >
                        {{ vehicleCounts[agency.slug] }}
                      </div>
                      <div class="flex-grow-1 align-self-center ml-2">
                        <b>{{ agency.name }}</b>
                        <br />
                        <span>
                          <timeago
                            :datetime="(times[agency.slug] || 0) * 1000"
                            :auto-update="30"
                          />
                        </span>
                      </div>
                    </v-card-text>
                    <div
                      class="tt-agencies-card__clip-path"
                      :style="{ backgroundColor: agency.color }"
                    ></div>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <v-card v-else>
            <v-card-text class="d-flex flex-column align-center">
              <v-icon size="100" color="primary">mdi-map-plus</v-icon>
              <div class="text-h6 text-center my-2">
                {{ $t('home.emptyTitle') }}
              </div>
              <div class="text-subtitle1 text-center mb-6">
                {{ $t('home.emptyBody') }}
              </div>
              <v-btn large color="primary" to="/settings">
                {{ $t('home.emptyButton') }}
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col v-if="region.name" cols="12" md="6">
          <v-card dark>
            <!-- eslint-disable -->
            <v-card-title v-html="region.infoTitle"></v-card-title>
            <v-card-text v-html="region.infoBody"></v-card-text>
            <!-- eslint-enable -->
          </v-card>
        </v-col>
        <v-col v-if="region.name" cols="12" md="6">
          <v-card>
            <v-card-title>{{ $t('home.creditsTitle') }}</v-card-title>
            <!-- eslint-disable -->
            <v-card-text v-html="region.credits"></v-card-text>
            <!-- eslint-enable -->
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <DownloadDialog v-model="downloadDialog" />
  </div>
</template>

<script>
import Vue from 'vue'
import VueTimeago from 'vue-timeago'

Vue.use(VueTimeago, {})

export default {
  middleware: 'loadapi',
  asyncData({ params }) {
    return { regionSlug: params.region }
  },
  data: () => ({
    downloadDialog: false,
  }),
  head: () => ({
    // TODO: Use i18n
    title: 'Home',
  }),
  computed: {
    activeAgencies() {
      const activeAgencies = this.$store.state.settings.activeAgencies

      return Object.values(this.$store.state.agencies.data).filter(
        ({ slug, regions }) => {
          if (regions.includes('*')) {
            return true
          }
          return (
            activeAgencies.includes(slug) && regions.includes(this.regionSlug)
          )
        }
      )
    },
    darkMode() {
      return this.$vuetify.theme.dark
    },
    region() {
      return (
        this.$store.state.regions.data[this.regionSlug] || {
          agencies: [],
        }
      )
    },
    vehicleCounts() {
      return this.$store.getters['vehicles/counts']
    },
    version() {
      return process.env.version
    },
    totalCount() {
      let total = 0
      Object.values(this.vehicleCounts).forEach((count) => {
        total += count
      })
      return total
    },
    times() {
      return this.$store.state.agencies.times
    },
  },
}
</script>

<style lang="scss">
.tt-agencies-card {
  overflow: clip;

  &__clip-path {
    height: 100%;
    width: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    position: absolute;
    clip-path: polygon(85% 0, 101% -1%, 101% 101%, 95% 100%);
  }

  .v-card__text {
    height: 100%;
    max-width: 90%;
  }
}
.tt-home {
  margin-bottom: 56px;
}
</style>
