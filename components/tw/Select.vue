<template>
  <div class="tw:relative tw:font-normal">
    <div
      class="tw:h-8 tw:w-21 tw:rounded-sm tw:transition-colors tw:border-neutral-variant-50 tw:hover:border-neutral-10 tw:hover:dark:border-neutral-90 tw:border tw:outline-0 tw:has-focus:border-3 tw:has-focus:border-primary-40 tw:dark:has-focus:border-primary-80"
    >
      <select
        :id="id"
        :value="value"
        :name="name"
        class="tw:peer tw:absolute tw:inset-0 tw:text-neutral-10 tw:*:text-neutral-10 tw:dark:text-neutral-90 tw:pl-4 tw:border-0 tw:outline-0"
        @input="$emit('input', $event.target.value)"
      >
        <slot />
      </select>

      <TwIcon
        :path="mdiMenuDown"
        class="tw:absolute tw:top-2 tw:right-4 tw:size-4! tw:transition-transform tw:peer-open:rotate-180"
      />
    </div>
  </div>
</template>

<script>
import { mdiMenuDown } from '@mdi/js'
export default {
  props: {
    value: {
      required: true,
      type: Number,
    },
    name: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    mdiMenuDown,
  }),
}
</script>

<style>
::picker(select) {
  border: none;
}
</style>
