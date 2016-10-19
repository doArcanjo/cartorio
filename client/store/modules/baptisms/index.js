import * as getters from './getters'
import * as actions from './actions'
var BaptismsJson = require ('../../../assets/data/baptismos2006.json'); 

const state = {
    list : [],
    selected : {}
}

const mutations = {
    SETBAPTISMS(state, data='[]') {
        if(data==='[]'){
            state.list = BaptismsJson;
            return;
        }
        state.list = JSON.parse(data);
    },
    SETBAPTISM(state, data) {
    	
        console.log('@Mutations!  SETBAPTISM!',data)

        state.selected = data;
    }
}

export default { state, mutations, actions,getters }