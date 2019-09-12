<template>
  <div class="signup container">
    <form
      @submit.prevent="signup"
      class="card-panel"
    >
      <h2 class="center deep-purple-text">Registro</h2>
      <div class="field">
        <label for="email">Email:</label>
        <input
          type="email"
          name="email"
          v-model="email"
        >
      </div>
      <div class="field">
        <label for="password">Contraseña:</label>
        <input
          type="password"
          name="password"
          v-model="password"
        >
      </div>
      <div class="field">
        <label for="alias">Alias:</label>
        <input
          type="text"
          name="alias"
          v-model="alias"
        >
      </div>
      <p
        class="red-text center"
        v-if="feedback"
      >{{feedback}}</p>
      <div class="field center">
        <button class="btn deep-purple">Registrarse </button>
      </div>
    </form>
  </div>
</template>
<script>
import slugify from 'slugify'
import db from '@/firebase/init'
import firebase from 'firebase'
import functions from 'firebase/functions'
export default {
  name: 'Signup',
  data () {
    return {
      email: null,
      password: null,
      alias: null,
      feedback: null,
      slug: null,
    }
  },
  methods: {
    signup () {
      if (this.alias && this.email && this.password) {
        this.slug = slugify(this.alias, {
          replacement: '-',
          remove: /[$*_+.()'"!\-:@]/g,
          lower: true
        })
        // make a reference
        let checkAlias = firebase.functions().httpsCallable('checkAlias')
        checkAlias({ slug: this.slug })
          .then(result => {
            if (!result.data.unique) {
              this.feedback = 'Este Alias ya fue registrado anteriormente'
            } else {
              firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                .then(cred => {
                  db.collection('users').doc(this.slug).set({
                    alias: this.alias,
                    geolocation: null,
                    user_id: cred.user.uid
                  })
                })
                .then(() => {
                  this.$router.push({ name: 'GMap' })
                })
                .catch(err => {
                  console.error(err)
                  this.feedback = err
                })
            }
          })
      } else {
        this.feedback = "Debes de llenar todos los campos"
      }

    }
  }
}
</script>

<style scoped>
.signup {
  max-width: 400px;
  margin-top: 60px;
}
.signup h2 {
  font-size: 2.4em;
}

.signup .field {
  margin-bottom: 16px;
}
</style>
