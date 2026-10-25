<template>
  <NuxtLink
    v-slot="{ isActive, navigate }"
    :to="to"
    tag="li"
    exact
    @click="$emit('click')"
  >
    <a
      class="tw:group tw:min-h-14 tw:text-neutral-variant-30! tw:no-underline tw:outline-hidden tw:dark:text-neutral-variant-80!"
      href="#"
      @click="navigate"
    >
      <div
        class="tw:relative tw:flex tw:h-8 tw:w-16 tw:items-center tw:justify-center tw:rounded-2xl tw:transition-colors tw:duration-300"
        :class="[
          isActive
            ? 'tw:bg-secondary-90 tw:text-secondary-10 tw:dark:bg-secondary-30 tw:dark:text-secondary-90'
            : 'tw:bg-transparent tw:text-neutral-variant-30 tw:group-hover:bg-neutral-variant-30/8 tw:group-focus:bg-neutral-variant-30/12 tw:dark:text-neutral-variant-80 tw:dark:group-hover:bg-neutral-variant-80/8 tw:dark:group-focus:bg-neutral-variant-80/12',
        ]"
      >
        <TwIcon :path="isActive ? (activeIcon ?? icon) : icon" />
      </div>
      <p
        class="tw:mb-0! tw:pt-1 tw:text-center tw:text-xs"
        :class="[isActive && 'tw:text-secondary-10 tw:dark:text-secondary-90']"
      >
        <slot></slot>
      </p>
    </a>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    activeIcon: {
      type: String,
      required: false,
      default: null,
    },
  },
}
</script>
