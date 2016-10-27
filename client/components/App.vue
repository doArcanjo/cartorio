<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import alasqltest from './mixins/alasqlTest'
import _ from 'lodash'
</script>
<style src='../assets/css/style.css'></style>
<style>

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
