<script>
export default {
  onLaunch: function () {
    console.log("App Launch");
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style>
/*每个页面公共css */
* {
  font-size: 14px;
  box-sizing: border-box;
}
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
.pName {
  font-size: 15px;
  color: #000;
  padding:0px 10px;
  height: 25px;
  line-height: 25px;
}
.pDesc {
  font-size: 13px;
  color: #999;
  margin-top:.1rem;
  padding:0px 10px;
  margin-bottom:10px;
}
.pccContainer{display:flex; flex-flow: row wrap;justify-content: space-between;}
.pccContainer .pccDescContainer{width:33%;}
.pccContainer .pccImg{width:100%;}
</style>
