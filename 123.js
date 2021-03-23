const { Console } = require('console');



(async function () {
    const cheerio = require('cheerio')
    var url = "https://www.360kan.com/dianying/list.php"
    var result = await get_html(url);
    var $ = cheerio.load(result)
    //console.log(index)
    let list_array = []
    $('.list li ').each(function (index, dom) {
        let imgsrc=$('img',this).attr('src')
        let name = $('.title span',this).text() 
        let url = $('a',this).attr('href') 
        list_array.push({
            imgsrc:imgsrc,
            name:name,
            url:url
        })
    })
})()

function get_html(url) {

    const http = require('https')
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