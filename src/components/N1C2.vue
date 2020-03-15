<template>
  <baidu-map
    class="bm-view"
    :center="center"
    :zoom="zoom"
    @mousemove="syncPolyline"
    @click="paintPolyline"
    @rightclick="newPolyline"
    @ready="handler"
  >
    <!-- 按钮插件 -->
    <bm-control>
      <button @click="toggle('polyline')">{{ polyline.editing ? '停止绘制' : '开始绘制' }}</button>
    </bm-control>
    <!-- 画折线线查件组，只需要在polyline.paths加入经纬度数组，即可 -->
    <bm-polyline :path="path" v-for="path of polyline.paths" :key="path.index"></bm-polyline>
  </baidu-map>
</template>

<script>
export default {
  name: "N1C2",
  data() {
    return {
      center: { lng: 119.29035, lat: 26.1039 },
      zoom: 9,
      // BMap: {},
      // map: {},
      polyline: {
        editing: false,
        paths: [
          [
            { lng: 116.752121, lat: 26.981295 },
            { lng: 115.850653, lat: 26.112569 },
            { lng: 117.612194, lat: 25.883953 },
            { lng: 116.75672, lat: 26.993657 }
          ],
          [
            { lng: 117.865157, lat: 27.100736 },
            { lng: 117.91115, lat: 26.299283 },
            { lng: 119.461123, lat: 26.083497 },
            { lng: 119.47952, lat: 27.071917 },
            { lng: 117.869757, lat: 27.104853 }
          ],
          [
            { lng: 117.98474, lat: 25.729904 },
            { lng: 117.98014, lat: 25.241451 },
            { lng: 118.711433, lat: 25.170312 },
            { lng: 118.748227, lat: 25.659057 },
            { lng: 117.957144, lat: 25.73407 }
          ],
          []
        ]
      }
    };
  },
  methods: {
    handler({ BMap, map }) {
      // this.Bmap = BMap;
      // this.map = map;
      console.log(BMap, map);
      // this.center = "福建";
      // console.log(this.center.lng, this.center.lat, this.zoom);
      this.center.lng = 119.29035;
      this.center.lat = 26.1039;
      this.zoom = 9;
      // console.log(this.center.lng, this.center.lat, this.zoom);
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
}
</style>
