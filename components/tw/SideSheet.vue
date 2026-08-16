<template>
  <transition
    enter-active-class=""
    enter-class="tw:*:-translate-x-full !tw-bg-opacity-0"
    enter-to-class="tw:*:translate-x-0"
    leave-active-class=""
    leave-class="tw:*:translate-x-0"
    leave-to-class="tw:*:-translate-x-full !tw-bg-opacity-0"
  >
    <div
      class="tw:fixed tw:inset-0 tw:z-20 tw:h-screen tw:w-screen tw:bg-neutral-variant-20 tw-bg-opacity-32 tw:transition-colors tw:duration-300 tw:ease-standard-effects-slow"
      v-if="isActive"
    >
      <section
        class="tw:fixed tw:inset-x-0 tw:inset-y-0 tw:z-20 tw:h-full tw:overflow-y-auto tw:bg-neutral-96 tw:transition-transform tw:duration-500 tw:ease-standard-spatial tw:dark:bg-neutral-10 tw:md:left-20 tw:md:w-1/2 tw:md:max-w-100 tw:md:rounded-r-2xl tw:md:shadow-lg"
      >
        <div
          class="tw:fixed tw:z-30 tw:flex tw:w-full tw:items-center tw:gap-x-3 tw:bg-neutral-96 tw:p-4 tw:dark:bg-neutral-10 tw:md:max-w-100 tw:md:rounded-tr-2xl"
        >
          <TwStandardIconButton v-if="showBackButton" @click="$emit('back')">
            <TwIcon :path="mdiArrowLeft" />
          </TwStandardIconButton>
          <h2 class="tw:grow tw:font-heading tw:text-[1.375rem] tw:leading-7">
            {{ title }}
          </h2>
          <TwStandardIconButton @click="$emit('close')">
            <TwIcon :path="mdiClose" />
          </TwStandardIconButton>
        </div>
        <div class="tw:min-h-full tw:px-4 tw:pb-4">
          <div
            class="tw:flex tw:w-full tw:items-center tw:justify-center tw:pt-20"
            v-if="isLoading"
          >
            <TwIcon
              :path="mdiLoading"
              class="tw:h-10! tw:w-10! tw:animate-spin"
            />
          </div>
          <slot v-else />
        </div>
      </section>
    </div>
  </transition>
</template>

<script>
import { mdiArrowLeft, mdiClose, mdiLoading } from '@mdi/js'

export default {
  data: () => ({
    mdiArrowLeft,
    mdiClose,
    mdiLoading,
  }),
  props: {
    showBackButton: {
      type: Boolean,
      required: false,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>
