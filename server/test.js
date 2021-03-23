const express = require('express')
const cheerio = require('cheerio')
const http = require('https')
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
        let url = $('a',this).attr('href') 
        list_array.push({
            imgsrc: imgsrc,
            name: name,
            url:url
        })
    })
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