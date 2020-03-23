<template>
  <baidu-map
    class="bm-view"
    :center="center"
    :zoom="zoom"
    :scroll-wheel-zoom="false"
    :mapStyle="mapStyle"
    @mousemove="syncPolyline"
    @click="paintPolyline"
    @rightclick="newPolyline"
    @ready="handler"
  >
    <!-- 查询条件 -->
    <bm-control>
      <el-button
        icon="el-icon-search"
        circle
        type="primary"
        class="searchbutton"
        @click="form.show = !form.show"
        v-if='searchbuttonshow'
      ></el-button>
      <!-- 查询条件form -->
      <el-collapse-transition>
        <el-form
          ref="form"
          :model="form"
          label-width="80px"
          class="searchcontainer"
          size="mini"
          v-if="form.show"
        >
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
              style="width: 100%;"
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
            <el-button type="primary" @click="onSubmit" class="submitbutton"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
      </el-collapse-transition>
    </bm-control>

    <!-- 查询图表 -->
    <bm-control class="resultContainer" >
      <div class="resultheader" v-if="chartShow">
        <el-button
          type="danger"
          icon="el-icon-close"
          class="closebutton"
          @click="chartclose"
        ></el-button>
      </div>
      <ve-line
        class="resultContent"
        :extend="extend"
        height="400px"
        :data="chartData"
        :settings="chartSettings"
        :toolbox="toolbox"
        ref="feachart"
        v-if="chartShow"
      ></ve-line>
    </bm-control>

    <!-- 公司授权 -->
    <bm-copyright
      anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
      :copyright="[{ id: 1, content: '南京云卫通软件技术有限公司' }]"
    ></bm-copyright>

    <!-- 按钮插件 bm-control-->
    <!-- <bm-control>
      <button @click="toggle('polyline')">{{ polyline.editing ? '停止绘制' : '开始绘制' }}</button>
      <button>123</button>
    </bm-control>-->

    <!-- 画折线线查件组，只需要在polyline.paths加入经纬度数组，即可 -->

    <bm-polyline
      :path="path"
      v-for="path of polyline.paths"
      :key="path.index"
      stroke-color="#42F942"
    ></bm-polyline>
    <bm-polyline :path="recPath1" stroke-color="#0303FF"></bm-polyline>
    <bm-polyline :path="recPath2" stroke-color="#0303FF"></bm-polyline>
    <bm-polyline :path="recPath3" stroke-color="#0303FF"></bm-polyline>
    <bm-polyline :path="recPath4" stroke-color="#FF02FF"></bm-polyline>
    <bm-polyline :path="recPath5" stroke-color="#FF0000"></bm-polyline>

    <!-- 站点 -->
    <bm-point-collection
      :points="points"
      shape="BMAP_POINT_SHAPE_CIRCLE"
      color="red"
      size="BMAP_POINT_SIZE_SMALL"
      @click="clickHandler"
    ></bm-point-collection>
  </baidu-map>
</template>

<script>
export default {
  name: "N1C2",
  data() {
    return {
      center: { lng: 119.29035, lat: 26.1039 },
      zoom: 9,
      searchbuttonshow:false,
      mapStyle: {
        styleJson: [
          {
            featureType: "road",
            elementType: "all",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "city",
            elementType: "labels",
            stylers: {
              visibility: "on"
            }
          }
        ]
      },
      recPath1: [
        { lng: 117.974005, lat: 26.776609 },
        { lng: 118.199372, lat: 26.530698 },
        { lng: 118.709897, lat: 26.91895 },
        { lng: 118.48453, lat: 27.137265 },
        { lng: 117.974005, lat: 26.776609 }
      ],
      recPath2: [
        { lng: 118.086689, lat: 26.359901 },
        { lng: 118.48913, lat: 26.657853 },
        { lng: 118.705298, lat: 26.453095 },
        { lng: 118.256864, lat: 26.102707 },
        { lng: 118.086689, lat: 26.359901 }
      ],
      recPath3: [
        { lng: 118.744392, lat: 26.337109 },
        { lng: 118.969759, lat: 26.092324 },
        { lng: 119.376799, lat: 26.446884 },
        { lng: 119.128436, lat: 26.661986 },
        { lng: 118.748991, lat: 26.339181 }
      ],
      recPath4: [
        { lng: 118.433938, lat: 26.860179 },
        { lng: 118.905368, lat: 26.357829 },
        { lng: 119.080143, lat: 26.51932 },
        { lng: 118.583416, lat: 26.985931 },
        { lng: 118.436237, lat: 26.864304 }
      ],
      recPath5: [
        { lng: 118.822581, lat: 26.948839 },
        { lng: 119.041048, lat: 26.738414 },
        { lng: 119.353803, lat: 27.027131 },
        { lng: 119.112338, lat: 27.226732 },
        { lng: 118.822581, lat: 26.948839 }
      ],
      polyline: {
        editing: false,
        paths: [
          [
            { lng: 119.539067, lat: 26.076305 },
            { lng: 117.9477, lat: 26.076305 },
            { lng: 117.9477, lat: 27.406037 },
            { lng: 119.539067, lat: 27.406037 },
            { lng: 119.539067, lat: 26.076305 }
          ],
          []
        ]
      },
      //searchdialog
      searchdialog: false,
      form: {
        stationnum: "",
        date: "",
        defaultdate: new Date(2014, 4, 8),
        show: false,
        fea: ""
      },
      points: [],
      chartShow: false,
      chartData: {
        columns: ["气压", "温度"],
        rows: [
          {
            气压: "100",
            温度: "-51"
          },
          {
            气压: "135",
            温度: "-47"
          },
          {
            气压: "150",
            温度: "-49"
          },
          {
            气压: "176",
            温度: "-49"
          },
          {
            气压: "199",
            温度: "-47"
          },
          {
            气压: "200",
            温度: "-47"
          },
          {
            气压: "242",
            温度: "-51"
          },
          {
            气压: "250",
            温度: "-51"
          },
          {
            气压: "252",
            温度: "-52"
          },
          {
            气压: "258",
            温度: "-51"
          },
          {
            气压: "275",
            温度: "-48"
          },
          {
            气压: "282",
            温度: "-47"
          },
          {
            气压: "300",
            温度: "-43"
          },
          {
            气压: "341",
            温度: "-35"
          },
          {
            气压: "394",
            温度: "-27"
          },
          {
            气压: "400",
            温度: "-26"
          },
          {
            气压: "436",
            温度: "-21"
          },
          {
            气压: "453",
            温度: "-19"
          },
          {
            气压: "469",
            温度: "-18"
          },
          {
            气压: "500",
            温度: "-15"
          },
          {
            气压: "542",
            温度: "-10"
          },
          {
            气压: "659",
            温度: "-2"
          },
          {
            气压: "700",
            温度: "0"
          },
          {
            气压: "751",
            温度: "4"
          },
          {
            气压: "820",
            温度: "7"
          },
          {
            气压: "850",
            温度: "9"
          },
          {
            气压: "863",
            温度: "10"
          },
          {
            气压: "925",
            温度: "11"
          },
          {
            气压: "997",
            温度: "13"
          }
        ]
      },
      chartSettings: {
        yAxisName: ["温度"],
        xAxisName: ["气压"]
      },
      toolbox: {
        feature: {
          magicType: { type: ["line", "bar"] },
          saveAsImage: {}
        }
      },
      extend: {
        series: {
          label: {
            normal: {
              // show: true
            }
          }
          // markLine: {
          //   data: [{ type: "average", name: "平均值" }]
          // }
        }
      }
    };
  },
  methods: {
    //drawer
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
    },

    handler({ BMap, map }) {
      console.log(BMap, map);
      this.center.lng = 118.69035;
      this.center.lat = 26.7539;
      this.zoom = 9;
      // Map.addOverlay({ lng: 118.9477, lat: 26.076305 });
      const points = [];
      let url = "/FJtankongStationNum";
      this.axios.get(url, {}).then(
        res => {
          console.log(res.data.info.tankongStationNum);
          let FJtankongStation = res.data.info.tankongStationNum;
          for (let i = 0; i < FJtankongStation.length; i++) {
            const position = {
              lng: FJtankongStation[i].纬度,
              lat: FJtankongStation[i].经度
            };
            points.push(position);
          }
          this.points = points;
        },
        res => {
          console.log("err");
        }
      );
    },
    toggle(name) {
      this[name].editing = !this[name].editing;
    },
    syncPolyline(e) {
      if (!this.polyline.editing) {
        return;
      }
      const { paths } = this.polyline;
      if (!paths.length) {
        return;
      }
      const path = paths[paths.length - 1];
      if (!path.length) {
        return;
      }
      if (path.length === 1) {
        path.push(e.point);
      }
      //path 是临时点
      this.$set(path, path.length - 1, e.point);
    },
    newPolyline(e) {
      if (!this.polyline.editing) {
        return;
      }
      const { paths } = this.polyline;
      if (!paths.length) {
        paths.push([]);
      }
      const path = paths[paths.length - 1];
      path.pop();
      if (path.length) {
        paths.push([]);
      }
    },
    paintPolyline(e) {
      if (!this.polyline.editing) {
        return;
      }
      const { paths } = this.polyline;
      !paths.length && paths.push([]);
      paths[paths.length - 1].push(e.point);
    },
    clickHandler(e) {
      alert(`单击点的坐标为：${e.point.lng}, ${e.point.lat}`);
    },
    onSubmit() {
      this.chartShow = true;
      // this.$refs[`feachart`].echarts.resize();
      // let url = "";
      // this.axios.get(url, {}).then(
      //   res => {
      //     console.log(res.data.info);
      //   },
      //   res => {
      //     console.log("err");
      //   }
      // );
    },
    chartclose() {
      this.chartShow = false;
    }
  }
};
</script>

<style scoped>
.bm-view {
  width: 100%;
  height: 100%;
  /* position: relative; */
  /* overflow: hidden; */
}
.searchcontainer {
  background-color: #fff;
  padding: 25px;
  padding-left: 0;
  padding-bottom: 20px;
  border: 1px solid #1d6ec7;
  position: fixed;
  right: 80px;
  top: 180px;
}
.searchbutton {
  position: fixed;
  right: 30px;
  top: 180px;
}
.submitbutton {
  margin-left: 70px;
}
.resultContainer {
  width: 800px;
  background-color: #fff;
  position: absolute;
  left: 50% !important;
  top: 50% !important;
  transform: translate(-50%, -50%);
}
.resultheader {
  background-color: #4b9efc;
  height: 25px;
}
.resultContent {
  border: 1px solid #ddd;
  border-top: 0;
  /* height:750px; */
}
.closebutton {
  width: 30px;
  height: 22px;
  padding: 0px;
  margin-top: 1px;
  float: right;
  margin-right: 5px;
}
</style>
