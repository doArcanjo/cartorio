import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
/* Baptisms */
import BaptismList from '../components/baptism/BaptismList'
import SingleBaptism from '../components/baptism/SingleBaptism'

import FuneralsList from '../components/funerals/FuneralsList'

/* Weddings */
import WeddingsList from '../components/weddings/WeddingsList'
import SingleWedding from '../components/weddings/SingleWedding'
import Counter from '../components/Counter'

Vue.use(Router)

export default new Router({
  // mode: 'history',// no hashbangs #
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
    },
    {
      path: '/funerals',
      component: FuneralsList,
      'cartory-type': 'This is the cartory type of a list of funerals'
    },
    {
      path: '/weddings',
      component: WeddingsList,
      'cartory-type': 'This is the cartory type of a list of weddings'
    },
    {
      path: '/weddings/:id',
      component: SingleWedding,
      name: SingleWedding,
      'cartory-type': 'This is the cartory type of a Wedding'
    }

  ]
})
