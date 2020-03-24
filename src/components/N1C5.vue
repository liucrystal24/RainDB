<template>
  <div>
    <div class="searchcontainer">
      <el-row class="searchtitle">
        <el-col :span="6">
          <div class>
            <img src="../assets/search.png" width="40px" />
          </div>
        </el-col>
        <el-col :span="18">
          <div class="titletext">条件筛选</div>
        </el-col>
      </el-row>
      <el-form ref="dateselect" :model="dateselect" label-width="30%">
        <el-form-item label="站号">
          <el-select v-model="form.stationnum" placeholder="请选择站号">
            <el-option label="10035" value="10035"></el-option>
            <!-- <el-option label="区域二" value="beijing"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="要素">
          <el-select v-model="form.fea" placeholder="请选择要素">
            <el-option label="温度" value="温度"></el-option>
            <!-- <el-option label="区域二" value="beijing"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.date"
            :default-value="form.defaultdate"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="时间">
          <el-time-select
            v-model="form.date2"
            :picker-options="{
                start: '08:00',
                step: '12:00',
                end: '20:00'
              }"
            placeholder="选择时间"
          ></el-time-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchleida">查询</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="resultcontainer">
      <el-row class="searchtitle">
        <el-col :span="4">
          <div class>
            <img src="../assets/checklist.png" width="40px" />
          </div>
        </el-col>
        <el-col :span="20">
          <div class="titletext">探空文件</div>
        </el-col>
      </el-row>
      <div class="tableContainer">
        <el-table :data="tableData" style="width: 100%;text-align:center">
          <el-table-column label="日期" width="180" header-align="center" align="center">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left:10px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column label="文件" width="180" header-align="center" align="center">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" header-align="center" align="center">
            <template slot-scope="scope">
              <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">下载</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "N1C5",
  data() {
    return {
      dateselect: {
        startdate: "",
        starttime: "",
        startdefaultdate: new Date(2014, 8, 10),
        enddate: "",
        endtime: "",
        enddefaultdate: new Date(2014, 8, 15)
      },
      form: {
        stationnum: "",
        date: "",
        defaultdate: new Date(2014, 4, 8),
        show: false,
        fea: ""
      },
      tableData: [
        {
          date: "2016-05-02 08:00",
          name: "探空1",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04 08:00",
          name: "探空2",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01 08:00",
          name: "探空3",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03 08:00",
          name: "探空4",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    searchleida() {
      console.log(1);
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
};
</script>

<style scoped>
.searchcontainer {
  float: left;
  width: 35%;
  height: 100%;
  box-sizing: border-box;
  border-right: 1px solid #324098;
}
.resultcontainer {
  float: left;
  width: 65%;
  box-sizing: border-box;
}
.searchtitle {
  padding-top: 20px;
  padding-left: 10px;
  height: 120px;
}
.titletext {
  line-height: 44px;
  text-align: left;
}
.tableContainer {
  border: 1px solid #ddd;
  width: 80%;
  margin: 0 auto;
}
</style>
