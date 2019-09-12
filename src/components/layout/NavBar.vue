<template>
<nav>
  <div class="nav-wrapper deep-purple">
    <router-link :to="{ name: 'GMap'}" class="brand-logo">Geolocalización Aplicación </router-link>
    <a href="" class="brand-logo left"></a>
    <ul class="right">
      <li v-if="!user"> <router-link :to="{ name: 'Signup'}"> Registrarse</router-link></li>
      <li v-if="!user"> <router-link :to="{ name: 'Login'}"> Inicio de sesión</router-link></li>
      <li v-if="user"><a>{{user.email}}</a></li>
      <li v-if="user"><a @click="logout">Cerrar sesión</a></li>
    </ul>
  </div>
</nav>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'NavBar',
  data (){
    return{
      user: null
    }
  },
  methods:{
    logout(){
      firebase.auth().signOut()
        .then( () => {
          this.$router.push({name: 'Login'})
        })
    }
  },
  created(){
    //let user = firebase.auth().currentUser
    firebase.auth().onAuthStateChanged((user)=>{
      if (user) {
        this.user = user
      } else {
        this.user = null
      }
    })
  }
}
</script>
