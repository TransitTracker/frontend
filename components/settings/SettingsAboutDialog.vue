<template>
  <v-dialog
    v-model="computedValue"
    width="500px"
    @click-outside="toggle"
    @input="toggle($event)"
  >
    <v-card>
      <v-toolbar>
        <v-toolbar-title>{{ $t('aboutDialog.title') }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon :title="$t('regionSwitcher.close')" @click="toggle">
          <v-icon>{{ mdiClose }}</v-icon>
        </v-btn>
      </v-toolbar>
      <v-container class="text-body-1">
        {{ $t('aboutDialog.body') }}
        <ul class="my-1">
          <li>PHP</li>
          <li>Laravel</li>
          <li>Javascript</li>
          <li>Vue.js</li>
          <li>Nuxt.js</li>
          <li>Vuetify</li>
        </ul>
        <v-btn
          small
          class="mt-1"
          href="https://github.com/TransitTracker"
          target="_blank"
        >
          {{ $t('aboutDialog.openSource') }}
          <v-icon right>{{ mdiGithub }}</v-icon>
        </v-btn>
        <b class="d-block text-subtitle-1 mt-4 mb-1">
          {{ $t('aboutDialog.dev') }}
        </b>
        {{ $t('aboutDialog.devBody') }}
        <br />
        <v-btn
          small
          class="mt-1"
          href="https://api.transittracker.ca/"
          target="_blank"
        >
          {{ $t('aboutDialog.devSite') }}
          <v-icon right>{{ mdiOpenInNew }}</v-icon>
        </v-btn>
      </v-container>
      <div class="tt-settings__about">
        <v-container class="d-flex align-center">
          <img
            src="https://www.gravatar.com/avatar/6e45287de1e42819a97f91bfe4477b1f"
            width="40px"
            height="40px"
            class="rounded-circle"
          />
          <div class="ml-4">
            <!-- eslint-disable -->
            <a
              href="https://read.cv/felixinx"
              class="
                font-weight-medium
                text-decoration-none text-body-1
              "
            >
              <!-- eslint-enable -->
              {{ $t('aboutDialog.by') }}
            </a>
            <br />
            <span class="text-body-2">
              {{ $t('aboutDialog.contact') }}
              <!-- eslint-disable vue/no-v-html -->
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSda-86sV12itRXPhLaw-WDDJI38GOSefq_7X006s1YP6pN4eg/viewform?usp=sf_link"
                v-html="$t('aboutDialog.contactBtn')"
              ></a>
              <!-- eslint-enable vue/no-v-html -->
            </span>
          </div>
        </v-container>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiClose, mdiGithub, mdiOpenInNew } from '@mdi/js'
export default {
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    mdiClose,
    mdiGithub,
    mdiOpenInNew,
  }),
  computed: {
    computedValue: {
      get() {
        return this.value
      },
      set(value) {
        this.toggle(value)
      },
    },
  },
  methods: {
    toggle(value = false) {
      if (typeof value !== 'boolean') {
        value = false
      }
      this.$emit('input', value)
    },
  },
}
</script>
