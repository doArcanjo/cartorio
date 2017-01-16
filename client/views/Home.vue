<template>
  <div class="page">
  <b><h2>Cartorio</h2></b>
  <div class="well">
	 <div class="row">
	   <div class="col-xs-6"> 
	   	   <div class="thumbnail">
			   <router-link to="/baptisms" exact>
				   <span class="my-big-icon flaticon-christian-baptism"></span> <div class="caption">
				   <h3>Baptismos</h3> <p>Visualizar os Baptismos.</p> </div>
			   </router-link>
		    </div> 
	   </div> 
	   <div class="col-xs-6"> 
		   <div class="thumbnail">
			   <router-link to="/weddings" exact>
				   <span class="my-big-icon flaticon-wedding-rings"></span> <div class="caption">
				   <h3>Casamentos</h3> <p>Visualizar os Casamentos.</p> </div>
			   </router-link>
		   </div> 
	   </div> 
	 </div>
	 <div class="row">
		 <div class="col-xs-6"> 
		   	   <div class="thumbnail" exact>
				   <router-link to="/funerals">
					   <span class="my-big-icon flaticon-christian-coffin"></span> <div class="caption">
					   <h3>Funerais</h3> <p>Visualizar os Funerais.</p> </div>
				   </router-link>
			    </div> 
		   </div> 
		   <div class="col-xs-6"> 
			   <div class="thumbnail">
				   <router-link to="/catechisis" exact>
					   <span class="my-big-icon flaticon-christian-church"></span> <div class="caption">
					   <h3>Catequese</h3> <p>Visualizar a Catequese.</p> </div>
				   </router-link>
			   </div> 
		   </div> 
	 </div>
	</div>
  </div>
</template>

<script>
// import alasqlTest from '../components/mixins/alasqlTest'
export default{
	name: 'Home',
	components: { },
	data(){
		return {};
	}
}
</script>
