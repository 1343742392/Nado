// pages/search/search.js
var app = getApp();


var tools = require('../../utils/util.js')

Page({
  data: {
    m:'f00',
  },
  
  onReady: function (options) {
    this.setData({ array: app.globalData.searchReslut});
  },

  palyMusic:function(e)
  {
    var name = app.globalData.searchReslut[e.currentTarget.offsetTop / 36]['name']
    app.play(name);
  }
})