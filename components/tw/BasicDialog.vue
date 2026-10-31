<template>
  <dialog
    ref="dialog"
    :data-state="state"
    class="tw:mx-4 tw:my-auto tw:max-h-[calc(100dvh-2rem)] tw:min-w-[calc(100vw-2rem)] tw:max-w-140 tw:overflow-hidden tw:rounded-[1.75rem] tw:border-none tw:bg-neutral-99 tw:p-0 tw:text-neutral-variant-30 tw:backdrop:bg-black/75 tw:data-[state=closing]:animate-dialogClose tw:data-[state=closing]:backdrop:animate-scrimClose tw:data-[state=open]:backdrop:animate-scrimEnter tw:data-[state=open]:animate-dialogOpen tw:md:mx-auto tw:md:max-h-[calc(100dvh-4rem)] tw:md:min-w-70 tw:dark:bg-neutral-10 tw:dark:text-neutral-variant-80"
  >
    <form
      class="tw:flex tw:max-h-[calc(100dvh-2rem)] tw:w-full tw:flex-col tw:md:max-h-[calc(100dvh-4rem)]"
      @submit.prevent="requestClose"
    >
      <div
        v-if="imageSrc"
        class="tw:relative tw:h-32 tw:w-full tw:shrink-0 tw:bg-cover tw:bg-center tw:lg:h-64"
        :style="{ backgroundImage: imageSrc }"
      >
        <TwFilledIconButton
          color="surface"
          value="submit"
          :title="$t('close')"
          class="tw:absolute! tw:right-4 tw:top-4"
        >
          <TwIcon :path="mdiClose" />
        </TwFilledIconButton>
      </div>
      <div v-if="$slots.header" class="tw:shrink-0 tw:px-6 tw:pt-6">
        <h2
          class="tw:font-heading tw:text-2xl tw:leading-8 tw:text-neutral-10 tw:dark:text-neutral-90"
        >
          <slot name="header"></slot>
        </h2>
      </div>
      <div
        class="tw:flex-1 tw:min-h-0 tw:overflow-y-auto tw:px-6 tw:pb-2 tw:text-sm tw:leading-5"
        :class="[$slots.header || imageSrc ? 'tw:pt-4' : 'tw:pt-6']"
      >
        <slot />
      </div>
      <div class="tw:shrink-0 tw:px-6 tw:pt-4 tw:pb-6">
        <slot name="footer">
          <div class="tw:flex tw:justify-end">
            <TwTextButton type="submit">
              {{ $t('close') }}
            </TwTextButton>
          </div>
        </slot>
      </div>
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
    closeTimer: null,
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
    clearTimeout(this.closeTimer)
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

      this.closeTimer = setTimeout(() => {
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
