<script>
export default {
  asyncData({ redirect, params }) {
    return redirect(`http://gtfstools.site/run.php?trip_id=${params.trip}`)
  },
}
</script>
