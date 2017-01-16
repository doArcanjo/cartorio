<template>
  <div class="page">
  <div class="well">
	<ol class="breadcrumb">
	  <li class="breadcrumb-item"><a href="/">Inicio</a></li>
	  <li class="breadcrumb-item" @click.prevent="goBack()"><a :href="cp.singleItemPath">{{vl.viewUsageName}}</a></li>
	  <li class="breadcrumb-item active">Data</li>
	</ol>
    <!-- <b><h2>Baptismo</h2></b>
    <hr> -->
    <baptism-header some-prop="Someproperty1" :SingleBaptismData="SingleItemCopy"></baptism-header> 
 	
<!-- End of Well -->    
</div>
<div id="actions">
		<button @click="saveBaptismData()">Guardar Baptismo</button>
		<button @click="SingleBaptismReset()">Anular alterações</button>
		<button @click="id()">ID</button>
	</div>
<ul class="nav nav-tabs">
  <li class="active"><a data-toggle="tab" href="#personal-data-baptism-wrapper">Dados pessoais</a></li>
  <li><a data-toggle="tab" href="#godfather-and-grandfather">Avós e Padrinhos</a></li>
  <li><a data-toggle="tab" href="#dados-do-nubente">Dados do Nubente</a></li>
  <li><a data-toggle="tab" href="#dados-da-nubente">Dados da Nubente</a></li>
</ul>
<div class="tab-content col-xs-12">
	<div id="personal-data-baptism-wrapper" class="tab-pane fade in active">
		<personal-data-baptism some-prop="Someproperty2" :SingleBaptismData="SingleItemCopy"></personal-data-baptism>  
	</div>
	<div id="godfather-and-grandfather" class="tab-pane fade">
		<grandfather-godfather-baptism some-prop="Someproperty3" :SingleBaptismData="SingleItemCopy"></grandfather-godfather-baptism>
	</div>
	<div id="dados-do-nubente" class="tab-pane fade">
		<personal-data-groom some-prop="Someproperty3" :SingleItemData="SingleItemCopy"></personal-data-groom>
	</div>
	<div id="dados-da-nubente" class="tab-pane fade">
		<personal-data-fiance some-prop="Someproperty3" :SingleBaptismData="SingleItemCopy"></personal-data-fiance>
	</div>
  </div>

  <!-- End page -->
 	
  </div>

</template>

<script>
import services from '../../services/defaultModel'


import datetime from 'vue-datetimepicker';
import BaptismHeader from './../baptism/BaptismHeader'	;
import PersonalDataBaptism from './../baptism/PersonalDataBaptism';
import PersonalDataGroom from './PersonalDataGroom';
import PersonalDataFiance from './PersonalDataFiance';
import GrandfatherGodfatherBaptism from './../baptism/GrandfatherGodfatherBaptism';
import { mapActions,mapGetters } from 'vuex'

export default{
	name: 'SingleWeddingComponent',
	components: { datetime,
		BaptismHeader,
		PersonalDataBaptism,
		GrandfatherGodfatherBaptism,
		PersonalDataGroom,
		PersonalDataFiance 
	},
	data(){
		let init= services.componentProperties({model:'weddings'});
		init.SingleItemCopy={};
		return init;
	},
	ready() {
	},

	mounted: function () {
	  this.GetModelData()
	},
	methods:{
			...mapActions({
	        updateSingleBaptism:'updateSingleBaptism',
	        getSingleBaptism:'getSingleBaptism'
	    }),
	    id(){
	    	console.log(`Model: ${this.vl.model} Id: ${this.$store.state.route.params.id}`)
	    	return this.$store.state.route.params.id
	    },
		saveBaptismData(){
			console.log("SingleBaptism.avo_paterno:",this.SingleItemCopy.avo_paterno)
			console.log("SingleBaptism.avo_paterna:",this.SingleItemCopy.avo_paterna)
			// console.log("Updated SINGLE BAPTISM",this.SingleItemCopy)
			this.updateSingleBaptism(this.SingleItemCopy)
		},
		GetModelData(){
			// this.$nextTick(function () {
		  	services.getSingleItem({model:this.vl.model, payload:{n_inscricao:this.id()} })
		  	.then((data) => {
		  		this.SingleItemCopy=JSON.parse(JSON.stringify(data))
		  	})
	  	// })
		}, 
		goBack(){
			this.$router.go('-1')
		},
		
	    SingleBaptismReset(){
	    	console.log('Reset Module');
	    	  this.GetModelData();
	    	// this.$router.go('0')

	    }
	},
	computed: {
	 ...mapGetters({
      getBaptism:'getBaptism',
      getLastSelectedBaptism:'getLastSelectedBaptism'
     
    }),
    SingleBaptisma: function () {
      // makes a copy	
      this.SingleItemCopy=JSON.parse(JSON.stringify(this.getLastSelectedBaptism))

      return JSON.parse(JSON.stringify(this.getLastSelectedBaptism))
      // sends the real one : changes will be done 
      return this.getLastSelectedBaptism
    }
  }
}
</script>
<style>
</style>