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
        <div class="datades">数据区间：2018.5.27~2018.5.28</div>
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
          <div class="titletext">FY4A图片</div>
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
          <el-table-column label="type" header-align="center" align="center">
            <template slot-scope="scope">
              <span style="margin-left:10px">{{ scope.row["type"] }}</span>
            </template>
          </el-table-column>
          <el-table-column label="level" header-align="center" align="center">
            <template slot-scope="scope">
              <span style="margin-left:10px">{{ scope.row["level"] }}</span>
            </template>
          </el-table-column>
          <el-table-column label="class" header-align="center" align="center">
            <template slot-scope="scope">
              <span style="margin-left:10px">{{ scope.row["class"] }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" header-align="center" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="success"
                @click="handleEdit(scope.$index, scope.row)"
                >查看</el-button
              >
              <el-button
                size="mini"
                type="primary"
                @click="handleDownload(scope.$index, scope.row)"
                >下载</el-button
              >
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
    <loadingWindow context="文件" v-show="loading"></loadingWindow>
    <picWindow
      v-show="picshow"
      :datetime="picdatetime"
      :fea="picfea"
      context="FY4A图片"
      :picsrc="picsrc"
      @closeWindow="closewindow"
    ></picWindow>
  </div>
</template>

<script>
import loadingWindow from "./loading";
import picWindow from "./picWindow";
export default {
  name: "N3C4",
  data() {
    return {
      dateselect: {
        startdate: "",
        starttime: "",
        startdefaultdate: new Date(2018, 4, 27),
        enddate: "",
        endtime: "",
        enddefaultdate: new Date(2018, 4, 28),
        fea: ""
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
      pageSize: 5,
      loading: false,
      picshow: false,
      picdatetime: "",
      picfea: "",
      picsrc: ""
    };
  },
  methods: {
    search() {
      let startdate = this.format(this.dateselect.startdate);
      let enddate = this.format(this.dateselect.enddate);
      let url = "/HNFY4AimgSearch";
      console.log(startdate, enddate);
      this.axios
        .get(url, {
          params: { startdate: startdate, enddate: enddate }
        })
        .then(
          res => {
            console.log("success");
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
            console.log(res);
          }
        );
    },
    handleEdit(index, row) {
      let datetime = row.datetime;
      let type = row.type;
      let level = row.level;
      let class1 = row.class;
      let url = "/HNFY4ALook";
      this.axios({
        method: "post",
        url: url,
        data: { datetime, type, level, class1 },
        responseType: "arraybuffer"
      })
        .then(res => {
          console.log("success");
          this.picshow = true;
          this.picdatetime = datetime;
          this.picfea = type;
          const data = res.data;
          console.log(res.data);
          const url = window.URL.createObjectURL(
            new Blob([data], {
              type:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            })
          );
          console.log(url);
          this.picsrc = url;
        })
        .catch(err => {
          console.log("error");
          console.log(err);
        });
    },
    handleDownload(index, row) {
      let datetime = row.datetime;
      let type = row.type;
      let level = row.level;
      let class1 = row.class;
      let url = "/HNFY4ALook";
      this.axios({
        method: "post",
        url: url,
        data: { datetime, type, level, class1 },
        responseType: "arraybuffer"
      })
        .then(res => {
          console.log("success");
          // this.picshow = true;
          this.picdatetime = datetime;
          this.picfea = type;
          const data = res.data;
          console.log(res.data);
          const url = window.URL.createObjectURL(
            new Blob([data], {
              type:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            })
          );
          const link = document.createElement("a");
          link.style.display = "none";
          link.href = url;

          datetime = datetime.replace(/[:,-]/g, "");
          // console.log(datetime);
          let datefirst = datetime.split(" ")[0];
          let datesecond = datetime.split(" ")[1].slice(0, 4);
          console.log({ datefirst, datesecond });
          link.setAttribute(
            "download",
            datefirst +
              datesecond +
              "_" +
              type +
              "_" +
              level +
              "_" +
              class1 +
              ".jpg"
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
    closewindow: function(data) {
      if (data === "close") {
        this.picshow = false;
      }
    },
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
  components: { loadingWindow, picWindow }
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
