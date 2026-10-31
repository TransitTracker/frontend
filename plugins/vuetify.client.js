import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

import { VDataTable } from 'vuetify/lib/components'

import 'vuetify/src/components/VDataTable/VDataTable.sass'
import 'vuetify/src/components/VDataIterator/VDataFooter.sass'
import 'vuetify/src/components/VIcon/VIcon.sass'
import 'vuetify/src/components/VSelect/VSelect.sass'

Vue.use(Vuetify)

export default (ctx, inject) => {
  const vuetify = new Vuetify({
    theme: { disable: true },
  })

  Vue.component('VDataTable', VDataTable)

  ctx.app.vuetify = vuetify
}
