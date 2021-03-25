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
      <text class="drawerTitle">最新电影</text>
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
          <navigator :url='"../movie/movie?url="+item.url' open-type="redirect">
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
import {getMovieList} from '../../api/api'
export default {
  data: () => {
    return {
      list: [],
    };
  },
  onLaunch: function () {},

  async onShow(){
    let data = await getMovieList()
    try{
      if(data[0]==null){
        this.list=data[1].data.splice(0,9)
      }
    }catch{
      console.log("崩了")
    }
  },
  methods: {}
};
</script>

<style >

img{display:block;}
.banner {
  width: 100%;
  height: 200px;
}
.banner_item {
  width: 100%;
}

.paaContainer {
	
}
.drawerTitle{margin: 0 0 10px 10px;display:block;}
.drawerTitle span{
	 
  font-weight: 700;
  font-size: 18px;
  
}
.defaultItemBg {
  position: relative;
}
.defaultItemBg .paaImg {
  width: 100%;
}
.defaultItemBg .pSummary {
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: #fff;
}

.pDesc {
  font-size: 13px;
  color: #999;
  margin-top:.1rem;
  padding:0px 10px;
  margin-bottom:10px;
}
.pccContainer{display:flex; flex-flow: row wrap;justify-content: space-between;padding:10px;}
.pccContainer .pccDescContainer{width:32%;}
.pccContainer .pccImg{width:100%;border-radius:4px;}
.pName {white-space: nowrap;  text-overflow: ellipsis;overflow: hidden;margin-top:5px;margin-bottom: 9px;}
</style>
