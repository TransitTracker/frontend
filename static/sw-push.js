/* eslint-disable no-undef */

self.addEventListener('push', (event) => {
  if (!(self.Notification && self.Notification.permission === 'granted')) {
    return
  }

  if (!event.data) {
    return
  }

  const data = event.data.json()

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon,
      actions: data.actions,
    })
  )
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  const [action, param, secondParam] = event.action.split('.')

  if (action === 'open_vehicle') {
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then(() => {
        return clients.openWindow(
          `/regions/${param}/map?vehicle=${secondParam}`
        )
      })
    )
  }

  if (action === 'open_gtfstools') {
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then(() => {
        return clients.openWindow(`/redirect/gtfstools/${param}`)
      })
    )
  }
})
