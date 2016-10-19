import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import BaptismList from '../components/baptism/BaptismList'
import SingleBaptism from '../components/baptism/SingleBaptism'
import Counter from '../components/Counter'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/counter',
      component: Counter
    },
    {
      path: '/baptisms',
      component: BaptismList
    },
    {
      path: '/baptisms/:id',
      component: SingleBaptism
    }

  ]
})
