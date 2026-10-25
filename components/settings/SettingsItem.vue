<template>
  <button
    @click.prevent="handleClick"
    class="tw:group tw:relative tw:rounded-lg tw:border tw:border-solid tw:border-neutral-variant-80 tw:py-3 tw:pl-2 tw:pr-4 tw:text-left tw:transition-colors tw:dark:border-neutral-variant-30"
    :class="[
      settingState === value &&
        'tw:border-secondary-90 tw:bg-secondary-90 tw:text-secondary-30 tw:dark:border-secondary-30 tw:dark:bg-secondary-30 tw:dark:text-secondary-90',
    ]"
  >
    <div
      v-show="settingState !== value"
      class="tw:absolute tw:inset-0 tw:h-full tw:w-full tw:rounded-lg tw:bg-transparent tw:transition-colors tw:group-hover:bg-primary-30/8 tw:group-focus:bg-primary-30/10 tw:dark:group-hover:bg-primary-90/8 tw:dark:group-focus:bg-primary-90/10"
    ></div>
    <div class="tw:flex tw:items-center tw:gap-x-2">
      <TwIcon v-if="icon" :path="icon" class="tw:shrink-0" />
      <slot />
    </div>
    <div>
      <small class="tw:text-xs tw:font-medium" v-if="description">
        {{ description }}
      </small>
    </div>
  </button>
</template>

<script>
export default {
  props: {
    description: {
      type: String,
      required: false,
      default: null,
    },
    icon: {
      type: String,
      required: false,
      default: null,
    },
    value: {
      type: [Boolean, String],
      required: true,
    },
    setting: {
      type: String,
      required: true,
    },
  },
  computed: {
    settingState() {
      return this.$store.state.settings[this.setting]
    },
  },
  methods: {
    handleClick() {
      if (this.setting === 'lang') {
        this.$i18n.setLocale(this.value)
      }

      this.$store.commit('settings/set', {
        setting: this.setting,
        value: this.value,
      })
    },
  },
}
</script>
