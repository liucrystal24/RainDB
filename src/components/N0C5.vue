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
        <div class="datades">数据区间：2015.6.6~2017.8.27</div>
      </el-row>
      <el-form ref="dateselect" :model="dateselect" label-width="30%">
        <el-form-item label="查询方式">
          <el-select v-model="dateselect.style" placeholder="请选择查询方式">
            <el-option label="查询" value="查询"> </el-option>
            <el-option label="统计" value="统计"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchTable">查询</el-button>
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
          <div class="titletext">无人机文件</div>
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
            :label="item"
            v-for="(item, index) in tableTitle"
            :key="item"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              {{ scope.row[item] }}
            </template>
          </el-table-column>
          <el-table-column label="操作" header-align="center" align="center">
            <template slot-scope="scope">
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
  </div>
</template>

<script>
export default {
  name: "N0C5",
  data() {
    return {
      dateselect: {
        style: ""
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
      tableTitle: []
    };
  },
  methods: {
    searchTable() {
      let style = this.dateselect.style;
      let url = "/JLwurenjiSearch";
      this.axios.get(url, { params: { style } }).then(
        res => {
          console.log("success");
          console.log(res.data.info.wurenjiTable);
          this.tableTitle =
            style == "查询" ? ["datetime", "number"] : ["year", "number"];
          this.tableData = res.data.info.wurenjiTable;
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
      let datetime = this.dateselect.style == "查询" ? row.datetime : row.year.toString();
      // let datetime = row.datetime;
      let filestyle = this.dateselect.style == "查询" ? ".doc" : ".xlsx";
      let style = this.dateselect.style;
      let number = row.number;
      let url = "/JLwurenjiFile";
      this.axios({
        method: "post",
        url: url,
        data: { style, number },
        responseType: "arraybuffer"
      })
        .then(res => {
          console.log("success");
          const data = res.data;
          console.log(data);
          const url = window.URL.createObjectURL(
            new Blob([data], {
              type:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            })
          );
          const link = document.createElement("a");
          link.style.display = "none";
          link.href = url;
          console.log(datetime);
          let datename = datetime.replace(/[:," ",-]/g, "");
          link.setAttribute("download", datename + "_" + number + filestyle);
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
