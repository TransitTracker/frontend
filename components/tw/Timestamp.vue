<template>
  <time :datetime="dateTime">
    {{ formatted }}
  </time>
</template>

<script>
export default {
  props: {
    timestamp: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    formatted: null,
    dateTime: null,
  }),
  computed: {
    lang() {
      return this.$i18n ? this.$i18n.locale : 'en'
    },
  },
  mounted() {
    this.calculateTimeAgo()
  },
  methods: {
    calculateTimeAgo() {
      if (!Number.isInteger(this.timestamp)) {
        this.formatted = null
      }

      const date = new Date(this.timestamp * 1000)
      this.formatted = new Intl.DateTimeFormat(`${this.lang}-CA`, {
        dateStyle: 'long',
        timeStyle: 'short',
      }).format(date)

      // Set datetime
      this.dateTime = date.toISOString()
    },
  },
}
</script>
