//index.js
//获取应用实例
var app = getApp();

function strToArray(str)
{
  var strArray = new Array();
  var key;
  for (var f = 0; f < str.length; f++) {
    if (str[f] == ',') {
      console.log('has');
      strArray.push(str.substring(key, f));
      key = f;
    }
  }
  return strArray;
}

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
         

         var strArray = strToArray(res.data);
         app.globalData.searchReslut = strArray;
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