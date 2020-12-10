// pages/cart/cart.js
const WXAPI = require('../../utils/service.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    allcheck: false,
    edit: false,
    baseImage: '../../image/cat.png',
    total_money: '0.00',
    total_count: 0,
    baseImage: '../../image/cat.png'
  },
  chooseCar(e) {
    const that = this
    const vm = that.data
    const index = e.currentTarget.dataset.current
    const cartList = vm.cartList
    cartList[index].check = !cartList[index].check
    that.setData({
      cartList
    })
    that.calculateAmount()
  },
  chooseEdit() {
    const edit = !this.data.edit
    this.setData({
      edit
    })
  },
  chooseAll() {
    const that = this
    const vm = that.data
    const cartList = vm.cartList
    for (var i = 0; i < cartList.length; i++) {
      if (vm.allcheck) {
        cartList[i].check = false
      } else {
        cartList[i].check = true
      }
    }
    vm.allcheck = !vm.allcheck
    const allcheck = vm.allcheck
    that.setData({
      cartList,
      allcheck
    })
    that.calculateAmount()
  },
  deleCart() {

  },
  confirm() {
    const that = this
    const vm = that.data
    if (vm.cartList.length === 0) {
      WXAPI.showToast('请先添加商品到购物车!')
      return false
    }
    if (vm.total_count == 0) {
      WXAPI.showToast('请先勾选要结算的商品!')
      return false
    }
    wx.navigateTo({
      url: '/pages/cart/orderconfirm?cart=' + JSON.stringify(vm.cartList),
    })
  },
  RT_cartList() {
    const that = this
    WXAPI.orderList({
      userId: wx.getStorageSync('userInfo').id,
      status: 99,
      pageIndex: 1,
      pageSize: 20
    }).then(function(data) {
      const cartList = data.data
      that.setData({
        cartList
      })
      that.calculateAmount()
    })
  },
  initData() {
    this.RT_cartList()
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
  controlNum(e){
    const that = this
    const vm = that.data
    const index = e.currentTarget.dataset.current
    const type = e.currentTarget.dataset.type
    const cartList = vm.cartList
    if(type == 1){
      if (cartList[index].number === 1) {
        return false
      }
      cartList[index].number--
    }else{
      cartList[index].number++
    }
    that.setData({
      cartList
    })
    that.calculateAmount()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
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
    this.initData()
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