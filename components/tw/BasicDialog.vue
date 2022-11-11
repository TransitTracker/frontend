<template>
  <!--
      <div
        class="tw-pointer-events-none tw-absolute tw-inset-0 tw-z-40 tw-bg-black/75"
        v-show="isOpen"
      ></div> -->
  <dialog
    ref="dialog"
    class="tw-m-auto tw-min-w-[17.5rem] tw-max-w-[35rem] tw-rounded-[1.75rem] tw-border-none tw-bg-neutral-99 tw-p-6 tw-text-neutralVariant-30 backdrop:tw-bg-black/75 dark:tw-bg-neutral-10 dark:tw-text-neutralVariant-80"
  >
    <h2
      class="tw-text-2xl tw-leading-8 tw-text-neutral-10 dark:tw-text-neutral-90"
    >
      <slot name="header"></slot>
    </h2>
    <p class="tw-mt-4 tw-text-sm tw-leading-5"><slot /></p>
    <slot name="footer">
      <TwTextButton class="tw-float-right" @click="handleInput()">
        Close
      </TwTextButton>
    </slot>
  </dialog>
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
  watch: {
    isOpen(value) {
      this.handleState(value)
    },
  },
  mounted() {
    this.$refs.dialog.addEventListener('close', () => {
      this.handleInput(false)
    })
    this.$refs.dialog.addEventListener('cancel', () => {
      this.handleInput(false)
    })
  },
  beforeDestroy() {
    this.$refs.dialog.removeEventListener('close')
    this.$refs.dialog.removeEventListener('cancel')
  },
  methods: {
    handleInput(value = false) {
      this.handleState(value)
      this.$emit('input', value)
    },
    handleState(isOpen) {
      if (isOpen) {
        this.$refs.dialog.showModal()
      } else {
        this.$refs.dialog.close()
      }
    },
  },
}
</script>

<style></style>
