<template>
  <div class="mb-14">
    <div class="secondary tt-texture--icons mb-4">
      <v-container>
        <h1 class="text-h5 font-weight-medium py-4">
          <v-icon class="text-h5">{{ mdiFolderUpload }}</v-icon>
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
            <v-list-item v-for="agency in agencies" :key="agency.slug">
              <v-list-item-content>
                <v-list-item-title class="d-flex align-center">
                  <v-badge
                    dot
                    inline
                    :color="agency.slug in loadedAgencies ? 'success' : 'red'"
                    :title="
                      agency.slug in loadedAgencies
                        ? $t('byod.isSynced')
                        : $t('byod.isNotSynced')
                    "
                    class="mt-0 mb-1"
                  ></v-badge>
                  <v-text-field
                    v-if="agency.slug === editingAgency.slug"
                    v-model="editingNewName"
                    hide-details="auto"
                    outlined
                    dense
                    class="ml-2"
                    style="max-width: 50%"
                    :rules="[
                      (v) => !!v || $t('byod.validationEmpty'),
                      (v) => v.length <= 25 || $t('byod.validationLength'),
                    ]"
                  ></v-text-field>
                  <span v-else>{{ agency.name }}</span>
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ $t('byod.lastUpdated') }}
                  <timeago :datetime="agency.meta.updatedAt" :locale="lang" />
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action class="flex-row">
                <v-btn
                  v-if="agency.slug === editingAgency.slug"
                  icon
                  :title="$t('byod.save')"
                  @click="saveAgency(agency)"
                >
                  <v-icon>{{ mdiContentSave }}</v-icon>
                </v-btn>
                <v-btn
                  v-else
                  icon
                  :title="$t('byod.rename')"
                  @click="editAgency(agency)"
                >
                  <v-icon>{{ mdiPencil }}</v-icon>
                </v-btn>
                <v-btn
                  v-if="agency.slug in loadedAgencies"
                  icon
                  class="mx-2"
                  :title="$t('byod.unSync')"
                  @click="toggleAgency(agency)"
                >
                  <v-icon>{{ mdiFolderRemove }}</v-icon>
                </v-btn>
                <v-btn
                  v-else
                  icon
                  class="mx-2"
                  :title="$t('byod.sync')"
                  @click="toggleAgency(agency)"
                >
                  <v-icon>{{ mdiFolderSync }}</v-icon>
                </v-btn>
                <v-btn
                  icon
                  nuxt
                  :to="localePath(`/byod/${agency.slug}`)"
                  :title="$t('byod.manage')"
                >
                  <v-icon>{{ mdiWrench }}</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <v-sheet v-else class="px-4 py-8 d-flex flex-column align-center">
          <v-icon color="primary" size="100">{{ mdiFolderPlus }}</v-icon>
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
            <v-icon left>{{ mdiFolderRemove }}</v-icon>
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
          <v-icon left>{{ mdiFolderPlus }}</v-icon>
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
                :rules="[
                  (v) => !!v || $t('byod.validationEmpty'),
                  (v) => v.length <= 25 || $t('byod.validationLength'),
                ]"
                :label="$t('byod.nameLabel')"
                :counter="25"
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
                <v-icon left>{{ mdiPlus }}</v-icon>
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
      <v-icon>{{ mdiPlus }}</v-icon>
    </v-btn>
  </div>
</template>

<script>
import Vue from 'vue'
import VueTimeago from 'vue-timeago'
import byodMixin from '@/mixins/byod'
import {
  agencies,
  agencies as byodAgencies,
  definitions,
  realtimeGtfs,
} from '@/utils/byod'
import { Agency as AgencyModel } from '@/utils/byod/models'
import {
  mdiContentSave,
  mdiFolderPlus,
  mdiFolderRemove,
  mdiFolderSync,
  mdiFolderUpload,
  mdiPencil,
  mdiPlus,
  mdiWrench,
} from '@mdi/js'

Vue.use(VueTimeago, {
  locales: {
    en: require('date-fns/locale/en'),
    fr: require('date-fns/locale/fr'),
  },
})

export default {
  mixins: [byodMixin],
  async asyncData({ store }) {
    const agencies = await byodAgencies.all()
    return {
      agencies,
      mdiContentSave,
      mdiFolderPlus,
      mdiFolderRemove,
      mdiFolderSync,
      mdiFolderUpload,
      mdiPencil,
      mdiPlus,
      mdiWrench,
    }
  },
  data: () => ({
    editingAgency: {},
    editingNewName: '',
    newAgency: {
      name: '',
      vehicleType: 'bus',
      color: '#009a8d',
    },
    newAgencyDialog: false,
    newAgencyForm: false,
  }),
  head() {
    return {
      title: this.$t('byod.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('byod.seoDescription'),
        },
      ],
    }
  },
  computed: {
    byodIsActivated() {
      return this.$store.state.settings.activateByod
    },
    loadedAgencies() {
      return this.$store.state.agencies.data
    },
    lang() {
      return this.$i18n.locale
    },
  },
  methods: {
    toggleByod(value) {
      this.$store.commit('settings/set', {
        setting: 'activateByod',
        value,
      })
    },
    async toggleAgency(agency) {
      if (agency.slug in this.loadedAgencies) {
        this.removeAgency(agency)

        // Remove selection if necessary
        if (this.$store.state.vehicles.selection.agency === agency.slug) {
          this.$store.commit('vehicles/setSelection', {})
        }
      } else {
        this.loadAgency(agency)
        const vehicles = await realtimeGtfs.all(
          definitions.Vehicles,
          agency,
          false,
          true
        )
        this.loadVehicles(agency, vehicles)
      }
    },
    createAgency() {
      const agency = new AgencyModel(this.newAgency)
      byodAgencies.put(agency).then(() => {
        this.$router.push(`/byod/${agency.slug}`)
      })
    },
    editAgency(agency) {
      this.editingAgency = agency
      this.editingNewName = agency.name
    },
    saveAgency() {
      const newAgency = { ...this.editingAgency }

      newAgency.name = this.editingNewName
      newAgency.shortName = this.editingNewName

      agencies.put(newAgency)

      this.editingAgency = {}

      agencies.all().then((allAgencies) => {
        this.agencies = allAgencies
      })

      // If agency is loaded in app, rename in app
      if (newAgency.slug in this.loadedAgencies) {
        this.$store.commit('agencies/add', newAgency)
      }
    },
  },
}
</script>
