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
        <div class="datades">数据区间：2014.5.10~2018.9.20</div>
      </el-row>
      <el-form ref="dateselect" :model="dateselect" label-width="30%">
        <el-form-item label="日期">
          <el-select
            v-model="dateselect.date"
            placeholder="请选择日期"
            filterable
          >
            <el-option
              v-for="item in dateOption"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="起始日期">
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
        </el-form-item> -->
        <el-form-item label="站号">
          <el-select
            v-model="dateselect.stationid"
            placeholder="请选择站号"
            filterable
          >
            <el-option
              v-for="item in StationOption"
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
          <div class="titletext">雨量数据</div>
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
            :label="item"
            v-for="item in tableTitle"
            :key="item"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              {{ scope.row[item] }}
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
  name: "N2C31",
  data() {
    return {
      dateselect: {
        startdate: "",
        starttime: "",
        startdefaultdate: new Date(2014, 6, 14),
        enddate: "",
        endtime: "",
        enddefaultdate: new Date(2014, 6, 14),
        stationid: "",
        date: "2015"
      },
      form: {
        stationnum: "",
        date: "",
        defaultdate: new Date(2014, 4, 8),
        show: false,
        fea: ""
      },
      tableData: [],
      StationOption: [],
      StationOption2015: [],
      StationOptionOther: [],
      currentPage: 1,
      pageSize: 5,
      dateOption: [
        "2015",
        "20140510",
        "20140704",
        "20140705",
        "20140729",
        "20140730",
        "20140914",
        "20140915",
        "20140916",
        "20140928",
        "20160502",
        "20160623",
        "20160825",
        "20160926",
        "20161015",
        "20161024",
        "20161027",
        "20170404",
        "20170412",
        "20170416",
        "20170503",
        "20170706",
        "20170727",
        "20170730",
        "20170930",
        "20180424",
        "20180422",
        "20180515",
        "20180613",
        "20180625",
        "20180626",
        "20180918",
        "20180919",
        "20180920"
      ],
      tableTitle: []
    };
  },
  methods: {
    search() {
      let date = this.dateselect.date;
      let stationid = this.dateselect.stationid;
      let url = "/SDrainRegularSearch";
      this.axios
        .get(url, {
          params: {
            date: date,
            stationid: stationid
          }
        })
        .then(
          res => {
            console.log("success");
            this.tableTitle = [];
            if (res.data.info.table.length != 0) {
              // tableTitle
              Object.keys(res.data.info.table[0]).forEach(val => {
                this.tableTitle.push(val);
              });
              // tableData
              this.tableData = res.data.info.table;
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
        const tHeader = this.tableTitle;
        const filterVal = this.tableTile;
        const list = this.tableData;
        const data = this.formatJson(filterVal, list);
        const tableLength = this.tableData.length;
        if (tableLength != 0) {
          export_json_to_excel(tHeader, data, "吉林雨量(常规)数据");
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
      let url1 = "/SDrainStationNum2015";
      let url2 = "/SDrainStationNumOther";
      // let url = this.dateselect.date.indexOf("2015") == -1 ? url1 : url2;
      this.axios.get(url1).then(
        res => {
          console.log("success");
          // console.log(res.data);
          let stationarr = res.data.info.StationNum;
          // console.log(stationarr);
          stationarr.forEach((val, index) => {
            // console.log(val)
            let station = {};
            station.value = val.station;
            station.label = val.station;
            this.StationOption2015.push(station);
            this.StationOption = this.StationOption2015;
          });
        },
        res => {
          console.log("err");
          console.log(res);
        }
      );
      this.axios.get(url2).then(
        res => {
          console.log("success");
          // console.log(res.data);
          let stationarr = res.data.info.StationNum;
          // console.log(stationarr);
          stationarr.forEach((val, index) => {
            // console.log(val)
            let station = {};
            station.value = val.Station_Id_C;
            station.label = val.Station_Name;
            this.StationOptionOther.push(station);
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
  },
  watch: {
    dateselect: {
      handler(oldVal, newVal) {
        if (newVal.date.indexOf("2015") == -1) {
          this.StationOption = this.StationOptionOther;
        } else {
          this.StationOption = this.StationOption2015;
        }
      },
      deep: true
    }
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
