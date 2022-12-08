<template>
  <details :open="open">
    <summary class="tw-flex tw-list-none tw-items-center tw-justify-between">
      <slot name="summary" />
      <TwStandardIconButton
        :class="{ 'tw-rotate-180': open }"
        class="tw-transition-transform tw-duration-200 tw-ease-linear"
        @click="open = !open"
      >
        <TwIcon :path="mdiChevronDown" />
      </TwStandardIconButton>
    </summary>
    <slot />
  </details>
</template>

<script>
import { mdiChevronDown } from '@mdi/js'

export default {
  data: () => ({
    open: false,
    mdiChevronDown,
  }),
}
</script>
