import Vue from 'vue'
import wx from 'weixin-js-sdk'

export function wxConfig() {
  // alert(window.location.href.split('#')[0])
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
      title: '分享测试',
      imgUrl: require('../assets/logo.png'),
      link: window.location.href,
      desc: '在长大的过程中，我才慢慢发现，我身边的所有事'
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
      // alert(link);
    }
  })
}
