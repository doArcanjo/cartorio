
import Vue from 'vue'
import {sync} from 'vuex-router-sync'
import App from './components/App'
import router from './router'
import store from './store'
import reactiveStorage from "vue-reactivestorage";

Vue.use(reactiveStorage, [
	"baptisms",
    "lang",
    "name",
    "foo"
]);
sync(store, router)

const app = new Vue({
  router,
  store,
  ...App
})

export {app, router, store}
