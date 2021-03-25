
const api = "http://192.168.0.113:3000"

export default api

export  function getMovieList () {
  return  uni.request({
      url: api+"/"
    })
}

export async function get_mv_detail() {
    return  await uni.request({
      url: "http://192.168.0.113:3000/mvdetails?url=" + this.options.url, //仅为示例，并非真实接口地址。
    });
  }