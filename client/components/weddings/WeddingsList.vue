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
  <div id="vue-tables-options" class="container">
      <h3 class="ui header">Lista de {{vl.viewUsageName}}</h3>
    <v-client-table :data="getItems" :columns="vl.fields.resumeTableFields" :options="options"></v-client-table>
  </div>
    <hr>
  </div>
  <!-- End page -->
  </div>
</template>

<script>
import moment from 'moment'
import { mapActions,mapGetters } from 'vuex'
import Modal from '../layout/Modal'
import filemixins from '../mixins/fileLoader'
import services from '../../services/defaultModel'
export default{
	name: 'WeddingListComponent',
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
      return services.hasItems({model:this.vl.model});;
    },
    getItems(){
      return services.getAll({model:this.vl.model});
    }
	},
	data(){
    // var dataAux=services.componentProperties({model:'weddings'});
    // console.error('services.componentProperties({model:weddings}',dataAux)
    // console.error('dataAux.vl',dataAux.vl)
    // console.error('dataAux.cp',dataAux.cp)
    let init= services.componentProperties({model:'weddings'});
    init.options={
        toMomentFormat :'DD-MM-YYYY',
        headings: init.vl.fields.TableHeaders,
        dateColumns:['d_casam'],
        texts:{
          count:'A mostrar do {from} até ao {to} de {count} registos|{count} registos|Um registo',
          filter:'Procurar:',
          filterPlaceholder:'Inserir expressão',
          limit:'Registos:',
          noResults:'Não existem registos nestes parâmetros',
          page:'Página:', // for dropdown pagination 
          filterBy: 'Filtrar por {column}', // Placeholder for search fields when filtering by column
          loading:'A carregar...', // First request to server
          defaultOption:'Seleccionar {column}' // default option for list filters
        },
        // footerHeadings:true
        // dateFormat : 'DD-MM-YYYY',
        templates: {
          noivo: function (h, row) {
            let path=init.cp.singleItemPath + row.n_inscricao
            return <router-link to={path}>{row.noivo}</router-link>
          },
          noiva: function (h, row) {
            let path=init.cp.singleItemPath + row.n_inscricao
            return <router-link to={path}>{row.noiva}</router-link>
          },
          editar: function editar(h, row) {
            // console.log("the row",row)
            return <a href="#"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> {row.id}</a>;
          },
        },
      }  
      // console.log("Headers",init.vl.fields.TableHeaders)
    return init
	}  
}
</script>
