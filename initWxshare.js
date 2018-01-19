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

export function close() {
  wx.closeWindow()
}

export function getLocation(getInfo) {
  wx.ready(() => {
    wx.getLocation({
      type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      success: function (res) {
        let latitude = Number(res.latitude).toFixed(6) // 纬度，浮点数，范围为90 ~ -90
        let longitude = Number(res.longitude).toFixed(6) // 经度，浮点数，范围为180 ~ -180。
        let speed = res.speed // 速度，以米/每秒计
        let accuracy = res.accuracy // 位置精度
      }
    })
  })
}

export function openLocation(name, address, latitude, longitude) {
  wx.ready(() => {
    wx.openLocation({
      latitude, // 纬度，浮点数，范围为90 ~ -90
      longitude, // 经度，浮点数，范围为180 ~ -180。
      name, // 位置名
      address, // 地址详情说明
      scale: 28, // 地图缩放级别,整形值,范围从1~28。默认为最大
      infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
    })
  })
}

export function chooseWXPay(orderNo, plateNo, timestamp, nonceStr, packages, signType, paySign) {
  // console.log(timestamp + ',' + nonceStr + ',' + packages + ',' + signType + ',' + paySign)
  wx.ready(() => {
    wx.chooseWXPay({
      timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
      nonceStr, // 支付签名随机串，不长于 32 位
      package: packages, // 统一支付接口返回的prepay\_id参数值，提交格式如：prepay\_id=\*\*\*）
      signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
      paySign, // 支付签名
      success: function (res) {
        // 支付成功后的回调函数
      },
      cancel: function () {
      },
      fail: function () {
      }
    })
  })
}

