<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import alasql from '../assets/vendor/alasql.min.js'
// window.alasql = require('../assets/vendor/alasql.min.js');
// window.xlsx = require('../assets/vendor/xslx.core.min.js');

// alasql = require('../assets/vendor/alasql.min.js');
// alasql = require('../assets/vendor/alasql.min.v3.3.js');
// xlsx = require('../assets/vendor/xslx.core.full.min.js');
// xlsx = require('../assets/vendor/xslx.core.min.js');
// xlsx = require('../assets/vendor/xslx.core.min.js');
	var data = [{a:1,b:1,c:1},{a:1,b:2,c:1},{a:1,b:3,c:1}, {a:2,b:1,c:1}];
var res = alasql('SELECT a, COUNT(*) AS b FROM ? GROUP BY a',[data]);
console.log("alasql",res);
</script>
<style src='../assets/css/style.css'></style>
<style>

.page {
  text-align: center;
  /*background: radial-gradient(circle, black, white);*/
  background: linear-gradient(black, white);
}
code {
  background-color: #f0f0f0;
  padding: 3px 5px;
  border-radius: 2px;
}
</style>
