// pages/mine/mine.js
const WXAPI = require('../../utils/service.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName:'干饭王',
    avatarUrl:'../../image/cat1.png'
  },
  goMydata(e){
    const name = e.currentTarget.dataset.name
    wx.navigateTo({
      url: '/pages/mine/' + name,
    })
  },
  initData(){
    const nickName = wx.getStorageSync('userInfo').nickName
    this.setData({
      nickName
    })
  },
  loginOut(){
    wx.clearStorage()
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})