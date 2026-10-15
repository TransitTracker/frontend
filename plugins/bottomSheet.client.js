import Vue from 'vue'
import { registerSheetElements } from 'pure-web-bottom-sheet'

Vue.config.ignoredElements = [
  ...(Vue.config.ignoredElements || []),
  'bottom-sheet',
  'bottom-sheet-dialog-manager',
]

if (typeof customElements !== 'undefined') {
  registerSheetElements()
}
