import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Projects from '../components/Projects.vue'
import Data from '../components/Data.vue'
import Templates from '../components/Templates.vue'

Vue.use(VueRouter);

export function createRouter() {
  return new VueRouter({
    mode: 'history',
    routes: [
      {path: '/', component: Home},
      {path: '/projects', component: Projects},
      {path: '/projects/data', name: 'data', component: Data},
      {path: '/templates', component: Templates}
    ]
  })
}