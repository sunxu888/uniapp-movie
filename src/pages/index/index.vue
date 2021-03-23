<!-- 本示例未包含完整css，获取外链css请参考上文，在hello uni-app项目中查看 -->
<template>
  <view>
    <swiper class="banner" indicator-dots="true">
      <swiper-item>
        <image
          class="banner_item"
          mode="widthFix"
          src="/static/4ea2714825aa33fca5c2927a91bc8c9c.png"
        ></image>
      </swiper-item>
      <swiper-item>
        <image
          class="banner_item"
          mode="widthFix"
          src="/static/bf491479f0bc4d139b0f1146da676480.jpg"
        ></image>
      </swiper-item>
      <swiper-item>
        <image
          class="banner_item"
          mode="widthFix"
          src="/static/4ea2714825aa33fca5c2927a91bc8c9c.png"
        ></image>
      </swiper-item>
    </swiper>

    <!--电影start-->
    <view>
      <text class="drawerTitle">电影</text>
      <!-- <view class="paaContainer">
        <view class="defaultItemBg">
          <image
            src="/static/0bd34ec62ea64be7a73d108292750584.jpg"
            alt="乡村爱情13"
            class="paaImg"
          ></image>
          <view class="pLayer"></view>
          <view class="pSummary">40集全</view>
        </view>
        <view class="pName paaName">乡村爱情13</view>
        <view class="pDesc paaName">国民横剧 牛气开年</view>
      </view> -->
      <view class="pccContainer">
        <view
          v-for="(item, index) in list"
          :key="index"
          class="pccDescContainer"
        >
          <navigator
            :url="item.url"
          >
            <view class="defaultItemBg">
              <image :src="item.imgsrc" :alt="item.name" class="pccImg"></image>
              <view class="pLayer"></view>
              <!-- <view class="vipIcon">超前点播</view> -->
              <!-- <view class="pSummary">更新至32集</view> -->
            </view>
            <view class="pName pccName">{{ item.name }}</view>
            <!-- <view class="pDesc pccName">老温蹭吃阿絮买单</view> -->
          </navigator>
        </view>
      </view>
      <!---->
    </view>
  </view>
</template>
<script>
export default {
  data: () => {
    return {
      list: [],
    };
  },
  onLaunch: function () {},

  onShow: function () {
    this.get();
  },
  methods: {
    get() {
      uni.request({
        url: "http://localhost:3000/", //仅为示例，并非真实接口地址。
        success: (res) => {
          this.list = res.data;
        },
      });
    },
  },
};
</script>
