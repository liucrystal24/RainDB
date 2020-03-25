<template>
  <div class="hello">
    <div class="leftnav">
      <el-scrollbar native="false" noresize="true" class="scrollcontainer">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#6995EB"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened="true"
          router="true"
        >
          <el-menu-item index="0" style="textAlign:left;height:55px;lineHeight:55px;">
            <span class="navBlank"></span>
            <i class="el-icon-menu navicon"></i>
            <span slot="title">数据库总览</span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <span class="navBlank"></span>
              <i class="el-icon-location navicon"></i>
              <span>吉林省</span>
            </template>
            <el-menu-item index="3-1">选项1</el-menu-item>
            <el-menu-item index="3-2">选项2</el-menu-item>
            <el-menu-item index="3-3">选项3</el-menu-item>
            <el-menu-item index="3-4">选项4</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <span class="navBlank"></span>
              <i class="el-icon-location navicon"></i>
              <span>福建省</span>
            </template>
            <el-menu-item index="n1c4">地图总览</el-menu-item>
            <el-menu-item index="n1c7">试验样本</el-menu-item>
            <el-menu-item index="n1c1">探空</el-menu-item>
            <el-menu-item index="n1c5">雷达</el-menu-item>
            <el-menu-item index="n1c3">雨滴谱</el-menu-item>
            <el-menu-item index="n1c6">自动站</el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <span class="navBlank"></span>
              <i class="el-icon-location navicon"></i>
              <span>山东省</span>
            </template>
            <el-menu-item index="4-1">选项1</el-menu-item>
            <el-menu-item index="4-2">选项2</el-menu-item>
            <el-menu-item index="4-3">选项3</el-menu-item>
            <el-menu-item index="4-4">选项4</el-menu-item>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <span class="navBlank"></span>
              <i class="el-icon-location navicon"></i>
              <span>海南省</span>
            </template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
            <el-menu-item index="2-4">选项4</el-menu-item>
          </el-submenu>
        </el-menu>

        <div class="footer">
          <div class="comlogo">
            <img src="../assets/comlogo.png" />
          </div>
          <div class="leftcompany">南京云卫通软件技术有限公司</div>
        </div>
      </el-scrollbar>
      <!-- <div :class="{ leftactive: leftnum == 2 }" class="leftnavitem" @click="leftnav2">
        <router-link :to="{ name: 'n1c4' }" class="lefta">地图总览</router-link>
      </div>
      <div :class="{ leftactive: leftnum == 5 }" @click="leftnav5" class="leftnavitem">
        <router-link :to="{ name: 'n1c5' }" class="lefta">探空</router-link>
      </div>
      <div :class="{ leftactive: leftnum == 1 }" class="leftnavitem" @click="leftnav1">
        <router-link :to="{ name: 'n1c1' }" class="lefta">雷达</router-link>
      </div>
      <div :class="{ leftactive: leftnum == 3 }" class="leftnavitem" @click="leftnav3">
        <router-link :to="{ name: 'n1c3' }" class="lefta">雨滴谱</router-link>
      </div>
      <div :class="{ leftactive: leftnum == 4 }" class="leftnavitem" @click="leftnav4">
        <router-link :to="{ name: 'n1c6' }" class="lefta">自动站</router-link>
      </div>-->

      <!-- <div class="footer">
      <div class="comlogo">
        <img src="../assets/comlogo.png" />
      </div>
      <div class="leftcompany">南京云卫通软件技术有限公司</div>
      </div>-->
    </div>
    <router-view class="rightchild"></router-view>
  </div>
</template>




<script>
import "@/assets/css/scorll.css";
export default {
  name: "Nav1",
  data() {
    return {
      leftnum: 2
    };
  },
  methods: {
    leftnav1() {
      this.leftnum = 1;
    },
    leftnav2() {
      this.leftnum = 2;
    },
    leftnav3() {
      this.leftnum = 3;
    },
    leftnav4() {
      this.leftnum = 4;
    },
    leftnav5() {
      this.leftnum = 5;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #fff;
  /* height: 100px;
  display: block; */
}
.hello {
  height: 100%;
  background-color: #6e95e9;
}
.lefttitle {
  color: #fff;
  height: 40px;
  text-align: left;
  padding-left: 15px;
  padding-top: 20px;
  background-color: #409eff;
}
.leftnavitem {
  height: 40px;
  line-height: 40px;
}
.lefta {
  height: 100%;
  width: 100%;
  display: block;
  text-decoration: none;
}
.leftactive {
  background-color: #324098;
}
.footer {
  box-sizing: border-box;
  height: 120px;

  background-color: #6e95e9;
  /* 小屏幕 */
  /* margin-top: 100px; */
  /* 大屏 */
  position: absolute;
  bottom: 0;
}
.comlogo {
  width: 255px;
  height: 70px;
  border-radius: 35px;
  overflow: hidden;
}
.comlogo img {
  widows: 100%;
  height: 100%;
  position: relative;
  /* left: -15px; */
  /* position: absolute;
  left: 5px; */
}
.leftcompany {
  width: 100%;
  color: #fff;
  font-size: 13px;
  margin-top: 5px;
  /* position: absolute; */
  /* bottom: 30px; */
}
.rightchild {
  width: 100%;
  padding-left: 255px;
  box-sizing: border-box;
  height: 100%;
  background-color: #fff;
  /* position: relative; */
}

/* 导航栏样式修改 */
.leftnav {
  height: 100%;
  width: 255px;

  /* min-height: 100%; */
  display: flex;
  flex-direction: column;

  background-color: #6e95e9;
  float: left;
  /* overflow-y: auto; */
}
.scrollcontainer {
  /* width: 255px; */
  /* float: left; */
  height: 100%;

  /* overflow-x: hidden; */
  box-sizing: border-box;
}

.navBlank {
  display: inline-block;
  width: 30px;
  height: 100%;
}

.el-submenu {
  /* padding-left: 80px; */
  /* height: 45px; */
  /* line-height: 45px; */
  /* font-size: 18px; */
  width: 255px;
  box-sizing: border-box;
  text-align: left;
  /* padding-left:50px; */
}

.navicon {
  color: #fff;
}
.el-menu-item {
  height: 40px;
  line-height: 40px;
  text-align: center;
  width: 255px;
}

.el-menu-item.is-active {
  color: #fff !important;
  background: #409eff !important;
}
</style>
