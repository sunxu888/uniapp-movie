<!-- 本示例未包含完整css，获取外链css请参考上文，在hello uni-app项目中查看 -->
<template>
  <view class="view">
    <view>
      <image :src="mv_details.mv_img"></image>
      <view>
        <text>英雄本色 1986</text>
        <text>地区： 香港</text>
        <text>评分： 8.7分</text>
        <text>导演： 吴宇森</text>
        <text>主演： 周润发 狄龙 张国荣 李子雄 朱宝意 田丰 吴宇森 曾江 成奎安 徐克陈志辉</text >
        <text>类型： 动作 犯罪</text>
      </view>
    </view>
    <!-- <text >播放来源</text> -->
    <view class="play_mv_details">
      <!-- <button @click="change_zd_url" v-for="(item, index) in mv_details" :key="index">
        {{ item.zd_name }}
      </button> -->
    </view>
  </view>
</template>
<script>
export default {
  data: () => {
    return {
      mv_details:{}, //电影详情
      default_play_url: "", //默认站点
      jiexi_list: [], //解析接口列表
      default_jiexi_api: "", //默认解析接口
    };
  },
  onLaunch: function () {},
  onReady: function () {},
  onShow: async function () {
    let mv_details = await this.get_mv_details();
    let jiexi_api_list = await this.get_jiexi_api_list();

    if (mv_details.statusCode == 200 && jiexi_api_list.statusCode == 200) {
      mv_details = mv_details.data;
      jiexi_api_list = jiexi_api_list.data;
      // this.default_play_url = mv_details.play_url[0].play_url;
      // this.mv_details = mv_details;
      // this.jiexi_list = jiexi_api_list;
      // this.default_jiexi_api = jiexi_api_list[0].url;
    }
    console.log(mv_details)
  },
  methods: {
    change_zd_url() {
      console.log(1);
    },
    async get_mv_details() {
      var [error, res] = await uni.request({
        url: "http://localhost:3000/mvdetails?url=" + this.options.url, //仅为示例，并非真实接口地址。
      });
      return res;
    },
    async get_jiexi_api_list() {
      var [error, res] = await uni.request({
        url: "http://localhost:3000/jiexi_api_list", //仅为示例，并非真实接口地址。
      });
      return res;
    },
  },
};
</script>
<style scoped>
.view {
  margin-top: 350px;
}
.play {
  width: 100%;
}
.play_mv_details {
  display: flex;
  flex-direction: row;
}
.video {
  width: 100%;
  height: 300px;
  top: 0;
}
</style>
