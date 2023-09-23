## Vehicle API structure change

| Old  (v2)                  | New (v2b)                            |
|----------------------------|--------------------------------------|
| ref                        | properties.vehicle.id                |
| label                      | properties.vehicle.label             |
| tags                       | properties.tags                      |
| timestamp                  | properties.lastSeenAt                |
| tripId                     | properties.trip.id                   |
| trip.headsign              | properties.trip.headsign             |
| trip.shortName             | properties.trip.shortName            |
| startTime                  | properties.trip.startTime            |
| routeId                    | properties.route.id                  |
| trip.routeShortName        | properties.route.shortName           |
| trip.serviceId             | properties.trip.serviceId            |
| trip.blockId               | properties.trip.blockId              |
| position.lat               | geometry.coordinates                 |
| bearing                    | properties.position.bearing          |
| speed                      | properties.position.speed            |
| vehicleType                | properties.vehicle.type              |
| plate                      | properties.vehicle.licensePlate      |
| odometer                   | properties.vehicle.odometer          |
| currentStopSequence        | properties.currentStopSequence       |
| currentStatus.label        | properties.currentStatus             |
| scheduleRelationship.label | properties.trip.scheduleRelationship |
| congestionLevel.label      | properties.congestionLevel           |
| occupancyStatus.label      | properties.occupancyStatus           |
| createdAt                  | properties.firstSeenAt               |
| actions                    | actions                              | 
