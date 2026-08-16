<template>
  <div
    class="tw:mt-4 tw:grid tw:grid-cols-2 tw:gap-2 tw:py-2 tw:md:-mr-6 tw:md:flex tw:md:pr-6"
    :aria-busy="loading"
    :aria-label="loading ? $t('loading') : undefined"
    :class="
      size === 'lg'
        ? 'tw:md:overflow-x-auto tw:scrollbar-thin tw:scrollbar-thumb-neutral-10 tw:dark:scrollbar-thumb-neutral-90'
        : 'tw:md:flex-wrap'
    "
  >
    <!-- Skeleton Loading State -->
    <template v-if="loading || !normalizedRegions.length">
      <div
        v-for="skeleton in 6"
        :key="skeleton"
        class="tw:relative tw:flex tw:aspect-square tw:w-full tw:shrink-0 tw:flex-col tw:justify-end tw:rounded-[1.75rem] tw:bg-neutral-92 tw:p-4 tw:dark:bg-neutral-17"
        :class="
          size === 'lg'
            ? 'tw:md:aspect-auto tw:md:h-100 tw:md:w-60'
            : 'tw:md:aspect-auto tw:md:h-80 tw:md:w-56'
        "
      >
        <div
          class="tw:absolute tw:inset-0 tw:animate-pulse tw:rounded-[1.75rem] tw:bg-neutral-variant-90/40 tw:dark:bg-neutral-variant-30/40"
        ></div>
        <div class="tw:relative tw:z-10 tw:flex tw:w-full tw:flex-col tw:gap-2">
          <div
            class="tw:h-6 tw:w-3/4 tw:animate-pulse tw:rounded-full tw:bg-neutral-10/20 tw:dark:bg-neutral-90/20"
          ></div>
          <div
            class="tw:h-4 tw:w-1/2 tw:animate-pulse tw:rounded-full tw:bg-neutral-variant-30/15 tw:dark:bg-neutral-variant-80/15"
          ></div>
        </div>
      </div>
    </template>

    <!-- Loaded Cards -->
    <template v-else>
      <TwRegionCard
        v-for="region in normalizedRegions"
        :key="region.slug"
        :name="region.name"
        :slug="region.slug"
        :image="region.image"
        :agency-count="region.agencyCount"
        :is-current="region.slug === currentRegion"
        :size="size"
      />
    </template>
  </div>
</template>

<script>
export default {
  name: 'RegionGrid',
  props: {
    regions: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    currentRegion: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'md',
      validator: (val) => ['md', 'lg'].includes(val),
    },
  },
  computed: {
    normalizedRegions() {
      let list = []

      if (Array.isArray(this.regions)) {
        list = this.regions
      } else if (this.regions && typeof this.regions === 'object') {
        list = Object.values(this.regions)
      } else {
        return []
      }

      return list.map((item) => {
        const raw = item?.properties || item || {}
        let count = 0

        if (Array.isArray(raw.agencies)) {
          count = raw.agencies.length
        } else if (typeof raw.agencies === 'number') {
          count = raw.agencies
        }

        return {
          name: raw.name || '',
          slug: raw.slug || '',
          image: raw.image || '',
          agencyCount: count,
        }
      })
    },
  },
}
</script>

<i18n>
{
  "en": {
    "loading": "Loading regions..."
  },
  "fr": {
    "loading": "Chargement des régions..."
  }
}
</i18n>
