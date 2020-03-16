<template>
  <div id="app">
    <header>
      <div class="logo">
        <img src="./assets/logo1.png" />
      </div>
      <div class="projectname">人工增雨随机化试验样本数据库</div>
    </header>
    <div class="headernav">
      <div class="navcontent" @click="navchange1">
        <router-link :to="{name:'n1c1'}" class="nava" :class="{nav_active:navshow == 1}">福建省</router-link>
      </div>
      <div class="navcontent" @click="navchange2">
        <router-link :to="{name:'n2c1'}" class="nava" :class="{nav_active:navshow == 2}">海南省</router-link>
      </div>
      <div class="navcontent" @click="navchange3">
        <router-link :to="{name:'child3'}" class="nava" :class="{nav_active:navshow == 3}">吉林省</router-link>
      </div>
      <div class="navcontent" @click="navchange4">
        <router-link :to="{name:'child4'}" class="nava" :class="{nav_active:navshow == 4}">山东省</router-link>
      </div>
    </div>
    <router-view class="navchildren" />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      navshow: 1
    };
  },
  methods: {
    navchange1() {
      this.navshow = 1;
    },
    navchange2() {
      this.navshow = 2;
    },
    navchange3() {
      this.navshow = 3;
    },
    navchange4() {
      this.navshow = 4;
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html,
body,
#app {
  height: 100%;
  min-height: 500px;
}
.logo {
  width: 87px;
  height: 66px;
  overflow: hidden;
  position: relative;
  float: left;
  left: 25px;
}
.logo img {
  /* width:100%; */
  height: 100%;
}
.projectname {
  float: left;
  position: relative;
  left: 40px;
}

header {
  width: 100%;
  height: 70px;
  background-color: #e8eaf2;
  float: left;
  color: #273c9b;
  font-size: 30px;
  line-height: 70px;
  font-weight: bolder;
}
.headernav {
  width: 100%;
  height: 80px;
  background-color: #324098;
  float: left;
}
.navcontent {
  float: left;
  width: 25%;
  height: 100%;
  line-height: 80px;
}
.nava {
  height: 100%;
  width: 100%;
  display: block;
  text-decoration: none;
  color: #fff;
  background-color: #1d6ec7;
  border-right: 1px solid #324098;
  box-sizing: border-box;
}
.nav_active {
  background-color: #324098 !important;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
.navchildren {
  height: 100%;
  /* position: absolute; */
  padding-top: 150px;
  box-sizing: border-box;
}
</style>
