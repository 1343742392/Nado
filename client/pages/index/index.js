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
         name: '123'
       },
       header: {
         'content-type': 'application/json' // 默认值
       },
       success: function (res) {
         console.log(res.data.name + "\n" + res.data.uploadTime);
         app.globalData.searchReslut = res.data;
         wx.navigateTo
         ({
             url: "../search/search?=search",
         })
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