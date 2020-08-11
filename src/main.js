import Vue from 'vue'
import App from './App.vue'
import VueDraggable from 'vue-draggable'
import { BootstrapVue } from 'bootstrap-vue'
import UUID from 'vue-uuid'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { polyfill } from 'mobile-drag-drop'
import { scrollBehaviourDragImageTranslateOverride } from 'mobile-drag-drop/scroll-behaviour'

polyfill({
  dragImageTranslateOverride: scrollBehaviourDragImageTranslateOverride
})

Vue.use(VueDraggable)
Vue.use(BootstrapVue)
Vue.use(UUID)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
