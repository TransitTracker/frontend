<template>
  <NuxtLink
    :to="localePath(`/regions/${slug}`)"
    tag="button"
    :disabled="isCurrent"
    class="tw:group tw:relative tw:flex tw:aspect-square tw:w-full tw:shrink-0 tw:flex-col tw:items-start tw:justify-end tw:overflow-hidden tw:rounded-[1.75rem] tw:p-4 tw:text-left tw:text-neutral-98 tw:no-underline tw:transition-[flex-shrink] tw:duration-300 tw:ease-standard-effects-slow tw:focus:outline-3 tw:focus:outline-offset-2 tw:focus:outline-secondary-40 tw:disabled:justify-between tw:disabled:md:w-36 tw:dark:focus:outline-secondary-80"
    :class="[
      size === 'lg'
        ? 'tw:md:aspect-auto tw:md:h-100 tw:md:w-60'
        : 'tw:md:aspect-auto tw:md:h-80 tw:md:w-56',
    ]"
    @click.native="handleClick"
  >
    <!-- Background Image with smooth hover scale -->
    <div
      class="tw:absolute tw:inset-0 tw:h-full tw:w-full tw:rounded-[1.75rem] tw:bg-cover tw:bg-center tw:bg-no-repeat tw:transition-transform tw:duration-500 tw:ease-standard-effects-slow"
      :class="[
        !isCurrent && 'tw:group-hover:scale-110 tw:group-focus:scale-110',
      ]"
      :style="cardStyle"
    ></div>

    <!-- Overlay Gradient -->
    <div
      class="tw:absolute tw:inset-0 tw:h-full tw:w-full tw:rounded-[1.75rem] tw:bg-linear-to-b tw:from-primary-40/75 tw:to-primary-40/75 tw:transition-all tw:duration-300 tw:ease-standard-effects tw:dark:from-primary-30/75 tw:dark:to-primary-30/75 tw:md:from-transparent tw:dark:md:from-transparent tw:md:to-primary-40/90 tw:dark:md:to-primary-30/90"
      :class="[
        !isCurrent &&
          'tw:group-hover:from-neutral-10/30 tw:group-hover:to-primary-40/95 tw:dark:group-hover:from-neutral-10/30 tw:dark:group-hover:to-primary-30/95',
      ]"
    ></div>

    <!-- Inner border highlight -->
    <div
      class="tw:pointer-events-none tw:absolute tw:inset-0 tw:rounded-[1.75rem] tw:ring-1 tw:ring-white/15 tw:transition-all tw:duration-300"
      :class="[
        !isCurrent &&
          'tw:group-hover:ring-white/40 tw:group-hover:shadow-inner',
      ]"
    ></div>

    <!-- "You are here" badge -->
    <div
      v-if="isCurrent"
      class="tw:relative tw:z-10 tw:inline-block tw:w-max tw:rounded-full tw:bg-secondary-40 tw:px-2.5 tw:py-1 tw:text-xs tw:font-medium tw:text-white tw:shadow-xs tw:dark:bg-secondary-80 tw:dark:text-secondary-20"
    >
      {{ $t('youAreHere') }}
    </div>

    <!-- Bottom content with subtle upward shift and arrow reveal -->
    <div
      class="tw:relative tw:z-10 tw:w-full tw:min-w-0 tw:transition-transform tw:duration-300 tw:ease-standard-effects"
      :class="[!isCurrent && 'tw:group-hover:-translate-y-1']"
    >
      <div class="tw:flex tw:items-center tw:justify-between tw:gap-1.5">
        <b
          class="tw:block tw:font-heading tw:text-xl tw:leading-tight tw:line-clamp-2 tw:wrap-break-words tw:transition-colors tw:duration-200 tw:group-hover:text-white"
        >
          {{ name }}
        </b>
        <svg
          v-if="!isCurrent"
          viewBox="0 0 24 24"
          class="tw:h-5 tw:w-5 tw:shrink-0 tw:text-secondary-80 tw:opacity-0 tw:transition-all tw:duration-300 tw:ease-standard-effects tw:-translate-x-2 tw:group-hover:translate-x-0 tw:group-hover:opacity-100 tw:dark:text-secondary-90"
        >
          <path fill="currentColor" :d="mdiArrowRight" />
        </svg>
      </div>
      <p
        class="tw:mt-0.5 tw:truncate tw:text-sm tw:opacity-90 tw:transition-opacity tw:duration-200 tw:group-hover:opacity-100"
      >
        {{ $tc('agencies', agencyCount) }}
      </p>
    </div>
  </NuxtLink>
</template>

<script>
import { mdiArrowRight } from '@mdi/js'

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
  data: () => ({
    mdiArrowRight,
  }),
  computed: {
    cardStyle() {
      if (!this.image) return {}
      const backendHost = process.env.backendHost || ''
      return {
        backgroundImage: `url(${backendHost}/storage/content/regions/${this.image})`,
      }
    },
  },
  methods: {
    handleClick(event) {
      this.$emit('click', event)
      if (this.$store.state.app.regionSwitcherVisible) {
        this.$store.commit('app/set', {
          key: 'regionSwitcherVisible',
          value: false,
        })
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
