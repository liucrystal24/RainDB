import Vue from "vue";
import Router from "vue-router";
import Nav1 from "@/components/Nav1";
import Nav2 from "@/components/Nav2";
import Nav4 from "@/components/Nav4";

import N1C1 from "@/components/N1C1";
import N1C2 from "@/components/N1C2";
import N1C3 from "@/components/N1C3";
import N1C4 from "@/components/N1C4";
import N1C5 from "@/components/N1C5";

import N2C1 from "@/components/N2C1";
import N2C2 from "@/components/N2C2";
import N2C3 from "@/components/N2C3";

import N4C1 from "@/components/N4C1";
import N4C2 from "@/components/N4C2";
import N4C3 from "@/components/N4C3";
import N4C4 from "@/components/N4C4";
import N4C5 from "@/components/N4C5";
import N4C6 from "@/components/N4C6";

Vue.use(Router);

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: "/",
      name: "index",
      redirect: "/nav1/n1c4"
    },
    {
      path: "/nav1",
      // name: 'Nav1',
      component: Nav1,
      children: [
        {
          path: "n1c1",
          name: "n1c1",
          component: N1C1
        },
        {
          path: "n1c2",
          name: "n1c2",
          component: N1C2
        },
        {
          path: "n1c3",
          name: "n1c3",
          component: N1C3
        },
        {
          path: "n1c4",
          name: "n1c4",
          component: N1C4
        },
        {
          path: "n1c5",
          name: "n1c5",
          component: N1C5
        }
      ]
    },
    {
      path: "/nav2",
      // name: 'Nav1',
      component: Nav2,
      children: [
        {
          path: "n2c1",
          name: "n2c1",
          component: N2C1
        },
        {
          path: "n2c2",
          name: "n2c2",
          component: N2C2
        },
        {
          path: "n2c3",
          name: "n2c3",
          component: N2C3
        }
      ]
    },
    {
      path: "/nav4",
      // name: 'Nav1',
      component: Nav4,
      children: [
        {
          path: "n4c1",
          name: "n4c1",
          component: N4C1
        },
        {
          path: "n4c2",
          name: "n4c2",
          component: N4C2
        },
        {
          path: "n4c3",
          name: "n4c3",
          component: N4C3
        },
        {
          path: "n4c4",
          name: "n4c4",
          component: N4C4
        },
        {
          path: "n4c5",
          name: "n4c5",
          component: N4C5
        },
        {
          path: "n4c6",
          name: "n4c6",
          component: N4C6
        }
      ]
    }
  ]
});
