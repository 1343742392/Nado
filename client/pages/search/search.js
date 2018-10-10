// pages/search/search.js
var app = getApp();


var tools = require('../../utils/util.js')

Page({
  data: {
    array:null,
  },
  search: function (e) {
    var self = this;
    wx.request
    ({
      url: app.globalData.requestUrl + '/search.php',
      data: 
      {
        name: e.detail.value
      },
      header: 
      {
        'content-type': 'application/json' // 默认值
      },
      method: 'get',
      success: function (res) 
      {
        if ((res.data+'').match('.*err.*'))
        {
          return;
        }
        var obj = res.data;
        for (var f = 0; f < obj.length; f++) {
          obj[f]['time'] = tools.timestampToTime(obj[f]['time']);
        }
        app.globalData.searchReslut = obj;

        self.setData({ array: obj});
       
      }
    })
  },
  onReady: function (options) 
  {
    this.setData({ array: app.globalData.searchReslut});
  },

  palyMusic:function(e)
  {
    var name = app.globalData.searchReslut[e.currentTarget.offsetTop / 36]['name']
    app.play(name);
  }
})