//index.js
//获取应用实例
var app = getApp();

var tools = require('../../utils/util.js')


Page
({
  data: {
    face:'',
  },
  search:function(musicName)
  {
     wx.request({
       url: app.globalData.requestUrl + '/search.php',
       data: {
         name: musicName,
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

  toListPage:function()
  {

  },

  audioPlay:function()
  {
    app.play();
  }
  
})