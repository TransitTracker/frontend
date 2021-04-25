<template>
  <div class="mb-14">
    <div class="secondary tt-texture--icons">
      <v-container class="py-4 d-flex">
        <v-icon class="text-h5">{{ mdiFolderUpload }}</v-icon>
        <div class="ml-4">
          <h1 class="text-h5 font-weight-medium">
            {{ $t('byod.title') }}
          </h1>
          <p class="text-subtitle-2 text-md-subtitle-1 font-weight-medium mb-0">
            {{ agency.name }}
          </p>
        </div>
      </v-container>
    </div>
    <v-sheet class="mb-4">
      <v-container class="d-flex align-center">
        <v-btn icon nuxt to="/byod/" exact>
          <v-icon>{{ mdiArrowLeft }}</v-icon>
        </v-btn>
        {{ $t('byod.agency.back') }}
        <v-spacer></v-spacer>
        <v-btn text color="error" small @click="deleteAgency">
          <v-icon left>{{ mdiDelete }}</v-icon>
          {{ $t('byod.agency.delete') }}
        </v-btn>
      </v-container>
    </v-sheet>
    <v-container class="mb-14">
      <v-alert
        v-if="loadedAgencies.includes(agency.slug)"
        class="mb-8"
        type="success"
        text
        rounded="lg"
      >
        {{ $t('byod.isSynced') }}
      </v-alert>
      <v-alert
        v-else
        class="mb-8"
        :icon="mdiSyncOff"
        color="warning"
        rounded="lg"
      >
        {{ $t('byod.isNotSynced') }}
        <template #close>
          <v-btn text height="24" small @click="syncAgency">
            <v-icon left>{{ mdiFolderSync }}</v-icon>
            {{ $t('byod.agency.syncNow') }}
          </v-btn>
        </template>
      </v-alert>
      <v-card rounded="lg" class="mb-8">
        <v-card-title>
          {{ $t('byod.agency.staticGtfs') }}
          <v-spacer></v-spacer>
          <v-select
            v-model="staticType"
            :items="staticOptions"
            :label="$t('byod.agency.staticType')"
            style="max-width: 150px"
            hide-details
          ></v-select>
        </v-card-title>
        <v-card-subtitle v-if="lengths.static" class="pb-0">
          {{
            $t('byod.agency.saved', {
              type: $t(`byod.agency.${staticType.store}`),
              n: lengths.static,
            })
          }}
        </v-card-subtitle>
        <v-card-text v-else class="d-flex align-center pb-0">
          <v-icon color="warning">{{ mdiAlert }}</v-icon>
          <p class="mb-0 text-body-1 ml-2">
            {{
              $t('byod.agency.empty', {
                type: $t(`byod.agency.${staticType.store}`),
              })
            }}
          </p>
        </v-card-text>
        <v-card-actions class="px-4 d-block d-md-flex pb-4">
          <v-file-input
            v-model="files.static"
            :disabled="loading.static"
            class="mr-4"
            :label="$t('byod.agency.upload', { file: staticType.file })"
            truncate-length="50"
            :prepend-icon="null"
            :messages="
              $t('byod.agency.message', {
                type: $t(`byod.agency.${staticType.store}`),
              })
            "
          ></v-file-input>
          <v-btn
            color="primary"
            text
            :disabled="!files.static"
            :loading="loading.static"
            @click="importStatic"
          >
            {{ $t('byod.agency.import') }}
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card rounded="lg">
        <v-card-title>{{ $t('byod.agency.realtimeTitle') }}</v-card-title>
        <v-card-subtitle class="pb-0">
          {{ $t('byod.agency.realtimeDesc') }}
        </v-card-subtitle>
        <v-card-text>
          <div class="d-flex align-center flex-wrap mt-2">
            <b class="mb-0">{{ $t('byod.agency.emptyExisting') }}</b>
            <v-btn
              color="error"
              x-small
              class="ml-2"
              @click="emptyEntities('vehicles')"
            >
              <v-icon left>{{ mdiDelete }}</v-icon>
              vehiclePositions
            </v-btn>
            <v-btn
              color="error"
              x-small
              class="ml-1"
              @click="emptyEntities('alerts')"
            >
              <v-icon left>{{ mdiDelete }}</v-icon>
              alerts
            </v-btn>
            <v-btn
              color="error"
              x-small
              class="ml-1"
              @click="emptyEntities('tripUpdates')"
            >
              <v-icon left>{{ mdiDelete }}</v-icon>
              tripUpdates
            </v-btn>
          </div>
          <v-tabs v-model="rtTab">
            <v-tab>{{ $t('byod.agency.local') }}</v-tab>
            <v-tab>{{ $t('byod.agency.remote') }}</v-tab>
          </v-tabs>
          <v-tabs-items v-model="rtTab">
            <v-tab-item>
              <div class="d-md-flex align-center">
                <v-file-input
                  v-model="files.realtime"
                  :disabled="loading.realtime"
                  class="mr-4"
                  :label="$t('byod.agency.upload', { file: 'GTFS-RT' })"
                  :messages="$t('byod.agency.realtimeMessage')"
                  truncate-length="50"
                  :prepend-icon="null"
                ></v-file-input>
                <v-btn
                  color="primary"
                  text
                  :disabled="!files.realtime"
                  :loading="loading.realtime"
                  @click="importEntities"
                >
                  {{ $t('byod.agency.import') }}
                </v-btn>
              </div>
            </v-tab-item>
            <v-tab-item>
              <v-alert
                v-if="remote.showError"
                type="error"
                dense
                text
                class="my-4"
              >
                {{ $t('byod.agency.realtimeError') }}
                <b>{{ remote.error }}</b>
                {{ $t('byod.agency.corsError') }}
              </v-alert>
              <div v-for="(url, key) in remote.urls" :key="key">
                <v-text-field
                  :value="url"
                  :append-outer-icon="mdiPlus"
                  :append-icon="key > 0 ? mdiClose : ''"
                  :label="$t('byod.agency.remoteUrl')"
                  @input="remote.urls[key] = $event"
                  @click:append-outer="remote.urls.push('')"
                  @click:append="remote.urls.splice(key, 1)"
                />
              </div>
              <!-- <v-switch
                v-model="remote.autoRefresh"
                :label="$t('byod.agency.autoRefresh')"
                prepend-icon="mdi-sync"
              /> -->
              <v-btn color="primary" @click="saveRemoteUrl">
                {{ $t('byod.agency.saveAndFetch') }}
              </v-btn>
            </v-tab-item>
          </v-tabs-items>
        </v-card-text>
      </v-card>
      <nuxt-link
        v-if="hasEntities"
        :to="localePath(`/byod/${agency.slug}/data`)"
        tag="div"
        class="cursor-pointer"
      >
        <v-sheet rounded="lg" class="my-6 d-flex justify-space-around">
          <div
            v-if="lengths.vehicles"
            class="d-flex flex-column align-center py-6"
          >
            <div class="text-h3">
              {{ lengths.vehicles }}
              <v-icon color="primary">{{ mdiBus }}</v-icon>
            </div>
            <p class="text-subtitle-1 mb-0">vehiclePositions</p>
          </div>
          <div
            v-if="lengths.alerts"
            class="d-flex flex-column align-center py-6"
          >
            <div class="text-h3">
              {{ lengths.alerts }}
              <v-icon color="primary">{{ mdiAlert }}</v-icon>
            </div>
            <p class="text-subtitle-1 mb-0">alerts</p>
          </div>
          <div
            v-if="lengths.tripUpdates"
            class="d-flex flex-column align-center py-6"
          >
            <div class="text-h3">
              {{ lengths.tripUpdates }}
              <v-icon color="primary">{{ mdiTimelineClock }}</v-icon>
            </div>
            <p class="text-subtitle-1 mb-0">tripUpdates</p>
          </div>
        </v-sheet>
      </nuxt-link>
      <p class="mt-4">
        {{ $t('byod.agency.note') }}
      </p>
    </v-container>
    <v-dialog v-model="deleteDialog" persistent width="400">
      <v-card>
        <v-card-text class="d-flex flex-column align-center">
          <span class="my-4">
            {{ $t('byod.agency.wait') }}
          </span>
          <v-progress-circular indeterminate />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {
  agencies as byodAgencies,
  definitions,
  staticGtfs,
  realtimeGtfs,
} from '@/utils/byod'
import { csvParser } from '@/utils/byod/converters'
import byodMixin from '@/mixins/byod'
import Vue from 'vue'
import {
  mdiAlert,
  mdiArrowLeft,
  mdiBus,
  mdiClose,
  mdiDelete,
  mdiFolderUpload,
  mdiFolderSync,
  mdiPlus,
  mdiSyncOff,
  mdiTimelineClock,
} from '@mdi/js'

export default {
  mixins: [byodMixin],
  async asyncData({ params, redirect }) {
    const agency = await byodAgencies.get(params.agency)
    if (!agency) redirect('/byod')

    const staticOptions = Object.entries(definitions).map(([key, value]) => ({
      text: key,
      value,
    }))

    return {
      agency,
      staticOptions: staticOptions.filter(
        (model) => model.value.type === 'static'
      ),
      mdiAlert,
      mdiArrowLeft,
      mdiBus,
      mdiClose,
      mdiDelete,
      mdiFolderUpload,
      mdiFolderSync,
      mdiPlus,
      mdiSyncOff,
      mdiTimelineClock,
    }
  },
  data: () => ({
    files: {
      static: undefined,
      realtime: undefined,
    },
    lengths: {
      static: 0,
      alerts: 0,
      vehicles: 0,
      updates: 0,
    },
    loading: {
      static: false,
      realtime: false,
    },
    staticType: definitions.Routes,
    rtTab: null,
    remote: {
      urls: [''],
      autoRefresh: false,
      showError: false,
      error: null,
    },
    deleteDialog: false,
  }),
  head() {
    return {
      title: `${this.agency.name} (${this.$t('byod.title')})`,
    }
  },
  computed: {
    hasEntities() {
      if (this.lengths.vehicles) return true
      if (this.lengths.alerts) return true
      if (this.lengths.tripUpdates) return true
      return false
    },
    loadedAgencies() {
      return Object.keys(this.$store.state.agencies.data)
    },
  },
  watch: {
    staticType(val) {
      this.refreshStats(val)
    },
  },
  mounted() {
    this.refreshStats(this.staticType)

    Object.values(definitions)
      .filter(({ type }) => type === 'realtime')
      .forEach((model) => {
        this.refreshStats(model)
      })

    this.remote.urls = this.agency.meta.remoteUrls || ['']
    this.remote.autoRefresh = this.agency.meta.remoteAutoRefresh || false
  },
  methods: {
    async deleteAgency() {
      this.deleteDialog = true

      await staticGtfs.delete(definitions.Routes, this.agency)
      await staticGtfs.delete(definitions.Services, this.agency)
      await staticGtfs.delete(definitions.Stops, this.agency)
      await staticGtfs.delete(definitions.Shapes, this.agency)
      await staticGtfs.delete(definitions.Trips, this.agency)

      await realtimeGtfs.delete(definitions.Alerts, this.agency)
      await realtimeGtfs.delete(definitions.TripUpdates, this.agency)
      await realtimeGtfs.delete(definitions.Vehicles, this.agency)

      await byodAgencies.delete(this.agency)

      this.deleteDialog = false
      this.$router.push('/byod')
    },
    async syncAgency() {
      this.loadAgency(this.agency)

      const vehicles = await realtimeGtfs.all(
        definitions.Vehicles,
        this.agency,
        false,
        true
      )

      this.loadVehicles(this.agency, vehicles)
    },
    async emptyEntities(type) {
      this.deleteDialog = true
      await this.$store.dispatch('gtfs/delete', {
        agency: this.agency,
        model: type,
      })
      this.deleteDialog = false
      this.refreshStats([type])
    },
    async refreshStats(model) {
      if (model.type === 'static') {
        Vue.set(
          this.lengths,
          'static',
          await staticGtfs.all(model, this.agency, true)
        )
      } else if (model.type === 'realtime') {
        Vue.set(
          this.lengths,
          model.store,
          await staticGtfs.all(model, this.agency, true)
        )
      }
    },
    async importStatic() {
      Vue.set(this.loading, 'static', true)

      // Remove everything
      await staticGtfs.delete(this.staticType, this.agency)

      // Send file
      await csvParser(
        this.staticType,
        this.agency,
        this.files.static,
        (items) => {
          staticGtfs.bulkPut(this.staticType, this.agency, items)
        }
      )

      await byodAgencies.touch(this.agency)

      Vue.set(
        this.lengths,
        'static',
        await staticGtfs.all(this.staticType, this.agency, true)
      )

      Vue.set(this.files, 'static', undefined)
      Vue.set(this.loading, 'static', false)
    },
    importEntities() {
      Vue.set(this.loading, 'realtime', true)

      // Open and read file
      const fileReader = new FileReader()
      fileReader.readAsArrayBuffer(new Blob([this.files.realtime]))

      fileReader.onload = async () => {
        await this.saveEntities(this.agency, fileReader.result)

        Vue.set(this.files, 'realtime', undefined)
        Vue.set(this.loading, 'realtime', false)
      }
    },
    async saveRemoteUrl() {
      const agency = {
        ...this.agency,
      }
      agency.meta.remoteUrls = this.remote.urls
      agency.meta.remoteAutoRefresh = this.remote.autoRefresh

      await byodAgencies.put(agency)

      this.agency = agency

      this.fetchRemoteFeeds(agency)

      // TODO: Handle auto refresh
    },
  },
}
</script>
