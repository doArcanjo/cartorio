<template>
    <div id="BaptismHeaderWrapper">
        <div class="input-group input-group-xs">
          <span class="input-group-addon">N.º Inscrição</span>
          <input type="text" class="form-control" disabled v-model="SingleBaptismData.n_inscricao">
           <span class="input-group-addon">Ano</span>
          <input type="text" class="form-control" v-model="SingleBaptismData.ano">
          <span class="input-group-addon">Data Inscrição</span>
          <input type="text" class="form-control" v-model="SingleBaptismData.data_bapt">
          <span class="input-group-addon">N.º do Registo</span>
          <input type="text" class="form-control" v-model="SingleBaptismData.registo">
          <span class="input-group-addon">Folha</span>
          <input type="text" class="form-control" v-model="SingleBaptismData.folha">
          <span class="input-group-addon">"O" ou "A"</span>
          <input type="text" class="form-control" v-model="SingleBaptismData.sexo">
        </div>
         <br>
         <div class="row">
            <div class="col-xs-7">
             <div class="input-group input-group-xs">
                  <span class="input-group-addon">Nome</span>
                  <input type="text" class="form-control" v-model="SingleBaptismData.nome">
              </div>
             </div>
            <div class="col-xs-3">
             <div class=" input-group input-group-xs">
                  <span class="input-group-addon">N.º de ficha individual</span>
                  <input type="text" class="form-control" v-model="SingleBaptismData.ficha">
            </div>    
             </div>
            <div class="col-xs-2">
             <div class="input-group input-group-xs">
                  <span class="input-group-addon">Familia</span>
                  <input type="text" class="form-control" v-model="SingleBaptismData.familia">
             </div>
             </div>
        </div>
        <!-- <h5>{{someProp}}</h5> -->
    </div>
</template>
<script>
    export default {
        name:'BaptismHeaderComponent',
        compiled(){
            console.log("Loaded compiled")
        },
        data()  {
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