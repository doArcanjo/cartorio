<template>


<!-- 
<div>
	 <datetime :readonly="true" format="YYYY-MM-DD"></datetime>
    <datetime format="YYYY-M-D" value="2015-9-5"></datetime>
    <datetime :readonly="true" format="MMM/D/YYYY" width="300px"></datetime>
</div> -->
 <div class="input-group input-group-xs"> 
 <input class="form-control" aria-label="Text input with multiple buttons"> 
 <div class="input-group-btn"> 
 	<button type="button" class="btn btn-default" aria-label="Help">
 	<span class="glyphicon glyphicon-question-sign"></span>
 	</button> 
 	<button type="button" class="btn btn-default">Action</button> </div> 
</div>

 <form class="form-inline">
  <div class="form-group">
    <label for="exampleInputName2">Name</label>
    <h1>{{fullName}}</h1>
    <h1>{{nome}}</h1>
    <input type="text" class="form-control" id="exampleInputName2" :value="nome">
  </div>
  <div class="form-group">
    <label for="exampleInputEmail2">Email</label>
    <input type="email" class="form-control" id="exampleInputEmail2" placeholder="jane.doe@example.com">
  </div>
  <button type="submit" class="btn btn-default">Send invitation</button>
</form>

 <p>
      To get started, edit files in <code>./client</code> and save.
    </p>

  </template>