//app.js

App
({

    globalData: {
      id:null,
      userInfo: null,
      requestUrl: 'https://www.xwtool.top/nado/',
      searchReslut: null,
      audioManager: wx.getBackgroundAudioManager(),
      state: {},
      singList: new Array(),
      playingInfo:null,
      musicEndBacks: new Array(),
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
        //console.log(userCode)
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
    var manager = this.globalData.audioManager;
    if (playingInfo != undefined)
    {
      //有参数播放
      var src = this.globalData.requestUrl + '/upload/' + playingInfo['id'] + '.' + playingInfo['subfix']
      manager.src = src;
      this.globalData.playingInfo = playingInfo;
      manager.title = playingInfo['name'];
      manager.play();
      manager.onEnded(this.musicEnd)
      wx.setStorage({
        key: 'playingInfo',
        data: playingInfo,
      })
    }
    else
    {
      if (manager.src == '' || manager.src == undefined)
      {
        var info = this.globalData.playingInfo;
        var src = this.globalData.requestUrl + '/upload/' + info['id'] + '.' + info['subfix']
        manager.src = src;
        manager.title = info['name'];
      }
      manager.play();
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
    //console.log(this.globalData.playingInfo['id'])
    wx.request({
      url: this.globalData.requestUrl + '/playEnd.php',
      data: { id: this.globalData.playingInfo['id']},
      header: { 'content-type': 'application/x-www-form-urlencoded' },

      method: 'post',

      success: function (res) {
        //console.log(res)
      }
    })
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

    var backs = this.globalData.musicEndBacks;
    if (backs != null)
    {
      for (var f = 0; f < backs.length; f ++ )
      {
        backs[f]();
      }
    }
  },

  addMusicEndBack: function (func) {
    this.globalData.musicEndBacks.push(func);
  }
})