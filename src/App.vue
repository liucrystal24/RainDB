<template>
  <div id="app">
    <header>
      <div class="header">
        <div class="logo">
          <img src="./assets/logo1.png" />
          <div class="pcompany">中国气象科学研究院</div>
        </div>
        <div class="headerright">
          <div class="projectname">人工增雨随机化试验样本数据库</div>
        </div>
      </div>
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
  min-width: 1218px;
}
.logo {
  width: 255px;
  height: 120px;
  overflow: hidden;
  background-color: #2958de;
  padding-top: 10px;
  float: left;
  box-sizing: border-box;
}
.logo img {
  width: 80px;
  line-height: 80px;
  /* height: 100px; */
}
.pcompany {
  width: 100%;
  line-height: 40px;
  height: 50px;
  font-size: 18px;
  color: #fff;
}
.projectname {
  padding-left: 100px;
  text-align: left;
  line-height: 120px;
  height: 120px;
  font-weight: bolder;
  font-size: 45px;
  text-shadow: 1px 1px #444;
}
.secname {
  padding-left: 615px;
  text-align: left;
  line-height: 5px;
  height: 20px;
  font-size: 20px;
}

header {
  width: 100%;
  height: 120px;
  background-color: #e8eaf2;
  float: left;
  color: #273c9b;
  box-sizing: border-box;
  border-bottom: 2px solid #2958de;

  /* line-height: 100px; */
}
.header {
  float: left;
  height: 120px;
  width: 100%;
}
.headerright {
  width: 100%;
  padding-left: 255px;
  height: 120px;
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
  padding-top: 120px;
  box-sizing: border-box;
}
</style>
