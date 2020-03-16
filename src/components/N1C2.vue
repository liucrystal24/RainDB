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
    <bm-copyright
      anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
      :copyright="[{id: 1, content: '南京云卫通软件技术有限公司'}]"
    ></bm-copyright>
    <!-- 按钮插件 bm-control-->
    <bm-control>
      <button @click="toggle('polyline')">{{ polyline.editing ? '停止绘制' : '开始绘制' }}</button>
      <button>123</button>
    </bm-control>

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
  </baidu-map>
</template>

<script>
export default {
  name: "N1C2",
  data() {
    return {
      center: { lng: 119.29035, lat: 26.1039 },
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
      }
    };
  },
  methods: {
    handler({ BMap, map }) {
      console.log(BMap, map);
      this.center.lng = 118.69035;
      this.center.lat = 26.7539;
      this.zoom = 10;
      Map.addOverlay({ lng: 118.9477, lat: 26.076305 });
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
    }
  }
};
</script>

<style scoped>
.bm-view {
  width: 100%;
  height: 100%;
  /* overflow: hidden; */
}
</style>