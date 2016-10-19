<template>
	<div id="personal-data-component">
		
	<div class="row vertical-align">
	 	<div class="col-xs-2">
		 <label>Baptizado(a)</label>
		</div>
	 	<div class="col-xs-7  input-group input-group-xs">
			  <input type="text" class="form-control" v-model="SingleBaptismData.tipo_baptismo">
		 </div>
		 <div class="col-xs-2 checkbox">
	    <label>
	      <input type="checkbox"> Mailing
	    </label>
	    </div>
	</div>
	<div class="row vertical-align">
	 	<div class="col-xs-2">
		 <label>Por</label>
		</div>
	 	<div class="col-xs-10  input-group input-group-xs">
			  <input type="text" class="form-control" v-model="SingleBaptismData.oficiante">
		 </div>
	</div>    
	<div class="row vertical-align">
	 	<div class="col-xs-2">
		 <label>Com Autorização</label>
		</div>
	 	<div class="col-xs-10  input-group input-group-xs">
			  <input type="text" class="form-control" v-model="SingleBaptismData.autorizacao">
		 </div>
	</div> 
	<div class="row vertical-align">
	 	<div class="col-xs-2">
		 <label>Na (No)</label>
		</div>
	 	<div class="col-xs-4  input-group input-group-xs">
			  <input type="text" class="form-control" v-model="SingleBaptismData.centro_culto">
		 </div>
		 <div class="col-xs-2">
		 <label>Paróquia de</label>
		</div>
	 	<div class="col-xs-4  input-group input-group-xs">
			  <input type="text" class="form-control" v-model="SingleBaptismData.paroquia_bapt">
		 </div>
	</div>
	<div class="row vertical-align">
	 	<div class="col-xs-2">
		 <label>Concelho de</label>
		</div>
	 	<div class="col-xs-4  input-group input-group-xs">
			  <input type="text" class="form-control" v-model="SingleBaptismData.concelho_bapt">
		 </div>
		 <div class="col-xs-2">
		 <label>Diocese</label>
		</div>
	 	<div class="col-xs-4  input-group input-group-xs">
			  <input type="text" class="form-control" v-model="SingleBaptismData.diocese_bapt">
		 </div>
	</div>
	<div class="row vertical-align">
	 	<div class="col-xs-2">
		 <label>Data do Baptismo</label>
		</div>
		<div class="col-xs-2  input-group input-group-xs">
			  <input type="text" class="form-control" v-model="SingleBaptismData.data_bapt">
		 </div>
	 	<div class="col-xs-6  input-group input-group-xs">
			  <input type="text" class="form-control" v-model="SingleBaptismData.data_bapt_long">
		 </div>
	 	<div class="col-xs-1  input-group input-group-xs">
			 <label>Hora</label>
		 </div>
		 <div class="col-xs-1  input-group input-group-xs">
			  <input type="text" class="form-control" v-model="SingleBaptismData.hora_bapt">
		 </div>
	</div>
	<div class="row vertical-align">
	 	<div class="col-xs-2">
		 <label>Data Nascimento</label>
		</div>
		<div class="col-xs-2  input-group input-group-xs">
			  <input type="text" class="form-control" v-model="SingleBaptismData.data_n">
		 </div>
	 	<div class="col-xs-6  input-group input-group-xs">
			  <input type="text" class="form-control" v-model="SingleBaptismData.data_n_long">
		 </div>
	 	<div class="col-xs-1  input-group input-group-xs">
			 <label>Hora</label>
		 </div>
		 <div class="col-xs-1  input-group input-group-xs">
			  <input type="text" class="form-control" v-model="SingleBaptismData.hora_n">
		 </div>
	</div>
	<div class="row vertical-align">
	 	<div class="col-xs-2 ">
		 <label>Freguesia de</label>
		</div>
		<div class="col-xs-4  input-group input-group-xs">
			  <input type="text" class="form-control" v-model="SingleBaptismData.freguesia_n">
		 </div>
	 	<div class="col-xs-3  input-group input-group-xs">
			 <label>Concelho</label>
		 </div>
		 <div class="col-xs-3  input-group input-group-xs">
			  <input type="text" class="form-control" v-model="SingleBaptismData.concelho_n">
		 </div>
	</div>
	<div class="row vertical-align">
	 	<div class="col-xs-2">
		 <label>Filho de</label>
		</div>
		<div class="col-xs-6  input-group input-group-xs">
			  <input type="text" class="form-control" v-model="SingleBaptismData.filho_de">
		 </div>
	 	<div class="col-xs-2  input-group input-group-xs">
			 <label>Contacto</label>
		 </div>
		 <div class="col-xs-2  input-group input-group-xs">
			  <input type="text" class="form-control" v-model="SingleBaptismData.contacto_filho_de">
		 </div>
	</div>
	<div class="row vertical-align">
	 	<div class="col-xs-2">
		 <label>E de</label>
		</div>
		<div class="col-xs-6  input-group input-group-xs">
			  <input type="text" class="form-control" v-model="SingleBaptismData.e_de">
		 </div>
	 	<div class="col-xs-2  input-group input-group-xs">
			 <label>Contacto</label>
		 </div>
		 <div class="col-xs-2  input-group input-group-xs">
			  <input type="text" class="form-control" v-model="SingleBaptismData.contacto_e_de">
		 </div>
	</div>
	<div class="row vertical-align">
	 	<div class="col-xs-2">
		 <label>No estado de</label>
		</div>
		<div class="col-xs-3  input-group input-group-xs">
			  <input type="text" class="form-control" v-model="SingleBaptismData.estado">
		 </div>
	 	<div class="col-xs-3  input-group input-group-xs">
			 <label>Email Contacto</label>
		 </div>
		 <div class="col-xs-4  input-group input-group-xs">
			  <input type="text" class="form-control" v-model="SingleBaptismData.email_pais">
		 </div>
	</div>
	<div class="row vertical-align">
	 	<div class="col-xs-2">
		 <label>Residentes</label>
		</div>
		<div class="col-xs-10  input-group input-group-xs">
			  <input type="text" class="form-control" v-model="SingleBaptismData.residentes">
		 </div>
	</div>
	<div class="row vertical-align">
	 	<div class="col-xs-2">
		 <label>Código Postal</label>
		</div>
		<div class="col-xs-2  input-group input-group-xs">
			  <input type="text" class="form-control" v-model="SingleBaptismData.c_postal_r">
		 </div>
	 	<div class="col-xs-2  input-group input-group-xs">
			 <label>Freguesia</label>
		 </div>
		 <div class="col-xs-2  input-group input-group-xs">
			  <input type="text" class="form-control" v-model="SingleBaptismData.freguesia_r">
		 </div>
		 <div class="col-xs-2  input-group input-group-xs">
			 <label>Concelho :</label>
		 </div>
		 <div class="col-xs-2 input-group input-group-xs">
			  <input type="text" class="form-control" v-model="SingleBaptismData.concelho_r">
		 </div>
	</div>
	<div class="row vertical-align">
	 	<div class="col-xs-2">
		 <label>Observações</label>
		</div>
		<div class="col-xs-10  input-group input-group-xs">
			  <input type="text" class="form-control" v-model="SingleBaptismData.observacoes">
		 </div>
	</div>
		<h5>{{someProp}}</h5>
	</div>                                            
</template>
<script>
	export default {
		name:'PersonalDataBaptismComponent',
		compiled(){
			console.log("Loaded compiled")
		},
		data()	{
			console.log("Loaded")
			return {};
		},
		props:{
			comment: Object,
			'message':String,
			SingleBaptismData: Object,
			'some-prop': String	
		} 
	}
</script>