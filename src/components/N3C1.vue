<template>
  <baidu-map
    class="bm-view"
    :center="center"
    :zoom="zoom"
    :scroll-wheel-zoom="true"
    :mapStyle="mapStyle"
    @mousemove="syncPolyline"
    @click="paintPolyline"
    @rightclick="newPolyline"
    @ready="handler"
  >
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
    <bm-boundary name="海南省" strokeWeight="3" strokeColor="#FF0000" fillOpacity="0"></bm-boundary>
    <!-- 画折线线查件组，只需要在polyline.paths加入经纬度数组，即可 -->

    <!-- <bm-polyline
      :path="path"
      v-for="path of polyline.paths"
      :key="path.index"
      stroke-color="#42F942"
    ></bm-polyline>-->
    <bm-polyline :path="recPath1" stroke-color="#0303FF"></bm-polyline>
    <bm-polyline :path="recPath2" stroke-color="#0303FF"></bm-polyline>
    <!--<bm-polyline :path="recPath3" stroke-color="#0303FF"></bm-polyline>
    <bm-polyline :path="recPath4" stroke-color="#FF02FF"></bm-polyline>
    <bm-polyline :path="recPath5" stroke-color="#FF0000"></bm-polyline>-->

    <!-- 站点 -->
    <!-- <bm-point-collection
      :points="points"
      shape="BMAP_POINT_SHAPE_CIRCLE"
      color="red"
      size="BMAP_POINT_SIZE_SMALL"
      @click="clickHandler"
    ></bm-point-collection>-->
  </baidu-map>
</template>

<script>
export default {
  name: "N3C1",
  data() {
    return {
      center: { lng: 126.57, lat: 43.87 },
      zoom: 9,
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
        { lng: 115.300431, lat: 35.437025 },
        { lng: 116.059319, lat: 35.966018 },
        { lng: 116.160505, lat: 35.846273 },
        { lng: 115.429212, lat: 35.354168 },
        { lng: 115.300431, lat: 35.437025 }
      ],
      recPath2: [
        { lng: 116.25939, lat: 36.109843 },
        { lng: 116.813609, lat: 36.204957 },
        { lng: 116.903295, lat: 36.104244 },
        { lng: 116.346777, lat: 35.954799 },
        { lng: 116.25939, lat: 36.109843 }
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
            { lng: 123.54242, lat: 44.208405 },
            { lng: 125.207375, lat: 45.247758 },
            { lng: 126.872329, lat: 44.208405 },
            { lng: 125.207375, lat: 43.169052 },
            { lng: 123.54242, lat: 44.208405 }
          ],
          []
        ]
      },
      //searchdialog
      searchdialog: false,
      searchbuttonshow: false,
      form: {
        stationnum: "",
        startdate: "",
        starttime: "",
        startdefaultdate: new Date(2014, 6, 12),
        enddate: "",
        endtime: "",
        enddefaultdate: new Date(2014, 6, 12),
        show: false,
        fea: ""
      },
      points: [],
      chartShow: false,
      // SELECT `观测时间`,`10分钟平均风速` FROM `fujian`.`fujian_zidongzhan` WHERE `区站号` LIKE '%54537%' AND `观测时间` BETWEEN '2014-07-13 00:00:00' AND '2014-07-13 23:59:59' AND `2分钟平均风向` NOT LIKE '%/%'
      chartData: {
        columns: ["时间", "风速"],
        rows: [
          {
            时间: "2014-07-13 23:00:00",
            风速: "31"
          },
          {
            时间: "2014-07-13 23:05:00",
            风速: "31"
          },
          {
            时间: "2014-07-13 23:10:00",
            风速: "30"
          },
          {
            时间: "2014-07-13 23:15:00",
            风速: "25"
          },
          {
            时间: "2014-07-13 23:20:00",
            风速: "26"
          },
          {
            时间: "2014-07-13 23:25:00",
            风速: "30"
          },
          {
            时间: "2014-07-13 23:30:00",
            风速: "27"
          },
          {
            时间: "2014-07-13 23:35:00",
            风速: "23"
          },
          {
            时间: "2014-07-13 23:40:00",
            风速: "27"
          },
          {
            时间: "2014-07-13 23:45:00",
            风速: "31"
          },
          {
            时间: "2014-07-13 23:50:00",
            风速: "28"
          },
          {
            时间: "2014-07-13 23:55:00",
            风速: "29"
          }
        ]
      },
      chartSettings: {
        yAxisName: ["风速"],
        xAxisName: ["时间"]
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
      // 110.03, 19.33
      this.center.lng = 110.03;
      this.center.lat = 19.33;
      this.zoom = 9;
      // Map.addOverlay({ lng: 126.57, lat: 43.87 });
      // const points = [];
      // let url = "/JLzidongStationNum";
      // // console.log(points);
      // this.axios.get(url, {}).then(
      //   res => {
      //     console.log(res.data.info.zidongStationNum);
      //     let zidongStationNum = res.data.info.zidongStationNum;
      //     for (let i = 0; i < zidongStationNum.length; i++) {
      //       const position = {
      //         lng: zidongStationNum[i].经度,
      //         lat: zidongStationNum[i].纬度
      //       };
      //       points.push(position);
      //     }
      //     this.points = points;
      //   },
      //   res => {
      //     console.log("err");
      //   }
      // );
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
