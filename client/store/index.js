import Vue from 'vue'
import Vuex from 'vuex'
import baptisms from './modules/baptisms'
import weddings from './modules/weddings'
import funerals from './modules/funerals'
import Counter from './modules/counter'
import pluginsLocal from './plugins'
import {SAVE_TO_LOCAL_STORAGE,BAPTISMS_STORAGE_KEY} from './mutation-types'
import createPersistedState from 'vuex-persistedstate'

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
    baptisms,
    weddings,
    funerals,
    Counter
  },
  plugins:[...pluginsLocal,createPersistedState()]
})

export default store
