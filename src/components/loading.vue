<template>
  <div class="loadingWindow">
    <div class="loading_pic">
      <img src="@/assets/loading.gif" />
    </div>
    <div class="loading_text">{{context}}读取中……</div>
  </div>
</template>

<script>
export default {
  name: "loadingWindow",
  data() {
    return {
      context: this.$props.context
    };
  },
  props: {
    context: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.loadingWindow {
  width: 250px;
  height: 90px;
  position: absolute;
  left: 50% !important;
  top: 50% !important;
  transform: translate(-50%, -50%);
  border: 1px solid #777777;
  background-color: #ffffff;
  border-radius: 5px;
  text-align: center;
  z-index: 2000;
}
.loading_pic {
  height: 60px;
  line-height: 75px;
}
.loading_text {
  height: 30px;
  line-height: 10px;
}
</style>
