
export function getAllData(state){
    return state.list;
}

export function getItemsLocalStorage(state){
    return JSON.parse(localStorage.getItem('funerals'));
}

// The 3rd argument of a getter is the rootState
//?check On Root state we have access to $route.params.id through "vuex-router-sync"
export function getSingleItem(state,getters,rootState){
	console.log("GET Item:",rootState.route);
	console.log("GET Item route:", this);
    return state.list[1]||{};
}

export function getLastSelectedItem(state){
    return state.selected;
}

export function hasItems(state){
    return state.list.length>0
}