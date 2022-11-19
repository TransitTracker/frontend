<template>
  <time
    :datetime="dateTime"
    :class="{
      'tw-rounded-full tw-bg-error-40 tw-px-1 tw-py-0.5 tw-text-white dark:tw-bg-error-80 dark:tw-text-error-20':
        isLate,
    }"
  >
    {{ timeAgo }}
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
    timeAgo: null,
    dateTime: null,
    isLate: false,
    timer: null,
  }),
  computed: {
    lang() {
      return this.$i18n.locale
    },
  },
  mounted() {
    this.calculateTimeAgo()
    // Set timer to refresh every 10 seconds the timeago
    this.timer = setInterval(() => {
      this.calculateTimeAgo()
    }, 10000)
  },
  destroyed() {
    clearInterval(this.timer)
  },
  methods: {
    calculateTimeAgo() {
      const currentTime = Math.floor(Date.now() / 1000)
      const difference = this.timestamp - currentTime

      const rtf = new Intl.RelativeTimeFormat(this.lang, { style: 'short' })

      if (difference * -1 < 100) {
        this.timeAgo = rtf.format(difference, 'seconds')
        this.isLate = false
      } else if (difference * -1 < 3600) {
        this.timeAgo = rtf.format(Math.floor(difference / 60), 'minutes')
        if (difference * -1 > 240) {
          this.isLate = true
        } else {
          this.isLate = false
        }
      } else if (difference * -1 < 86400) {
        this.timeAgo = rtf.format(Math.floor(difference / 3600), 'hours')
        this.isLate = true
      } else {
        this.timeAgo = rtf.format(Math.floor(difference / 86400), 'days')
        this.isLate = true
      }

      // Set datetime
      this.dateTime = new Date(this.timestamp * 100).toISOString()
    },
  },
}
</script>
