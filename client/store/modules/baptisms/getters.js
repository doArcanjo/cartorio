
export function getBaptisms(state){
    return state.list;
}

export function getBaptismsLocalStorage(state){
    return JSON.parse(localStorage.getItem('baptisms'));
}

// The 3rd argument of a getter is the rootState
//?check On Root state we have access to $route.params.id through "vuex-router-sync"
export function getBaptism(state,getters,rootState){
	console.log("GEEEEEEEEETTTTTT BAPTISM:",rootState.route)
	console.log("GEEEEEEEEETTTTTT BAPTISM route:", this)
	// console.log("GEEEEEEEEETTTTTT BAPTISM route2:", this.route)
	console.log("GEEEEEEBAPTISM state:", state.baptisms)
	// this.$route.params.id
    return state.list[1]||{};
}

export function getLastSelectedBaptism(state){
    return state.selected;
}

export function hasBaptisms(state){
    return state.list.length>0
}