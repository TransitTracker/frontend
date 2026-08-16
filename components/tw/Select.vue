<template>
  <div class="tw:relative tw:w-14 tw:font-normal">
    <div
      class="tw:h-8 tw:w-14 tw:rounded-t tw:border-b tw:bg-neutral-99 tw:has-focus:border-b-2 tw:has-focus:border-primary-40 tw:has-focus:outline-hidden tw:dark:bg-[#1e1e1e] tw:dark:has-focus:border-primary-80"
    >
      <select
        :id="id"
        :value="value"
        :name="name"
        class="tw:peer tw:absolute tw:inset-0 tw:text-neutral-10 tw:*:text-neutral-10 tw:dark:text-neutral-90"
        @input="$emit('input', $event.target.value)"
      >
        <slot />
      </select>

      <TwIcon
        :path="mdiMenuDown"
        class="tw:absolute tw:top-2 tw:right-0 tw:size-4! tw:transition-transform tw:peer-open:rotate-180"
      />
      <div
        class="tw:pointer-events-none tw:absolute tw:inset-0 tw:peer-hover:bg-neutral-10/8 tw:dark:peer-hover:bg-neutral-90/8"
      ></div>
    </div>
  </div>
</template>

<script>
import { mdiMenuDown } from '@mdi/js'
export default {
  props: {
    value: {
      required: true,
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
