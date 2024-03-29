//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'nmsl',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  Buttonrequest: function () {
    var that = this;
    wx.request({
      url: 'http://10.21.6.235:8080/CS307_Project_war_exploded/ServletTest',//先不写
      data: {
        message: 'ljh is the The most handsome man in the ESTA',
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({ motto: res.data });//回调函数中的携带服务器响应数据
      },
      fail: function (res) {
        wx.showToast({
          title: 'http失败',
          icon: 'success',
          duration: 2000
        })
       
      }
    })
  },

  clickMe() {
    var that = this;
    wx.scanCode({
      success(res) {
        //console.log(res)
        that.setData({ motto: res.result })
      },
      fail(res) {
        wx.showToast({
          title: '扫码失败',
          icon: 'success',
          duration: 2000
        })
      }
    })
   
    
  }
})