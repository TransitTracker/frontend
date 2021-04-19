<template>
  <div><!-- BYOD Injector --></div>
</template>

<script>
import byodMixin from '@/mixins/byod'
import {
  agencies as byodAgencies,
  definitions,
  realtimeGtfs,
} from '@/utils/byod'

export default {
  mixins: [byodMixin],
  mounted() {
    console.log('BYOD INJECTOR MOUNTED')

    byodAgencies.all().then((agencies) => {
      agencies.forEach((agency) => {
        this.loadAgency(agency)

        realtimeGtfs
          .all(definitions.Vehicles, agency, false, true)
          .then((vehicles) => {
            this.loadVehicles(agency, vehicles)
          })
      })
    })
    // Set up auto refresh for local agencies with remote URL
    setInterval(async () => {
      const agencies = await byodAgencies.all()

      agencies
        .filter((agency) => {
          return agency.meta.remoteAutoRefresh
        })
        .forEach((agency) => {
          this.fetchRemoteFeeds(agency)
        })
    }, 1000 * 60)
  },
}
</script>

<style></style>
