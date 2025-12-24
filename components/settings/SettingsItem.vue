<template>
  <button
    @click.prevent="handleClick"
    class="tw-group tw-relative tw-rounded-lg tw-border tw-border-solid tw-border-neutralVariant-80 tw-py-3 tw-pl-2 tw-pr-4 tw-text-left tw-transition-colors dark:tw-border-neutralVariant-30"
    :class="[
      settingState === value &&
        'tw-border-secondary-90 tw-bg-secondary-90 tw-text-secondary-30 dark:tw-border-secondary-30 dark:tw-bg-secondary-30 dark:tw-text-secondary-90',
    ]"
  >
    <div
      v-show="settingState !== value"
      class="tw-absolute tw-inset-0 tw-h-full tw-w-full tw-rounded-lg tw-bg-neutralVariant-30 tw-bg-opacity-0 tw-transition-colors group-hover:tw-bg-opacity-8 group-focus:tw-bg-opacity-10 dark:tw-bg-neutralVariant-80 dark:tw-bg-opacity-0"
    ></div>
    <div class="tw-flex tw-items-center tw-gap-x-2">
      <TwIcon v-if="icon" :path="icon" class="tw-shrink-0" />
      <slot />
    </div>
    <div>
      <small class="tw-text-xs tw-font-medium" v-if="description">
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
  methods: {
    handleClick() {
      if (this.setting === 'theme') {
        this.$vuetify.theme.dark = this.isDarkMode
      }

      if (this.setting === 'lang') {
        this.$i18n.setLocale(this.value)
      }

      this.$store.commit('settings/set', {
        setting: this.setting,
        value: this.value,
      })
    },
  },
  computed: {
    isDarkMode() {
      if (this.value === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
      }
      if (this.value === 'dark') return true
      return false
    },
    settingState() {
      return this.$store.state.settings[this.setting]
    },
  },
}
</script>
