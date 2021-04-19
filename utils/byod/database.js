import Dexie from 'dexie'

const db = new Dexie('transit-tracker-local')
db.version(4).stores({
  agencies: '&id',
  alerts: '[ref+agency], &id, agency',
  tripUpdates: '[ref+agency], &id, agency',
  vehicles: '[ref+agency], &id, agency',
  // dates: '[service_id+date+agency], agency',
  // frequencies: '[service_id+start_time+end_time+agency], agency',
  routes: '[agency+route_id], agency',
  services: '[agency+service_id], agency',
  shapes: '[agency+shape_id], agency',
  stops: '[agency+stop_id], agency',
  trips: '[agency+trip_id], agency',
})

export default db
