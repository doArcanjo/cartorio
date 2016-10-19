import * as actions from './actions'
const state = {
  count: 0
}

const mutations = {
  INCREMENT(state) {
    state.count++
    console.log("yeyeye:",state.count)
  }
}

export default { state, mutations,actions}