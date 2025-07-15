<template>
  <div class="tw-relative tw-w-96 tw-font-normal">
    <div
      class="tw-h-14 tw-w-96 tw-rounded-t tw-border-b tw-bg-neutral-99 has-[:focus]:tw-border-b-2 has-[:focus]:tw-border-primary-40 has-[:focus]:tw-outline-none dark:tw-bg-neutral-10 dark:has-[:focus]:tw-border-primary-80"
    >
      <select
        :id="id"
        :value="value"
        :name="name"
        class="tw-peer tw-absolute tw-inset-0 tw-pb-2 tw-pl-4 tw-pr-[52px] tw-pt-6 tw-text-neutral-10 dark:tw-text-neutral-90"
        @input="$emit('input', $event.target.value)"
      >
        <slot />
      </select>

      <TwIcon
        :path="mdiMenuDown"
        class="tw-absolute tw-right-3 tw-top-4 tw-transition-transform peer-open:tw-rotate-180"
      />
      <div
        class="tw-pointer-events-none tw-absolute tw-inset-0 peer-hover:tw-bg-opacity-10 dark:peer-hover:tw-bg-opacity-10"
      ></div>
      <label
        class="tw-pointer-events-none tw-absolute tw-left-0 tw-top-0 tw-ml-4 tw-mr-[52px] tw-mt-2 tw-text-xs tw-duration-300 peer-placeholder-shown:tw-mt-4 peer-placeholder-shown:tw-text-base peer-focus:tw-mt-2 peer-focus:tw-text-xs peer-focus:tw-text-primary-40 dark:peer-focus:tw-text-primary-80"
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
