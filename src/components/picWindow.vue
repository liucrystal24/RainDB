<template>
  <div class="PicWindow">
    <div class="Pic_header">
      <img src="@/assets/close.png" class="close" @click="handleClose" />
    </div>
    <div class="Pic_text">{{ datetime }}-{{ fea }}-{{ context }}</div>
    <div class="Pic_pic">
      <img :src="picsrc" />
    </div>
  </div>
</template>

<script>
export default {
  name: "PicWindow",
  data() {
    return {
      picshow: false
    };
  },
  props: {
    datetime: {
      type: String,
      required: true
    },
    fea: {
      type: String,
      required: false
    },
    context: {
      type: String,
      required: true
    },
    picsrc: {
      type: String,
      required: true
    }
  },
  methods: {
    handleClose: function() {
      this.$emit('closeWindow','close')
    }
  }
};
</script>

<style scoped>
.Pic_header {
  width: 100%;
  height: 20px;
  background-color: #2958de;
  position: relative;
}
.PicWindow {
  width: 1000px;
  /* height: 680px; */
  position: absolute;
  left: 50% !important;
  top: 50% !important;
  transform: translate(-50%, -50%);
  border: 1px solid #777777;
  background-color: #ffffff;
  /* border-radius: 5px; */
  text-align: center;
  z-index: 2000;
}
.Pic_pic {
  width: 100%;
  /* height: 618px; */
}
.Pic_pic img{
  width:100%;
}
.Pic_text {
  height: 30px;
  line-height: 30px;
}
.close {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
}
</style>
