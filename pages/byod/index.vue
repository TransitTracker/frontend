<template>
  <div class="mb-14">
    <div class="secondary tt-texture--icons mb-4">
      <v-container>
        <h1 class="text-h5 font-weight-medium py-4">
          <v-icon class="text-h5">mdi-folder-upload</v-icon>
          {{ $t('byod.title') }}
        </h1>
      </v-container>
    </div>
    <v-container>
      <p class="text-subtitle-1">
        {{ $t('byod.subtitle') }}
      </p>
      <div v-if="byodIsActivated">
        <h2 class="text-h6 mt-4 mb-2">{{ $t('byod.list') }}</h2>
        <v-list v-if="agencies.length" class="py-0">
          <v-list-item-group>
            <v-list-item
              v-for="agency in agencies"
              :key="agency.slug"
              nuxt
              :to="`/byod/${agency.slug}`"
            >
              <v-list-item-content>
                <v-list-item-title>{{ agency.name }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ $t('byod.lastUpdated') }}
                  <timeago :datetime="agency.meta.updatedAt" />
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon nuxt :to="`/byod/${agency.slug}`">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <v-sheet v-else class="px-4 py-8 d-flex flex-column align-center">
          <v-icon color="primary" size="100">mdi-folder-plus</v-icon>
          <p class="text-h6 text-center my-2">{{ $t('byod.noAgencies') }}</p>
          <p class="text-subtitle-1 text-center">
            {{ $t('byod.getStarted') }}
          </p>
          <v-btn large color="primary" @click="newAgencyDialog = true">
            {{ $t('byod.newAgency') }}
          </v-btn>
        </v-sheet>
        <v-sheet
          v-if="agencies.length"
          class="px-4 py-2 d-flex align-center justify-space-between mt-12"
          color="secondary-dark"
          dark
        >
          <p class="mb-0 text-subtitle-2">
            {{ $t('byod.removeModule') }}
          </p>
          <v-btn text @click="toggleByod(false)">
            <v-icon left>mdi-folder-remove</v-icon>
            {{ $t('byod.disable') }}
          </v-btn>
        </v-sheet>
      </div>
      <v-sheet
        v-else
        class="px-4 py-2 d-flex align-center justify-space-between mt-4"
        color="primary"
        dark
      >
        <div>
          <p class="mb-1 text-subtitle-2">
            {{ $t('byod.addModule') }}
          </p>
          <!-- eslint-disable-next-line -->
          <p class="mb-0 text-body-2" v-html="$t('byod.addModuleDesc')"></p>
        </div>
        <v-btn text class="ml-4" @click="toggleByod(true)">
          <v-icon left>mdi-folder-plus</v-icon>
          {{ $t('byod.enable') }}
        </v-btn>
      </v-sheet>
      <v-dialog v-model="newAgencyDialog" max-width="500px">
        <v-card>
          <v-card-text class="pt-4">
            <h2 class="text-h6 mb-2">{{ $t('byod.createTitle') }}</h2>
            <v-form v-model="newAgencyForm">
              <v-text-field
                v-model="newAgency.name"
                :rules="[(v) => !!v || $t('byod.nameValidation')]"
                :label="$t('byod.nameLabel')"
                required
              ></v-text-field>
              <v-select
                v-model="newAgency.vehicleType"
                :label="$t('byod.iconLabel')"
                required
                :items="[
                  { text: $t('byod.bus'), value: 'bus' },
                  { text: $t('byod.train'), value: 'train' },
                  { text: $t('byod.tram'), value: 'tram' },
                  { text: $t('byod.ferry'), value: 'ferry' },
                ]"
              ></v-select>
              <v-btn
                :disabled="!newAgencyForm"
                color="secondary"
                @click="createAgency"
              >
                <v-icon left>mdi-plus</v-icon>
                {{ $t('byod.createAdd') }}
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-container>
    <v-btn
      fab
      color="secondary"
      fixed
      bottom
      right
      style="margin-bottom: 66px"
      @click="newAgencyDialog = true"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
import Vue from 'vue'
import { v4 as uuid } from 'uuid'
import VueTimeago from 'vue-timeago'

Vue.use(VueTimeago, {})

export default {
  async asyncData({ store }) {
    const agencies = await store.dispatch('agencies/getLocals')
    return { agencies }
  },
  data: () => ({
    newAgency: {
      id: uuid(),
      name: '',
      vehicleType: 'bus',
    },
    newAgencyDialog: false,
    newAgencyForm: false,
  }),
  computed: {
    byodIsActivated() {
      return this.$store.state.settings.activateByod
    },
  },
  methods: {
    toggleByod(value) {
      this.$store.commit('settings/set', {
        setting: 'activateByod',
        value,
      })
    },
    createAgency() {
      this.$store.dispatch('agencies/saveLocal', this.newAgency).then(() => {
        this.$router.push(`/byod/${this.newAgency.id}`)
      })
    },
  },
}
</script>
