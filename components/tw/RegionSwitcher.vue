<template>
  <TwBasicDialog
    v-model="regionSwitcherVisible"
    class="tw:md:max-w-[75vw]"
    @input="closeDialog()"
  >
    <template #header> {{ $t('heading') }} </template>
    <p>
      {{ $t('intro') }}
    </p>
    <div
      class="tw:mt-4 tw:grid tw:grid-cols-2 tw:gap-2 tw:overflow-x-scroll tw:py-2 tw:md:-mr-6 tw:md:flex tw:md:flex-nowrap tw:md:overflow-x-auto tw:md:pr-6"
    >
      <NuxtLink
        v-for="region in regions"
        :key="region.slug"
        :to="localePath(`/regions/${region.slug}`)"
        tag="button"
        class="tw:group tw:relative tw:flex tw:aspect-square tw:shrink-0 tw:flex-col tw:items-start tw:justify-end tw:rounded-[1.75rem] tw:bg-cover tw:bg-center tw:bg-no-repeat tw:p-4 tw:text-left tw:text-neutral-98 tw:no-underline tw:transition-[flex-shrink] tw:duration-300 tw:ease-standard-effects-slow tw:focus:outline tw:focus:outline-3 tw:focus:outline-offset-2 tw:focus:outline-secondary-40 tw:disabled:shrink tw:disabled:justify-between tw:dark:focus:outline-secondary-80 tw:md:aspect-auto tw:md:h-100 tw:md:w-60"
        :style="{
          backgroundImage: `url(${backendHost}/storage/content/regions/${region.image})`,
        }"
        :disabled="region.slug === currentRegion"
      >
        <div
          class="tw:absolute tw:inset-0 tw:h-full tw:w-full tw:rounded-[1.75rem] tw:bg-linear-to-b tw:from-primary-40/75 tw:to-primary-40/75 tw:transition-colors tw:duration-150 tw:ease-standard-effects-fast tw:group-hover:bg-neutral-10/8 tw:group-focus:bg-neutral-10/10 tw:group-disabled:bg-neutral-98/38 tw:dark:from-primary-30/75 tw:dark:to-primary-30/75 tw:md:from-transparent tw:md:via-transparent tw:md:to-primary-40/90 tw:dark:md:to-primary-30/90"
        ></div>
        <div
          v-if="region.slug === currentRegion"
          class="tw:relative tw:z-10 tw:inline tw:w-max tw:rounded-full tw:bg-secondary-40 tw:px-2 tw:py-1 tw:text-xs tw:text-white tw:dark:bg-secondary-80 tw:dark:text-secondary-20"
        >
          {{ $t('youAreHere') }}
        </div>
        <div class="tw:relative tw:z-10">
          <b class="tw:font-heading tw:text-xl">{{ region.name }}</b>
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
    regionSwitcherVisible: {
      get() {
        return this.$store.state.app.regionSwitcherVisible
      },
      set(val) {
        val && this.closeDialog()
      },
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
