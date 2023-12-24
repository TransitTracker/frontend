<template>
  <div
    class="tw-relative tw-flex tw-h-10 tw-w-10 tw-cursor-pointer tw-items-center tw-justify-center tw-rounded-full tw-p-2 tw-transition-colors focus-within:tw-bg-primary-40/10 hover:tw-bg-primary-40/10"
  >
    <input
      type="checkbox"
      class="tw-peer tw-relative tw-h-[1.125rem] tw-w-[1.125rem] tw-cursor-pointer tw-appearance-none tw-rounded-sm !tw-border-2 tw-border-solid tw-border-neutralVariant-30 tw-transition-colors checked:tw-border-primary-40 checked:tw-bg-primary-40"
      :id="id"
      :value="id"
      :indeterminate.prop="true"
      v-model="model"
    />
    <!--    before:tw-absolute before:tw-left-2/4 before:tw-top-2/4 before:tw-block before:tw-h-12 before:tw-w-12 before:-tw-translate-x-2/4 before:-tw-translate-y-2/4 before:tw-rounded-full before:tw-bg-white before:tw-opacity-0 before:tw-transition-opacity checked:before:tw-bg-primary-40 hover:before:tw-opacity-10-->
    <div
      class="tw-pointer-events-none tw-absolute tw-flex tw-items-center tw-justify-center tw-text-white tw-opacity-0 tw-transition-opacity peer-checked:tw-opacity-100"
    >
      <TwIcon :path="icon" class="!tw-h-4 !tw-w-4" />
    </div>
  </div>
</template>

<script>
import { mdiCheck, mdiMinus } from '@mdi/js'
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    value: {
      type: [Boolean, Array],
      required: true,
    },
    indeterminate: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    model: {
      get() {
        return this.indeterminate ? true : this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
    icon() {
      return this.indeterminate ? mdiMinus : mdiCheck
    },
  },
}
</script>
