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
    openLyric:true,
    openInfo:false,
    info:null,
    lyric:'123\n123\n123\n123\n123\n123\n123\n123\n123\n123\n123\n123\n123\n123\n123\n123\n123\n123\n123\n123\n123\n123',
    currentLength:'00:00',
    singLength:'00:00',
  },

  onLoad: function (options) 
  {

    var obj = this;
    this.flush()
    app.globalData.audioManager.onTimeUpdate(this.autoMoveBar)
    app.addMusicEndBack(function()
    {
      obj.flush()
    })
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

  about:function()
  {
    this.setData({openLyric:!this.data.openLyric})
    this.setData({ openInfo: !this.data.openInfo })
    var obj = this
  
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


    before: function () {
      var obj = this
      var singList = app.globalData.singList;
      //console.log(singList)
      //console.log(app.globalData.playingInfo['id'])
      for (var f = 0; f < singList.length; f++) {

        if (singList[f]['id'] == app.globalData.playingInfo['id']) {

          if (f - 1 >= 0) {
            //console.log('play');
            app.play(singList[f - 1]);
            this.setData({ singName: singList[f - 1]['name'] })
            this.setData({ playState: 'stop' })
            break
          }
          else {
            //没有下一首了
          }
        }
      }
      this.flush();
    },

    next: function () {

 
      var singList = app.globalData.singList;
      //console.log(singList)
      //console.log(app.globalData.playingInfo['id'])
      for (var f = 0; f < singList.length; f++) {

        if (singList[f]['id'] == app.globalData.playingInfo['id']) {
          if (f + 1 < singList.length) {
            app.play(singList[f + 1]);
            this.setData({ singName: singList[f + 1]['name'] })
            this.setData({ playState: 'stop' })
            break
          }
          else {
            //没有下一首了
          }
        }
      }
      this.flush()
    
    },

    musicEndBack:function()
    {

    },

    flush:function()
    {
      var obj = this
      wx.request({
        url: app.globalData.requestUrl + '/getCollects.php',
        method: 'GET',
        data: { id: app.globalData.id },
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          var have = false;
          res.data.forEach(function (e) {
            e.forEach(function (value) {
              if (value == app.globalData.playingInfo['id']) {
                obj.setData({ collectIco: 'like' })
                have = true;
              }
            })
          })
          if (!have) {
            //console.log('unlike')
            obj.setData({ collectIco: 'likeBefore' })
          }
        }

      })
      wx.setNavigationBarTitle({ title: app.globalData.playingInfo['name'] })
      var singLengthInt = parseInt(app.globalData.audioManager.duration)
      var currentLengthInt = parseInt(app.globalData.audioManager.currentTime)
      this.setData({ singLength: tools.secondToMinute(singLengthInt) })
      this.setData({ currentLength: tools.secondToMinute(currentLengthInt) })

      wx.request({
        url: app.globalData.requestUrl + '/getMusicInfo.php',
        method: 'GET',
        data: { id: app.globalData.playingInfo['id'] },
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          obj.setData({ info: res.data })
          
        }
      })
    }
})