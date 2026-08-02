<template>
  <dialog
    ref="dialog"
    :data-state="state"
    class="tw-mx-4 tw-my-auto tw-min-w-[calc(100vw-2rem)] tw-max-w-[35rem] tw-rounded-[1.75rem] tw-border-none tw-bg-neutral-99 tw-p-6 tw-text-neutral-variant-30 backdrop:tw-bg-black/75 data-[state=closing]:tw-animate-dialogClose data-[state=open]:tw-animate-dialogOpen data-[state=closing]:backdrop:tw-animate-scrimClose data-[state=open]:backdrop:tw-animate-scrimEnter md:tw-mx-auto md:tw-min-w-[17.5rem] dark:tw-bg-neutral-10 dark:tw-text-neutral-variant-80"
  >
    <form @submit.prevent="requestClose">
      <div
        v-if="imageSrc"
        class="tw-relative -tw-m-6 tw-h-32 tw-w-[calc(100%+3rem)] tw-bg-cover tw-bg-center lg:tw-h-64"
        :style="{ backgroundImage: imageSrc }"
      >
        <TwFilledIconButton
          color="surface"
          value="submit"
          :title="$t('close')"
          class="!tw-absolute tw-right-4 tw-top-4"
        >
          <TwIcon :path="mdiClose" />
        </TwFilledIconButton>
      </div>
      <h2
        class="tw-font-heading tw-text-2xl tw-leading-8 tw-text-neutral-10 dark:tw-text-neutral-90"
        :class="[imageSrc && 'tw-pt-12']"
      >
        <slot name="header"></slot>
      </h2>
      <p class="tw-mt-4 tw-text-sm tw-leading-5"><slot /></p>
      <slot name="footer">
        <TwTextButton class="tw-float-right" type="submit">
          {{ $t('close') }}
        </TwTextButton>
      </slot>
    </form>
  </dialog>
</template>

<script>
import { mdiClose } from '@mdi/js'

export default {
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    imageSrc: {
      type: String,
      required: false,
      default: null,
    },
  },
  data: () => ({
    mdiClose,
    state: 'closed',
  }),
  watch: {
    value(val) {
      val ? this.openDialog() : this.closeDialog()
    },
  },
  mounted() {
    this.$refs.dialog.addEventListener('cancel', this.onNativeClose)
    this.$refs.dialog.addEventListener('close', this.onNativeClose)
  },
  beforeDestroy() {
    this.$refs.dialog.removeEventListener('cancel', this.onNativeClose)
    this.$refs.dialog.removeEventListener('close', this.onNativeClose)
  },
  methods: {
    onNativeClose(e) {
      e.preventDefault()
      this.requestClose()
    },
    requestClose() {
      this.$emit('input', false)
      this.closeDialog()
    },
    openDialog() {
      if (this.$refs.dialog.open) return
      this.$refs.dialog.showModal()
      this.state = 'open'
    },
    closeDialog() {
      if (!this.$refs.dialog.open) return
      this.state = 'closing'

      setTimeout(() => {
        this.$refs.dialog.close()
        this.state = 'closed'
      }, 200)
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
