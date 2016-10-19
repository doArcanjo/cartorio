
export function getCounter(state){
    return state.counter;
}

export function wasUpdated(state){
    return state.counter>0
}