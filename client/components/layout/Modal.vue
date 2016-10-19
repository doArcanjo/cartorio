<template>
<div id="modal_brewery" class="modal" :class="{'is-active':showModal}">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Cervejaria: {{selected.name}}</p>
      <button class="delete" @click.prevent="showModal=false"></button>
    </header>
    <section class="modal-card-body">

    <div class="columns">
      <div class="column">
        <label class="label">Nome</label>
          <p class="control">
            <input class="input" type="text" placeholder="Text input" v-model="selected.name">
          </p>
      </div>
      <div class="column">
         <label class="label">Código</label>
    <p class="control">
      <input class="input" type="text" placeholder="Código" v-model="selected.code">
    </p>
      </div>
      </div>

      <label class="label">Descrição</label>
      <p class="control">
        <textarea class="textarea" placeholder="Textarea" v-model="selected.descript"></textarea>
      </p>
      
   <label class="label">Website</label>
    <p class="control">
      <input class="input" type="text" placeholder="Text input" v-model="selected.website">
    </p>

    </section>
    <footer class="modal-card-foot">
      <a class="button is-primary" @click.prevent="saveBrewery">Salvar</a>
      <a class="button" @click.prevent="showModal=false">Cancelar</a>
    </footer>
  </div>
</div>
</template>
<script>

import { mapActions,mapGetters } from 'vuex'
export default {
	data(){
		return { 
			// selected: {},
			showModal:false
		}
	},
    computed: {
		...mapGetters({
	      selected:'getBaptism'
	    }),
	    count() {
	      console.log("@ counter vue Counter2:", this.$store.state.Counter)
	      return this.$store.state.Counter.count
	    }
  	}
}
</script>