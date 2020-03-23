<template>
  <div id="app">
    <header>
      <div class="header">
        <div class="logo">
          <img src="./assets/logo1.png" />
          <div class="pcompany">中国气象科学研究院</div>
        </div>
        <div class="headerright">
          <div class="projectname">人工增雨随机化外场试验和效果检验技术研究(数据库)</div>
          <div class="headernav">
            <div class="navcontent" @click="navchange1">
              <router-link :to="{name:'n1c2'}" class="nava" :class="{nav_active:navshow == 1}">福建省</router-link>
            </div>
            <div class="navcontent" @click="navchange2">
              <router-link :to="{name:'n2c1'}" class="nava" :class="{nav_active:navshow == 2}">海南省</router-link>
            </div>
            <div class="navcontent" @click="navchange3">
              <router-link :to="{name:'n3c1'}" class="nava" :class="{nav_active:navshow == 3}">吉林省</router-link>
            </div>
            <div class="navcontent" @click="navchange4">
              <router-link :to="{name:'n4c1'}" class="nava" :class="{nav_active:navshow == 4}">山东省</router-link>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="projectname">人工增雨随机化试验样本数据库</div> -->
    </header>

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
  min-height: 608px;
  min-width: 1080px;
}
.logo {
  width: 205px;
  height: 150px;
  overflow: hidden;
  background-color: #2958DE;
  padding-top: 10px;
  float: left;
}
.logo img {
  width: 100px;
  line-height: 100px;
  /* height: 100px; */
}
.pcompany {
  width: 100%;
  line-height: 50px;
  height: 50px;
  font-size: 18px;
  color: #fff;
}
.projectname {
  float: left;
  position: relative;
  left: 90px;
  line-height: 100px;
  font-weight: bolder;
  font-size: 32px;
}

header {
  width: 100%;
  height: 150px;
  background-color: #e8eaf2;
  float: left;
  color: #273c9b;

  /* line-height: 100px; */
}
.header {
  float: left;
  height: 150px;
  width: 100%;
}
.headerright {
  width: 100%;
  padding-left: 205px;
  height: 150px;
  box-sizing: border-box;
}
.headernav {
  /* padding-left:170px; */
  width: 100%;
  /* margin-left: 170px; */
  /* height: 50px; */
  background-color: #324098;
  float: left;
}
.navcontent {
  float: left;
  width: 25%;
  height: 100%;
  line-height: 50px;
  box-sizing: border-box;
}
.nava {
  height: 100%;
  width: 100%;
  display: block;
  font-size: 15px;
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
