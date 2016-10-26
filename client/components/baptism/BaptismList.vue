<template>
  <div class="page">

  <div @click="$store.dispatch('loadBaptismsLocalDummy')">Carregar Baptismos</div>
<div>
<!-- <h2>Language {{localStorage.lang}}</h2>   -->
<h2 v-if='hasBaptisms'>Has Baptisms</h2>  
<h2 v-else>There are no Baptisms</h2>  
<h1>File load and save</h1>
<p>Upload file here</p>
<input id="readfile" type="file" @change="loadFile"/>
<p>Save file here:</p>
<button @click="saveFileCSV('baptismos',getBaptisms)">Save file</button>
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
            <td>
            <a href="" @click.prevent='navigateLink(singleBaptism)'>
                {{singleBaptism.nome}}
              </a>
              <!-- <router-link :to="{ path: '/baptisms/'+singleBaptism.n_inscricao}">{{singleBaptism.nome}}</router-link></td> -->
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
              <a href="#" @click.prevent="navigateLink(singleBaptism)">
                <i class="fa fa-trash"></i>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- <modal :selected='selected'>yoo</modal> -->
    <pre>Baptisms in Local Storage</pre>
    <pre>{{BaptismsOnLocalStorage}}</pre>
    <!-- <pre>{{Baptisms2Json}}</pre> -->
    <hr>
  </div>
  <!-- End page -->
  </div>
</template>

<script>
import { mapActions,mapGetters } from 'vuex'
import Modal from '../layout/Modal'
import filemixins from '../mixins/fileLoader'
export default{
	name: 'BaptismListComponent',
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
    ...mapActions({
      LoadBaptisms:'loadBaptismsLocal',
      selectSingleBaptism:'selectSingleBaptism'
    }),
    /* This method overides the 'LoadData' Mixin method */
    LoadData(data){
      this.LoadBaptisms(data)
    },
    navigateLink(link) {
      // console.log('link',link);
      this.selectSingleBaptism(link).then(() => {
  // ...
        this.$router.push('/baptisms/'+link.n_inscricao)
      })
      this.$nextTick(function () {
       }) 
      // this.$router.go({ query: : '/baptisms'})
      // this.$router.go('/')
      // ({ name: 'baptisms', params: { id: 123 }})
    }
  },
  computed:{
    ...mapGetters({
      getBaptisms:'getBaptisms',
      hasBaptisms:'hasBaptisms',
      getBaptismsLocalStorage:'getBaptismsLocalStorage'
    }),
		Baptisms2Json(){
      // console.log('Baptisms2Json',this.$store.state.baptisms);
      return this.$store.state.baptisms.list;
    },
    BaptismsOnLocalStorage(){
      // console.log('Baptisms2Json',this.$store.state.baptisms);
			return this.getBaptismsLocalStorage;
		}
	},
	data(){
		return {};
	}
}
</script>
