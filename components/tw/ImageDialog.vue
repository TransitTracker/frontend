<template>
  <transition
    as="template"
    enter-active-class=" tw-duration-300 tw-ease-out"
    enter-to-class=" tw-opacity-100"
    enter-class="tw-opacity-0"
    leave-active-class="tw-duration-200 tw-ease-in"
    leave-class="tw-opacity-0"
    leave-to-class="tw-opacity-100"
  >
    <dialog
      ref="dialog"
      class="tw-m-auto tw-min-w-[17.5rem] tw-max-w-[35rem] tw-rounded-[1.75rem] tw-border-none tw-bg-neutral-99 tw-text-neutralVariant-30 backdrop:tw-bg-black/75 dark:tw-bg-neutral-10 dark:tw-text-neutralVariant-80"
    >
      <form method="dialog">
        <div
          class="tw-relative tw-h-32 tw-w-full tw-bg-cover tw-bg-center lg:tw-h-64"
          :style="{ backgroundImage: image }"
        >
          <TwFilledIconButton
            color="surface"
            value="cancel"
            :title="$t('close')"
            class="!tw-absolute tw-right-4 tw-top-4"
          >
            <TwIcon :path="mdiClose" />
          </TwFilledIconButton>
        </div>
        <div class="tw-p-6">
          <h2
            class="tw-text-2xl tw-leading-8 tw-text-neutral-10 dark:tw-text-neutral-90"
          >
            <slot name="header"></slot>
          </h2>
          <p class="tw-mt-4 tw-text-sm tw-leading-5"><slot /></p>
          <slot name="footer">
            <TwTextButton class="tw-float-right" value="cancel">
              {{ $t('close') }}
            </TwTextButton>
          </slot>
        </div>
      </form>
    </dialog>
  </transition>
</template>

<script>
import { mdiClose } from '@mdi/js'

export default {
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    mdiClose,
  }),
  watch: {
    value(value) {
      this.handleState(value)
    },
  },
  mounted() {
    this.$refs.dialog.addEventListener('close', this.closeDialog)
    this.$refs.dialog.addEventListener('cancel', this.closeDialog)
  },
  beforeDestroy() {
    this.$refs.dialog.removeEventListener('close', this.closeDialog)
    this.$refs.dialog.removeEventListener('cancel', this.closeDialog)
  },
  methods: {
    closeDialog() {
      this.handleInput()
    },
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

<i18n>
{
  "en": {
    "close": "Close"
  },
  "fr": {
    "close": "Fermer"
  }
}
</i18n>
