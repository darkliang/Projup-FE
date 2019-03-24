//app.js
let socketMsgQueue = []
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  initSocket() {
    let that = this
    that.globalData.webSocket = wx.connectSocket({
      url: 'ws://10.21.63.71:8080/dbpro_war_exploded/websocket'
    })
    //that.showLoad()
    that.globalData.webSocket.onOpen(function(res) {
      console.log('WebSocket连接已打开！readyState=' + that.globalData.webSocket.readyState)
      //that.hideLoad()
      while (socketMsgQueue.length > 0) {
        var msg = socketMsgQueue.shift();
        that.sendSocketMessage(msg);
      }
    })
    that.globalData.webSocket.onMessage(function(res) {
      that.hideLoad()
      that.globalData.callback(res)
    })
    that.globalData.webSocket.onError(function(res) {
      console.log('readyState=' + that.globalData.webSocket.readyState)
    })
    that.globalData.webSocket.onClose(function(res) {
      console.log('WebSocket连接已关闭！readyState=' + that.globalData.webSocket.readyState)
      //that.initSocket()
    })
  },
  sendSocketMessage: function (msg) {
    if (this.globalData.webSocket.readyState === 1) {
      //this.showLoad()
      this.globalData.webSocket.send({
        data: JSON.stringify(msg)
      })
    } else {
      socketMsgQueue.push(msg)
    }
  },
  onShow: function (options) {
    if (typeof (exp) == "undefined")
        this.initSocket()
  },
  globalData: {
    userInfo: null,
    webSocket: null
  }
})