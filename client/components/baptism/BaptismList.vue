<template>
  <div class="page">

  <div @click="$store.dispatch('loadBaptismsLocalDummy')">Carregar Baptismos</div>
<div>
<h2 v-if='hasBaptisms'>Has Baptisms</h2>  
<h2 v-else>There are no Baptisms</h2>  
<h1>File load and save</h1>
<p>Upload file here</p>
<input id="readfile" type="file" @change="loadFile"/>
<p>Save file here:</p>
<button @click="saveFile">Save file</button>
<div id="res"></div>
</div> 
  <div class="well">
    <b><h2>Baptismos</h2></b>
    <!-- <pre>{{BaptismsJSON2}}<pre> -->
     <table class="table is-narrow is-bordered">
          <thead>
            <th>Nome</th>
            <th>Data baptismo</th>
            <th>Data Nascimento</th>
            <th>Mais</th>
            <th>Acções</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="singleBaptism in getBaptisms">
            <td><router-link :to="{ path: '/baptisms/'+singleBaptism.n_inscricao}">{{singleBaptism.nome}}</router-link></td>
            <td>{{singleBaptism.data_bapt}}</td>
            <td>{{singleBaptism.data_n}}</td>
            <td class="is-icon">
              <a href="#">
                <i class="fa fa-map-marker"></i>
              </a>
              <a href="#">
                <i class="fa fa-plus-circle"></i>
              </a>
            </td>
            <td class="is-icon">

              <a href="" @click.prevent='selectSingleBaptism(singleBaptism)'>
                <i class="fa fa-edit"></i>
              </a>
              <a href="#" @click.prevent="removeBrewery(brewery)">
                <i class="fa fa-trash"></i>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <modal :selected='selected'>yoo</modal>
    <pre>{{Baptisms2Json}}</pre>
    <hr>
  </div>
  <!-- End page -->
  </div>
</template>

<script>
var BaptismsJson = require ('../../assets/data/baptismos2006.json'); 
import { mapActions,mapGetters } from 'vuex'
import Modal from '../layout/Modal'
export default{
	name: 'BaptismListComponent',
	components: {Modal},
  methods:{
    ...mapActions({
      LoadBaptisms:'loadBaptismsLocal',
      selectSingleBaptism:'selectSingleBaptism'
    }),
    loadFile(e){
      // console.log('loadFile',e);
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createInput(files[0]);
    },
     createInput(file) {
            var reader = new FileReader();
            var vm = this;
            reader.onload = (e) => {

              vm.fileinput = reader.result;
              // console.log('data:',vm.fileinput);
             
              this.LoadBaptisms({data:vm.fileinput})

            }
            reader.readAsText(file);
        },
    removeImage: function (e) {
      this.image = '';
    },
    saveFile() {
      console.log('saveFile using ALasQL');
      alasql('SELECT * INTO XLSX("myfile.xlsx",{headers:true}) FROM ?',[this.getBaptisms]);
    }
  },
  computed:{
    ...mapGetters({
      getBaptisms:'getBaptisms',
      hasBaptisms:'hasBaptisms'
    }),
		Baptisms2Json(){
      console.log('Baptisms2Json',this.$store.state.baptisms);
			return this.$store.state.baptisms.list;
		},
		Baptisms1Json(){
			return BaptismsJson;
		}
	},
	data(){
		return {};
	}
}
</script>
