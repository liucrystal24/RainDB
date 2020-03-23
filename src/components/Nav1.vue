<template>
  <div class="hello">
    <div class="leftnav">
      <div class="lefttitle">
        <i class="el-icon-s-data"></i>
        数据库列表
      </div>
      <!-- <el-menu
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
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span style='fontSize:18px;'>福建</span>
          </template>
          <el-menu-item index="n1c4">选项1</el-menu-item>
          <el-menu-item index="n1c1">选项2</el-menu-item>
          <el-menu-item index="n1c5">选项3</el-menu-item>
          <el-menu-item index="n1c3">选项4</el-menu-item>
          <el-menu-item index="n1c6">选项4</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>海南</span>
          </template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-menu-item index="2-4">选项4</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>吉林</span>
          </template>
          <el-menu-item index="3-1">选项1</el-menu-item>
          <el-menu-item index="3-2">选项2</el-menu-item>
          <el-menu-item index="3-3">选项3</el-menu-item>
          <el-menu-item index="3-4">选项4</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>山东</span>
          </template>
          <el-menu-item index="4-1">选项1</el-menu-item>
          <el-menu-item index="4-2">选项2</el-menu-item>
          <el-menu-item index="4-3">选项3</el-menu-item>
          <el-menu-item index="4-4">选项4</el-menu-item>
        </el-submenu>
      </el-menu> -->
      <div :class="{ leftactive: leftnum == 2 }" class="leftnavitem" @click="leftnav2">
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
      </div>
      <div class="footer">
        <div class="comlogo">
          <img src="../assets/comlogo.png" />
        </div>
        <div class="leftcompany">南京云卫通软件技术有限公司</div>
      </div>
    </div>
    <router-view class="rightchild"></router-view>
  </div>
</template>

<script>
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
}
.lefttitle {
  color: #fff;
  height: 40px;
  text-align: left;
  padding-left: 15px;
  padding-top: 20px;
  background-color: #409eff;
}
.leftnav {
  height: 100%;
  width: 205px;

  /* min-height: 100%; */
  display: flex;
  flex-direction: column;

  background-color: cornflowerblue;
  float: left;
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
  height: 120px;
  margin-top: auto;
}
.comlogo {
  width: 70px;
  height: 70px;
  border-radius: 35px;
  overflow: hidden;
  margin-left: 45px;
  /* position: absolute; */
  /* bottom: 55px; */
  /* left: 45px; */
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
  width: 170px;
  color: #fff;
  font-size: 12px;
  margin-top: 5px;
  /* position: absolute; */
  /* bottom: 30px; */
}
.rightchild {
  width: 100%;
  padding-left: 205px;
  box-sizing: border-box;
  height: 100%;
  /* position: relative; */
}
</style>
