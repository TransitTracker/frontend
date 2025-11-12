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

  const openOrFocus = async (url) => {
    const allClients = await clients.matchAll({
      type: 'window',
      includeUncontrolled: true,
    })

    // Try to find a existing window
    for (const client of allClients) {
      if (client.url.includes(url) && 'focus' in client) {
        return client.focus()
      }
    }

    // Otherwise, open a new window
    return clients.openWindow(url)
  }

  let targetUrl = '/'

  switch (action) {
    case 'open_vehicle':
      targetUrl = `/regions/${param}/map?vehicle=${secondParam}`
      break
    case 'open_alert':
      targetUrl = `/push/alerts/${param}${
        secondParam ? `?region=${secondParam}` : ''
      }`
      break
    default:
      targetUrl = '/'
      break
  }

  event.waitUntil(openOrFocus(targetUrl))
})
