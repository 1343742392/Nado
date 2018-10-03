// pages/search/search.js
var app = getApp();

var tools = require('../../utils/util.js')

Page({
  data: {
    m:'f00',
    line:true,
  },
  
  onReady: function (options) {
    console.log(app.globalData.searchReslut);
    this.setData({ array: app.globalData.searchReslut});
  },

  palyMusic:function(e)
  {
    app.play(app.globalData.searchReslut[e.currentTarget.id].musicName);
  }
})