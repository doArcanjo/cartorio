<template>
  <div class="Navbar">
   <nav class="navbar navbar-default">
    <div class="container">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <router-link class="navbar-brand" to="/" >
          Inicio
        </router-link>
      </div>

      <div class="collapse navbar-collapse" id="navbar">
        <ul class="nav navbar-nav">
          <router-link
            to="/baptisms"
            active-class="active"
            class="nav-item"
            tag="li"
          >
            <a>
               <span class="flaticon-christian-baptism"></span>
              Baptismos
            </a>
          </router-link>
        </ul>
        <ul class="nav navbar-nav">
          <router-link
            :to="{ name: 'account.index' }"
            active-class="active"
            class="nav-item"
            tag="li"
          >
            <a>
              Qualquer coisa
            </a>
          </router-link>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li>
            <a href="#" @click.prevent="logout">
              <i class="fa fa-sign-out"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  </div>
</template>
<style>

</style>