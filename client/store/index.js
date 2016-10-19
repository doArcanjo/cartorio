import Vue from 'vue'
import Vuex from 'vuex'
import baptisms from './modules/baptisms'
import Counter from './modules/counter'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules:{
    baptisms
    ,
    Counter
  }
})

export default store
