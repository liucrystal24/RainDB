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
        <div class="datades">数据区间：2014.5.10~2018.9.21</div>
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
        <el-form-item label="站号">
          <el-select
            v-model="dateselect.stationid"
            placeholder="请选择站号"
            filterable
          >
            <el-option
              v-for="item in tankongStationOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
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
          <div class="titletext">探空数据</div>
          <div style="textAlign:right;paddingRight:100px;">
            <el-button @click="export2Excel" type="primary" size="small"
              >下载数据</el-button
            >
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
            label="日期"
            header-align="center"
            align="center"
            width="180"
          >
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left:10px">{{ scope.row.datetime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="站号" header-align="center" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.站号 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="纬度" header-align="center" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.纬度 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="经度" header-align="center" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.经度 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="海拔" header-align="center" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.海拔 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="unknown"
            header-align="center"
            align="center"
            width="90"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.unknown }}</span>
            </template>
          </el-table-column>
          <el-table-column label="气压" header-align="center" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.气压 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="高度" header-align="center" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.高度 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="温度" header-align="center" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.温度 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="位温" header-align="center" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.位温 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="风向" header-align="center" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.风向 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="风速" header-align="center" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.风速 }}</span>
            </template>
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
  name: "N2C5",
  data() {
    return {
      dateselect: {
        startdate: "",
        starttime: "",
        startdefaultdate: new Date(2014, 4, 10),
        enddate: "",
        endtime: "",
        enddefaultdate: new Date(2014, 4, 11),
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
      tankongStationOption: [],
      currentPage: 1,
      pageSize: 5
    };
  },
  methods: {
    search() {
      let starttime = this.format(this.dateselect.startdate);
      let endtime = this.format(this.dateselect.enddate);
      let stationid = this.dateselect.stationid;
      let url = "/SDtankongSearch";
      this.axios
        .get(url, {
          params: {
            starttime: starttime,
            endtime: endtime,
            stationid: stationid
          }
        })
        .then(
          res => {
            console.log("success");
            console.log(res.data);
            if (res.data.code == 0) {
              this.$alert("此时间段没有数据", "提示", {
                confirmButtonText: "确定",
                callback: action => {
                  console.log(action);
                }
              });
            } else {
              console.log(res.data);
              this.tableData = res.data.info.table;
            }
          },
          res => {
            console.log("err");
            console.log(res);
          }
        );
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDownload(index, row) {
      console.log(index, row);
      let datetime = row.datetime;
      let type = row.type;
      let id = row.id;
      let url = "/FJleidaFile";
      this.axios({
        method: "post",
        url: url,
        data: { datetime: datetime, type: type, id: id },
        responseType: "arraybuffer"
      })
        .then(res => {
          console.log("success");
          const data = res.data;
          const url = window.URL.createObjectURL(
            new Blob([data], {
              type:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            })
          );
          const link = document.createElement("a");
          link.style.display = "none";
          link.href = url;
          let datename = datetime.replace(/[:," ",-]/g, "");
          link.setAttribute(
            "download",
            datename + "_" + type + "_" + id + ".bin.bz2"
          );
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch(err => {
          console.log("error");
          console.log(err);
        });
    },
    handleSizeChange: function(size) {
      this.pageSize = size;
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
    },
    format(date) {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      const hour = date.getHours();
      const minute =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      // var minute = date.getMinutes();
      const second =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      // var second = date.getSeconds();

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
    },
    // json 转 excel
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    export2Excel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require("../vendor/Export2Excel");
        const tHeader = [
          "日期",
          "站号",
          "纬度",
          "经度",
          "海拔",
          "unknown",
          "气压",
          "高度",
          "温度",
          "位温",
          "风向",
          "风速"
        ];
        const filterVal = [
          "datetime",
          "站号",
          "纬度",
          "经度",
          "海拔",
          "unknown",
          "气压",
          "高度",
          "温度",
          "位温",
          "风向",
          "风速"
        ];
        const list = this.tableData;
        const data = this.formatJson(filterVal, list);
        const tableLength = this.tableData.length;
        if (tableLength != 0) {
          export_json_to_excel(tHeader, data, "山东探空数据");
        } else {
          this.$alert("没有探空数据，请先查询", "提示", {
            confirmButtonText: "确定",
            callback: action => {
              console.log(action);
            }
          });
        }
      });
    },
    findStationid() {
      let url = "/SDtankongStationNum";
      this.axios.get(url).then(
        res => {
          console.log("success");
          this.tankongStationOption = [];
          // console.log(res.data);
          let stationarr = res.data.info.StationNum;
          // console.log(stationarr);
          stationarr.forEach((val, index) => {
            // console.log(val)
            let station = {};
            station.value = val.站号;
            station.label = val.站号;
            this.tankongStationOption.push(station);
          });
        },
        res => {
          console.log("err");
          console.log(res);
        }
      );
    }
  },
  mounted() {
    this.findStationid();
  }
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
