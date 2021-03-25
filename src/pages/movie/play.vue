<!-- 本示例未包含完整css，获取外链css请参考上文，在hello uni-app项目中查看 -->
<template>

  <view class="view">
    <web-view class="video" :src="url"></web-view>
  </view>
</template>
<script>
export default {
  data: () => {
    return {
      url: ""
    };
  },
  onReady(){
    this.url=this.$route.query.url
    console.log(this.url)
  }
}
</script>
