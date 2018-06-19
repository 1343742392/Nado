//index.js
//获取应用实例
var app = getApp();
Page
({
  search:function(e)
  {
    console.log('search:' + e.detail.value);
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