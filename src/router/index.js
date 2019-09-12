import Vue from 'vue'
import Router from 'vue-router'
import GMap from '@/components/home/GMap'
import Signup from '@/components/all/Signup'
import Login from '@/components/all/Login'
import ViewProfile from '@/components/profile/ViewProfile'
import firebase from 'firebase'
Vue.use(Router)

const router = new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'GMap',
      component: GMap,
      meta: {
        requeriesAuth: true
      }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/profile/:id',
      name: 'ViewProfile',
      component: ViewProfile,
      meta: {
        requeriesAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  //check to see if route req auth
  if (to.matched.some(rec => rec.meta.requeriesAuth)){
    //check auth state of user
    let user = firebase.auth().currentUser
    if (user) {
      // user sign in
      next()
    } else {
      // no user signed in
      next({name: 'Login'})
    }
  } else {
    next()
  }
})

export default router