
export function getBaptisms(state){
    return state.list;
}

export function getBaptism(state,id){
	console.log("GEEEEEEEEETTTTTT BAPTISM:", id)
    return state.list[1]||{};
}

export function getLastSelectedBaptism(state){
    return state.selected;
}

export function hasBaptisms(state){
    return state.list.length>0
}