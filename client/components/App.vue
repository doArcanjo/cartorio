<template>
  <div id="app">
    <navbar></navbar>
    <transition name="slide-right">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import dependencies from './mixins/dependencies'
import alasqlTest from './mixins/alasqlTest'

import Navbar from './layout/Navbar'
// import _ from 'lodash'
export default {
  components: {
   Navbar
  }
}
</script>
<style lang="css" src='../assets/css/style.css'></style>
<!-- Christian icons -->
<style lang="css" src='../assets/font/flaticon.css'></style>
<style>

/*Christian icons : in footer is the license needed for the usage */
/* all flat icons inside a thumbnail  will be bigger*/


/*.my-small-icon > [class^="flaticon-"]:before, [class*=" flaticon-"]:before,
[class^="flaticon-"]:after, [class*=" flaticon-"]:after {
  font-size: 2em;
  background-color: DodgerBlue;
}*/

.my-big-icon > [class^="flaticon-"]:before, [class*=" flaticon-"]:before,
[class^="flaticon-"]:after, [class*=" flaticon-"]:after {
  font-size: 8em;
}

.page {
  text-align: center;
  /*background: radial-gradient(circle, black, white);*/
  background: linear-gradient(black, white);
}
label{
  margin-bottom: 4px;
  font-weight: 700;
  font-size: 10px;
}
code {
  background-color: #f0f0f0;
  padding: 3px 5px;
  border-radius: 2px;
}
</style>
