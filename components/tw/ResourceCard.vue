<template>
  <component
    :is="tagComponent"
    :to="to"
    :href="href"
    :target="href ? '_blank' : undefined"
    :rel="href ? 'noopener noreferrer' : undefined"
    tag="button"
    class="tw:group tw:relative tw:flex tw:aspect-square tw:w-full tw:shrink-0 tw:flex-col tw:items-start tw:justify-between tw:overflow-hidden tw:rounded-[1.75rem] tw:bg-secondary-90 tw:p-5 tw:text-left tw:text-secondary-10 tw:no-underline tw:transition-all tw:duration-300 tw:ease-standard-effects tw:hover:shadow-md tw:focus:outline-3 tw:focus:outline-offset-2 tw:focus:outline-secondary-40 tw:dark:bg-secondary-30 tw:dark:text-secondary-90 tw:dark:focus:outline-secondary-80"
    :class="[
      size === 'lg'
        ? 'tw:md:aspect-auto tw:md:h-100 tw:md:w-60'
        : size === 'md'
          ? 'tw:md:aspect-auto tw:md:h-80 tw:md:w-56'
          : 'tw:md:size-56',
    ]"
  >
    <!-- Top icon & indicator -->
    <div class="tw:flex tw:w-full tw:items-start tw:justify-between tw:gap-2">
      <TwIcon
        :path="icon"
        class="tw:size-8! tw:shrink-0 tw:text-secondary-40 tw:duration-300 tw:dark:text-secondary-80"
      />

      <div
        class="tw:flex tw:size-8 tw:items-center tw:justify-center tw:rounded-full tw:text-secondary-40/70 tw:transition-colors tw:duration-200 tw:group-hover:text-secondary-40 tw:dark:text-secondary-80/70 tw:dark:group-hover:text-secondary-80"
      >
        <TwIcon
          :path="href ? mdiOpenInNew : mdiArrowRight"
          class="tw:size-5!"
        />
      </div>
    </div>

    <!-- Content -->
    <div class="tw:w-full tw:min-w-0">
      <b
        class="tw:block tw:font-heading tw:text-lg tw:font-semibold tw:leading-snug tw:text-secondary-10 tw:dark:text-secondary-90 tw:md:text-xl"
      >
        {{ title }}
      </b>
      <p
        v-if="description"
        class="tw:mt-1 tw:text-xs tw:leading-relaxed tw:text-secondary-20/85 tw:dark:text-secondary-90/85 tw:md:text-sm"
      >
        {{ description }}
      </p>
    </div>
  </component>
</template>

<script>
import { mdiArrowRight, mdiOpenInNew } from '@mdi/js'

export default {
  name: 'ResourceCard',
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      required: true,
    },
    to: {
      type: [String, Object],
      default: null,
    },
    href: {
      type: String,
      default: null,
    },
    size: {
      type: String,
      default: 'sm',
      validator: (val) => ['sm', 'md', 'lg'].includes(val),
    },
  },
  data: () => ({
    mdiArrowRight,
    mdiOpenInNew,
  }),
  computed: {
    tagComponent() {
      if (this.to) return 'NuxtLink'
      if (this.href) return 'a'
      return 'button'
    },
  },
}
</script>
