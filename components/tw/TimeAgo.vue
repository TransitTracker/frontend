<template>
  <time
    :datetime="dateTime"
    :class="{
      'tw:rounded-full tw:bg-error-40 tw:px-1 tw:py-0.5 tw:text-white tw:dark:bg-error-80 tw:dark:text-error-20':
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
      type: [Number, Array],
      required: false,
      default: null,
    },
    timestamps: {
      type: Array,
      required: false,
      default: null,
    },
    showLate: {
      type: Boolean,
      default: true,
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
      if (this.$i18n) {
        return this.$i18n.locale
      }

      return 'en'
    },
  },
  watch: {
    timestamp: {
      deep: true,
      handler() {
        this.calculateTimeAgo()
      },
    },
    timestamps: {
      deep: true,
      handler() {
        this.calculateTimeAgo()
      },
    },
    showLate() {
      this.calculateTimeAgo()
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
    getUnitAndValue(diffInSeconds) {
      if (diffInSeconds < 100) {
        return { unit: 'second', value: Math.max(0, diffInSeconds) }
      }
      if (diffInSeconds < 3600) {
        return { unit: 'minute', value: Math.floor(diffInSeconds / 60) }
      }
      if (diffInSeconds < 86400) {
        return { unit: 'hour', value: Math.floor(diffInSeconds / 3600) }
      }
      return { unit: 'day', value: Math.floor(diffInSeconds / 86400) }
    },
    calculateTimeAgo() {
      let rawList = []
      if (this.timestamps && Array.isArray(this.timestamps)) {
        rawList = this.timestamps
      } else if (Array.isArray(this.timestamp)) {
        rawList = this.timestamp
      } else if (typeof this.timestamp === 'number') {
        rawList = [this.timestamp]
      }

      const validTimestamps = rawList.filter(
        (t) => typeof t === 'number' && !Number.isNaN(t) && t > 0,
      )

      if (!validTimestamps.length) {
        this.timeAgo = null
        this.dateTime = null
        this.isLate = false
        return
      }

      const isRange = validTimestamps.length > 1
      const now = Math.floor(Date.now() / 1000)
      const rtf = new Intl.RelativeTimeFormat(this.lang, { style: 'short' })

      if (!isRange) {
        const ts = validTimestamps[0]
        const difference = ts - now
        const diffSeconds = Math.max(0, difference * -1)

        if (diffSeconds < 100) {
          this.timeAgo = rtf.format(difference, 'seconds')
          this.isLate = false
        } else if (diffSeconds < 3600) {
          this.timeAgo = rtf.format(Math.floor(difference / 60), 'minutes')
          this.isLate = this.showLate && diffSeconds > 240
        } else if (diffSeconds < 86400) {
          this.timeAgo = rtf.format(Math.floor(difference / 3600), 'hours')
          this.isLate = this.showLate
        } else {
          this.timeAgo = rtf.format(Math.floor(difference / 86400), 'days')
          this.isLate = this.showLate
        }

        this.dateTime = new Date(ts * 1000).toISOString()
        return
      }

      // Range is never highlighted as late
      this.isLate = false

      const minTimestamp = Math.min(...validTimestamps)
      const maxTimestamp = Math.max(...validTimestamps)

      const minDiff = Math.max(0, now - maxTimestamp)
      const maxDiff = Math.max(0, now - minTimestamp)

      const minUnitVal = this.getUnitAndValue(minDiff)
      const maxUnitVal = this.getUnitAndValue(maxDiff)

      if (
        minUnitVal.unit === maxUnitVal.unit &&
        minUnitVal.value === maxUnitVal.value
      ) {
        this.timeAgo = rtf.format(-minUnitVal.value, minUnitVal.unit)
      } else if (minUnitVal.unit === maxUnitVal.unit) {
        const parts = rtf.formatToParts(-maxUnitVal.value, maxUnitVal.unit)
        this.timeAgo = parts
          .map((p) =>
            p.type === 'integer'
              ? `${minUnitVal.value}-${maxUnitVal.value}`
              : p.value,
          )
          .join('')
      } else {
        const nfMin = new Intl.NumberFormat(this.lang, {
          style: 'unit',
          unit: minUnitVal.unit,
          unitDisplay: 'short',
        })
        const nfMax = new Intl.NumberFormat(this.lang, {
          style: 'unit',
          unit: maxUnitVal.unit,
          unitDisplay: 'short',
        })

        const minStr = nfMin.format(minUnitVal.value)
        const maxStr = nfMax.format(maxUnitVal.value)

        if (this.lang === 'fr') {
          this.timeAgo = `il y a ${minStr} à ${maxStr}`
        } else {
          this.timeAgo = `${minStr} to ${maxStr} ago`
        }
      }

      this.dateTime = `${new Date(minTimestamp * 1000).toISOString()}/${new Date(
        maxTimestamp * 1000,
      ).toISOString()}`
    },
  },
}
</script>
