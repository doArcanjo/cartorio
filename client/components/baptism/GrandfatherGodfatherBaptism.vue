<template>
	<div id="GrandfatherGodfatherBaptismWrapper" class="well well-lg">
		<div class="row vertical-align">
		 	<div class="col-xs-2">
			 <label>Neto(a) paterno(a)</label>
			</div>
		 	<div class="col-xs-8  input-group input-group-xs">
				  <input type="text" class="form-control" v-model="SingleBaptismData.avo_paterno">
			</div>
		</div>
		<div class="row vertical-align">
		 	<div class="col-xs-2">
			 <label>e de</label>
			</div>
		 	<div class="col-xs-8  input-group input-group-xs">
				  <input type="text" class="form-control" v-model="SingleBaptismData['avo_paterna']">
			</div>
		</div>
		<div class="row vertical-align">
		 	<div class="col-xs-2">
			 <label>Neto(a) materno(a)</label>
			</div>
		 	<div class="col-xs-8  input-group input-group-xs">
				  <input type="text" class="form-control" v-model="SingleBaptismData['avo_materno']">
			</div>
		</div>
		<div class="row vertical-align">
		 	<div class="col-xs-2">
			 <label>e de</label>
			</div>
		 	<div class="col-xs-8  input-group input-group-xs">
				  <input type="text" class="form-control" v-model="SingleBaptismData['avo_materna']">
			</div>
		</div>
		<br>
		<div class="well">
			<div class="row vertical-align">
			 	<div class="col-xs-2">
				 <label class="label-info">Padrinho</label>
				</div>
			 	<div class="col-xs-6  input-group input-group-xs">
					  <input type="text" class="form-control" v-model="SingleBaptismData['padrinho']">
				</div>
				<div class="col-xs-2">
				 <label>N.º de Ficha Individual</label>
				</div>
				<div class="col-xs-2  input-group input-group-xs">
					  <input type="text" class="form-control" v-model="SingleBaptismData['ficha_padrinho']">
				</div>
			</div>
			<div class="row vertical-align">
			 	<div class="col-xs-2">
				 <label>No estado de</label>
				</div>
			 	<div class="col-xs-4  input-group input-group-xs">
					  <input type="text" class="form-control" v-model="SingleBaptismData['estado_padrinho']">
				</div>
				<div class="col-xs-2">
				 <label>Profissão</label>
				</div>
				<div class="col-xs-4  input-group input-group-xs">
					  <input type="text" class="form-control" v-model="SingleBaptismData['profissao_padrinho']">
				</div>
			</div>
			<div class="row vertical-align">
			 	<div class="col-xs-2">
				 <label>Residente</label>
				</div>
			 	<div class="col-xs-10  input-group input-group-xs">
					  <input type="text" class="form-control" v-model="SingleBaptismData['morada_padrinho']">
				</div>
			</div>
			<div class="row vertical-align">
				<div class="col-xs-2">
				 <label>Representante</label>
				</div>
				<div class="col-xs-10  input-group input-group-xs">
					  <input type="text" class="form-control" v-model="SingleBaptismData['representante_padrinho']">
				</div>
			</div>
		<!-- End of padrinho's Well -->		
		</div>
		<div class="well">
			<div class="row vertical-align">
			 	<div class="col-xs-2">
				 <label class="label-info">Madrinha</label>
				</div>
			 	<div class="col-xs-6  input-group input-group-xs">
					  <input type="text" class="form-control" v-model="SingleBaptismData['madrinha']">
				</div>
				<div class="col-xs-2">
				 <label>N.º de Ficha Individual</label>
				</div>
				<div class="col-xs-2  input-group input-group-xs">
					  <input type="text" class="form-control" v-model="SingleBaptismData['ficha_madrinha']">
				</div>
			</div>
			<div class="row vertical-align">
			 	<div class="col-xs-2">
				 <label>No estado de</label>
				</div>
			 	<div class="col-xs-4  input-group input-group-xs">
					  <input type="text" class="form-control" v-model="SingleBaptismData['estado_madrinha']">
				</div>
				<div class="col-xs-2">
				 <label>Profissão</label>
				</div>
				<div class="col-xs-4  input-group input-group-xs">
					  <input type="text" class="form-control" v-model="SingleBaptismData['profissao_madrinha']">
				</div>
			</div>
			<div class="row vertical-align">
			 	<div class="col-xs-2">
				 <label>Residente</label>
				</div>
			 	<div class="col-xs-10  input-group input-group-xs">
					  <input type="text" class="form-control" v-model="SingleBaptismData['morada_madrinha']">
				</div>
			</div>
			<div class="row vertical-align">
				<div class="col-xs-2">
				 <label>Representante</label>
				</div>
				<div class="col-xs-10  input-group input-group-xs">
					  <input type="text" class="form-control" v-model="SingleBaptismData['representante_madrinha']">
				</div>
			</div>
		<!-- End of madrinha's Well -->
		</div>
		<div class="row vertical-align">
		 	<div class="col-xs-2">
			 <label>Os quais comigo</label>
			</div>
		 	<div class="col-xs-9  input-group input-group-xs">
				  <input type="text" class="form-control" v-model="SingleBaptismData['comigo']">
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
