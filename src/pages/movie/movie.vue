<!-- 本示例未包含完整css，获取外链css请参考上文，在hello uni-app项目中查看 -->
<template>
  <view>
    <!-- <web-view :src="default_jiexi_api+default_play_url" style="height:300px;"></web-view> -->
    <view class="mv_detail">
      <image class="mv_img" :src="mv_detail.mv_img" mode="widthFix"></image>
      <view class="mv_info" v-if="mv_detail.mv_info">
        <text>{{ mv_detail.mv_info.name }} 1986</text>
        <text>{{ mv_detail.mv_info.diqu }}</text>
        <text v-show="mv_detail.mv_info.pingfen.trim() !== ''"
          >评分 ：{{ mv_detail.mv_info.pingfen.trim() }}
        </text>
        <text>{{ mv_detail.mv_info.daoyan }}</text>
        <text>{{ mv_detail.mv_info.yanyuan }}</text>
        <text>{{ mv_detail.mv_info.leixing }}</text>
      </view>
      <view class="mv_info" v-else>加载中...</view>
    </view>
    <view class="play_source">
      <text>选择播放源：</text>
      <picker
        @change="change_play_source"
        :value="play_source_index"
        :range="mv_detail.play_source_list"
        range-key="name"
      >
        <view class="uni-input">{{
          mv_detail.play_source_list[play_source_index].name
        }}</view>
      </picker>
    </view>
    <view class="play"><button @click="play">点击播放</button></view>
    <!-- <text >播放来源</text> -->
    <view class="mv_desc">
      <view>简介：</view>
      {{ mv_detail.mv_info.desc }}
    </view>
  </view>
</template>
<script>
export default {
  data: () => {
    return {
      mv_detail: [], //电影详情
      play_source_index: 0, //播放地址index
      jiexi_list: [], //解析接口列表
      default_jiexi_api: "", //默认解析接口
    };
  },
  onLaunch: function () {},
  onReady: function () {},
  onShow: async function () {
    let mv_detail = await this.get_mv_detail();
    let jiexi_api_list = await this.get_jiexi_api_list();

    if (mv_detail.statusCode == 200 && jiexi_api_list.statusCode == 200) {
      mv_detail = mv_detail.data;
      jiexi_api_list = jiexi_api_list.data;

      this.default_play_url = mv_detail.play_source_list[0].url;
      this.mv_detail = mv_detail;
      this.jiexi_list = jiexi_api_list;
      this.default_jiexi_api = jiexi_api_list[0].url;
    }
  },
  methods: {
    async get_mv_detail() {
      var [error, res] = await uni.request({
        url: "http://192.168.0.113:3000/mvdetails?url=" + this.options.url, //仅为示例，并非真实接口地址。
      });
      return res;
    },
    async get_jiexi_api_list() {
      var [error, res] = await uni.request({
        url: "http://192.168.0.113:3000/jiexi_api_list", //仅为示例，并非真实接口地址。
      });
      return res;
    },
    change_play_source(e) {
      this.play_source_index = this.index = e.target.value;
    },
    play() {
      uni.navigateTo({
        url: "play?url="+this.default_jiexi_api+this.mv_detail.play_source_list[this.play_source_index].url,
      });
    },
  },
};
</script>
<style scoped>
.mv_detail {
  display: flex;
  padding: 10px;
}
.mv_img {
  width: 10em;
  border: 1px #dbdbdb solid;
}
.mv_info {
  width: 65%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px 0px;
  padding-left: 10px;
}
.mv_info text {
  display: block;
  height: 1em;
  line-height: 1em;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.play {
  width: 100%;
}
.play_mv_detail {
  display: flex;
  flex-direction: row;
}
.play_source {
  padding: 10px;
  display: flex;
}
.video {
  width: 100%;
  height: 300px;
  top: 0;
}
.play {
  padding: 10px;
}
.mv_desc {
  padding: 10px;
  line-height: 1.8em;
}
</style>
