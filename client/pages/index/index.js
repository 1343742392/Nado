//index.js
//获取应用实例
var app = getApp();
Page
({
  search:function(e)
  {
     wx.request({
       url: app.globalData.requestUrl,
       data: {
         x: '123'
       },
       success: function (res) {
         console.log(res.data)
       }
     })
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

  },

  toListPage:function()
  {

  },

  audioPlay:function()
  {
    app.play();
  }
  
})