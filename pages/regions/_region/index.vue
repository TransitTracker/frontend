<template>
  <div
    class="tw-flex tw-min-h-screen tw-flex-col tw-bg-neutral-99 dark:tw-bg-neutral-10"
  >
    <div
      class="tw-full tw-relative tw-flex tw-h-80 tw-flex-col tw-justify-between tw-bg-cover tw-bg-center tw-bg-no-repeat after:tw-absolute after:tw-inset-0 after:tw-h-full after:tw-w-full after:tw-bg-gradient-to-t after:tw-from-primary-20 after:tw-to-transparent"
      :style="{
        backgroundImage: `url(${backendHost}/storage/content/regions/${region.image})`,
      }"
    >
      <div
        class="tw-h-[4.5rem] tw-bg-neutral-99/75 tw-text-neutral-10 tw-backdrop-blur-md dark:tw-bg-neutral-10/75 dark:tw-text-neutral-90"
      >
        <div
          class="tw-container tw-mx-auto tw-flex tw-h-full tw-items-center tw-justify-between tw-px-4"
        >
          <p class="!tw-mb-0">
            {{ $t('welcome') }} <b>Transit&nbsp;Tracker</b>
          </p>
          <small class="tw-mb-0">
            {{ $t('version', { version }) }}
          </small>
        </div>
      </div>
      <div
        class="tw-absolute tw-inset-0 tw-flex tw-h-full tw-w-full tw-items-end tw-bg-gradient-to-t tw-from-primary-20 tw-to-transparent"
      >
        <div
          class="tw-container tw-mx-auto tw-flex tw-w-full tw-items-center tw-justify-between tw-px-4"
        >
          <h1
            class="leading-[2.75rem] md:leading-[4rem] tw-font-heading tw-text-4xl tw-text-white md:tw-text-6xl"
          >
            {{ region.name }}
          </h1>
          <TwFilledButton
            color="tonal"
            class="tw-hidden md:tw-flex"
            with-icon
            @click="open('RegionSwitcher')"
          >
            <TwIcon :path="mdiCity" />
            {{ $t('changeRegion') }}
          </TwFilledButton>
        </div>
      </div>
      <div class="tw-absolute tw-inset-0 tw-h-full tw-w-full">
        <div
          class="tw-container tw-mx-auto tw-mt-20 tw-flex tw-flex tw-w-full tw-justify-end tw-px-4"
        >
          <div
            title="Confetti"
            class="tw-flex tw-cursor-pointer tw-items-center tw-gap-4 tw-rounded-xl tw-bg-gradient-to-br tw-from-primary-40/90 tw-to-secondary-40/90 tw-px-4 tw-py-2 tw-text-white dark:tw-from-primary-80/90 dark:tw-to-secondary-80/90 dark:tw-text-neutral-10"
            @click="launchConfetti"
          >
            <svg
              class="tw-h-16 tw-shrink-0"
              viewBox="0 0 155 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M76.85 0c-5.47 8.864-6.838 12.273-2.735 15 1.367.682 2.05 1.023 2.735 1.023.683 0 1.367-.341 2.735-1.023 4.103-2.727 2.735-6.136-2.735-15Zm-8.206 40.52V26.59c-1.368 0-2.736-1.363-2.736-2.726 0-1.364 1.368-2.728 2.736-2.728h16.411c1.368 0 2.736 1.364 2.736 2.728 0 1.363-1.368 2.727-2.736 2.727V40.65a57.168 57.168 0 0 1 8.845 2.068l5.618-12.011c-1.24-.577-1.901-2.389-1.323-3.625.578-1.236 2.395-1.895 3.635-1.319l14.874 6.916c1.239.576 1.901 2.388 1.323 3.624-.578 1.236-2.396 1.896-3.635 1.32l-5.739 12.27a58.349 58.349 0 0 1 9.321 7.851l11.321-9.472c-.879-1.044-.71-2.965.338-3.842 1.047-.876 2.974-.708 3.853.336l10.549 12.536c.879 1.044.711 2.965-.337 3.842-1.047.876-2.974.708-3.853-.336l-12.252 10.25c4.275 8.12 6.698 17.377 6.698 27.194 0 33.883-34.931 79.515-50.564 98.253a9.543 9.543 0 0 1-14.764 0c-15.535-18.738-50.466-64.37-50.466-98.253 0-10.334 2.684-20.046 7.389-28.467l-10.731-8.977c-.88 1.044-2.806 1.212-3.854.336-1.047-.877-1.216-2.798-.337-3.843l10.55-12.535c.879-1.044 2.805-1.212 3.853-.336 1.048.877 1.216 2.798.337 3.842l10.11 8.458a58.367 58.367 0 0 1 7.806-6.485l-5.903-12.623c-1.24.577-3.057-.083-3.635-1.319-.578-1.236.083-3.048 1.323-3.624l14.874-6.916c1.24-.576 3.057.083 3.635 1.32.578 1.235-.084 3.047-1.323 3.624l5.707 12.203a57.166 57.166 0 0 1 10.346-2.39Zm49.582-30.455c-8.715 5.728-11.4 8.241-8.837 12.442.95 1.193 1.425 1.79 2.044 2.079.62.289 1.384.268 2.914.226 4.874-.743 5.08-4.409 3.879-14.747ZM37.762 24.812c-4.874-.743-5.08-4.409-3.879-14.747 8.715 5.728 11.4 8.241 8.837 12.442-.95 1.193-1.425 1.79-2.044 2.079-.62.289-1.384.268-2.914.226ZM155 37.448c-10.326 1.52-13.825 2.666-13.283 7.553.355 1.48.533 2.222.971 2.744.44.524 1.141.827 2.546 1.434 4.732 1.38 6.472-1.855 9.766-11.731ZM9.766 49.178C5.033 50.56 3.294 47.324 0 37.448 10.326 38.966 13.825 40.112 13.283 45c-.711 2.966-.711 2.966-3.517 4.178Zm88.198 14.023H57.453l-4.869 38.425 16.165 3.502c.52-.973 1.332-1.849 2.435-2.627 1.104-.779 2.467-1.167 4.09-1.167 2.467 0 4.415.778 5.843 2.335 1.429 1.556 2.143 3.372 2.143 5.447 0 2.4-.747 4.313-2.24 5.739-1.428 1.362-3.31 2.043-5.648 2.043-1.558 0-3.02-.324-4.383-.973-1.364-.648-2.305-1.653-2.824-3.015l-17.432 3.502c.91 3.373 2.728 6.258 5.455 8.658 2.791 2.399 6.005 4.248 9.64 5.545 3.636 1.232 7.239 1.848 10.81 1.848 4.998 0 9.38-1.006 13.146-3.016 3.83-2.075 6.816-4.961 8.959-8.657 2.207-3.697 3.312-7.945 3.312-12.744 0-3.891-.877-7.296-2.63-10.215-1.688-2.983-3.96-5.318-6.817-7.004-2.857-1.75-5.94-2.658-9.251-2.723-3.506-.13-6.59.325-9.252 1.362-1.247.456-2.4.982-3.476 1.566l1.957-11.488h25.378V63.2Z"
                fill="#fff"
              />
              <mask
                id="a"
                style="mask-type: alpha"
                maskUnits="userSpaceOnUse"
                x="18"
                y="40"
                width="117"
                height="160"
              >
                <path
                  d="M76.394 40c-31.94 0-57.897 26.116-57.897 58.252 0 33.883 34.93 79.515 50.466 98.253a9.543 9.543 0 0 0 14.764 0c15.632-18.738 50.564-64.37 50.564-98.253C134.291 66.116 108.334 40 76.394 40ZM57.452 63.201h40.512v16.343H72.586l-1.958 11.488a25.931 25.931 0 0 1 3.477-1.566c2.662-1.037 5.746-1.491 9.251-1.362 3.311.065 6.395.972 9.252 2.723 2.856 1.686 5.128 4.021 6.816 7.005 1.753 2.918 2.63 6.323 2.63 10.214 0 4.799-1.104 9.047-3.311 12.744-2.143 3.696-5.13 6.582-8.96 8.657-3.765 2.01-8.147 3.016-13.146 3.016-3.57 0-7.174-.616-10.81-1.848-3.635-1.297-6.848-3.146-9.64-5.545-2.727-2.4-4.545-5.285-5.454-8.658l17.431-3.502c.52 1.362 1.461 2.367 2.825 3.015 1.363.649 2.824.973 4.383.973 2.337 0 4.22-.681 5.648-2.043 1.493-1.426 2.24-3.339 2.24-5.739 0-2.075-.715-3.891-2.143-5.447-1.428-1.557-3.377-2.335-5.844-2.335-1.623 0-2.986.388-4.09 1.167-1.103.778-1.915 1.654-2.434 2.627l-16.165-3.502 4.868-38.425Z"
                  fill="#fff"
                />
              </mask>
              <g mask="url(#a)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M25.943 143.754c1.405-2.786 2.811-5.572 5.622-5.572 2.948 0 4.623 1.244 6.217 4.159 1.446 2.644 2.826 4.258 5.029 4.258 2.275 0 3.831-1.782 5.415-4.519 1.639-2.833 3.306-3.898 5.83-3.898 2.569 0 4.34 1.17 6.047 4.052 1.59 2.683 3.125 4.365 5.198 4.365 1.975 0 3.252-1.443 4.633-3.986 1.625-2.993 3.394-4.431 6.612-4.431 3.064 0 4.551 1.134 5.994 4 1.28 2.542 2.527 4.106 4.809 4.39 2.502-.293 3.828-2.01 5.153-4.636 1.405-2.786 2.811-3.754 5.622-3.754 2.948 0 4.623 1.244 6.217 4.159 1.446 2.644 2.825 4.258 5.028 4.258 2.276 0 3.832-1.782 5.415-4.519 1.639-2.833 3.307-3.898 5.83-3.898 2.57 0 4.341 1.17 6.048 4.052 1.59 2.683 3.125 7.092 5.198 7.092 1.975 0 3.252-2.352 4.633-4.895 1.625-2.992 3.393-6.249 6.612-6.249 3.064 0 4.551 2.952 5.994 5.818 1.361 2.702 2.683 5.326 5.251 5.326l-34.728 37.038-36.39-10.455-30.169 10.455-32.743-37.038c2.812 0 4.217-2.786 5.623-5.572Z"
                  fill="#96CCFF"
                />
                <path
                  d="M45.85 150c-7.75 0-7.75 15.455-15.5 15.455l45.132 51.363 47.868-51.363c-7.295 0-7.295-15.455-15.5-15.455-8.206 0-9.574 15.455-15.5 15.455-5.927 0-8.662-15.455-15.5-15.455-6.839 0-9.118 15.455-15.5 15.455-6.383 0-7.75-15.455-15.5-15.455Z"
                  fill="#001D32"
                />
              </g>
            </svg>
            <div class="tw-max-w-xl tw-text-left">
              <h1
                class="tw-font-heading tw-text-base md:tw-text-lg xl:tw-text-2xl"
              >
                {{ $t('5YearTitle') }}
              </h1>
              <small class="tw-text-sm md:tw-text-base xl:tw-text-lg">
                {{ $t('5YearSubtitle') }}
              </small>
            </div>
          </div>
        </div>
      </div>
      <canvas
        ref="confetti"
        class="tw-pointer-events-none tw-absolute tw-inset-0 tw-h-full tw-w-full"
      />
    </div>
    <div class="tw-container tw-mx-auto tw-p-4">
      <div class="tw-flex tw-items-center tw-gap-x-2">
        <h2 class="text-[2rem] tw-font-medium tw-leading-10">
          {{ $tc('vehicleTotal', totalCount) }}
        </h2>
        <div class="tw-grow"></div>
        <small
          class="tw-hidden tw-text-2xs tw-font-medium tw-leading-4 tw-tracking-wide md:tw-block"
        >
          {{ $t('manageAgenciesTrick') }}
        </small>
        <TwOutlinedIconButton
          class="tw-float-right"
          :title="$t('manageAgencies')"
          @click="open('SettingsDrawer')"
        >
          <TwIcon :path="mdiTune" />
        </TwOutlinedIconButton>
      </div>
      <ul
        v-if="activeAgencies.length"
        class="tw-mt-4 tw-grid tw-list-none tw-grid-cols-2 tw-gap-2 !tw-pl-0 md:tw-grid-cols-3 md:tw-gap-4 xl:tw-grid-cols-4"
      >
        <TwHomeAgencyBadge
          v-for="agency in activeAgencies"
          :key="agency.slug"
          :agency="agency"
          :timestamp="times[agency.slug] || 0"
        />
      </ul>
      <div
        v-else
        class="tw-relative -tw-mx-4 tw-mt-4 tw-space-y-4 tw-bg-secondary-90 tw-p-4 tw-text-center tw-text-secondary-10 dark:tw-bg-secondary-30 dark:tw-text-secondary-90 md:tw-mx-0 md:tw-rounded-xl md:tw-text-left"
      >
        <!-- TODO come back icon! -->
        <!-- <TwIcon
          class="tw-absolute -tw-right-4 -tw-bottom-4 !tw-h-64 !tw-w-64 tw-bg-opacity-50"
          :path="mdiBusMultiple"
        /> -->
        <p class="tw-mb-0 tw-text-4xl tw-font-bold tw-leading-[2.75rem]">
          {{ $t('emptyTitle', { region: region.name }) }}
        </p>
        <p class="tw-mb-0 tw-leading-6 tw-tracking-wide">
          {{ $tc('emptyDescription', region.agencies.length) }}
        </p>
        <TwFilledButton
          with-icon
          class="tw-mx-auto md:tw-mx-0"
          color="secondary"
          @click="addAll"
        >
          <TwIcon :path="mdiPlus" />
          {{ $t('addAllAgencies') }}
        </TwFilledButton>
      </div>
    </div>
    <div
      class="md:tw-container md:tw-mx-auto md:tw-mt-8 md:tw-grid md:tw-grid-cols-2 md:tw-flex-wrap md:tw-items-start md:tw-gap-4 md:tw-px-4 lg:tw-flex lg:tw-flex-nowrap lg:tw-justify-center"
    >
      <!--
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
      -->
      <details
        class="tw-bg-neutralVariant-90 tw-p-4 tw-leading-6 tw-tracking-wide tw-text-neutralVariant-30 dark:tw-bg-neutralVariant-30 dark:tw-text-neutral-80 md:tw-order-3 md:tw-col-span-full md:tw-min-w-[18rem] md:tw-basis-1/3 md:tw-rounded-xl"
        :open="creditsOpen"
      >
        <summary class="tw-list-none">
          <h2
            class="text-[2rem] tw-font-medium tw-leading-10 tw-tracking-normal"
          >
            {{ $t('creditsTitle') }}
            <TwStandardIconButton
              :class="{ 'tw-rotate-180': creditsOpen }"
              class="tw-float-right tw-transition-transform tw-duration-200 tw-ease-linear"
              @click="creditsOpen = !creditsOpen"
            >
              <TwIcon :path="mdiChevronDown" />
            </TwStandardIconButton>
          </h2>
        </summary>
        <p class="mt-4" v-html="region.credits"></p>
        <p>{{ $t('creditsBody') }}</p>
        <ul>
          <li v-for="agency in activeAgencies" :key="agency.slug">
            {{ agency.name }}<br />
            <a target="_blank" :href="agency.license.url">
              {{ agency.license.title }}
            </a>
          </li>
        </ul>
      </details>
      <div
        class="tw-p-4 tw-leading-6 tw-tracking-wide dark:tw-border-neutralVariant-60 md:tw-order-2 md:tw-min-w-[18rem] md:tw-basis-1/3 md:tw-rounded-xl md:tw-border md:tw-border-solid md:tw-border-neutralVariant-50"
      >
        <h2 class="text-[2rem] tw-font-medium tw-leading-10 tw-tracking-normal">
          {{ $t('downloadTitle') }}
        </h2>
        <p class="tw-mt-4">
          {{ $t('downloadBody') }}
        </p>
        <TwTextButton
          with-icon
          class="-tw-ml-4"
          @click="open('DownloadAssistant')"
        >
          <TwIcon :path="mdiDownload" />
          {{ $t('openDownload') }}
        </TwTextButton>
      </div>
      <div
        class="tw-relative tw-bg-primary-90 tw-p-4 tw-leading-6 tw-tracking-wide tw-text-primary-10 dark:tw-bg-primary-30 dark:tw-text-primary-90 md:tw-order-1 md:tw-min-w-[18rem] md:tw-basis-1/3 md:tw-rounded-xl"
      >
        <h2 class="text-[2rem] tw-font-medium tw-leading-10 tw-tracking-normal">
          {{ $t('photoTitle') }}
        </h2>
        <p class="tw-mt-4">
          {{ $t('photoBody') }}
        </p>
        <TwTextButton
          class="-tw-ml-3 tw-text-primary-10 dark:tw-text-primary-95"
          href="https://docs.google.com/forms/d/e/1FAIpQLSecgmVPlQUGiAT4dXu4yv6i0UKtSpJfEFw_98lvoT-hqnVbSQ/viewform?usp=sf_link"
          tag="a"
          target="_blank"
        >
          {{ $t('photoLink') }}
        </TwTextButton>
        <TwIcon
          :path="mdiCameraOutline"
          class="tw-absolute tw-bottom-4 tw-right-4 !tw-h-8 !tw-w-8 tw-text-primary-40 dark:tw-text-primary-80 lg:tw-h-10 lg:tw-w-10 xl:tw-h-12 xl:tw-w-12"
        />
      </div>
    </div>
    <div class="tw-grow"></div>
    <div
      class="tw-container tw-mx-auto tw-flex tw-flex-wrap tw-items-center tw-gap-x-1 tw-p-4 tw-leading-6 tw-tracking-wide"
    >
      <b class="tw-font-medium tw-text-primary-20 dark:tw-text-primary-90">
        Transit&nbsp;Tracker
      </b>
      <span class="tw-hidden tw-grow md:tw-inline">
        &bull; {{ $t('brandSlogan') }}
      </span>
      <span class="tw-block md:tw-hidden"> {{ $t('brandSlogan') }}</span>
      <a
        href="https://api.transittracker.ca"
        target="_blank"
        class="tw-text-primary-40 tw-no-underline hover:tw-text-primary-30 hover:tw-underline dark:tw-text-primary-80 dark:hover:tw-text-primary-90"
      >
        {{ $t('forDevelopers') }} </a
      >&bull;
      <a
        href="https://api.transittracker.ca/vin"
        target="_blank"
        class="tw-text-primary-40 tw-no-underline hover:tw-text-primary-30 hover:tw-underline dark:tw-text-primary-80 dark:hover:tw-text-primary-90"
      >
        {{ $t('exoVin') }} </a
      >&bull;
      <a
        href="https://github.com/TransitTracker"
        target="_blank"
        class="tw-text-primary-40 tw-no-underline hover:tw-text-primary-30 hover:tw-underline dark:tw-text-primary-80 dark:hover:tw-text-primary-90"
      >
        {{ $t('github') }}
      </a>
    </div>
  </div>
</template>

<script>
import {
  mdiCity,
  mdiTune,
  mdiBusMultiple,
  mdiPlus,
  mdiChevronDown,
  mdiDownload,
  mdiCameraOutline,
} from '@mdi/js'
import confetti from 'canvas-confetti'

export default {
  middleware: 'loadData',
  asyncData({ params }) {
    return {
      regionSlug: params.region,
      creditsOpen: false,
      mdiCity,
      mdiTune,
      mdiBusMultiple,
      mdiPlus,
      mdiChevronDown,
      mdiDownload,
      mdiCameraOutline,
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

      return Object.values(this.$store.state.agencies.data)
        .filter(({ slug, regions }) => {
          if (regions.includes('*')) {
            return true
          }
          return (
            activeAgencies.includes(slug) && regions.includes(this.regionSlug)
          )
        })
        .sort((x, y) => {
          return x.isArchived - y.isArchived
        })
    },
    availableAgencies() {
      return this.$store.state.agencies.data
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
  mounted() {
    const canvas = this.$refs.confetti

    canvas.confetti =
      canvas.confetti ||
      confetti.create(canvas, {
        resize: true,
        useWorker: true,
        disableForReducedMotion: true,
      })

    setTimeout(() => {
      this.launchConfetti()
    }, 500)
  },
  methods: {
    addAll() {
      Object.keys(this.availableAgencies)
        .filter((slug) => !this.activeAgencies.includes(slug))
        .forEach((slug) => {
          this.$store.dispatch(
            'settings/toggleAgency',
            this.availableAgencies[slug]
          )
        })
    },
    launchConfetti() {
      const canvas = this.$refs.confetti
      const randomInRange = (min, max) => Math.random() * (max - min) + min
      const colors = this.$vuetify.theme.dark
        ? [
            '#96CCFF',
            '#003353',
            '#004A75',
            '#CEE5FF',
            '#53DBCA',
            '#003732',
            '#005048',
            '#74F8E6',
          ]
        : [
            '#00639A',
            '#CEE5FF',
            '#001D32',
            '#FFFFFF',
            '#006A60',
            '#74F8E6',
            '#00201C',
          ]

      canvas.confetti({
        angle: randomInRange(40, 80),
        spread: 55,
        particleCount: randomInRange(150, 200),
        origin: { y: 1.5, x: 0 },
        colors,
      })

      canvas.confetti({
        angle: randomInRange(100, 140),
        spread: 55,
        particleCount: randomInRange(150, 200),
        origin: { y: 1.5, x: 1 },
        colors,
      })
    },
    open(setting) {
      this.$store.commit('app/set', { key: 'open' + setting, value: true })
    },
  },
}
</script>

<i18n>
{
  "en": {
    "welcome": "Welcome to",
    "version": "Version {version}",
    "changeRegion": "Change region",
    "vehicleTotal": "No vehicle | 1 vehicle is active | {n} vehicles are active",
    "manageAgenciesTrick": "Add or remove agencies right here ⟶",
    "manageAgencies": "Add or remove currently visible agencies",
    "emptyTitle": "Welcome here!",
    "emptyDescription": "It looks like you haven't added any agencies for this region yet. To get the full Transit Tracker experience, we recommend adding the {n} available agencies. Don't worry, you can change your available agencies at any time in the settings.",
    "addAllAgencies": "Add all agencies",
    "creditsTitle": "Credits and licenses",
    "creditsBody": "For each agency, all intellectual property rights relating to the data belong to them. Here are the respective licenses for agencies in this region:",
    "downloadTitle": "Download data",
    "downloadBody": "Transit Tracker allows you to download either the data you see on the screen or an archive of all the data recorded by the server.",
    "openDownload": "Open download wizard",
    "photoTitle": "Photos are welcome!",
    "photoBody": "Submit your photo representing public transit in your area! It could be posted on Transit Tracker, at the top of your region's page.",
    "photoLink": "Submit a photo",
    "brandSlogan": "Making real time transit data accessible",
    "forDevelopers": "For Developers",
    "exoVin": "exo VIN Project",
    "github": "On GitHub",
    "5YearTitle": "Happy Birthday Transit Tracker!",
    "5YearSubtitle": "5 years of sightings, 14000+ vehicles, 40 agencies, 6 regions. Thank you for being part of this adventure!"
  },
  "fr": {
    "welcome": "Bienvenue sur",
    "version": "Version {version}",
    "changeRegion": "Changer de région",
    "vehicleTotal": "Aucun véhicule | 1 véhicule est actif | {n} véhicules sont actifs",
    "manageAgenciesTrick": "Ajouter ou retirer des agences juste ici ⟶",
    "manageAgencies": "Ajouter ou retirer les agences présentement visible",
    "emptyTitle": "Bienvenue ici!",
    "emptyDescription": "Il semble que vous n'avez pas encore ajouté d'agences pour cette région. Pour vivre l'expérience complète de Transit Tracker, nous vous recommandons d'ajouter les {n} agences disponibles. Pas de panique, vous pouvez changer vos agences disponibles en tout temps dans les paramètres.",
    "addAllAgencies": "Ajouter toutes les agences",
    "creditsTitle": "Crédits et licences",
    "creditsBody": "Pour chaque agence, tous les droits de propriété intellectuelle relatifs aux données leur appartiennent. Voici les licenses respectivent pour les agences de cette région :",
    "downloadTitle": "Télécharger des données",
    "downloadBody": "Transit Tracker vous permet de télécharger soit les données que vous voyez à l'écran, soit une archive de toutes les données enregistrées par le serveur. ",
    "openDownload": "Ouvrir l'assistant de téléchargement",
    "photoTitle": "Les photos sont les bienvenues !",
    "photoBody": "Proposez votre photo représentant le transport en commun dans votre région! Elle pourrait être affiché sur Transit Tracker, au haut de la page de votre région.",
    "photoLink": "Proposer une photo",
    "brandSlogan": "Rendre accessibles les données de transport en temps réel",
    "forDevelopers": "Site pour les développeurs",
    "exoVin": "Projet exo VIN",
    "github": "Sur GitHub",
    "5YearTitle": "Joyeux anniversaire Transit Tracker!",
    "5YearSubtitle": "5 ans d'exploration, 14000+ véhicules, 40 agences, 6 régions. Merci de faire partie de cette aventure!"
  }
}
</i18n>
