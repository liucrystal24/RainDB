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
        <div class="datades">数据区间：2014.7.13~2018.11.16</div>
      </el-row>
      <el-form ref="dateselect" :model="dateselect" label-width="30%">
        <el-form-item label="起始日期">
          <!-- <el-date-picker
            type="date"
            placeholder="选择起始日期"
            v-model="dateselect.startdate"
            :default-value="dateselect.startdefaultdate"
          ></el-date-picker>-->
          <el-date-picker
            v-model="dateselect.startdate"
            type="datetime"
            placeholder="选择日期时间"
            :default-value="dateselect.startdefaultdate"
          ></el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="起始时间">
          <el-select v-model="dateselect.starttime" placeholder="请选起始时间">
            <el-option label="08:00" value="08:00"></el-option>
            <el-option label="20:00" value="20:00"></el-option>
          </el-select>
        </el-form-item>-->

        <el-form-item label="结束日期">
          <el-date-picker
            v-model="dateselect.enddate"
            type="datetime"
            placeholder="选择日期时间"
            :default-value="dateselect.enddefaultdate"
          ></el-date-picker>
          <!-- <el-date-picker
            type="date"
            placeholder="选择结束日期"
            v-model="dateselect.enddate"
            :default-value="dateselect.enddefaultdate"
          ></el-date-picker>-->
        </el-form-item>
        <!-- <el-form-item label="结束时间">
          <el-select v-model="dateselect.endtime" placeholder="请选结束时间">
            <el-option label="08:00" value="08:00"></el-option>
            <el-option label="20:00" value="20:00"></el-option>
          </el-select>
        </el-form-item>-->
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
          <div class="titletext">雷达文件</div>
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
        >
          <el-table-column label="日期" header-align="center" align="center" width="180">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left:10px">{{ scope.row.datetime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="类型" header-align="center" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.type }}</span>
            </template>
          </el-table-column>
          <el-table-column label="id" header-align="center" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" header-align="center" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleDownload(scope.$index, scope.row)"
              >下载</el-button>
            </template>
          </el-table-column>
        </el-table>
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
        startdefaultdate: new Date(2014, 6, 14),
        enddate: "",
        endtime: "",
        enddefaultdate: new Date(2014, 7, 14)
      },
      form: {
        stationnum: "",
        date: "",
        defaultdate: new Date(2014, 4, 8),
        show: false,
        fea: ""
      },
      tableData: [],
      tableDataCookies: [],
      // leidanum: 0,
      currentPage: 1,
      pageSize: 5
    };
  },
  methods: {
    searchleida() {
      let startdate = this.format(this.dateselect.startdate);
      let enddate = this.format(this.dateselect.enddate);
      let url = "/FJleidaSearch";
      console.log(startdate, enddate);
      this.axios
        .get(url, { params: { startdate: startdate, enddate: enddate } })
        .then(
          res => {
            console.log("success");
            console.log(res.data.info.leida);
            this.tableData = res.data.info.leida;
            // 查看雷达重复情况
            console.log(res.data.info.leida);
            let leiArr = this.leidaSet(res.data.info.leida);
            console.log(leiArr);
          },
          res => {
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
    leidaSet(arr) {
      let index = 0;
      let result = [];
      let nameMap = {};

      arr.forEach(v => {
        let datetimeDay = v.datetime.split(" ")[0];
        if (nameMap[datetimeDay] === void 0) {
          result.push(datetimeDay);
          nameMap[datetimeDay] = index;
          index += 1;
        }
      });

      return result;
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
  height: 100%;
  padding-bottom: 10px;
  overflow-y: auto;
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
.datades {
  font-size: 14px;
  padding-top: 5px;
  clear: both;
}
</style>
