export function incrementAsync({commit}) {
    setTimeout(() => {
    	console.log('@actions!  INCREMENT!')
      commit('INCREMENT')
    }, 200)
}
