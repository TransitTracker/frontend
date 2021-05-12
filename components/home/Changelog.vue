<template>
  <v-dialog
    v-model="computedValue"
    width="500px"
    @click-outside="toggle"
    @input="toggle($event)"
  >
    <v-card>
      <v-toolbar>
        <v-toolbar-title>{{ $t('home.whatsNew') }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon :title="$t('download.close')" @click="toggle">
          <v-icon>{{ mdiClose }}</v-icon>
        </v-btn>
      </v-toolbar>
      <div v-if="lang === 'fr'" class="warning px-6 py-4 text-subtitle-2">
        Information en anglais uniquement (pour l'instant).
      </div>
      <v-card-text v-if="data" class="text-subtitle-1 pt-6">
        <h2 class="text-h6 mb-2">{{ title }}</h2>
        <p v-for="(text, index) in body" :key="index">{{ text }}</p>
        <small class="text-caption">
          Commit <a :href="data.html_url">{{ data.sha }}</a>
        </small>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiClose } from '@mdi/js'

export default {
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    mdiClose,
    data: null,
    title: null,
    body: null,
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
    lang() {
      return this.$i18n.locale
    },
  },
  mounted() {
    this.$axios
      .get(
        `https://api.github.com/repos/transittracker/frontend/commits/${
          process.env.commitHash || '62d3fe175b41240fbeb9e531d865a5864a7f8f4e'
        }`
      )
      .then(({ data }) => {
        this.data = data
        const messages = data.commit.message.match(/[^\n]+/g)
        this.title = messages.shift()
        this.body = messages
      })
      .catch((error) => {
        console.error(error)
      })
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
