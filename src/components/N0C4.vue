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
        <div class="datades">数据区间：2016.5.24~2017.8.27</div>
      </el-row>
      <el-form ref="dateselect" :model="dateselect" label-width="30%">
        <el-form-item label="区域">
          <el-select v-model="dateselect.stationid" placeholder="请选择区域" @change="stationChange">
            <el-option label="白城" value="白城"></el-option>
            <el-option label="长春" value="长春"></el-option>
            <el-option label="吉林" value="吉林"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="等级">
          <el-select v-model="dateselect.level" placeholder="请选择等级">
            <el-option
              v-for="item in leveloptions"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-select v-model="dateselect.date" placeholder="请选择日期">
            <el-option
              v-for="item in dateoptions"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="起始时间">
          <el-time-picker v-model="dateselect.starttime" placeholder="选择时间"></el-time-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-time-picker v-model="dateselect.endtime" placeholder="选择时间"></el-time-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="requestTable">查询</el-button>
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
          <div class="titletext">辐射计数据</div>
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
            v-for="(item) in tableTitle"
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
        :page-sizes="[5, 10]"
        :page-size="pageSize"
        :total="tableData.length"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :hide-on-single-page="true"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "N0C4",
  data() {
    return {
      dateselect: {
        stationid: "",
        level: "",
        date: "",
        starttime: "",
        endtime: ""
      },
      form: {
        stationnum: "",
        date: "",
        defaultdate: new Date(2014, 4, 8),
        show: false,
        fea: ""
      },
      tableData: [],
      tankongStationOption: [],
      currentPage: 1,
      pageSize: 5,
      zdFea: [],
      zdoptions: [],
      oldOptions: [[]],
      tableTitle: [],
      leveloptions: [
        {
          label: "lv1",
          value: "lv1"
        },
        {
          label: "lv2",
          value: "lv2"
        }
      ],
      dateoptions: [
        {
          label: "2016-05-24",
          value: "2016-05-24"
        },
        {
          label: "2017-08-22",
          value: "2017-08-22"
        },
        {
          label: "2017-08-27",
          value: "2017-08-27"
        }
      ]
    };
  },
  methods: {
    //  查询自动站列表
    requestTable() {
      let stationid = this.dateselect.stationid;
      let level = this.dateselect.level;
      let date = this.dateselect.date;
      let starttime = date + " " + this.format(this.dateselect.starttime);
      let endtime = date + " " + this.format(this.dateselect.endtime);
      console.log([stationid, level, date, starttime, endtime]);
      let url = "/JLfushejiSearch";
      this.axios
        .get(url, {
          params: {
            stationid,
            level,
            date,
            starttime,
            endtime
          }
        })
        .then(
          res => {
            console.log("success");
            this.tableTitle = [];
            if (res.data.info.fushejiTable.length != 0) {
              // tableTitle
              Object.keys(res.data.info.fushejiTable[0]).forEach(val => {
                this.tableTitle.push(val);
              });
              // tableData
              this.tableData = res.data.info.fushejiTable;
            } else {
              this.$alert("此时间段没有数据", "提示", {
                confirmButtonText: "确定",
                callback: action => {
                  console.log(action);
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
    stationChange(station) {
      if (station === "吉林") {
        this.leveloptions = [
          {
            label: "lv1",
            value: "lv1"
          },
          {
            label: "lv2",
            value: "lv2"
          }
        ];
        this.dateoptions = [
          {
            label: "2016-05-24",
            value: "2016-05-24"
          },
          {
            label: "2017-08-22",
            value: "2017-08-22"
          },
          {
            label: "2017-08-27",
            value: "2017-08-27"
          }
        ];
      } else {
        this.leveloptions = [
          {
            label: "lv2",
            value: "lv2"
          }
        ];
        this.dateoptions = [
          {
            label: "2017-08-22",
            value: "2017-08-22"
          },
          {
            label: "2017-08-27",
            value: "2017-08-27"
          }
        ];
      }
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
        const tHeader = this.tableTitle;
        const filterVal = this.tableTitle;
        console.log(filterVal);
        const list = this.tableData;
        console.log(list);
        const data = this.formatJson(filterVal, list);
        // console.log(data);
        const tableLength = this.tableData.length;
        let stationid = this.dateselect.stationid;
        let level = this.dateselect.level;
        let date = this.dateselect.date;
        let starttime = date + " " + this.format(this.dateselect.starttime);
        let endtime = date + " " + this.format(this.dateselect.endtime);
        let download_title = `${stationid}_${level}_${date}`;
        // console.log([stationid, level, date, starttime, endtime]);
        if (tableLength != 0) {
          export_json_to_excel(
            tHeader,
            data,
            "吉林_" + download_title + "_辐射计数据"
          );
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
    // 时间转换 辅助函数
    format(date) {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      const minute =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      // var minute = date.getMinutes();
      const second =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      // var second = date.getSeconds();

      return hour + ":" + minute + ":" + second;
    }
  },
  mounted() {}
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
