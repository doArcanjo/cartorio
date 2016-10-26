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
      // commit('SAVE_TO_LOCAL_STORAGE',{save: 'baptisms'})
    }, 200)
    
}

export function loadBaptismsLocal({commit},payload){
    setTimeout(() => {
        console.log('@actions!  loadBaptismsLocal! Payload:',payload)
      commit('SETBAPTISMS',payload.data)
      // commit('SAVE_TO_LOCAL_STORAGE',{save: 'baptisms',data:payload.data})
    }, 200)
}

export function selectSingleBaptism({commit},payload){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('@actions!  selectSingleBaptism!',payload)
      commit('SETBAPTISM',payload)
      resolve();
    }, 1)
  })
    
}

export function getSingleBaptism({commit},payload){
    setTimeout(() => {
        console.log('@actions!  getBaptism!',payload)
      commit('GETBAPTISM',payload)
    }, 200)
    
}