<template>
  <span
    class="tt-cities tw-relative tw-inline-block tw-font-bold tw-text-primary-40 !tw-opacity-100 dark:tw-text-primary-80"
  >
    <span
      class="tt-cities-line tw-absolute tw-left-0 tw-h-full tw-w-1 tw-origin-[0_50%] tw-bg-current"
    ></span>
    <span ref="letters" class="tt-cities-letters tw-inline-block">
      Montréal
    </span>
  </span>
</template>

<script>
import anime from 'animejs/lib/anime.es'

export default {
  props: {
    cities: {
      type: Array,
      required: true,
    },
  },
  watch: {
    cities(newArray) {
      if (!newArray.length) return

      this.startAnimation()
    },
  },
  mounted() {
    // Display default city while data is being requested
    this.changeCity('Montréal')
  },
  methods: {
    startAnimation() {
      const cities = this.cities

      // Randomize array
      for (let i = cities.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = cities[i]
        cities[i] = cities[j]
        cities[j] = temp
      }

      const delayLoop = (fn, delay) => {
        return (x, i) => {
          setTimeout(() => {
            fn(x)
          }, i * delay)
        }
      }

      cities.forEach(delayLoop(this.changeCity, 3875))
    },
    changeCity(city) {
      if (!this.$refs.letters) return
      this.$refs.letters.innerHTML = city.replace(
        // eslint-disable-next-line
        /([^\x00-\x80]|[^ ]|\w)/g,
        "<span class='tt-cities-letters'>$&</span>"
      )
      anime
        .timeline()
        .add({
          target: '.tt-cities-line',
          scaleY: [0, 1],
          opacity: [0.5, 1],
          easing: 'easeOutExpo',
          duration: 700,
        })
        .add({
          targets: '.tt-cities-line',
          translateX: [
            0,
            this.$refs.letters.getBoundingClientRect().width + 10,
          ],
          skewX: [0, -10],
          easing: 'easeOutExpo',
          duration: 700,
          delay: 100,
        })
        .add({
          targets: '.tt-cities-letters',
          opacity: [0, 1],
          easing: 'easeOutExpo',
          duration: 600,
          offset: '-=775',
          delay: (el, i) => 34 * (i + 1),
        })
        .add({
          targets: '.tt-cities',
          opacity: 0,
          duration: 1000,
          easing: 'easeOutExpo',
          delay: 1000,
        })
    },
  },
}
</script>
