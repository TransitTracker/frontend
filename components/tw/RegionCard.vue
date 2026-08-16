<template>
  <NuxtLink
    :to="localePath(`/regions/${slug}`)"
    tag="button"
    :disabled="isCurrent"
    class="tw:group tw:justify-end tw:disabled:md:w-36 tw:disabled:md:shrink tw:relative tw:flex tw:aspect-square tw:w-full tw:shrink-0 tw:flex-col tw:items-start tw:rounded-[1.75rem] tw:bg-cover tw:bg-center tw:bg-no-repeat tw:p-4 tw:text-left tw:text-neutral-98 tw:no-underline tw:transition-[flex-shrink] tw:duration-300 tw:ease-standard-effects-slow tw:focus:outline-3 tw:focus:outline-offset-2 tw:focus:outline-secondary-40 tw:disabled:shrink tw:disabled:justify-between tw:dark:focus:outline-secondary-80"
    :class="[
      size === 'lg'
        ? 'tw:md:aspect-auto tw:md:h-100 tw:md:w-60'
        : 'tw:md:aspect-auto tw:md:h-80 tw:md:w-56',
    ]"
    :style="cardStyle"
  >
    <!-- Overlay -->
    <div
      class="tw:absolute tw:inset-0 tw:h-full tw:w-full tw:rounded-[1.75rem] tw:bg-linear-to-b tw:from-primary-40/75 tw:to-primary-40/75 tw:transition-colors tw:duration-150 tw:ease-standard-effects-fast tw:group-hover:bg-neutral-10/8 tw:group-focus:bg-neutral-10/10 tw:group-disabled:bg-neutral-98/38 tw:dark:from-primary-30/75 tw:dark:to-primary-30/75 tw:md:from-transparent tw:dark:md:from-transparent tw:md:to-primary-40/90 tw:dark:md:to-primary-30/90"
    ></div>

    <div
      v-if="isCurrent"
      class="tw:relative tw:z-10 tw:inline-block tw:w-max tw:rounded-full tw:bg-secondary-40 tw:px-2 tw:py-1 tw:text-xs tw:text-white tw:dark:bg-secondary-80 tw:dark:text-secondary-20"
    >
      {{ $t('youAreHere') }}
    </div>

    <div class="tw:relative tw:z-10 tw:w-full tw:min-w-0">
      <b
        class="tw:block tw:font-heading tw:text-xl tw:line-clamp-2 tw:wrap-break-words"
      >
        {{ name }}
      </b>
      <p class="tw:truncate">{{ $tc('agencies', agencyCount) }}</p>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  name: 'RegionCard',
  props: {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: '',
    },
    agencyCount: {
      type: Number,
      default: 0,
    },
    isCurrent: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'md',
      validator: (val) => ['md', 'lg'].includes(val),
    },
  },
  computed: {
    cardStyle() {
      if (!this.image) return {}
      const backendHost = process.env.backendHost || ''
      return {
        backgroundImage: `url(${backendHost}/storage/content/regions/${this.image})`,
      }
    },
  },
}
</script>

<i18n>
{
  "en": {
    "youAreHere": "You are here",
    "agencies": "No agencies | 1 agency | {n} agencies"
  },
  "fr": {
    "youAreHere": "Vous êtes ici",
    "agencies": "Aucune agence | 1 agence | {n} agences"
  }
}
</i18n>
