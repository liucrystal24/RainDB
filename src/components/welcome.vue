<template>
  <div id="welcomeback">
    <div class="intrContainer">
      <div class="introTitle">数据库概述</div>
      <div class="introDetail">
        <!-- <div class="introCity">山东：</div> -->
        <ul>
          <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;“人工增雨随机化试验样本数据库”由公益性行业（气象）科研专项“人工增雨随机化外场试验和效果检验技术研究（项目编号：GYHY201406033）”建设。</li>
          <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;项目承研单位是中国气象科学研究院，数据库目前收录了山东省人民政府人工影响天气办公室、福建省气象科学研究所、海南省气象科学研究所和吉林省人工影响天气办公室四个单位在人工增雨随机化外场试验中获得的数据资料，并根据个例进行观测资料分类入库。后续其它省份试验或新增加的试验个例可随时入库，形成全国人工增雨随机化外场试验数据库。</li>
          <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;用户可根据增雨试验个例进行资料查询、下载，方便用户进行个例分析。</li>
          <!-- <li>4. 探空：按datetime、站号查询，区间：20140510-20180921；</li>
          <li>5. 天气图：按datetime、地面\pressure查询，下载数据后缀为.png，区间：20140510-20180920；</li>
          <li>6. 雨量图：按date查询，下载数据后缀为.bmp，区间：20140510-20180920；</li>
          <li>7. 卫星：按datetime查询，下载数据后缀为.Png，区间：20140510-20180920</li>-->
        </ul>
      </div>
      <!-- <div class="introDetail">
        <div class="introCity">福建：</div>
        <ul>
          <li>1. 随机试验样本：目的：火箭增雨作业；时间：2014-2019；地点：福建古田；样本数：50</li>
          <li>2. 雷达：按datetime查询，下载数据后缀为.bin.bz2，区间：20140714-20181116；</li>
          <li>3. 探空：按datetime、站号查询，区间：20140714-20190528；</li>
          <li>4. 雨滴谱：对应id分成10个表，按date、time查询，区间：20150409-20160309；</li>
          <li>5. 自动站：按观测时间、区站号查询，区间：20140713-20181120</li>
        </ul>
      </div>
      <div class="introDetail">
        <div class="introCity">海南：</div>
        <ul>
          <li>1. 随机试验样本：目的：火箭增雨作业；时间：2014-2019；地点1：海南乐东，样本数：11；地点2：海南屯昌，样本数：65</li>
          <li>2. FY4A：按datetime查询，如果band=V0001,则下载数据后缀为.NC，其他后缀均为.HDF，区间：20180527-20180528；</li>
          <li>3. FY4A图片：按datetime查询，下载数据后缀为.jpg，区间：20180527-20180528；</li>
          <li>4. 雷达：按datetime查询，下载数据后缀为.bin.bz2，区间：20140821-20180907；</li>
          <li>5. 雨量：按观测时间 ObservTime、站点编码查询，区间：20140821-20180907</li>
        </ul>
      </div>
      <div class="introDetail">
        <div class="introCity">吉林：</div>
        <ul>
          <li>1. 随机试验样本：目的：飞机增雨作业；时间：2015-2017；地点：吉林中部；样本数：12</li>
          <li>2. 雨滴谱：对应id分成4个表，按传感器日期、传感器时间、station查询（没有经纬度），区间：20150606-20170827；</li>
          <li>3. 辐射计：分白城、长春、吉林三个区域，其中吉林又分两个等级，再根据等级和日期分为6张表，一共8张表，按区域（白城、长春、吉林）、等级（lv1,lv2）、日期（只有吉林）、Date/Time查询，区间：20160524-20170827（没有经纬度）</li>
          <li>4. 无人机：一个是单次飞行记录表，一个是统计表，由于数据量小，直接整张表列出，记录表下载数据后缀为doc，统计表下载数据后缀为.xlsx，区间：2015-2017；</li>
          <li>5. 雷达：按datetime查询，下载数据命名为年+月+日+时.分V（例如：2015062900.03V），区间：20150606-20180828；</li>
          <li>6. 自动站：按stationKey、obsTime查询，区间：20150606-20170828（没有经纬度）</li>
        </ul>
      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "welcome",
  data() {
    return {
      msg: "welcome"
    };
  }
};
</script>

<style scoped>
#welcomeback {
  width: 100%;
  height: 100%;
  /* background-color: red; */
  background: url("../assets/welcome.png") no-repeat;
  background-size: cover;
  padding-top: 50px;
  /* display: flex; */
  /* justify-content: center; */
  /* opacity: 0.8; */
  /* overflow: auto; */
}
.intrContainer {
  width: 80%;
  height: 450px;
  border: 1px solid #000;
  background: rgba(240, 248, 255, 0.9);
  /* background-color: aliceblue; */
  text-align: left;
  margin-left: 50%;
  margin-top: 5%;
  transform: translateX(-50%);
  /* opacity: 0.8; */
  overflow: auto;
  padding: 0 30px;
  box-sizing: border-box;
}
.introTitle {
  font-size: 40px;
  font-weight: bolder;
  text-align: center;
  padding: 20px;
}
.introCity {
  font-size: 20px;
  font-weight: bold;
  padding: 5px;
  padding-left: 20px;
}
.introDetail li {
  font-size: 28px;
  /* font-weight: bold; */
  line-height: 40px;
  list-style: none;
  padding: 10px 0;
  padding-left: 0px;
}
</style>