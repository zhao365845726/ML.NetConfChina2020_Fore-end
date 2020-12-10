// pages/shop/detail.js
const WXAPI = require('../../utils/service.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeNav:1,
    productDeta:{},
    comments:[],
    details:'',
    isfav:0,
    baseImage: '../../image/cat.png',
    clientHeight:''
  },
  RT_productDetail(id){
    const that = this
    WXAPI.productDetail({
      id: id
    }).then(function (data) {
      const productDeta = data.data
      const details = data.data.content
      that.setData({
        productDeta,
        details
      })
    })
  },
  initData(id){
    this.RT_productDetail(id)
  },
  favProduct(){
    const isfav = !this.data.isfav
    this.setData({
      isfav
    })
  },
  addToCart(){
    const id = this.data.id
    const amount = this.data.productDeta.price ? this.data.productDeta.price : '0.00'
    WXAPI.addCart(id, amount).then(function (data) {
      if (data.code == 200) {
        WXAPI.showToast('已成功添加到购车')
      } else {
        WXAPI.showToast(data.msg)
      }
    })
  },
  closeToCart(){
    wx.switchTab({ url: '/pages/cart/cart' })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    this.data.id = options.id
    this.initData(options.id)
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight - 49
        });
      }
    })
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