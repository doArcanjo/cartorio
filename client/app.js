
import Vue from 'vue'
import {sync} from 'vuex-router-sync'
import App from './components/App'
import router from './router'
import store from './store'
var VueTables = require('vue-tables-2');
Vue.use(VueTables.client)
// import VueTables from 'vue-tables-2'
// Vue.use(VueTables.client)//, [options], [useVuex]);
sync(store, router)

const app = new Vue({
  router,
  store,
  ...App
})

export {app, router, store}
