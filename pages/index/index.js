//index.js
const WXAPI = require('../../utils/service.js')
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  guestlogin() {
    WXAPI.guestlogin().then(function(data) {
      if (data.code == 200) {
        wx.setStorage({
          key: "userInfo",
          data: data.data
        })
        wx.reLaunch({
          url: '/pages/shop/shop'
        })
      } else {
        WXAPI.showToast(data.msg)
      }
    })
  },
  onLoad: function() {
    if (wx.getStorageSync('userInfo')) {
      wx.reLaunch({
        url: '/pages/shop/shop'
      })
    }
  },
  getUserInfo() {
    const that = this
    wx.login({
      success(res) {
        if (res.code) {
          that.RT_getopenid(res.code)
        }
      }
    })
  },
  RT_getopenid(code) {
    const that = this
    WXAPI.getOpenid({
      code: code
    }).then(function(data) {
      if (data.code == 200) {
        const openid = JSON.parse(data.data).openid;
        that.RT_wxlogin(openid)
      } else {
        WXAPI.showToast(data.msg)
      }
    })
  },
  RT_wxlogin(openId) {
    WXAPI.wxLogin({
      openId: openId
    }).then(function (data) {
      if (data.code == 200) {
        wx.setStorage({
          key: "userInfo",
          data: data.data
        })
        wx.reLaunch({
          url: '/pages/shop/shop'
        })
      } else {
        WXAPI.showToast(data.msg)
      }
    })
  },
})