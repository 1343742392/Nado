//app.js

App
({
  onLaunch: function () 
  {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login
    ({
      success: res => {
        console.log(res);
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo
            ({
              success: res => {
                this.globalData.userInfo = res.userInfo
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              }
            })
        }
      }
    })
  },

  globalData: {
    userInfo: null,
    requestUrl:'https://www.xwtool.top',
    searchReslut:null,
    audioManager: wx.getBackgroundAudioManager(),
    state:{},
  },


    

  play:function(name)
  {
    this.globalData.audioManager.src = this.globalData.requestUrl + '/upload/' + name;
    if (this.globalData.audioManager.paused != false)
    {
      this.globalData.audioManager.title = name;
      this.globalData.audioManager.play();
    }
    

  }
})