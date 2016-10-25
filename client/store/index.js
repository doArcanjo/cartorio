import Vue from 'vue'
import Vuex from 'vuex'
import baptisms from './modules/baptisms'
import Counter from './modules/counter'
import pluginsLocal from './plugins'
import {SAVE_TO_LOCAL_STORAGE,BAPTISMS_STORAGE_KEY} from './mutation-types'
import createPersistedState from 'vuex-persistedstate'
import reactiveStorage from "vue-reactivestorage";

Vue.use(reactiveStorage, [
  "baptisms",
    "lang",
    "name",
    "foo"
]);
Vue.use(Vuex)

const mutations = {
    [SAVE_TO_LOCAL_STORAGE](state, {save='',data='[]'}) {
      console.log("@ global mutation SAVE_TO_LOCAL_STORAGE: state:",state)
      console.log("@ global mutation SAVE_TO_LOCAL_STORAGE: save:",save)
      // console.log("@ global mutation SAVE_TO_LOCAL_STORAGE: data:",data)
        if(data==='[]'){
            state.list = BaptismsJson;
            return;
        }
        state.list = JSON.parse(data);
       console.log("@ ROOT Mutation SAVE_TO_LOCAL_STORAGE")
         // localStorage.setItem('baptisms', data);
        global.localStorage.setItem(BAPTISMS_STORAGE_KEY, data); 
    }
  }
const store = new Vuex.Store({
  mutations,
  modules:{
    baptisms
    ,
    Counter
  },
  plugins:[...pluginsLocal,createPersistedState()]
})

export default store
