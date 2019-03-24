const app = getApp()
// pages/login/login.js
Page({
  data: {
    phone: '',
    password: ''
  },

  // 获取输入账号
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  // 获取输入密码
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  // 登录
  login: function () {
    if (this.data.phone == '' || this.data.password == '') {
      wx.showToast({
        title: '用户名和密码不能为空',
        icon: 'loading',
        duration: 2000
      })
    } else {
      if (app.globalData.webSocket.readyState === 1) {
        //this.showLoad()
        app.globalData.webSocket.send({
          data: JSON.stringify(this.data)
        })
      } else {
        //socketMsgQueue.push(msg)
      }
      // 这里修改成跳转的页面
      wx.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 2000
      })
      wx.navigateTo({
        url: '../index/index',
      })
    }
  }
})