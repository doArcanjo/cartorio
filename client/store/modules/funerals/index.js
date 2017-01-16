import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'
import Vue from "vue";

const state = {
    list : [],//JSON.parse(localStorage.getItem(BAPTISMS_STORAGE_KEY) || '[]')||[],
    selected : {}
}

export default { state, mutations, actions, getters, namespaced: true }