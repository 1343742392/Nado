//index.js
//获取应用实例
var app = getApp();

var tools = require('../../utils/util.js')


Page
({
  data: {
    face:'',
    singName:'',
    playState:'play',
  },
 search:function(e)
  {
     wx.request({
       url: app.globalData.requestUrl + '/search.php',
       data: {
         name: e.detail.value
       },
       header: {
         'content-type': 'application/json' // 默认值
       },
       method:'get',
       success: function (res) 
       {
         console.log(res);
         if ((res.data + '').match('.*err.*') || res.data == null) 
           return;
         var obj = res.data;
         app.globalData.searchReslut = obj;


         wx.navigateTo
         ({
             url: "../search/search?=search",
         })
         
       }
     })
  },
  onLoad:function()
  {


    if (app.globalData.userInfo != null)
    {
      this.setData({ face: app.globalData.userInfo.avatarUrl})
    } 
    else if (this.data.canIUse)
    {
      app.userInfoReadyCallback = res => {
        console.log("run");
        this.setData({
          face:res.userInfo.avatarUrl
        })
      }
    }
    else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          console.log(res.userInfo.avatarUrl);
          this.setData({
            face: res.userInfo.avatarUrl
          })
        }
      })
    }
  },

  getUserInfo: function (res) {
    console.log(res);
    app.globalData.userInfo = res.detail.userInfo
    this.setData({ face: res.detail.userInfo.avatarUrl })
  },

  toRankPage:function()
  {
    wx.navigateTo
    ({
      url: "../rank/rank?=rank",
   })
  },

  toUploadPage:function()
  {
    wx.navigateTo
      ({
        url: "../upload/upload?=upload",
      })
  },

  toCollectPage:function()
  {
    if (app.globalData.id != null)
    {
      wx.navigateTo
        ({
          url: "../collect/collect?=collect",
        })
    }
  },
  toPlay:function()
  {
    if(app.globalData.singName != '')
    {
      wx.navigateTo
        ({
          url: "../play/play?=play",
        })
    }

  },

  audioPlay:function()
  {
    app.play();
  },
  play:function()
  {
    if(this.data.playState == 'play')
    {
      if(app.globalData.singList.length > 0)
      {
        this.setData({ playState: 'stop'});
        app.play();
      }
    }
    else
    {
      this.setData({ playState: 'play' })
      app.pause()
    }
  },

  before:function()
  {
    var singList = app.globalData.singList;
    //console.log(singList)
    //console.log(app.globalData.playingInfo['id'])
    for (var f = 0; f < singList.length; f++) {

      if (singList[f]['id'] == app.globalData.playingInfo['id']) {

        if (f - 1 >= 0) {
          //console.log('play');
          app.play(singList[f - 1]);
          this.setData({ singName: singList[f - 1]['name'] })
          break
        }
        else {
          //没有下一首了
        }
      }
    }
  },

  next:function()
  {
    var singList = app.globalData.singList;
    //console.log(singList)
    //console.log(app.globalData.playingInfo['id'])
    for(var f = 0; f < singList.length; f ++)
    {
      
      if(singList[f]['id'] == app.globalData.playingInfo['id'])
      {
        if( f + 1 < singList.length)
        {
          app.play(singList[f + 1]);
          this.setData({ singName: singList[f + 1]['name']})
          break
        }
        else
        {
          //没有下一首了
        }
      }
    }
  },
  onShow:function()
  {
    if (app.globalData.audioManager.src != null)
    {
      this.setData({ singName: app.globalData.playingInfo['name'] })
      if (app.globalData.audioManager.paused == true)
      {
        this.setData({ playState: 'play' });
      }
      else if (app.globalData.audioManager.paused == false)
      {
        this.setData({ playState: 'stop' });
      }
    }

  }
})