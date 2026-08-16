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
        class="tw:relative tw:flex tw:h-8 tw:w-16 tw:items-center tw:justify-center tw:rounded-2xl tw-bg-opacity-0 tw:transition-colors tw:duration-300 group-hover:tw-bg-opacity-8 group-focus:tw-bg-opacity-12 dark:tw-bg-opacity-0"
        :class="[
          isActive
            ? 'tw:bg-secondary-90 tw:text-secondary-10 tw:dark:bg-secondary-30 tw:dark:text-secondary-90'
            : 'tw:bg-neutral-variant-30 tw:dark:bg-neutral-variant-80',
        ]"
      >
        <!--<Transition
          enter-from-class="tw:w-4 tw-bg-opacity-25"
          enter-active-class="tw:duration-400 tw:ease-emphasized-accelerate"
          enter-to-class="tw-bg-opacity-100"
          leave-from-class="tw-bg-opacity-100"
          leave-active-class="tw:duration-200 tw:ease-emphasized-decelerate"
          leave-to-class="tw:w-4 tw-bg-opacity-25"
        >
          <div
            v-show="isActive"
            class="tw:absolute tw:flex tw:h-8 tw:w-full tw:items-center tw:justify-center tw:rounded-2xl tw:bg-secondary-90 tw:text-secondary-10 tw:transition-[width] tw:dark:bg-secondary-30 tw:dark:text-secondary-90"
          />
        </Transition>-->
        <TwIcon :path="isActive ? activeIcon ?? icon : icon" />
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
