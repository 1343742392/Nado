var app = getApp();
var tools = require('../../utils/util.js')

Page
({
  data:
  {
    name:'name',
    playState: 'play',
    sliderPosition:0,
    changing:false,
    collectIco:'likeBefore',
    lyric:'123\n123\n123\n123\n123\n123\n123\n123\n123\n123\n123\n123\n123\n123\n123\n123\n123\n123\n123\n123\n123\n123',
    currentLength:'00:00',
    singLength:'00:00',
  },

  onLoad: function (options) 
  {
    var obj = this;
    wx.request({
      url: app.globalData.requestUrl + '/getMusicInfo.php',
      method: 'GET',
      data: { id: app.globalData.playingInfo['id']},
      dataType: 'json',
      responseType: 'text',
      success: function(res) 
      {
        obj.setData({ lyric:res.data['lyric']})
      },

    })
    wx.request({
      url: app.globalData.requestUrl + '/getCollects.php',
      method: 'GET',
      data: { id: app.globalData.id},
      dataType: 'json',
      responseType: 'text',
      success: function (res) 
      {
        res.data.forEach(function (e) 
        {
          e.forEach(function(e)
          {            
            if (e == app.globalData.playingInfo['id'])
            {
              obj.setData({ collectIco:'like'})
            }
          })
        })

        }

    })

    var singLengthInt = parseInt(app.globalData.audioManager.duration)
    var currentLengthInt = parseInt(app.globalData.audioManager.currentTime)
    this.setData({ singLength: tools.secondToMinute(singLengthInt)})
    this.setData({ currentLength: tools.secondToMinute(currentLengthInt)})
    wx.setNavigationBarTitle({ title: app.globalData.playingInfo['name'] })
    app.globalData.audioManager.onTimeUpdate(this.autoMoveBar)
  },

  onShow: function () {
    if (app.globalData.audioManager != null && app.globalData.audioManager.paused == false) {
      wx.setNavigationBarTitle({ title: app.globalData.playingInfo['name'] })
      this.setData({ playState: 'stop' });
    }
  },

  autoMoveBar:function()
  {
    if (this.data.changing)
    {
      return
    }
    var position = app.globalData.audioManager.currentTime / app.globalData.audioManager.duration
    this.setData({ sliderPosition:position * 100})
    var currentLengthInt = parseInt(app.globalData.audioManager.currentTime)
    this.setData({ currentLength: tools.secondToMinute(currentLengthInt) })
  },

  barPosChange:function(e)
  {
    this.data.changing = false;
    app.globalData.audioManager.seek(e.detail.value / 100 * app.globalData.audioManager.duration)
  },

  barPosChanging:function()
  {
    this.data.changing = true;
  },
 
  collect:function()
  {
    var obj = this
    if (this.data.collectIco != 'like')
    {
      wx.request({
        url: app.globalData.requestUrl + '/collection.php',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'post',
        data: { user: app.globalData.id, musicId: app.globalData.playingInfo['id'] },
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          obj.setData({ collectIco: 'like' })
        },
      })
    }
    else
    {
      wx.request({
        url: app.globalData.requestUrl + '/discard.php',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'post',
        data: { user: app.globalData.id, musicId: app.globalData.playingInfo['id'] },
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          obj.setData({ collectIco: 'likeBefore' })
        },
      })
    }
   
  },
  play: function () {
    if (this.data.playState == 'play') {
      if (app.globalData.singList.length > 0) {
        this.setData({ playState: 'stop' });
        app.play();
      }
    }
    else {
      this.setData({ playState: 'play' })
      app.pause()
    }
  },
})