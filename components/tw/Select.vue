<template>
  <div class="tw:relative tw:w-96 tw:font-normal">
    <div
      class="tw:h-14 tw:w-96 tw:rounded-t tw:border-b tw:bg-neutral-99 tw:has-focus:border-b-2 tw:has-focus:border-primary-40 tw:has-focus:outline-hidden tw:dark:bg-neutral-10 tw:dark:has-focus:border-primary-80"
    >
      <select
        :id="id"
        :value="value"
        :name="name"
        class="tw:peer tw:absolute tw:inset-0 tw:pb-2 tw:pl-4 tw:pr-13 tw:pt-6 tw:text-neutral-10 tw:*:text-neutral-10 tw:dark:text-neutral-90"
        @input="$emit('input', $event.target.value)"
      >
        <slot />
      </select>

      <TwIcon
        :path="mdiMenuDown"
        class="tw:absolute tw:right-3 tw:top-4 tw:transition-transform tw:peer-open:rotate-180"
      />
      <div
        class="tw:pointer-events-none tw:absolute tw:inset-0 tw:peer-hover:bg-neutral-10/8 tw:dark:peer-hover:bg-neutral-90/8"
      ></div>
      <label
        class="tw:pointer-events-none tw:absolute tw:left-0 tw:top-0 tw:ml-4 tw:mr-13 tw:mt-2 tw:text-xs tw:duration-300 tw:peer-placeholder-shown:mt-4 tw:peer-placeholder-shown:text-base tw:peer-focus:mt-2 tw:peer-focus:text-xs tw:peer-focus:text-primary-40 tw:dark:peer-focus:text-primary-80"
        :for="name"
        >{{ label }}</label
      >
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
    label: {
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
