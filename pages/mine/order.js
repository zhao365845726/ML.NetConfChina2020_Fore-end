// pages/mine/order.js
const WXAPI = require('../../utils/service.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderNav: ['待支付', '已支付', '待评价', '已完成', '已取消'],
    activeNav: 0,
    autoplay: false,
    duration: 300,
    orderData: [],
    pageIndex: [],
    baseImage: '../../image/cat.png'
  },
  bindChange(e) {
    const that = this
    const vm = this.data
    that.setData({
      activeNav: e.detail.current
    })
    this.RT_orderList(vm.activeNav + 1, vm.activeNav)
  },
  chooseNav(e) {
    const that = this;
    const vm = this.data
    that.setData({
      activeNav: e.target.dataset.current
    })
    this.RT_orderList(vm.activeNav + 1, vm.activeNav)
  },
  RT_orderList(index,index_) {
    const that = this
    const vm = that.data
    WXAPI.orderList({
      userId: wx.getStorageSync('userInfo').id,
      status: index,
      pageIndex: vm.pageIndex[index_],
      pageSize: 20
    }).then(function(data) {
      vm.orderData[index_].orderList = data.data
      const orderData = vm.orderData
      that.setData({
        orderData
      })
      console.log(orderData)
    })
  },
  orderDetail(e){
    const vm = this.data
    const index = e.currentTarget.dataset.current
    const extra = vm.orderData[vm.activeNav].orderList[index]
    wx.navigateTo({
      url: '/pages/mine/orderdetail?extra=' + JSON.stringify(extra),
    })
  },
  cancelOrder(e){
    const id = e.currentTarget.dataset.id
    const that = this
    const vm = that.data
    wx.showModal({
      title: '提示',
      content: '是否取消订单!',
      success: (res) => {
        if (res.confirm) {
          WXAPI.cancelOrder(id).then(function (data) {
            if (data.code === 200) {
              WXAPI.showToast('取消成功!')
              that.RT_orderList(vm.activeNav + 1, vm.activeNav)
            } else {
              WXAPI.showToast(data.msg)
            }
          })
        }
      }
    })
  },
  goPay(e){
    const id = e.currentTarget.dataset.id
    const amount = e.currentTarget.dataset.amount
    wx.navigateTo({
      url: '/pages/cart/pay?amount=' + amount + '&id=' + id,
    })
  },
  initData() {
    const vm = this.data
    vm.orderNav.forEach((item) => {
      vm.orderData.push({
        orderList: []
      });
      vm.pageIndex.push(1)
    });
    const pageIndex = vm.pageIndex
    const orderData = vm.orderData
    this.setData({
      pageIndex,
      orderData
    })
    this.RT_orderList(1,0)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight - 48
        });
      }
    })
    this.initData()
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