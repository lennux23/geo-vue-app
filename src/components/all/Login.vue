<template>
  <div class="login container">
    <form @submit.prevent="login" class="card-panel">
      <h2 class="center deep-purple-text">Inicio de sesión</h2>
      <div class="field">
        <label for="email">Email:</label>
        <input type="email" name="email" v-model="email">
      </div>
      <div class="field">
        <label for="password">Contraseña:</label>
        <input type="password" name="password" v-model="password">
      </div>
      <p v-if="feedback" class="red-text center">{{feedback}}</p>
      <div class="field">
        <button class="btn deep-purple" >Inicio </button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Login',
  data() {
    return{
      email: null,
      password: null,
      feedback: null
    }
  },
  methods:{
    login(){
      if (this.email && this.password){
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .then( cred => {
            this.$router.push( {name: 'GMap'})
          })
          .catch (err => {
            console.error(err)
            this.feedback = err.message
          })
      } else {
        this.feedback = "Introduce email y/o contraseña"
      }
    }
  }
}
</script>

<style>
.login {
  max-width: 400px;
  margin-top: 60px;
}
.login h2 {
  font-size: 2.4em;
}
.login .field {
  margin-bottom: 20px;
}

</style>

