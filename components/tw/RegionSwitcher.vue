<template>
  <TwBasicDialog
    v-model="regionSwitcherVisible"
    class="md:tw-max-w-[75vw]"
    @input="closeDialog()"
  >
    <template #header> {{ $t('heading') }} </template>
    <p>
      {{ $t('intro') }}
    </p>
    <div
      class="tw-mt-4 tw-flex tw-flex-nowrap tw-gap-2 tw-overflow-y-scroll tw-py-2 md:-tw-mr-6 md:tw-pr-6"
    >
      <NuxtLink
        v-for="region in regions"
        :key="region.slug"
        :to="localePath(`/regions/${region.slug}`)"
        tag="button"
        class="tw-group tw-relative tw-flex tw-h-100 tw-w-60 tw-shrink-0 tw-flex-col tw-items-start tw-justify-end tw-rounded-[1.75rem] tw-bg-cover tw-bg-center tw-bg-no-repeat tw-p-4 tw-text-left tw-text-neutral-98 tw-no-underline tw-transition-[flex-shrink] tw-duration-300 tw-ease-standard-effects-slow focus:tw-outline focus:tw-outline-3 focus:tw-outline-offset-2 focus:tw-outline-secondary-40 disabled:tw-shrink disabled:tw-justify-between"
        :style="{
          backgroundImage: `url(${backendHost}/storage/content/regions/${region.image})`,
        }"
        :disabled="region.slug === currentRegion"
      >
        <div
          class="tw-absolute tw-inset-0 tw-h-full tw-w-full tw-rounded-[1.75rem] tw-bg-gradient-to-b tw-from-transparent tw-via-transparent tw-to-primary-40/75 tw-transition-colors tw-duration-150 tw-ease-standard-effects-fast group-hover:tw-bg-neutral-10/8 group-focus:tw-bg-neutral-10/10 group-disabled:tw-bg-neutral-98/38"
        ></div>
        <div
          v-if="region.slug === currentRegion"
          class="tw-relative tw-z-10 tw-inline tw-w-max tw-rounded-full tw-bg-primary-40 tw-px-2 tw-py-1 tw-text-xs tw-text-white"
        >
          {{ $t('youAreHere') }}
        </div>
        <div class="tw-relative tw-z-10">
          <b class="tw-font-heading tw-text-xl">{{ region.name }}</b>
          <p>{{ $tc('agencies', region.agencies.length) }}</p>
        </div>
      </NuxtLink>
    </div>
  </TwBasicDialog>
</template>

<script>
export default {
  data: () => ({
    backendHost: process.env.backendHost,
  }),
  computed: {
    currentRegion() {
      return this.$store.state.settings.currentRegion
    },
    regionSwitcherVisible() {
      return this.$store.state.app.regionSwitcherVisible
    },
    regions() {
      return this.$store.state.regions.data
    },
  },
  methods: {
    closeDialog() {
      this.$store.commit('app/set', {
        key: 'regionSwitcherVisible',
        value: false,
      })
    },
  },
}
</script>
<i18n>
{
  "en": {
    "heading": "Start exploring",
    "intro": "Transit Tracker lets you discover many other Canadian cities and regions.",
    "youAreHere": "You are here",
    "agencies": "No agencies | 1 agency | {n} agencies"
  },
  "fr": {
    "heading": "Partez à la découverte",
    "intro": "Transit Tracker vous permet de découvrir plusieurs autres villes et régions canadiennes.",
    "youAreHere": "Vous êtes ici",
    "agencies": "Aucune agence | 1 agence | {n} agences"
  }
}
</i18n>
