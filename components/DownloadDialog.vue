<template>
  <v-dialog
    v-model="computedValue"
    width="500px"
    @click-outside="toggle"
    @input="toggle($event)"
  >
    <v-card>
      <v-toolbar>
        <v-toolbar-title>{{ $t('download.title') }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon :title="$t('download.close')" @click="toggle">
          <v-icon>{{ mdiClose }}</v-icon>
        </v-btn>
      </v-toolbar>
      <v-stepper v-model="stepper" vertical class="tt-download-stepper">
        <v-stepper-step :complete="stepper > 1" step="1">
          {{ $t('download.agencyStep') }}
        </v-stepper-step>
        <v-stepper-content step="1">
          <v-select
            v-model="selectedAgency"
            :items="agencies"
            :label="$t('download.agencySelect')"
            color="secondary"
            item-color="secondary-dark"
          />

          <v-card
            v-if="selectedAgency && selectedAgency.license.isDownloadable"
            :color="darkMode ? 'grey darken-3' : 'grey lighten-4'"
            class="mb-4"
            outlined
          >
            <v-card-text class="body-2">
              <b>{{ $t('download.agencyLicense') }}</b
              ><br />
              {{ selectedAgency.license.title }}
              <a
                v-if="selectedAgency.license.url"
                :href="selectedAgency.license.url"
              >
                {{ $t('download.agencyRead') }}
              </a>
            </v-card-text>
          </v-card>
          <v-card
            v-else-if="selectedAgency && !selectedAgency.license.isDownloadable"
            color="error"
            class="mb-4"
            outlined
          >
            <v-card-text class="white--text body-2">
              <b>{{ $t('download.agencyNotDownloadable') }}</b>
              <br />
              {{ selectedAgency.license.title }}
              <a
                v-if="selectedAgency.license.url"
                :href="selectedAgency.license.url"
                target="_blank"
              >
                {{ $t('download.agencyRead') }} </a
              ><br />
            </v-card-text>
          </v-card>

          <v-btn
            color="primary"
            :disabled="
              !selectedAgency || !selectedAgency.license.isDownloadable
            "
            @click="stepper = 2"
          >
            {{ $t('download.btnNext') }}
          </v-btn>
        </v-stepper-content>
        <v-stepper-step :complete="stepper > 2" step="2">
          {{ $t('download.formatStep') }}
        </v-stepper-step>
        <v-stepper-content step="2">
          <p class="text-body-1">
            {{ $t('download.formatDesc') }}
          </p>
          <v-radio-group v-model="format" class="ml-2">
            <v-radio
              :label="$t('download.formatActive')"
              color="secondary"
              value="active"
            />
            <v-radio
              v-if="selectedAgency && !selectedAgency.regions.includes('*')"
              :label="$t('download.formatAll')"
              color="secondary"
              value="all"
            />
          </v-radio-group>
          <div>
            <v-btn color="primary" @click="prepareDownload">
              {{ $t('download.btnNext') }}
            </v-btn>
            <v-btn text class="ml-2" @click="stepper = 1">
              {{ $t('download.btnBack') }}
            </v-btn>
          </div>
        </v-stepper-content>
        <v-stepper-step :complete="stepper > 3" step="3">
          {{ $t('download.downloadStep') }}
        </v-stepper-step>
        <v-stepper-content step="3">
          <p v-if="data.length && downloadReady" class="body-1">
            {{ $t('download.downloadReady') }}
          </p>
          <p v-else-if="data.length" class="body-1">
            {{ $t('download.downloadLoading') }}
          </p>
          <p v-else>{{ $t('download.fileEmpty') }}</p>
          <v-card v-if="downloadError" color="error" class="mb-4" outlined>
            <v-card-text class="white--text body-2">
              {{
                $t(
                  downloadError === '429'
                    ? 'download.downloadError429'
                    : 'download.downloadError'
                )
              }}
            </v-card-text>
          </v-card>
          <div class="d-flex align-items-center">
            <json-excel
              v-if="data.length"
              :data="data"
              type="csv"
              :name="downloadName"
              class="d-inline-flex mr-2"
              :fields="{
                agency: 'agency',
                ref: 'ref',
                isActive: 'isActive',
                label: 'label',
                timestamp: 'timestamp',
                tripId: 'tripId',
                routeId: 'routeId',
                startTime: 'startTime',
                lat: 'position.lat',
                lon: 'position.lon',
                bearing: 'bearing',
                speed: 'speed',
                vehicleType: 'vehicleType',
                plate: 'plate',
                odometer: 'odometer',
                currentStopSequence: 'currentStopSequence',
                currentStatus: 'currentStatus.label',
                scheduleRelationship: 'scheduleRelationship.label',
                congestionLevel: 'congestionLevel.label',
                occupancyStatus: 'occupancyStatus.label',
                tripHeadsign: 'trip.headsign',
                tripShortName: 'trip.tripShortName',
                routeShortName: 'trip.routeShortName',
                routeLongName: 'trip.routeLongName',
                serviceId: 'trip.serviceID',
              }"
            >
              <v-btn color="primary">
                <v-icon left>
                  {{ mdiDownload }}
                </v-icon>
                {{ $t('download.downloadBtn') }}
              </v-btn>
            </json-excel>
            <v-btn text @click="stepper = 2">
              {{ $t('download.btnBack') }}
            </v-btn>
          </div>
        </v-stepper-content>
      </v-stepper>
    </v-card>
  </v-dialog>
</template>

<script>
import JsonExcel from 'vue-json-excel'
import { mdiClose, mdiDownload } from '@mdi/js'

export default {
  components: {
    JsonExcel,
  },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    data: [],
    format: 'active',
    stepper: 1,
    downloadReady: false,
    downloadError: false,
    selectedAgency: null,
    mdiClose,
    mdiDownload,
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
    agencies() {
      return Object.entries(this.$store.state.agencies.data).map((agency) => ({
        text: agency[1].name,
        value: agency[1],
      }))
    },
    agencyIsNotLoaded() {
      return this.selectedAgency
        ? !(this.selectedAgency.slug in this.$store.state.vehicles.data)
        : true
    },
    darkMode() {
      return this.$vuetify.theme.dark
    },
    downloadName() {
      function pad(s) {
        return s < 10 ? '0' + s : s
      }
      const date = new Date()
      const dateTime =
        date.getFullYear() +
        pad(date.getMonth() + 1) +
        pad(date.getDate()) +
        '_' +
        pad(date.getHours()) +
        pad(date.getMinutes())
      return `tt-export-${dateTime}.csv`
    },
    vehicles() {
      return this.$store.state.vehicles.data
    },
  },
  methods: {
    toggle(value = false) {
      if (typeof value !== 'boolean') {
        value = false
      }
      this.$emit('input', value)
    },
    prepareDownload() {
      this.downloadReady = false
      this.stepper = 3
      if (this.format === 'all') {
        this.$axios
          .get(`/agencies/${this.selectedAgency.slug}/vehicles?include=all`)
          .then((response) => {
            this.data = response.data.data
            this.downloadReady = true
          })
          .catch((error) => {
            this.downloadError = error.status
          })
      } else if (!(this.selectedAgency.slug in this.vehicles)) {
        this.$axios
          .get(`/agencies/${this.selectedAgency.slug}/vehicles`)
          .then((response) => {
            this.data = response.data.data
            this.downloadReady = true
          })
      } else {
        this.data = this.vehicles[this.selectedAgency.slug]
        this.downloadReady = true
      }
    },
  },
}
</script>

<style>
.tt-download-stepper {
  border-radius: 0;
  box-shadow: none;
}
</style>
