const request = require('request')
const fs = require('fs')

const url = "http://api.ksapisrv.com/rest/n/feed/hot?appver=5.6.8.454&did=07B40896-B757-41C0-8FA9-593BD84B73AB&c=a&ver=5.6&sys=ios10.3.3&mod=iPhone7%2C1&net=%E4%B8%AD%E5%9B%BD%E8%81%94%E9%80%9A_5";

const params = {
  client_key:'56c3713c',
  count:20,
  country_code:'cn',
  id:2,
  language:'zh-Hans-CN;q=1, en-CN;q=0.9',
  pv:false,
  refreshTimes:1,
  sig: '50905a7618158fe18dbbe56508a8bd83',
  source: 1,
  type: 7
}

function downloadFile(uri,filename,callback){
  let stream = fs.createWriteStream(filename);
  request(uri).pipe(stream).on('close', callback);
}

function down () {
  request.post({
    url: url,
    form: params
  },
    function (err, result, body) {
      let data = JSON.parse(body)
      if (data.result == 50) {
        console.log('签名失效了')
        return false
      }
      data.feeds.forEach((urls) => {
        let tempURL
        if (urls.main_mv_urls) { // 解决数据不统一获取数据undefined
          tempURL = urls.main_mv_urls[0].url
        } else {
          tempURL = urls.cover_thumbnail_urls[0].url
        }
        downloadFile(tempURL,urls.caption + '.mp4',function(){
            console.log(urls.caption + '⤵️️️⤵️️️⤵️️️⤵️️️⤵️️️⤵️️️⤵️️️下载完毕');
          });
      })
    }
  )
}

down()
