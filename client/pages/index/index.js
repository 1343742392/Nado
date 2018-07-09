//index.js
//获取应用实例
var app = getApp();

var tools = require('../../utils/util.js')


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
         

         var arr = tools.strToArray(res.data);
         var doubleArr = new Array();
         for (var f = 0; f < arr.length / 2; f++) {
           var value = 
           {
              id: f,
              musicName: arr[f * 2],
              uploadTime: tools.timestampToTime(arr[f * 2 + 1])
           }
           doubleArr.push(value);
         }
         app.globalData.searchReslut = doubleArr;
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