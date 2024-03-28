<script>
import anime from 'animejs/lib/anime.es'
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { ref } from 'vue'

export default defineComponent({
  props: {
    cities: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const letters = ref(null)
    const { app } = useContext()
    const changeCity = function (city) {
      if (!letters) return
      letters.innerHTML = city.replace(
        // eslint-disable-next-line
        /([^\x00-\x80]|[^ ]|\w)/g,
        "<span class='tw-inline-block'>$&</span>"
      )

      anime
        .timeline()
        .add({
          target: '#tt-cities-line',
          scaleY: [0, 1],
          opacity: [0.5, 1],
          easing: 'easeOutExpo',
          duration: 700,
        })
        .add({
          targets: '#tt-cities-line',
          translateX: [0, letters.getBoundingClientRect().width + 10],
          skewX: [0, -10],
          easing: 'easeOutExpo',
          duration: 700,
          delay: 100,
        })
        .add({
          targets: '#tt-cities-letters > span',
          opacity: [0, 1],
          easing: 'easeOutExpo',
          duration: 600,
          offset: '-=775',
          delay: (el, i) => 34 * (i + 1),
        })
    }
    const cities = ['Test1', 'Montréal', 'Saint-Jean-sur-Richelieu']

    // Randomize array
    for (let i = cities.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i)
      const temp = cities[i]
      cities[i] = cities[j]
      cities[j] = temp
    }

    // Add last tagline
    cities.push(app.i18n.t('introCities'))
    console.log(cities)
    console.log(letters)

    const delayLoop = (fn, delay) => {
      return (x, i) => {
        setTimeout(() => {
          fn(x)
        }, i * delay)
      }
    }

    cities.forEach(delayLoop(changeCity, 3875))

    return {
      ...props,
    }
  },
})
</script>

<template>
  <h2
    class="tw-mt-2 tw-min-h-[4.5rem] tw-font-heading tw-text-2xl tw-font-medium md:tw-text-3xl"
  >
    {{ $t('intro') }}
    <span
      id="tt-cities"
      class="tw-relative tw-inline-block tw-font-bold tw-text-primary-40 tw-opacity-100 dark:tw-text-primary-80"
    >
      <span
        id="tt-cities-line"
        class="tw-absolute tw-left-0 tw-h-full tw-w-1 tw-origin-[0_50%] tw-bg-primary-40 dark:tw-bg-primary-80"
      ></span>
      <span id="tt-cities-letters" ref="letters"> Montréal </span>
    </span>
  </h2>
</template>

<i18n>
{
  "en": {
    "intro": "An overview of the public transportation network for",
    "introCities": "several Canadian cities"
  },
  "fr": {
    "intro": "Une vue d'ensemble du réseau de transport en commun pour",
    "introCities": "plusieurs villes Canadiennes"
  }
}
</i18n>
