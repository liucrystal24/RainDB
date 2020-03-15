import Vue from 'vue'
import Router from 'vue-router'
import Nav1 from '@/components/Nav1'
import Nav2 from '@/components/Nav2'

import N1C1 from '@/components/N1C1'
import N1C2 from '@/components/N1C2'
import N1C3 from '@/components/N1C3'
import N1C4 from '@/components/N1C4'

import N2C1 from '@/components/N2C1'
import N2C2 from '@/components/N2C2'
import N2C3 from '@/components/N2C3'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/nav1/n1c1'
    },
    {
      path: '/nav1',
      // name: 'Nav1',
      component: Nav1,
      children: [
        {
          path: 'n1c1',
          name: 'n1c1',
          component: N1C1,
        }, {
          path: 'n1c2',
          name: 'n1c2',
          component: N1C2,
        }, {
          path: 'n1c3',
          name: 'n1c3',
          component: N1C3,
        },{
          path: 'n1c4',
          name: 'n1c4',
          component: N1C4,
        }
      ]
    },
    {
      path: '/nav2',
      // name: 'Nav1',
      component: Nav2,
      children: [
        {
          path: 'n2c1',
          name: 'n2c1',
          component: N2C1,
        }, {
          path: 'n2c2',
          name: 'n2c2',
          component: N2C2,
        }, {
          path: 'n2c3',
          name: 'n2c3',
          component: N2C3,
        }
      ]
    }
  ]
})
