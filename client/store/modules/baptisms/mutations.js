import Vue from "vue";
import {BAPTISMS_STORAGE_KEY,SETBAPTISMS} from '../../mutation-types'
var BaptismsJson = require ('../../../assets/data/baptismos2006.json'); 

export default {
    [SETBAPTISMS](state, data='[]') {
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
    UPDATEBAPTISM(state,data) {
        console.log('@Mutations!  UPDATEBAPTISM!',data)
        console.log('@Mutations!  UPDATEBAPTISM index!',data.n_inscricao)
        // console.log("state.list.indexOf(data.n_inscricao):")
        state.selected = data.newItem;
        // state.list.splice(state.list.indexOf(data.oldItem), 1)
        // state.list.push(data.newItem)
        Vue.set(state.list, state.list.indexOf(data.oldItem), data.newItem)
        // state.list = state.list.filter(function (item) {
        //   return item.n_inscricao==data.n_inscricao
        // })
    },
    GETBAPTISM(state, data) {        
        console.log('@Mutations!  GETBAPTISM!',data)
        state.list.find(p => p.id === id)
    }
};
