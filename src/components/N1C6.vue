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
        <div class="datades">数据区间：2014.7.13~2018.11.20</div>
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
        <el-form-item label="区站号">
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
        <el-form-item label="要素">
          <el-select
            v-model="zdFea"
            placeholder="请选择"
            multiple
            collapse-tags
            @change="selectAll"
          >
            <el-option
              v-for="item in zdoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="zdTable">查询</el-button>
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
          <div class="titletext">自动站数据</div>
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
            v-for="(item, index) in zdTitle"
            :key="item"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              {{ scope.row[item] }}
            </template>
          </el-table-column>
        </el-table>
        <!-- <el-table
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
          <el-table-column label="区站号" header-align="center" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.区站号 }}</span>
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
          <el-table-column
            label="观测场海拔"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.观测场海拔高度 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="气压传感器海拔"
            header-align="center"
            align="center"
            width="90"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.气压传感器海拔高度 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="观测方式"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.观测方式 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="观测时间"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.观测时间 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="最大风速的风向"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.最大风速的风向 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="最大风速"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.最大风速 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="最大风速出现时间"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.最大风速出现时间 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="瞬时风向"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.瞬时风向 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="瞬时风速"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.瞬时风速 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="极大风速的风向"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.极大风速的风向 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="极大风速"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.极大风速 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="极大风速出现时间"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.极大风速出现时间 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="小时降水量"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.小时降水量 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="气温" header-align="center" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.气温 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="最高气温"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.最高气温 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="最高气温出现时间"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.最高气温出现时间 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="最低气温"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.最低气温 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="最低气温出现时间"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.最低气温出现时间 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="相对湿度"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.相对湿度 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="最小相对湿度"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.最小相对湿度 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="最小相对湿度出现时间"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.最小相对湿度出现时间 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="水汽压" header-align="center" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.水汽压 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="露点温度"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.露点温度 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="本站气压"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.本站气压 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="最高本站气压"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.最高本站气压 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="最高本站气压出现时间"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.最高本站气压出现时间 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="最低本站气压"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.最低本站气压 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="最低本站气压出现时间"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.最低本站气压出现时间 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="草面（雪面）温度"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row["草面（雪面）温度"] }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="草面（雪面）最高温度"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row["草面（雪面）最高温度"] }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="草面（雪面）最高温度出现时间"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row["草面（雪面）最高温度出现时间"] }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="最低本站气压"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.最低本站气压出现时间 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="最低本站气压"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.最低本站气压出现时间 }}</span>
            </template>
          </el-table-column>
        </el-table> -->
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
  name: "N1C6",
  data() {
    return {
      dateselect: {
        startdate: "",
        starttime: "",
        startdefaultdate: new Date(2014, 6, 14),
        enddate: "",
        endtime: "",
        enddefaultdate: new Date(2014, 6, 14),
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
      pageSize: 5,
      zdFea: [],
      zdoptions: [],
      oldOptions: [[]],
      zdTitle: []
    };
  },
  methods: {
    //  查询自动站列表
    zdTable() {
      this.zdTitle = this.zdFea;
      // console.log(this.zdTitle);
      if (this.zdTitle.indexOf("区站号") == -1) {
        this.zdTitle.unshift("区站号", "观测时间");
      }
      let starttime = this.format(this.dateselect.startdate);
      let endtime = this.format(this.dateselect.enddate);
      let stationid = this.dateselect.stationid;
      let zdFea = this.zdFea.toString();
      console.log(zdFea);
      let url = "/FJzidongSearch";
      this.axios
        .get(url, {
          params: {
            starttime: starttime,
            endtime: endtime,
            stationid: stationid,
            fea: zdFea
          }
        })
        .then(
          res => {
            console.log("success");
            console.log(res.data);
            // 探空数组
            this.tableData = res.data.info.zidongsearch;
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
          export_json_to_excel(tHeader, data, "福建自动站数据");
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
      let url = "/FJzidongStationNum";
      this.axios.get(url).then(
        res => {
          console.log("success");
          // console.log(res.data);
          let stationarr = res.data.info.zidongStationNum;
          // console.log(stationarr);
          stationarr.forEach((val, index) => {
            // console.log(val)
            let station = {};
            station.value = val.区站号;
            station.label = val.区站号;
            this.tankongStationOption.push(station);
          });
        },
        res => {
          console.log("err");
          console.log(res);
        }
      );
    },
    // 获取自动站所有要素
    findTitle() {
      let url = "/FJzidongTitle";
      this.axios.get(url).then(
        res => {
          console.log("success");
          this.zdoptions = [
            {
              value: "全选",
              label: "全选"
            }
          ];
          let titleObj = res.data.info.zidongTitle[0];
          Object.keys(titleObj).forEach(key => {
            if (key != "区站号" && key != "观测时间") {
              this.zdoptions.push({
                label: key,
                value: key
              });
            }
          });
        },
        res => {
          console.log("err");
          console.log(res);
        }
      );
    },
    // 要素全选
    selectAll(val) {
      let allValues = [];
      //保留所有值
      for (let item of this.zdoptions) {
        allValues.push(item.value);
      }

      // 用来储存上一次的值，可以进行对比
      const oldVal = this.oldOptions.length === 1 ? [] : this.oldOptions[1];

      // 若是全部选择
      if (val.includes("全选")) this.zdFea = allValues;

      // 取消全部选中  上次有 当前没有 表示取消全选
      if (oldVal.includes("全选") && !val.includes("全选")) this.zdFea = [];

      // 点击非全部选中  需要排除全部选中 以及 当前点击的选项
      // 新老数据都有全部选中
      if (oldVal.includes("全选") && val.includes("全选")) {
        const index = val.indexOf("全选");
        val.splice(index, 1); // 排除全选选项
        this.zdFea = val;
      }

      //全选未选 但是其他选项全部选上 则全选选上 上次和当前 都没有全选
      if (!oldVal.includes("全选") && !val.includes("全选")) {
        if (val.length === allValues.length - 1)
          this.zdFea = ["全选"].concat(val);
      }

      //储存当前最后的结果 作为下次的老数据
      this.oldOptions[1] = this.zdFea;
    },
    // 时间转换 辅助函数
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
    }
  },
  mounted() {
    this.findStationid();
    this.findTitle();
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
