<template>
  <div>
    <p>this is {{ msg }}</p>
    <!-- <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary" @click="add()">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row>-->
    <el-button type="text" @click="dialog = true">打开嵌套 Form 的 Drawer</el-button>
    <el-drawer title="我嵌套了表格!" :visible.sync="table" direction="rtl" size="50%">
      <el-form ref="form" :model="form" label-width="80px" class="searchcontainer" size="mini">
        <el-form-item label="站号">
          <el-select v-model="form.region" placeholder="请选择站号">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间">
          <el-col :span="12">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.date1"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="11">
            <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
    <el-drawer
      title="我嵌套了 Form !"
      :visible.sync="dialog"
      direction="rtl"
      custom-class="demo-drawer"
      ref="drawer"
      class="dia"
      modal=false
    >
      <div class="demo-drawer__content">
        <el-form ref="form" :model="form" label-width="80px" class="searchcontainer" size="mini">
          <el-form-item label="站号">
            <el-select v-model="form.region" placeholder="请选择站号">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间">
            <el-col :span="12">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.date1"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="1">-</el-col>
            <el-col :span="11">
              <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button
            type="primary"
            @click="$refs.drawer.closeDrawer()"
            :loading="loading"
          >{{ loading ? '提交中 ...' : '确 定' }}</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "N1C1",
  data() {
    return {
      msg: "N1C1",
      table: false,
      dialog: false,
      loading: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "80px",
      timer: null
    };
  },
  methods: {
    add() {
      alert(1);
    },
    search() {
      this.loading = true;
      this.timer = setTimeout(() => {
        // done();
        // 动画关闭需要一定的时间
        setTimeout(() => {
          this.loading = false;
        }, 400);
      }, 2000);
    },
    handleClose(done) {
      if (this.loading) {
        return;
      }
      this.$confirm("确定要提交表单吗？")
        .then(_ => {
          this.loading = true;
          this.timer = setTimeout(() => {
            done();
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false;
            }, 400);
          }, 2000);
        })
        .catch(_ => {});
    },
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    }
  }
};
</script>

<style>
.dia {
  height: 350px;
  margin-top: 150px;
}
</style>
