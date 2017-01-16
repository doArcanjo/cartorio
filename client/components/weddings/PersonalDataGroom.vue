<template>
	<div id="personal-data-component">
	<div class="row vertical-align">
	 	<div class="col-xs-2">
		 <label>O Nubente</label>
		</div>
	 	<div class="col-xs-7  input-group input-group-xs">
			  <input type="text" class="form-control" v-model="SingleItemData.noivo">
		 </div>
		 <div class="col-xs-2 checkbox">
	    <label>
	      <input type="checkbox"> Mailing
	    </label>
	    </div>
	</div>	
	<div class="row vertical-align">
	 	<div class="col-xs-2">
		 <label>Baptizado(a)</label>
		</div>
	 	<div class="col-xs-7  input-group input-group-xs">
			  <input type="text" class="form-control" v-model="SingleItemData.tipo_baptismo">
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
			  <input type="text" class="form-control" v-model="SingleItemData.oficiante">
		 </div>
	</div>    
	<div class="row vertical-align">
	 	<div class="col-xs-2">
		 <label>Com Autorização</label>
		</div>
	 	<div class="col-xs-10  input-group input-group-xs">
			  <input type="text" class="form-control" v-model="SingleItemData.autorizacao">
		 </div>
	</div> 
	<div class="row vertical-align">
	 	<div class="col-xs-2">
		 <label>Na (No)</label>
		</div>
	 	<div class="col-xs-4  input-group input-group-xs">
			  <input type="text" class="form-control" v-model="SingleItemData.centro_culto">
		 </div>
		 <div class="col-xs-2">
		 <label>Paróquia de</label>
		</div>
	 	<div class="col-xs-4  input-group input-group-xs">
			  <input type="text" class="form-control" v-model="SingleItemData.paroquia_bapt">
		 </div>
	</div>
	<div class="row vertical-align">
	 	<div class="col-xs-2">
		 <label>Concelho de</label>
		</div>
	 	<div class="col-xs-4  input-group input-group-xs">
			  <input type="text" class="form-control" v-model="SingleItemData.concelho_bapt">
		 </div>
		 <div class="col-xs-2">
		 <label>Diocese</label>
		</div>
	 	<div class="col-xs-4  input-group input-group-xs">
			  <input type="text" class="form-control" v-model="SingleItemData.diocese_bapt">
		 </div>
	</div>
	<div class="row vertical-align">
	 	<div class="col-xs-2">
		 <label>Data do Baptismo</label>
		</div>
		<div class="col-xs-2  input-group input-group-xs">
			  <input type="text" class="form-control" v-model="SingleItemData.data_bapt">
		 </div>
	 	<div class="col-xs-6  input-group input-group-xs">
			  <input type="text" class="form-control" v-model="SingleItemData.data_bapt_long">
		 </div>
	 	<div class="col-xs-1  input-group input-group-xs">
			 <label>Hora</label>
		 </div>
		 <div class="col-xs-1  input-group input-group-xs">
			  <input type="text" class="form-control" v-model="SingleItemData.hora_bapt">
		 </div>
	</div>
	<div class="row vertical-align">
	 	<div class="col-xs-2">
		 <label>Data Nascimento</label>
		</div>
		<div class="col-xs-2  input-group input-group-xs">
			  <input type="text" class="form-control" v-model="SingleItemData.data_n">
		 </div>
	 	<div class="col-xs-6  input-group input-group-xs">
			  <input type="text" class="form-control" v-model="SingleItemData.data_n_long">
		 </div>
	 	<div class="col-xs-1  input-group input-group-xs">
			 <label>Hora</label>
		 </div>
		 <div class="col-xs-1  input-group input-group-xs">
			  <input type="text" class="form-control" v-model="SingleItemData.hora_n">
		 </div>
	</div>
	<div class="row vertical-align">
	 	<div class="col-xs-2 ">
		 <label>Freguesia de</label>
		</div>
		<div class="col-xs-4  input-group input-group-xs">
			  <input type="text" class="form-control" v-model="SingleItemData.freguesia_n">
		 </div>
	 	<div class="col-xs-3  input-group input-group-xs">
			 <label>Concelho</label>
		 </div>
		 <div class="col-xs-3  input-group input-group-xs">
			  <input type="text" class="form-control" v-model="SingleItemData.concelho_n">
		 </div>
	</div>
	<div class="row vertical-align">
	 	<div class="col-xs-2">
		 <label>Filho de</label>
		</div>
		<div class="col-xs-6  input-group input-group-xs">
			  <input type="text" class="form-control" v-model="SingleItemData.filho_de">
		 </div>
	 	<div class="col-xs-2  input-group input-group-xs">
			 <label>Contacto</label>
		 </div>
		 <div class="col-xs-2  input-group input-group-xs">
			  <input type="text" class="form-control" v-model="SingleItemData.contacto_filho_de">
		 </div>
	</div>
	<div class="row vertical-align">
	 	<div class="col-xs-2">
		 <label>E de</label>
		</div>
		<div class="col-xs-6  input-group input-group-xs">
			  <input type="text" class="form-control" v-model="SingleItemData.e_de">
		 </div>
	 	<div class="col-xs-2  input-group input-group-xs">
			 <label>Contacto</label>
		 </div>
		 <div class="col-xs-2  input-group input-group-xs">
			  <input type="text" class="form-control" v-model="SingleItemData.contacto_e_de">
		 </div>
	</div>
	<div class="row vertical-align">
	 	<div class="col-xs-2">
		 <label>No estado de</label>
		</div>
		<div class="col-xs-3  input-group input-group-xs">
			  <input type="text" class="form-control" v-model="SingleItemData.estado">
		 </div>
	 	<div class="col-xs-3  input-group input-group-xs">
			 <label>Email Contacto</label>
		 </div>
		 <div class="col-xs-4  input-group input-group-xs">
			  <input type="text" class="form-control" v-model="SingleItemData.email_pais">
		 </div>
	</div>
	<div class="row vertical-align">
	 	<div class="col-xs-2">
		 <label>Residentes</label>
		</div>
		<div class="col-xs-10  input-group input-group-xs">
			  <input type="text" class="form-control" v-model="SingleItemData.residentes">
		 </div>
	</div>
	<div class="row vertical-align">
	 	<div class="col-xs-2">
		 <label>Código Postal</label>
		</div>
		<div class="col-xs-2  input-group input-group-xs">
			  <input type="text" class="form-control" v-model="SingleItemData.c_postal_r">
		 </div>
	 	<div class="col-xs-2  input-group input-group-xs">
			 <label>Freguesia</label>
		 </div>
		 <div class="col-xs-2  input-group input-group-xs">
			  <input type="text" class="form-control" v-model="SingleItemData.freguesia_r">
		 </div>
		 <div class="col-xs-2  input-group input-group-xs">
			 <label>Concelho :</label>
		 </div>
		 <div class="col-xs-2 input-group input-group-xs">
			  <input type="text" class="form-control" v-model="SingleItemData.concelho_r">
		 </div>
	</div>
	<div class="row vertical-align">
	 	<div class="col-xs-2">
		 <label>Observações</label>
		</div>
		<div class="col-xs-10  input-group input-group-xs">
			  <input type="text" class="form-control" v-model="SingleItemData.observacoes">
		 </div>
	</div>
		<!-- <h5>{{someProp}}</h5> -->
	</div>                                            
</template>
<script>
	export default {
		name:'PersonalDataGroomComponent',
		compiled(){
			console.log("Loaded compiled PersonalDataGroomComponent")
		},
		data()	{
			return {};
		},
		props:{
			comment: Object,
			'message':String,
			SingleItemData: Object,
			'some-prop': String	
		} 
	}
</script>