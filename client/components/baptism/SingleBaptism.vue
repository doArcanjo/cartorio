<template>
  <div class="page">
  <div class="well">
	<div @click="$store.dispatch('loadBaptismsLocalDummy')">Carregar Baptismos</div>
    <b><h2>Baptismos</h2></b>
    <hr>
    <baptism-header some-prop="Someproperty1" :SingleBaptismData="SingleBaptism"></baptism-header> 
 
<!-- End of Well -->    
</div>
<ul class="nav nav-tabs">
  <li class="active"><a data-toggle="tab" href="#personal-data-baptism-wrapper">Dados pessoais</a></li>
  <li><a data-toggle="tab" href="#godfather-and-grandfather">Avós e Padrinhos</a></li>
</ul>


<div class="tab-content col-xs-9">
  <div id="personal-data-baptism-wrapper" class="tab-pane fade in active">
   <personal-data-baptism some-prop="Someproperty2" :SingleBaptismData="SingleBaptism"></personal-data-baptism>  

  </div>
  <div id="godfather-and-grandfather" class="tab-pane fade">
    <grandfather-godfather-baptism some-prop="Someproperty3" :SingleBaptismData="SingleBaptism"></grandfather-godfather-baptism>
  </div>
  </div>

  <!-- End page -->
	<button @click="saveBaptismData()">Guardar Baptismo</button>
  </div>
</template>

<script>
import datetime from 'vue-datetimepicker';
import BaptismHeader from './BaptismHeader';
import PersonalDataBaptism from './PersonalDataBaptism';
import GrandfatherGodfatherBaptism from './GrandfatherGodfatherBaptism';
import { mapActions,mapGetters } from 'vuex'

var SingleBaptism = require ('../../assets/data/single-baptism.json'); 
export default{
	name: 'SingleBaptismComponent',
	 components: { datetime,BaptismHeader, PersonalDataBaptism,GrandfatherGodfatherBaptism },
	data(){
		var SingleBaptism={};
		return {SingleBaptism:SingleBaptism};
	}, 
	methods:{
		saveBaptismData(){
			console.log("SingleBaptism.avo_paterno:",this.SingleBaptism.avo_paterno)
			console.log("SingleBaptism.avo_paterna:",this.SingleBaptism.avo_paterna)
		}
	},
	route: {
	    data ({ to }) {
	    	console.log("@ ROUTE",to.params.id)
		  document.title = 'Profile: ' + to.params.id + ' | Vue.js HN Clone'
	      return {
	        user: store.fetchUser(to.params.id)
	      }
	  	}
  	},
	computed: {
	 ...mapGetters({
      getBaptism:'getBaptism'
    }),
	SingleBaptism () {
		console.log("this.$route.params.id",this.$route.params.id);
		console.log("this.$route.params.id",this);
	 // return this.$store.state.baptisms.list[2]
		return this.getBaptism(this.$route.params.id);
	 // return getBaptism(this.$route.params.id)
	 // return this.getBaptism();
	},
    fullName: function () {
      return this.nome + ' ' + this.paroquia_bapt
    }
  }

}
</script>
