import * as getters from './getters'
import * as actions from './actions'
import {BAPTISMS_STORAGE_KEY} from '../../mutation-types'
var BaptismsJson = require ('../../../assets/data/baptismos2006.json'); 

console.log('In storage',localStorage.getItem(BAPTISMS_STORAGE_KEY))
const state = {
    list : JSON.parse(localStorage.getItem(BAPTISMS_STORAGE_KEY) || '[]')||[],
    selected : {}
}

const mutations = {
    SETBAPTISMS(state, data='[]') {
        if(data==='[]'){
            state.list = BaptismsJson;
            return;
        }
        state.list = JSON.parse(data);
       
         // localStorage.setItem('baptisms', data);
    },
    SETBAPTISM(state, data) {
    	
        console.log('@Mutations!  SETBAPTISM!',data)
        state.selected = data;
    },
    GETBAPTISM(state, data) {
        
        console.log('@Mutations!  GETBAPTISM!',data)
        state.list.find()
    }
}

export default { state, mutations, actions,getters }