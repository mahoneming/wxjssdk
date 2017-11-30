import Vue from 'vue'
// <script src="http://qzonestyle.gtimg.cn/qzone/qzact/common/share/share.js"></script>

const shareConfig = {
  imgUrl: 'http://schimages.oss-cn-hangzhou.aliyuncs.com/newSch/2017/08/04/cBgJ68PiMk.jpg',
  title: "分享标题",
  link: window.location.href,
  desc: "分享描述"
}

export function initShare() {
  Vue.http.get(`${Vue.http.options.root}/share/we/sign`, {
    params: {
      url: window.location.href.split('#')[0]
    }
  }).then((response) => {
    let timestamp = response.data.timestamp
    let nonceStr = response.data.nonceStr
    let url = response.data.url
    let appId = response.data.appid
    let signature = response.data.signature
    /**
     * 定制QQ分享+微信分享
     */
    setShareInfo({
      title: shareConfig.title, // 分享标题
      summary: shareConfig.desc, // 分享内容
      pic: shareConfig.imgUrl, // 分享图片
      url: shareConfig.link, // 分享链接
      // 微信权限验证配置信息，若不在微信传播，可忽略
      WXconfig: {
        swapTitleInWX: true, // 是否标题内容互换（仅朋友圈，因朋友圈内只显示标题）
        appId: appId, // 公众号的唯一标识
        timestamp: timestamp, // 生成签名的时间戳
        nonceStr: nonceStr, // 生成签名的随机串
        signature: signature // 签名
      }
    });
  }).catch((err) => {
    console.log(err.message)
  })
}
