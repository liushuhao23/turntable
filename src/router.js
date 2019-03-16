import Vue from 'vue'
import Router  from 'vue-router'
import Start from './components/start.vue'
import Luckywheel from './components/luckywheel.vue'
import Luckywheel1 from './components/Luckywheel1.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'start',
      component: Start
    },
    {
      path: '/luckywheel',
      name: 'luckywheel',
      component: Luckywheel
    },
    {
      path: '/luckywheel1',
      name: 'luckywheel1',
      component: Luckywheel1
    },
  ]
})
