import Dexie from 'dexie'

export default (context, inject) => {
  const db = new Dexie('transit-tracker-local')
  db.version(3).stores({
    agencies: '&id',
    alerts: '[ref+agency], &id, agency',
    tripUpdates: '[ref+agency], &id, agency',
    vehicles: '[ref+agency], &id, agency',
    routes: '[agency+route_id], agency',
    trips: '[agency+trip_id], agency',
    // services: '[service_id+agency]',
    // dates: '[service_id+date+agency]',
    // frequencies: '[service_id+start_time+end_time+agency]',
    // shapes: '[shape_id+agency], agency',
    // stops: '[stop_id+agency]',
  })
  inject('database', db)
}
