// pages/shop/shop.js
const WXAPI = require('../../utils/service.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subList: [],
    activeSub: 0,
    baseImage: '../../image/cat.png',
    productList: [],
    clientHeight:''
  },
  chooseSub(e) {
    const that = this
    const index = e.currentTarget.dataset.current
    this.setData({
      activeSub: index
    })
    this.RT_productList(that.data.subList[index].id)
  },
  productDeta(e) {
    const id = e.currentTarget.dataset.current
    wx.navigateTo({
      url: '/pages/shop/detail?id=' + id,
    })
  },
  addToCart(e) {
    const id = e.currentTarget.dataset.current
    const amount = e.currentTarget.dataset.price
    WXAPI.addCart(id, amount).then(function(data) {
      if (data.code == 200) {
        WXAPI.showToast('已成功添加到购车')
      } else {
        WXAPI.showToast(data.msg)
      }
    })
  },
  RT_categoryList() {
    const that = this
    WXAPI.categoryList({
      pageIndex: 1,
      pageSize: 20
    }).then(function(data) {
      const subList = data.data
      that.setData({
        subList
      })
      that.RT_productList(subList[0].id)
    })
  },
  RT_productList(categoryId) {
    const that = this
    WXAPI.productList({
      categoryId: categoryId,
      pageIndex: 1,
      pageSize: 20
    }).then(function(data) {
      const productList = data.data
      that.setData({
        productList
      })
    })
  },
  initData() {
    this.RT_categoryList()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that = this
    this.initData()
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight - 60
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})