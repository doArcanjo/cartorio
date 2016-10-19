<template>
  <div class="page">
  <b><h2>Cartorio</h2></b>
  <div class="well">
     <hr>
	 <br>
	 <div class="row">
	 	<div class="col-xs-6">
	 	  <router-link to="/baptisms">Baptismos</router-link>
		</div>
	 	<div class="col-xs-6">
		 	<div class=" input-group input-group-xs">
			  <span class="input-group-addon">Casamentos</span>
			</div>	  
		</div>
	</div>
	<div class="row">
	 	<div class="col-xs-6">
	 	  <router-link to="/counter">Counter</router-link>
		</div>
	 	<div class="col-xs-6">
		 	<div class=" input-group input-group-xs">
			  <span class="input-group-addon">Casamentos</span>
			</div>	  
		</div>
	</div>
  </div>
</template>

<script>
var data = [{a:1,b:1,c:1},{a:1,b:2,c:1},{a:1,b:3,c:1}, {a:2,b:1,c:1}];
var res = alasql('SELECT a, COUNT(*) AS b FROM ? GROUP BY a',[data]);
console.log("alasql from home",res);
export default{
	name: 'Home',
	components: { },
	data(){
		return {};
	}
}
</script>
