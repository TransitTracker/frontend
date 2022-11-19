<template>
  <div
    v-if="content"
    class="tw-flex tw-h-14 tw-items-center"
    :class="[property.mobileOnly && 'md:tw-hidden']"
  >
    <TwIcon
      :path="property.icon"
      class="tw-text-primary-40 dark:tw-text-primary-80"
    />
    <div class="tw-ml-3">
      <dt
        class="tw-text-xs tw-font-medium tw-leading-4 tw-text-neutralVariant-30 dark:tw-text-neutralVariant-80"
      >
        {{ $t(`mapBottomSheet.properties.${property.label || property.name}`) }}
      </dt>
      <dd class="tw-mb-0 tw-leading-6">
        {{ property.format ? format(content) : content }}
      </dd>
    </div>
    <div class="flex-grow-1"></div>
    <TwStandardIconButton
      v-if="property.help"
      class="tw-h-10 tw-w-10"
      @click="openHelp"
    >
      <TwIcon :path="mdiHelp" class="tw-h-6 tw-w-6" />
    </TwStandardIconButton>
    <TwBasicDialog v-if="property.help" v-model="helpOpen">
      <template #header>
        {{ $t('about') }}
        {{ $t(`mapBottomSheet.properties.${property.label || property.name}`) }}
      </template>
      {{ $t(`mapBottomSheet.help.${property.label || property.name}`) }}
    </TwBasicDialog>
  </div>
</template>

<script>
import { mdiHelp } from '@mdi/js'

export default {
  props: {
    property: {
      required: true,
      type: Object,
    },
    vehicle: {
      required: true,
      type: Object,
    },
  },
  data: () => ({
    mdiHelp,
    helpOpen: false,
    dateStyle: 'long',
    timeStyle: 'short',
  }),
  computed: {
    content() {
      return this.property.content
        ? this.vehicle[this.property.content]
        : this.property.parent
        ? this.vehicle[this.property.parent][this.property.name]
        : this.vehicle[this.property.name]
    },
  },
  methods: {
    openHelp() {
      this.helpOpen = true
    },
    format() {
      if (this.property.format === 'date') {
        return Intl.DateTimeFormat(this.$i18n.locale, {
          dateStyle: this.dateStyle,
          timeStyle: this.timeStyle,
        }).format(new Date(this.content))
      }
      return this.content
    },
  },
}
</script>

<i18n>
  {
    "en": {
      "about": "About "
    },
    "fr": {
      "welcome": "À propos de "
    }
  }
  </i18n>
