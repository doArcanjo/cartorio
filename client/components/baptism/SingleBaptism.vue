<template>
  <div class="page">
  <div class="well">
	<div @click="$store.dispatch('loadBaptismsLocalDummy')">Carregar Baptismos</div>
	<ol class="breadcrumb">
	  <li class="breadcrumb-item"><a href="/">Incio</a></li>
	  <li class="breadcrumb-item" @click.prevent="goBack()"><a href="/baptisms">Baptismos</a></li>
	  <li class="breadcrumb-item active">Data</li>
	</ol>
    <!-- <b><h2>Baptismo</h2></b>
    <hr> -->
    <baptism-header some-prop="Someproperty1" :SingleBaptismData="SingleBaptismCopy"></baptism-header> 
 
<!-- End of Well -->    
</div>
<ul class="nav nav-tabs">
  <li class="active"><a data-toggle="tab" href="#personal-data-baptism-wrapper">Dados pessoais</a></li>
  <li><a data-toggle="tab" href="#godfather-and-grandfather">Avós e Padrinhos</a></li>
</ul>


<div class="tab-content col-xs-9">
  <div id="personal-data-baptism-wrapper" class="tab-pane fade in active">
   <personal-data-baptism some-prop="Someproperty2" :SingleBaptismData="SingleBaptismCopy"></personal-data-baptism>  

  </div>
  <div id="godfather-and-grandfather" class="tab-pane fade">
    <grandfather-godfather-baptism some-prop="Someproperty3" :SingleBaptismData="SingleBaptismCopy"></grandfather-godfather-baptism>
  </div>
  </div>

  <!-- End page -->
	<button @click="saveBaptismData()">Guardar Baptismo</button>
	<button @click="SingleBaptismReset()">Anular alterações</button>
	<button @click="id()">ID</button>
  </div>
</template>

<script>
import datetime from 'vue-datetimepicker';
import BaptismHeader from './BaptismHeader';
import PersonalDataBaptism from './PersonalDataBaptism';
import GrandfatherGodfatherBaptism from './GrandfatherGodfatherBaptism';
import { mapActions,mapGetters } from 'vuex'

export default{
	name: 'SingleBaptismComponent',
	components: { datetime,
		BaptismHeader,
		PersonalDataBaptism,
		GrandfatherGodfatherBaptism 
	},
	data(){
		console.log('DATA @', this.name)
		return {SingleBaptismCopy:{}};
	},
	ready() {
		console.log("READY ")
		console.log("READY ",this.getLastSelectedBaptism)
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
	    	console.log('@ Single baptism Id',this.$store.state.route.params.id)
	    	return this.$store.state.route.params.id
	    },
		saveBaptismData(){
			console.log("SingleBaptism.avo_paterno:",this.SingleBaptismCopy.avo_paterno)
			console.log("SingleBaptism.avo_paterna:",this.SingleBaptismCopy.avo_paterna)
			// console.log("Updated SINGLE BAPTISM",this.SingleBaptismCopy)
			this.updateSingleBaptism(this.SingleBaptismCopy)
		},
		goBack(){
			this.$router.go('-1')
		},
		GetModelData(){
			this.$nextTick(function () {
	  	// console.log("Mounted ")
	  	//Fetches the selected
	  	// this.SingleBaptismCopy=JSON.parse(JSON.stringify(this.getLastSelectedBaptism))
	  	//Fetches by id
		  	this.getSingleBaptism({n_inscricao:this.id()})
		  	.then((data) => {
		  		this.SingleBaptismCopy=JSON.parse(JSON.stringify(data))
		  	})
	  	})
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
      this.SingleBaptismCopy=JSON.parse(JSON.stringify(this.getLastSelectedBaptism))

      return JSON.parse(JSON.stringify(this.getLastSelectedBaptism))
      // sends the real one : changes will be done 
      return this.getLastSelectedBaptism
    }
  }

}
</script>
<style>
</style>