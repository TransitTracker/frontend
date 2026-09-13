<template>
  <component
    :is="tagComponent"
    :to="to"
    :href="href"
    :target="href ? '_blank' : undefined"
    :rel="href ? 'noopener noreferrer' : undefined"
    class="tw:group tw:relative tw:flex tw:flex-col tw:justify-between tw:overflow-hidden tw:rounded-2xl tw:p-6 tw:no-underline tw:shadow-xs tw:cursor-pointer"
    :class="[colorClasses]"
    @click="$emit('click', $event)"
  >
    <div>
      <div class="tw:flex tw:items-start tw:justify-between tw:gap-3">
        <slot name="title">
          <h3 class="tw:font-heading tw:text-2xl tw:font-bold tw:leading-8">
            {{ title }}
          </h3>
        </slot>
        <slot name="icon">
          <div
            v-if="icon"
            class="tw:flex tw:h-12 tw:w-12 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-xl"
            :class="[iconBoxClasses]"
          >
            <TwIcon :path="icon" class="tw:h-6! tw:w-6!" />
          </div>
        </slot>
      </div>
      <slot>
        <p
          v-if="description"
          class="tw:mt-2 tw:text-sm tw:leading-relaxed tw:opacity-90"
        >
          {{ description }}
        </p>
      </slot>
    </div>
    <div
      v-if="actionText || $slots.action"
      class="tw:mt-6 tw:flex tw:items-center tw:gap-1.5 tw:text-sm tw:font-semibold"
    >
      <slot name="action">
        <span>{{ actionText }}</span>
        <TwIcon
          v-if="actionIcon"
          :path="actionIcon"
          class="tw:h-4! tw:w-4! tw:transition-transform tw:duration-200 tw:group-hover:translate-x-1"
        />
      </slot>
    </div>
  </component>
</template>

<script>
import { mdiArrowRight } from '@mdi/js'

export default {
  name: 'ActionCard',
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
    description: {
      type: String,
      required: false,
      default: '',
    },
    icon: {
      type: String,
      required: false,
      default: null,
    },
    to: {
      type: [String, Object],
      required: false,
      default: null,
    },
    href: {
      type: String,
      required: false,
      default: null,
    },
    color: {
      type: String,
      required: false,
      default: 'primary',
      validator: (val) =>
        ['primary', 'secondary', 'tonal', 'outlined', 'elevated'].includes(val),
    },
    actionText: {
      type: String,
      required: false,
      default: '',
    },
    actionIcon: {
      type: String,
      required: false,
      default: mdiArrowRight,
    },
    tag: {
      type: String,
      required: false,
      default: 'div',
    },
  },
  data: () => ({
    mdiArrowRight,
  }),
  computed: {
    tagComponent() {
      if (this.to) return 'NuxtLink'
      if (this.href) return 'a'
      return this.tag || 'div'
    },
    colorClasses() {
      switch (this.color) {
        case 'secondary':
          return 'tw:bg-secondary-90 tw:text-secondary-10 tw:dark:bg-secondary-30 tw:dark:text-secondary-90'
        case 'elevated':
          return 'tw:bg-neutral-96 tw:shadow tw:text-neutral-10 tw:dark:bg-neutral-10 tw:dark:text-neutral-90'
        case 'tonal':
          return 'tw:bg-neutral-90 tw:text-neutral-variant-10 tw:dark:bg-neutral-variant-30 tw:dark:text-neutral-variant-90'
        case 'outlined':
          return 'tw:border tw:border-neutral-variant-80 tw:bg-transparent tw:text-neutral-variant-30 tw:dark:border-neutral-variant-30 tw:dark:text-neutral-variant-80'
        case 'primary':
        default:
          return 'tw:bg-primary-90 tw:text-primary-10 tw:dark:bg-primary-30 tw:dark:text-primary-90'
      }
    },
    iconBoxClasses() {
      switch (this.color) {
        case 'secondary':
          return 'tw:bg-secondary-40/15 tw:text-secondary-40 tw:dark:bg-white/10 tw:dark:text-white'
        case 'tonal':
          return 'tw:bg-neutral-variant-50/20 tw:text-neutral-variant-30 tw:dark:bg-white/10 tw:dark:text-white'
        case 'outlined':
          return 'tw:bg-neutral-variant-50/15 tw:text-neutral-variant-30 tw:dark:bg-white/10 tw:dark:text-white'
        case 'primary':
        default:
          return 'tw:bg-primary-40/15 tw:text-primary-30 tw:dark:bg-white/10 tw:dark:text-white'
      }
    },
  },
}
</script>
