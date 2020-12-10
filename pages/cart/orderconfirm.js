// pages/cart/orderconfirm.js
const WXAPI = require('../../utils/service.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseImage: '../../image/cat.png',
    total_money: '0.00',
    deductible_amount: '0.00'
  },
  calculateAmount() {
    const that = this
    const vm = that.data
    let _amount = 0; // 总价
    let _length = 0; // 数量
    for (let i = 0; i < vm.cartList.length; i++) {
      if (vm.cartList[i].check) {
        _amount += Number(vm.cartList[i].price) * Number(vm.cartList[i].number)
        _length += 1 * Number(vm.cartList[i].number)
      }
    }
    // 合计
    vm.total_money = _amount.toFixed(2)
    // 总计数量
    vm.total_count = _length
    const total_money = vm.total_money
    const total_count = vm.total_count
    that.setData({
      total_money,
      total_count
    })
  },
  confirm(e) {
    const that = this
    const vm = that.data
    wx.showLoading()
    vm.recordId = []
    vm.pageID = []
    for (let i = 0; i < vm.cartList.length; i++) {
      if (vm.cartList[i].check) {
        vm.recordId.push(vm.cartList[i].id)
        vm.pageID.push(vm.cartList[i].id)
      }
    }
    setTimeout(function() {
      that.RT_confirmOrder(vm.recordId)
    }, 200)
  },
  RT_confirmOrder(idArr) {
    const that = this
    if (idArr.length === 0) {
      wx.hideLoading()
      wx.navigateTo({
        url: '/pages/cart/pay?amount=' + that.data.total_money + '&id=' + that.data.pageID.join(';'),
      })
      return;
    }
    WXAPI.confirmOrder(idArr[0]).then(function(data) {
      if (data.code == 200) {
        idArr.splice(0, 1)
        return that.RT_confirmOrder(idArr)
      } else {
        WXAPI.showToast(ret.data)
        wx.hideLoading()
      }
    })
  },
  onLoadPreview(){

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      cartList: JSON.parse(options.cart)
    })
    this.calculateAmount()
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