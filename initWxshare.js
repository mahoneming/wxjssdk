import Vue from 'vue'
import wx from 'weixin-js-sdk'

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
     * 定制微信配置
     */
    wx.config({
      debug: true,
      appId,
      timestamp,
      nonceStr,
      signature,
      jsApiList: [
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone'
      ]
    })
    onWxShare({
      title: shareConfig.title,
      imgUrl: shareConfig.imgUrl,
      link: shareConfig.link,
      desc: shareConfig.desc
    })
  }).catch((err) => {
    console.log(err.message)
  })
}

export function onWxShare({
  title,
  imgUrl,
  link,
  desc
}) {
  wx.ready(() => {
    const apiList = [
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'onMenuShareQZone'
    ]
    for (let i = 0; i < apiList.length; i++) {
      share(apiList[i], link, {
        title,
        imgUrl,
        desc
      })
    }
  })
}

function share(api, link, {
  title,
  imgUrl,
  desc
}) {
  wx[api]({
    title,
    desc,
    link,
    imgUrl,
    success: () => {
      // alert('分享成功')
    }
  })
}
