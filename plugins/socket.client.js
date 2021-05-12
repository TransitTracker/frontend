import Echo from 'laravel-echo'
// eslint-disable-next-line no-unused-vars
import Pusher from 'pusher-js'

export default (context, inject) => {
  const laravelEcho = new Echo({
    broadcaster: 'pusher',
    key: process.env.wsKey,
    wsHost: process.env.wsHost,
    forceTLS: true,
    disableStats: true,
    enabledTransports: ['ws', 'wss'],
  })

  inject('echo', laravelEcho)
}
