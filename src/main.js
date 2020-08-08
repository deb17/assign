import Vue from 'vue'
import App from './App.vue'
import VueDraggable from 'vue-draggable'

Vue.use(VueDraggable)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
