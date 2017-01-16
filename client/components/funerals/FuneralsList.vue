<template>
  <div class="page">
  <div @click="loadDefaultData()">Carregar {{vl.model}}</div>
<div>
<!-- <h2>Language {{localStorage.lang}}</h2>   -->
<h2 v-if='hasItems'>Existem {{vl.viewUsageName}} registados</h2>  
<h2 v-else>Não existem {{vl.viewUsageName}} </h2>  
<h1>File load and save</h1>
<p>Upload file here</p>
<input id="readfile" type="file" @change="loadFile"/>
<p>Save file here:</p>
<button @click="saveFileCSV(vl.viewUsageName,getItems)">Save file CSV</button>
<button @click="saveFileJSON(vl.viewUsageName,getItems)">Save file JSON</button>
<div id="res"></div>
</div> 
  <div class="well">
  <div id="content" class="ui basic segment">
                <h3 class="ui header">Lista de {{vl.viewUsageName}}</h3>
            </div>
     <table class="table is-narrow is-bordered">
          <thead>
          <th v-for="tableHeader in vl.fields.resumeTableHeaders">
          <!-- <pre>tableHeader</pre> -->
            <td>{{tableHeader}}</td>
           <!--  <th>Data baptismo</th>
            <th>Data Nascimento</th>
            <th>Mais</th>
            <th>Acções</th>
          </tr>
 -->        </thead>
        <tbody>
          <tr v-for="funeral in getItems">
            <td>
            <!-- <a href="" @click.prevent='navigateLink(singleBaptism)'>
                {{singleBaptism.nome}}
              </a> -->
              <!-- <pre>{{cp.singleItemPath}}</pre> -->
              <router-link :to="{ path: cp.singleItemPath +funeral.n_inscricao}">{{funeral.nome}}</router-link></td>
            <td>{{funeral.data_bapt}}</td>
            <td>{{funeral.data_n}}</td>
            <td class="is-icon">
              <a href="#">
                <i class="fa fa-map-marker"></i>
              </a>
              <a href="#">
                <i class="fa fa-plus-circle"></i>
              </a>
            </td>
            <td class="is-icon">

              <a href="" @click.prevent='selectSingleBaptism(funeral)'>
                <i class="fa fa-edit"></i>
              </a>
              <a href="#" @click.prevent="navigateLink(funeral)">
                <i class="fa fa-trash"></i>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    <hr>
  </div>
  <!-- End page -->
  </div>
</template>

<script>

import Modal from '../layout/Modal'
import filemixins from '../mixins/fileLoader'
import services from '../../services/defaultModel'
export default{
	name: 'FuneralListComponent',
  created: function() {
    // if usage needed install vue-reactivestorage
      // console.log('this.localStorage.lang ',this.localStorage.lang )
      // this.localStorage.lang = "other value"; 
      // // will react on the view and on real localStorage.
      // console.log('this.localStorage.lang ',this.localStorage.lang )
  },
  mixins: [filemixins],
	components: {Modal},
  methods:{
    /* This method overides the 'LoadData' Mixin method */
    LoadData(data){
      // this.LoadBaptisms(data);
      console.log(`Loading Local Data for model "${this.vl.model}"`,)  
      return services.loadLocalData({model: this.vl.model, data:data});
    },
    loadDefaultData(){
      console.log(`Loading Default Data for model "${this.vl.model}"`,)  
      return services.loadDefaultData({model: this.vl.model});
    }   
  },
  computed:{
    hasItems(){
      return services.hasItems({model:'funerals'});;
    },
    getItems(){
      return services.getAll({model:'funerals'});
    }
	},
	data(){
    // var dataAux=services.componentProperties({model:'funerals'});
    // console.error('services.componentProperties({model:funerals}',dataAux)
    // console.error('dataAux.vl',dataAux.vl)
    // console.error('dataAux.cp',dataAux.cp)
    return services.componentProperties({model:'funerals'});
	}  
}
</script>
