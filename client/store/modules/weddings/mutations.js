import Vue from "vue";
import {BAPTISMS_STORAGE_KEY,SETBAPTISMS} from '../../mutation-types'
var ItemsJson = require ('../../../assets/data/casamentos2006.json'); 

export default {
    SET_ALL_ITEMS(state, data='[]') {
        if(data==='[]'){
            state.list = ItemsJson;
            return;
        }
        state.list = JSON.parse(data);
       
         // localStorage.setItem('funerals', data);
    },
    SET_ITEM(state, data) {
        console.log('@Mutations!  SET_ITEM!',data)
        state.selected = data;
    },
    UPDATE_ITEM(state,data) {
        console.log('@Mutations!  UPDATE_ITEM!',data)
        console.log('@Mutations!  UPDATE_ITEM index!',data.n_inscricao)
        // console.log("state.list.indexOf(data.n_inscricao):")
        state.selected = data.newItem;
        // state.list.splice(state.list.indexOf(data.oldItem), 1)
        // state.list.push(data.newItem)
        Vue.set(state.list, state.list.indexOf(data.oldItem), data.newItem)
        // state.list = state.list.filter(function (item) {
        //   return item.n_inscricao==data.n_inscricao
        // })
    },
    GET_ITEM(state, data) {        
        console.log('@Mutations!  GET_ITEM!',data)
        state.list.find(p => p.id === id)
    }
};
