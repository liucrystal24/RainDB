import Vue from "vue";
import Router from "vue-router";
import Nav1 from "@/components/Nav1";
// 欢迎界面
import Welcome from "@/components/welcome";

// N0Cx 吉林
import N0C1 from "@/components/N0C1";
import N0C2 from "@/components/N0C2";
import N0C3 from "@/components/N0C3";
import N0C4 from "@/components/N0C4";
import N0C5 from "@/components/N0C5";
import N0C6 from "@/components/N0C6";
import N0C7 from "@/components/N0C7";

// N1Cx 福建
import N1C1 from "@/components/N1C1";
import N1C2 from "@/components/N1C2";
import N1C3 from "@/components/N1C3";
import N1C4 from "@/components/N1C4";
import N1C5 from "@/components/N1C5";
import N1C6 from "@/components/N1C6";

// N2Cx 山东
import N2C1 from "@/components/N2C1";
import N2C2 from "@/components/N2C2";
import N2C31 from "@/components/N2C31";
import N2C32 from "@/components/N2C32";
import N2C4 from "@/components/N2C4";
import N2C5 from "@/components/N2C5";
import N2C6 from "@/components/N2C6";
import N2C7 from "@/components/N2C7";
import N2C8 from "@/components/N2C8";

// N3Cx 海南
import N3C1 from "@/components/N3C1";
import N3C2 from "@/components/N3C2";
import N3C3 from "@/components/N3C3";
import N3C4 from "@/components/N3C4";
import N3C5 from "@/components/N3C5";
import N3C6 from "@/components/N3C6";

Vue.use(Router);

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: "/",
      name: "index",
      redirect: "/nav1/welcome"
    },
    {
      path: "/nav1",
      component: Nav1,
      children: [
        {
          // --------数据库总览-----------
          path: "welcome",
          name: "welcome",
          component: Welcome
        },
        // -------吉林--------------
        {
          // 地图总览
          path: "n0c1",
          name: "n0c1",
          component: N0C1
        },
        {
          // 试验样本
          path: "n0c2",
          name: "n0c2",
          component: N0C2
        },
        {
          // 雨滴谱
          path: "n0c3",
          name: "n0c3",
          component: N0C3
        },
        {
          // 辐射计
          path: "n0c4",
          name: "n0c4",
          component: N0C4
        },
        {
          // 无人机
          path: "n0c5",
          name: "n0c5",
          component: N0C5
        },
        {
          // 雷达
          path: "n0c6",
          name: "n0c6",
          component: N0C6
        },
        {
          // 自动站
          path: "n0c7",
          name: "n0c7",
          component: N0C7
        },
        // ---------福建----------
        {
          // 地图总览
          path: "n1c1",
          name: "n1c1",
          component: N1C1
        },
        {
          // 试验样本
          path: "n1c2",
          name: "n1c2",
          component: N1C2
        },
        {
          // 探空
          path: "n1c3",
          name: "n1c3",
          component: N1C3
        },
        {
          // 雷达
          path: "n1c4",
          name: "n1c4",
          component: N1C4
        },
        {
          // 雨滴谱
          path: "n1c5",
          name: "n1c5",
          component: N1C5
        },
        {
          // 自动站
          path: "n1c6",
          name: "n1c6",
          component: N1C6
        },
        // ---------山东----------
        {
          // 地图总览
          path: "n2c1",
          name: "n2c1",
          component: N2C1
        },
        {
          // 试验样本
          path: "n2c2",
          name: "n2c2",
          component: N2C2
        },
        {
          // 雨量
          path: "n2c31",
          name: "n2c31",
          component: N2C31
        },
        {
          // 雨量
          path: "n2c32",
          name: "n2c32",
          component: N2C32
        },
        {
          // 雷达
          path: "n2c4",
          name: "n2c4",
          component: N2C4
        },
        {
          // 探空
          path: "n2c5",
          name: "n2c5",
          component: N2C5
        },
        {
          // 天气图
          path: "n2c6",
          name: "n2c6",
          component: N2C6
        },
        {
          // 雨量图
          path: "n2c7",
          name: "n2c7",
          component: N2C7
        },
        {
          // 卫星
          path: "n2c8",
          name: "n2c8",
          component: N2C8
        },
         // ---------海南----------
         {
          // 地图总览
          path: "n3c1",
          name: "n3c1",
          component: N3C1
        },
        {
          // 试验样本
          path: "n3c2",
          name: "n3c2",
          component: N3C2
        },
        {
          // FY4A
          path: "n3c3",
          name: "n3c3",
          component: N3C3
        },
        {
          // FY4A图片
          path: "n3c4",
          name: "n3c4",
          component: N3C4
        },
        {
          // 雷达
          path: "n3c5",
          name: "n3c5",
          component: N3C5
        },
        {
          // 雨量
          path: "n3c6",
          name: "n3c6",
          component: N3C6
        }
      ]
    }
  ]
});
