<template>
  <div id="app">
    <header>人工增雨随机化试验样本数据库</header>
    <div class="headernav">
      <div class="navcontent">
        <router-link :to="{name:'n1c1'}" class="nava">福建省</router-link>
      </div>
      <div class="navcontent">
        <router-link :to="{name:'n2c1'}" class="nava">海南省</router-link>
      </div>
      <div class="navcontent">
        <router-link :to="{name:'child3'}" class="nava">吉林省</router-link>
      </div>
      <div class="navcontent">
        <router-link :to="{name:'child4'}" class="nava">山东省</router-link>
      </div>
    </div>
    <router-view class="navchildren" />
  </div>
</template>

<script>
export default {
  name: "App"
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
}
header {
  width: 100%;
  height: 60px;
  background-color: cornflowerblue;
  float: left;
}
.headernav {
  width: 100%;
  height: 80px;
  background-color: #ddd;
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
  /* background-color: cyan; */
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
  padding-top: 140px;
  box-sizing: border-box;
}
</style>
