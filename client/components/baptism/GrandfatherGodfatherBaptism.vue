<template>
	<div id="GrandfatherGodfatherBaptismWrapper">
    	<h3>Avós e Padrinhos</h3>
		<div class="row vertical-align">
		 	<div class="col-xs-2">
			 <label>Avô paterno</label>
			</div>
		 	<div class="col-xs-7  input-group input-group-xs">
				  <input type="text" class="form-control" v-model="SingleBaptismData.avo_paterno">
			</div>
			<div class="col-xs-2 checkbox">
			    <label>
			      <input type="checkbox"> Mailing
			    </label>
	    	</div>
		</div>
		<div class="row vertical-align">
		 	<div class="col-xs-2">
			 <label>Avó paterna</label>
			</div>
		 	<div class="col-xs-7  input-group input-group-xs">
				  <input type="text" class="form-control" v-model="SingleBaptismData['avo_paterna']">
			</div>
		</div>
		<!-- <div v-for="(value, key) in SingleBaptismData">
        <input v-model="SingleBaptismData[key]"/>
    </div> -->
		<h5>{{someProp}}</h5>
	<button @click="saveBaptismData()">Guardar Baptismo</button>

	</div>
</template>
<script>
	export default {
		name:'GrandfatherGodfatherBaptismComponent',
		compiled(){
			console.log("Loaded compiled")
		},
		data()	{
			return {};
		},
		methods:{
			saveBaptismData(){
				console.log("SingleBaptismData.avo_paterno:",this.SingleBaptismData.avo_paterno)
				console.log("SingleBaptismData.avo_paterna:",this.SingleBaptismData.avo_paterna)
			}
		},
		props:{
			comment: Object,
			'message':String,
			SingleBaptismData: Object,
			'some-prop': String	
		} 
	}
</script>