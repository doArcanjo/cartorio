export function loadBaptismsXHR({commit}){
    this.$http.get("/products.json").then(
        (response)=>{
           commit("SETBAPTISMS",JSON.parse(response.data))
        },
        (error)=>{
            console.error(error.statusText)
        }
    )
}

export function loadBaptismsLocalDummy({commit}){
	setTimeout(() => {
    //commit("SETBAPTISMS",[])
        console.log('@actions!  loadBaptismsLocalDummy!')
      commit('SETBAPTISMS')
    }, 200)
    
}

export function loadBaptismsLocal({commit},payload){
    setTimeout(() => {
      commit('SETBAPTISMS',payload.data)
    }, 200)
}

export function selectSingleBaptism({commit},payload){
    setTimeout(() => {
        console.log('@actions!  selectSingleBaptism!',payload)
      commit('SETBAPTISM',payload)
    }, 200)
    
}