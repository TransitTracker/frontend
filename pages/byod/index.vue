<template>
  <div class="tt-custom">
    <div class="secondary mb-4">
      <v-container>
        <h1 class="text-h4 font-weight-medium py-4">
          <v-icon class="text-h4">mdi-folder-upload</v-icon>
          Bring your own data
        </h1>
      </v-container>
    </div>
    <v-container>
      <p class="text-subtitle-1">
        You can use the interface of Transit Tracker with your own feeds from
        your favorite agencies from all over the world.
      </p>
      <div v-if="byodIsActivated">
        <h2 class="text-h6 mt-4 mb-2">List of agencies</h2>
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
                  Last updated: <timeago :datetime="agency.meta.updatedAt" />
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
          <p class="text-h6 text-center my-2">No agencies</p>
          <p class="text-subtitle-1 text-center">
            To get started, click the button below
          </p>
          <v-btn large color="primary" @click="newAgencyDialog = true">
            New agency
          </v-btn>
        </v-sheet>
      </div>
      <div v-else>
        <p class="text-h6">
          For performance reasons, the BYOD module is turn off by default.
        </p>
        <v-btn color="primary" @click="activateByod">Turn on BYOD</v-btn>
      </div>
      <v-dialog v-model="newAgencyDialog" max-width="500px">
        <v-card>
          <v-card-text class="pt-4">
            <h2 class="text-h6 mb-2">Create a new agency</h2>
            <v-form v-model="newAgencyForm">
              <v-text-field
                v-model="newAgency.name"
                :rules="[(v) => !!v || 'Name is required']"
                label="Agency name"
                required
              ></v-text-field>
              <v-select
                v-model="newAgency.vehicleType"
                label="Icon"
                required
                :items="[
                  { text: 'Bus', value: 'bus' },
                  { text: 'Train', value: 'train' },
                  { text: 'Tram', value: 'tram' },
                  { text: 'Ferry', value: 'ferry' },
                ]"
              ></v-select>
              <v-btn
                :disabled="!newAgencyForm"
                color="secondary"
                @click="createAgency"
              >
                <v-icon left>mdi-plus</v-icon>
                Add
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
    activateByod() {
      this.$store.commit('settings/set', {
        setting: 'activateByod',
        value: true,
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

<style>
.settings {
  width: 100%;
  height: 100%;
}
</style>
