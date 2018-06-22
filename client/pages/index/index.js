//index.js
//获取应用实例
var app = getApp();
Page
({
  search:function(e)
  {
     wx.request({
       url: app.globalData.requestUrl + '/search.php',
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
    wx.navigateTo
      ({
        url: "../upload/upload?=upload",
      })
  },

  toListPage:function()
  {

  },

  audioPlay:function()
  {
    app.play();
  }
  
})