//app.js

App
({

    globalData: {
      id:null,
      userInfo: null,
      requestUrl: 'http://127.0.0.1/nado',
      searchReslut: null,
      audioManager: wx.getBackgroundAudioManager(),
      state: {},
      singList: new Array(),
      playingInfo:null,
    },
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

        var userCode = res.code
        console.log(userCode)
        var obj = this
        wx.request({
          url: this.globalData.requestUrl + '/login.php',
          data: { code: userCode},
          header: { 'content-type': 'application/x-www-form-urlencoded'},
          
          method: 'post',

          success: function(res) 
          {
            obj.globalData.id = (res.data+1) * 2;
          },
          fail: function(res) {},
        })
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


    

  play: function (playingInfo)
  {
    if (playingInfo != undefined)
    {
      //有参数播放
      var src = this.globalData.requestUrl + '/upload/' + playingInfo['id'] + '.' + playingInfo['subfix']
      this.globalData.audioManager.src = src;
      this.globalData.playingInfo = playingInfo;
      this.globalData.audioManager.title = playingInfo['name'];
      this.globalData.audioManager.play();
    }
    else
    {
      if (this.globalData.audioManager.src == '')
      {
        var info = this.globalData.playingInfo;
        var src = this.globalData.requestUrl + '/upload/' + info['id'] + '.' + info['subfix']
        this.globalData.audioManager.src = src;
        this.globalData.audioManager.title = info['name'];
      }
      this.globalData.audioManager.play();
    }
  },

  pause:function()
  {

    this.globalData.audioManager.pause();
  },

  musicEnd:function()
  {
    var singList = this.globalData.singList;
    //console.log(singList)
    //console.log(app.globalData.playingInfo['id'])
    for (var f = 0; f < singList.length; f++) {

      if (singList[f]['id'] == this.globalData.playingInfo['id']) {

        if (f + 1 < singList.length) {
          //console.log('play');
          this.play(singList[f + 1]);
          break
        }
        else {
          //没有下一首了
        }
      }
    }
  }
})