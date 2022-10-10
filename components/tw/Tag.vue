<template>
  <li
    v-if="!tag.label"
    class="tw-h-8 tw-w-52 tw-animate-pulse tw-rounded tw-bg-neutralVariant-90 dark:tw-bg-neutral-30 tw-inline-flex"
  ></li>
  <li
    v-else
    ref="tag"
    class="tw-group tw-relative tw-inline-flex tw-items-center tw-gap-1 tw-rounded tw-px-2 tw-py-1"
    :aria-describedby="tag.description ? tooltipId : false"
    :style="{
      backgroundColor: darkMode ? tag.dark_color : tag.color,
      color: darkMode ? tag.dark_text_color : tag.text_color,
    }"
  >
    <!-- :class="{ 'pr-0': removeRightPadidng }" -->
    <TwIcon v-if="tag.icon" :path="tag.icon" />
    {{ small ? tag.short_label : tag.label }}
    <TwTooltip v-if="tag.description" :reference="$refs.tag" :id="tooltipId">
      {{ tag.description }}
    </TwTooltip>
  </li>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'

export default {
  props: {
    tagId: {
      type: Number,
      required: false,
      default: null,
    },
    small: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data: () => ({
    tooltipId: null,
  }),
  computed: {
    darkMode() {
      return this.$vuetify.theme.dark
    },
    tag() {
      return this.$store.state.tags.data[this.tagId] ?? {}
    },
    removeRightPadidng() {
      return this.small && !this.tag.short_label
    },
  },
  mounted() {
    this.tooltipId = `tag-${uuidv4()}`
  },
}
</script>
