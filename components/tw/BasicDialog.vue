<template>
  <div tabindex="-1" :aria-hidden="!isOpen">
    <div
      class="tw-pointer-events-none tw-fixed tw-top-0 tw-left-0 tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center"
    >
      <div
        class="tw-absolute tw-inset-0 tw-z-40 tw-bg-black/75"
        v-show="isOpen"
      ></div>
      <div
        class="tw-pointer-events-auto tw-z-50 tw-min-w-[17.5rem] tw-max-w-[35rem] tw-rounded-[1.75rem] tw-bg-neutral-99 tw-p-6 tw-text-neutralVariant-30 dark:tw-bg-neutral-10 dark:tw-text-neutralVariant-80"
        v-show="isOpen"
        v-on-clickaway="handleInput"
      >
        <h2
          class="tw-text-2xl tw-leading-8 tw-text-neutral-10 dark:tw-text-neutral-90"
        >
          <slot name="header"></slot>
        </h2>
        <p class="tw-mt-4 tw-text-sm tw-leading-5"><slot /></p>
        <slot name="footer">
          <TwTextButton class="tw-float-right">Close</TwTextButton>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'

export default {
  mixins: [clickaway],
  model: {
    prop: 'isOpen',
    event: 'change',
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    handleInput(value = false) {
      this.$emit('input', value)
    },
  },
}
</script>

<style></style>
