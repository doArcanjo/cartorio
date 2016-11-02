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

export function updateSingleBaptism({commit, state},payload){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('@actions!  updateSingleBaptism!',payload)
      console.log('@actions!  commit!',state)
      const oldItem = state.list.find(bapt => bapt.n_inscricao == payload.n_inscricao)
      console.log("baptism found:",oldItem)

      // console.log('@actions!  updateSingleBaptism payload.data!',payload.data)
      // commit('UPDATEBAPTISM',payload)
      commit('UPDATEBAPTISM',{oldItem:oldItem,newItem:payload})

      resolve();
    }, 1)
  })
    
}

export function getSingleBaptism({commit, state},payload){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('@actions!  getSingleBaptism!',payload)
        const baptism = state.list.find(bapt => bapt.n_inscricao == payload.n_inscricao)
        console.log("@actions!  getSingleBaptism! baptism found",baptism)
        return resolve(baptism);
      // commit('GETBAPTISM',payload)
    }, 1)
    })
}