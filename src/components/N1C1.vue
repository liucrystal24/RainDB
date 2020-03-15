<template>
  <div>
    <p>this is {{ msg }}</p>
    <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary" @click="add()">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "N1C1",
  data() {
    return {
      msg: "N1C1"
    };
  },
  methods: {
    add() {
      alert(1);
    }
  }
};
</script>

<style></style>
