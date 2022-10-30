<template>
  <NuxtLink v-slot="{ isActive, navigate }" :to="to" tag="li" exact>
    <a
      class="!dark:tw-text-neutralVariant-80 tw-min-h-[3.5rem] !tw-text-neutralVariant-30"
      @click="navigate"
    >
      <div
        class="animate-[wiggle_1s_ease-in-out_infinite] tw-flex tw-h-8 tw-w-16 tw-items-center tw-justify-center tw-rounded-2xl tw-transition-transform tw-duration-200 tw-ease-in-out"
        :class="[
          isActive
            ? 'tw-bg-secondary-90 tw-text-secondary-10 dark:tw-bg-secondary-30 dark:tw-text-secondary-90'
            : 'hover:tw-bg-neutralVariant-30/8 focus:tw-bg-neutralVariant-30/12 dark:hover:tw-bg-neutralVariant-80/8 dark:focus:tw-bg-neutral-80/12',
        ]"
      >
        <TwIcon :path="isActive ? activeIcon ?? icon : icon" />
      </div>
      <p
        class="!tw-mb-0 tw-pt-1 tw-text-center"
        :class="{ 'tw-text-neutral-10 dark:tw-text-neutral-90': isActive }"
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
