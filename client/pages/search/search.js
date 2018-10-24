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
        if(res.data == 'err null name')
        {
          return;
        }
        var obj = res.data;
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
    var reslut = app.globalData.searchReslut;
    var index = e.currentTarget.dataset.name ;
    var name = reslut[index]['name'];
    var subfix = reslut[index]['subfix'];
    var id = reslut[index]['id']
    app.play({'name':name, 'subfix':subfix, 'id':id});

  },


})