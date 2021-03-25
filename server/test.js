const express = require('express')
const cheerio = require('cheerio')
const http = require('https')
const { platform } = require('os')
const app = express()
const port = 3000

app.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
});


app.get('/', async (req, res) => {
    var url = "https://www.360kan.com/dianying/list.php"
    var result = await get_html(url);
    var $ = cheerio.load(result)
    let list_array = []
    $('.list li ').each(function (index, dom) {
        let imgsrc = $('img', this).attr('src')
        let name = $('.title span', this).text()
        let url = $('a', this).attr('href')
        list_array.push({
            imgsrc: imgsrc,
            name: name,
            url: url
        })
    })
    res.send(list_array)
})
app.get('/mvdetails', async (req, res) => {
    let url = req.query.url
     url = 'https://www.360kan.com/' + url
    var result = await get_html(url);
    var $ = cheerio.load(result)
    var mv_details = {
        mv_img:$('.s-cover img').attr("src"),
        mv_info:{
            name:$('.title-left h1').text(),
            leixing:$('.top-info-detail .item').eq(0).text().replace(/\s+/g," ") ,
            niandai:$('.top-info-detail .item').eq(1).text(),
            pingfen:$(".s-title-right").text().replace(/\s+/g," "),
            diqu:$('.top-info-detail .item').eq(2).text(),
            daoyan:$('.top-info-detail .item').eq(3).text().replace(/\s+/g," "),
            yanyuan:$('.top-info-detail .item').eq(4).text().replace(/\s+/g," "),
            desc:$(".item-desc").eq(1).text().replace("收起<<","")
        },
        play_source_list:[]
    }
    $('.top-list-zd a').each((index, dom) => {
        var play_url = $(dom).attr('href')
        var zd_name = $(dom).text()
        mv_details.play_source_list.push({
            url:play_url,
            name:zd_name
        })
    })
    //这次用的是箭头函数，没有this
    res.send(mv_details)
})

app.get('/jiexi_api_list', async (req, res) => {
    
    var list_array = [
        {name:"解析接口2",url:"https://api.51jiexi.xyz/?url="},
    ]
   
    //这次用的是箭头函数，没有this
    res.send(list_array)
})


app.listen(port, async () => {

})
function get_html(url) {
    const options = {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36'
        }
    }
    return new Promise((resolve, reject) => {
        var body;
        http.get(url, options, async (result) => {
            result.on('data', (chunk) => {
                body += chunk;
            });
            result.on('end', () => {
                resolve(body)
            })
        })
    })

}