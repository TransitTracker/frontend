<template>
  <div class="mb-14">
    <div class="secondary tt-texture--icons">
      <v-container class="d-flex align-center pa-6">
        <div class="flex-grow-1">
          <h1 class="text-h5 font-weight-medium">
            {{ $t('home.welcome') }} Transit&nbsp;Tracker
          </h1>
          <h2 class="text-subtitle-1">
            {{ $t('home.version') }} {{ version }}
            <!-- <a
              href="#"
              :class="[!darkMode && 'black--text']"
              @click="changelogDialog = true"
            >
              {{ $t('home.whatsNew') }}
            </a> -->
          </h2>
          <v-btn
            title="GitHub"
            icon
            color="black"
            href="http://github.com/TransitTracker"
          >
            <v-icon>{{ mdiGithub }}</v-icon>
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
          <v-card v-if="activeAgencies.length" class="mt-4">
            <v-card-title>
              <span class="flex-grow-1">
                {{ totalCount }} {{ $t('home.vehicleTotal') }}
              </span>
              <v-btn
                color="primary"
                :fab="$vuetify.breakpoint.smAndDown"
                :small="$vuetify.breakpoint.smAndDown"
                elevation="0"
                :title="$t('home.downloadTitle')"
                @click="downloadDialog = true"
              >
                <v-icon :left="$vuetify.breakpoint.mdAndUp">
                  {{ mdiDownload }}
                </v-icon>
                <span class="d-none d-md-block">{{ $t('home.download') }}</span>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col
                  v-for="agency in activeAgencies"
                  :key="agency.slug"
                  cols="12"
                  sm="6"
                  lg="4"
                >
                  <v-card
                    elevation="0"
                    width="100%"
                    height="100%"
                    :color="`${agency.color}26`"
                    :loading="!(agency.slug in vehicleCounts)"
                    class="tt-agencies-card"
                  >
                    <v-card-text class="px-3 py-2 tt-agencies-card__text">
                      <b>{{ agency.name }}</b>
                      <br />
                      <span v-if="agency.slug in vehicleCounts">
                        {{
                          $tc('landing.vehicles', vehicleCounts[agency.slug])
                        }}
                        &bull;
                      </span>
                      <TimestampAgo :timestamp="times[agency.slug] || 0" />
                    </v-card-text>
                    <div
                      class="tt-agencies-card__clip-path"
                      :style="{ backgroundColor: agency.color }"
                    >
                      <div
                        class="
                          tt-agencies-card__refresh
                          d-flex
                          flex-column
                          justify-space-around
                        "
                      >
                        <v-btn x-small icon :color="agency.textColor">
                          <v-icon>{{ mdiRefresh }}</v-icon>
                        </v-btn>
                      </div>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <HomeEmptyState v-else :region="region" />
        </v-col>
        <v-col v-if="region.name" cols="12" md="6">
          <v-card dark>
            <!-- eslint-disable -->
            <v-card-title v-html="region.infoTitle"></v-card-title>
            <v-card-text v-html="region.infoBody"></v-card-text>
            <!-- eslint-enable -->
            <v-img
              v-if="region.image"
              height="150"
              :src="`${backendHost}/storage/content/regions/${region.image}`"
              gradient="to top, transparent 0%, rgba(0,73,123,1) 100%"
            ></v-img>
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
    <HomeChangelog v-model="changelogDialog" />
    <HomeDownloadDialog v-model="downloadDialog" />
  </div>
</template>

<script>
import { mdiDownload, mdiGithub, mdiRefresh } from '@mdi/js'

export default {
  middleware: 'loadData',
  asyncData({ params }) {
    return {
      regionSlug: params.region,
      mdiDownload,
      mdiGithub,
      mdiRefresh,
      backendHost: process.env.backendHost,
    }
  },
  data: () => ({
    changelogDialog: false,
    downloadDialog: false,
  }),
  head() {
    return {
      title: this.region.name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.region.metaDescription,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.region.name,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.region.metaDescription,
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          // eslint-disable-next-line prettier/prettier
          content: `${process.env.imageKit}/tr:n-o_tw_${this.$i18n.locale}:n-t_tw,ot-${this.$i18n.locale === 'en' ? 'Discover' : 'D%C3%A9couvrez'}%20${this.region.name}/${this.region.image || 'default.jpg'}`,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.region.name,
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.region.metaDescription,
        },
        {
          hid: 'og:image',
          name: 'og:image',
          // eslint-disable-next-line prettier/prettier
          content: `${process.env.imageKit}/tr:n-o_fb_${this.$i18n.locale}:n-t_fb,ot-${this.$i18n.locale === 'en' ? 'Discover' : 'D%C3%A9couvrez'}%20${this.region.name}/${this.region.image || 'default.jpg'}`,
        },
      ],
    }
  },
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
  border-radius: 6px !important;

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

  &__refresh {
    height: 100%;
    width: 20px;
    position: absolute;
    right: 4px;
  }

  &__text {
    height: 100%;
    max-width: 90%;
  }
}
</style>
