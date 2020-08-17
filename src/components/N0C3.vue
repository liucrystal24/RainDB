<template>
  <div class="totalContainer">
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
        <div class="datades">数据区间：2015.6.6~2017.8.27</div>
      </el-row>
      <el-form ref="dateselect" :model="dateselect" label-width="30%">
        <el-form-item label="起始日期">
          <el-date-picker
            v-model="dateselect.startdate"
            type="datetime"
            placeholder="选择日期时间"
            :default-value="dateselect.startdefaultdate"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="结束日期">
          <el-date-picker
            v-model="dateselect.enddate"
            type="datetime"
            placeholder="选择日期时间"
            :default-value="dateselect.enddefaultdate"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="站名">
          <el-select v-model="dateselect.stationid" placeholder="请选择站名" filterable>
            <el-option
              v-for="item in stationOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
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
          <div class="titletext">雨滴谱数据</div>
          <div style="textAlign:right;paddingRight:100px;">
            <el-button @click="export2Excel" type="primary" size="small">下载数据</el-button>
          </div>
        </el-col>
      </el-row>
      <div class="tableContainer">
        <el-table
          :data="
            tableData.slice(
              (currentPage - 1) * pageSize,
              currentPage * pageSize
            )
          "
          style="width: 100%;text-align:center"
          :border="true"
        >
          <el-table-column
            :label="item"
            v-for="(item, index) in zdTitle"
            :key="item"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">{{ scope.row[item] }}</template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        background
        layout="sizes,prev, pager, next"
        :page-sizes="[5]"
        :page-size="pageSize"
        :total="tableData.length"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :hide-on-single-page="true"
      ></el-pagination>
      <loadingWindow context="数据" v-show="loading"></loadingWindow>
    </div>
  </div>
</template>

<script>
import loadingWindow from "./loading";
export default {
  name: "N1C5",
  data() {
    return {
      dateselect: {
        startdate: "",
        starttime: "",
        startdefaultdate: new Date(2015, 5, 6),
        enddate: "",
        endtime: "",
        enddefaultdate: new Date(2017, 8, 1),
        stationid: ""
      },
      form: {
        stationnum: "",
        date: "",
        defaultdate: new Date(2014, 4, 8),
        show: false,
        fea: ""
      },
      tableData: [],
      stationOption: [],
      currentPage: 1,
      pageSize: 5,
      zdFea: [],
      zdoptions: [],
      oldOptions: [[]],
      zdTitle: [],
      loading: false
    };
  },
  methods: {
    //  查询自动站列表
    search() {
      let starttime = this.format(this.dateselect.startdate);
      let endtime = this.format(this.dateselect.enddate);
      let station = this.dateselect.stationid;
      let url = "/JLyudipuSearch";
      this.loading = true;
      this.axios
        .get(url, {
          params: {
            startdate: starttime,
            enddate: endtime,
            station: station
          }
        })
        .then(
          res => {
            console.log("success");
            console.log(res.data.info.table);
            if (res.data.info.table.length !== 0) {
              let element = res.data.info.table[0];
              Object.keys(element).forEach(val => {
                if (val.indexOf("降水光谱") === -1) {
                  this.zdTitle.push(val);
                }
              });
              this.loading = false;
              this.tableData = res.data.info.table;
            } else {
              this.$alert("此时间段没有数据", "提示", {
                confirmButtonText: "确定",
                callback: action => {
                  this.loading = false;
                }
              });
            }
          },
          res => {
            console.log("err");
            console.log(res);
          }
        );
    },
    // 翻页处理函数
    handleSizeChange: function(size) {
      this.pageSize = size;
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
    },
    // json 转 excel
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    // table 生成 excel 下载, 需要自动更改title名，未做
    export2Excel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require("../vendor/Export2Excel");
        const tHeader = this.zdTitle;
        const filterVal = this.zdTitle;
        const list = this.tableData;
        const data = this.formatJson(filterVal, list);
        const tableLength = this.tableData.length;
        if (tableLength != 0) {
          export_json_to_excel(tHeader, data, "吉林雨滴谱数据");
        } else {
          this.$alert("没有数据，请先查询", "提示", {
            confirmButtonText: "确定",
            callback: action => {
              console.log(action);
            }
          });
        }
      });
    },
    // 获取自动站所有区站号，暂时为200个
    findStationid() {
      let url = "/JLyudipuStationid";
      this.axios.get(url).then(
        res => {
          console.log("success");
          this.stationOption = [];
          // console.log(res.data);
          let stationarr = res.data.info.station;
          // console.log(stationarr);
          stationarr.forEach((val, index) => {
            // console.log(val)
            let station = {};
            station.value = val.station;
            station.label = val.station;
            this.stationOption.push(station);
          });
        },
        res => {
          console.log("err");
          console.log(res);
        }
      );
    },
    // 时间转换 辅助函数
    format(date) {
      const year = date.getFullYear();
      const month1 = date.getMonth() + 1;
      const month = month1 < 10 ? "0" + month1 : month1;
      const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

      const hour =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      const minute =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

      const second =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

      return (
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second
      );
    }
  },
  mounted() {
    this.findStationid();
  },
  components: { loadingWindow }
};
</script>

<style scoped>
/* .totalContainer {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
} */
.searchcontainer {
  float: left;
  width: 340px;
  height: 100%;
  box-sizing: border-box;
  border-right: 1px solid #324098;
}
.resultcontainer {
  width: 100%;
  /* height: 80%; */
  padding-left: 340px;
  /* padding-bottom: 10px; */
  /* overflow-y: auto; */
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
  width: 85%;
  margin: 0 auto;
  /* height: 360px; */
}
.datades {
  font-size: 14px;
  padding-top: 5px;
  clear: both;
}
.el-pagination {
  height: 35px;
}
</style>
