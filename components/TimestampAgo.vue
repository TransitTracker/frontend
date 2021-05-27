<template>
  <span
    v-if="timestamp"
    :class="[
      Math.floor(Date.now() / 1000) - timestamp > 300 &&
        'pa-0.5 rounded red white--text',
    ]"
  >
    <timeago
      :datetime="(timestamp || 0) * 1000"
      :auto-update="30"
      :locale="lang"
    />
  </span>
</template>

<script>
import Vue from 'vue'
import VueTimeago from 'vue-timeago'

Vue.use(VueTimeago, {
  locales: {
    en: require('date-fns/locale/en'),
    fr: require('date-fns/locale/fr'),
  },
})

export default {
  props: {
    timestamp: {
      type: Number,
      required: true,
    },
  },
  computed: {
    lang() {
      return this.$i18n.locale
    },
  },
}
</script>
