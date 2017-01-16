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

export function loadItemsDefault({commit}){
  setTimeout(() => {
        console.log('@actions!  loadItemsDefault @ weddings!')
      commit('SET_ALL_ITEMS')
      // commit('SAVE_TO_LOCAL_STORAGE',{save: 'baptisms'})
    }, 200)
    
}

export function loadItemsLocal({commit},payload){
    setTimeout(() => {
        console.log('@actions!  loadItemsLocal @ funerals! Payload:',payload)
      commit('SET_ALL_ITEMS',payload.data)
      // commit('SAVE_TO_LOCAL_STORAGE',{save: 'baptisms',data:payload.data})
    }, 200)
}

export function selectSingleItem({commit},payload){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('@actions!  selectSingleItem!',payload)
      commit('SET_ITEM',payload.data)
      resolve();
    }, 1)
  })
    
}

export function updateSingleItem({commit, state},payload){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('@actions!  updateSingleItem!',payload)
      console.log('@actions!  commit!',state)
      const oldItem = state.list.find(current_item => current_item.n_inscricao == payload.n_inscricao)
      console.log("Item found:",oldItem)

      // console.log('@actions!  updateSingleItem payload.data!',payload.data)
      commit('UPDATE_ITEM',{oldItem:oldItem,newItem:payload})

      resolve();
    }, 1)
  })
    
}

export function getSingleItem({commit, state},payload){
  return new Promise((resolve, reject) => {
        console.log('Store:: weddings :: actions :: getSingleItem',payload)
        const item = state.list.find(current_item => current_item.n_inscricao == payload.n_inscricao)
        console.log("Store:: weddings :: actions :: getSingleItem Item found",item)
        return resolve(item);
    })
}

export function getAllItems({commit, state},payload){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("@actions!  getAllItems! Returning list")
        return resolve(state.list);
    }, 1)
    })
}