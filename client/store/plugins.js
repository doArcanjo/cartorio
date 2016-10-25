import { STORAGE_KEY,SAVE_TO_LOCAL_STORAGE,SETBAPTISMS } from './mutation-types'
import createLogger from 'vuex/dist/logger'

function saveModule(modName, modState) {
	  console.log("@ Save module localStoragePlugin2", mutation)
    for (let prop in modState) {
        localStorage.setItem(`${modName}.${prop}`, JSON.stringify(modState[prop]))
    }
}
const localStoragePlugin = store => {
  store.subscribe((mutation, data) => {
   console.log("Had Mutation in localStoragePlugin", mutation)
   console.log("Had DATA in localStoragePlugin", data)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  })
}
// const localStoragePlugin2 = store => {
//   store.subscribe((mutation, state) => {
//     console.log("Had Mutation in localStoragePlugin2", mutation)
//     console.log("WITH Mutation in localStoragePlugin2",state)
//     if (mutation.type === SETBAPTISMS) {
//       const moduleToSave = mutation.payload.save
//       if (moduleToSave) {
//         saveModule(moduleToSave, state[moduleToSave])
//       }
//     }
//   })
// }

export default process.env.NODE_ENV !== 'production'
  ? [createLogger(),localStoragePlugin]//, localStoragePlugin2]
  : [localStoragePlugin,localStoragePlugin2]