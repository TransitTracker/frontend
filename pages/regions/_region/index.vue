<template>
  <div class="tw-bg-neutral-99 dark:tw-bg-neutral-10">
    <div
      class="tw-full tw-relative tw-flex tw-h-80 tw-flex-col tw-justify-between tw-bg-cover tw-bg-center tw-bg-no-repeat after:tw-absolute after:tw-inset-0 after:tw-h-full after:tw-w-full after:tw-bg-gradient-to-t after:tw-from-primary-20 after:tw-to-transparent"
      :style="{
        backgroundImage: `url(${backendHost}/storage/content/regions/${region.image})`,
      }"
    >
      <div
        class="tw-h-[4.5rem] tw-bg-white/75 tw-text-primary-20 tw-backdrop-blur-md"
      >
        <div
          class="tw-container tw-mx-auto tw-flex tw-h-full tw-items-center tw-justify-between tw-px-4"
        >
          <p class="!tw-mb-0">
            {{ $t('home.welcome') }} <b>Transit&nbsp;Tracker</b>
          </p>
          <small class="tw-mb-0">
            {{ $t('home.version') }} {{ version }}
          </small>
        </div>
      </div>
      <div
        class="tw-absolute tw-inset-0 tw-h-full tw-w-full tw-bg-gradient-to-t tw-from-primary-20 tw-to-transparent"
      >
        <h1
          class="leading-[2.75rem] md:leading-[4rem] tw-container tw-absolute tw-bottom-0 tw-mx-auto tw-px-4 tw-text-4xl tw-text-white md:tw-text-6xl"
        >
          {{ region.name }}
        </h1>
      </div>
    </div>
    <div class="tw-p-4">
      <h2 class="text-[2rem] tw-font-medium tw-leading-10">
        {{ totalCount }} {{ $t('home.vehicleTotal') }}
        <TwOutlinedIconButton class="tw-float-right">
          <TwIcon :path="mdiTune" />
        </TwOutlinedIconButton>
      </h2>
      <ul
        class="tw-mt-4 tw-grid tw-list-none tw-grid-cols-2 !tw-pl-0 md:tw-grid-cols-3 xl:tw-grid-cols-4"
      >
        <TwHomeAgencyBadge
          v-for="agency in activeAgencies"
          :key="agency.slug"
          :agency="agency"
        />
      </ul>
    </div>
    <div
      class="tw-grid tw-gap-x-2 md:tw-container md:tw-mx-auto md:tw-grid-cols-2 xl:tw-grid-cols-3"
    >
      <div
        class="tw-bg-primary-90 tw-p-4 tw-text-primary-10 dark:tw-bg-primary-30 dark:tw-text-primary-90 md:tw-rounded-xl"
      >
        <h2 class="text-[2rem] tw-font-medium tw-leading-10">
          Vos véhicules favoris
        </h2>
        <p class="tw-leading-6 tw-tracking-wide">
          Suivez vos préférés juste ici.
        </p>
      </div>
      <details
        class="tw-bg-neutralVariant-90 tw-p-4 tw-text-neutralVariant-30 dark:tw-bg-neutralVariant-30 dark:tw-text-neutral-80 md:tw-rounded-xl"
        :open="creditsOpen"
      >
        <summary class="tw-list-none">
          <h2 class="text-[2rem] tw-font-medium tw-leading-10">
            Crédits et licenses d'utilisations
            <TwStandardIconButton
              :class="{ 'tw-rotate-180': creditsOpen }"
              @click="creditsOpen = !creditsOpen"
              class="tw-float-right tw-transition-transform tw-duration-200 tw-ease-linear"
            >
              <TwIcon :path="mdiChevronUp" />
            </TwStandardIconButton>
          </h2>
        </summary>
        <p v-html="region.credits" class="tw-leading-6 tw-tracking-wide"></p>
        <ul>
          <li v-for="agency in activeAgencies" :key="agency.slug">
            {{ agency.name }}
          </li>
        </ul>
      </details>
    </div>
    <div
      class="tw-container tw-mx-auto tw-flex tw-flex-wrap tw-items-center tw-p-4 tw-leading-6 tw-tracking-wide"
    >
      <b class="tw-font-medium">
        Transit&nbsp;Tracker
        <span class="tw-font-normal">
          Making realtime transit data accessible
        </span>
      </b>
      <div class="tw-grow"></div>
      <a
        href="https://api.transittracker.ca"
        target="_blank"
        class="tw-text-primary-40 tw-no-underline hover:tw-text-primary-30 hover:tw-underline dark:tw-text-primary-80 dark:hover:tw-text-primary-90"
      >
        For developers </a
      >&bull;
      <a
        href="https://api.transittracker.ca/vin"
        target="_blank"
        class="tw-text-primary-40 tw-no-underline hover:tw-text-primary-30 hover:tw-underline dark:tw-text-primary-80 dark:hover:tw-text-primary-90"
      >
        exo VIN Project </a
      >&bull;
      <a
        href="https://github.com/TransitTracker"
        target="_blank"
        class="tw-text-primary-40 tw-no-underline hover:tw-text-primary-30 hover:tw-underline dark:tw-text-primary-80 dark:hover:tw-text-primary-90"
      >
        On GitHub
      </a>
    </div>
    <div class="secondary tt-brand tt-texture--icons">
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
                :title="$t('notifications.title')"
                class="mr-2"
                @click="openNotificationsCentre()"
              >
                <v-icon :left="$vuetify.breakpoint.mdAndUp">
                  {{ mdiBell }}
                </v-icon>
                <span class="d-none d-md-block">
                  {{ $t('notifications.title') }}
                </span>
              </v-btn>
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
                      <!-- <div
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
                      </div> -->
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
import { mdiBell, mdiDownload, mdiGithub, mdiTune, mdiChevronUp } from '@mdi/js'

export default {
  middleware: 'loadData',
  asyncData({ params }) {
    return {
      regionSlug: params.region,
      creditsOpen: false,
      mdiBell,
      mdiDownload,
      mdiGithub,
      mdiTune,
      mdiChevronUp,
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
          content: `${process.env.imageKit}/tr:n-o_tw_${
            this.$i18n.locale
          }:n-t_tw,ot-${
            this.$i18n.locale === 'en' ? 'Discover' : 'D%C3%A9couvrez'
          }%20${this.region.name}/${this.region.image || 'default.jpg'}`,
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
          content: `${process.env.imageKit}/tr:n-o_fb_${
            this.$i18n.locale
          }:n-t_fb,ot-${
            this.$i18n.locale === 'en' ? 'Discover' : 'D%C3%A9couvrez'
          }%20${this.region.name}/${this.region.image || 'default.jpg'}`,
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
  methods: {
    openNotificationsCentre() {
      this.$store.commit('app/set', { key: 'notificationsCentre', value: true })
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
    max-width: 250px;
    top: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    clip-path: polygon(85% 0, 101% -1%, 101% 101%, 95% 100%);
  }

  &__text {
    height: 100%;
    max-width: 90%;
  }
}

.tt-brand {
  position: relative;
}
</style>
