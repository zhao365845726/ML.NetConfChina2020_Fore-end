const API_BASE_URL = 'http://netconf.milisx.com/api/v1/'

const request = (url, data) => {
  let _url = API_BASE_URL + url
  return new Promise((resolve, reject) => {
    wx.request({
      url: _url,
      method: 'get',
      data: data,
      success(request) {
        resolve(request.data)
      },
      fail(error) {
        reject(error)
      }
    })
  })
}

const showToast = (title, icon = 'none', duration = 2000, callback = () => { }) => {// 提醒框
  wx.showToast({ title, icon, duration })
  callback()
}


Promise.prototype.finally = function (callback) {
  var Promise = this.constructor;
  return this.then(
    function (value) {
      Promise.resolve(callback()).then(
        function () {
          return value;
        }
      );
    },
    function (reason) {
      Promise.resolve(callback()).then(
        function () {
          throw reason;
        }
      );
    }
  );
}

module.exports = {
  showToast,
  request,
  // 宾客登录
  guestlogin: (data) => {
    return request('user/guestlogin', data)
  },
  // 分类列表
  categoryList: (data) => {
    return request('category/getlist', data)
  },
  // 商品列表
  productList: (data) => {
    return request('products/getlist', data)
  },
  // 商品详情
  productDetail: (data) => {
    return request('products/getdetail', data)
  },
 // 我的订单
 orderList: (data) => {
   return request('orders/list', data)
  },
  // 添加到购物车
  addCart: (productId, amount) => {
    const data = {
      userId: wx.getStorageSync('userInfo').id,
      productId: productId,
      amount: amount,
      number:1
    }
    return request('orders/addcart', data)
  },
  // 确认订单
  confirmOrder: (orderId) => {
    const data = {
      userId: wx.getStorageSync('userInfo').id,
      orderId: orderId
    }
    return request('orders/confirmorder', data)
  },
  // 取消订单
  cancelOrder: (orderId) => {
    const data = {
      userId: wx.getStorageSync('userInfo').id,
      orderId: orderId
    }
    return request('orders/cancelorder', data)
  }, 
  // 订单详情
  orderDetail: (orderId) => {
    const data = {
      id: orderId
    }
    return request('orders/detail', data)
  },
  // 支付
  payment: (orderId) => {
    const data = {
      userId: wx.getStorageSync('userInfo').id,
      orderId: orderId
    }
    return request('orders/payment', data)
  },
  // 获取交易记录
  transList: () => {
    const data = {
      userId: wx.getStorageSync('userInfo').id,
      pageIndex: 1,
      pageSize:20
    }
    return request('transactions/getlist', data)
  },
  // 获取openid
  getOpenid: (data) => {
    return request('user/getopenid', data)
  },
  // 微信登录
  wxLogin: (data) => {
    return request('user/wxlogin', data)
  },
}
