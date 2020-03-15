<template>
  <div class="hello">
    <div class="leftnav">
      <div>
        <router-link :to="{ name: 'n1c1' }">雷达</router-link>
      </div>
      <div>
        <router-link :to="{ name: 'n1c2' }">探空</router-link>
      </div>
      <div>
        <router-link :to="{ name: 'n1c3' }">雨滴谱</router-link>
      </div>
      <div>
        <router-link :to="{ name: 'n1c4' }">自动站</router-link>
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
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #fff;
  /* height: 100px;
  display: block; */
}
.hello {
  height: 100%;
}
.leftnav {
  height: 100%;
  width: 140px;
  background-color: cornflowerblue;
  float: left;
}
.rightchild {
  width: 100%;
  padding-left:140px;
  box-sizing: border-box;
  height: 100%;
}
</style>
