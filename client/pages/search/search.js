// pages/search/search.js
var app = getApp();

function timestampToTime(timestamp) {
  var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate() + ' ';
  return Y + M + D;
}

Page({
  data: {
  
  },
  
  onLoad: function (options) {
    this.setData({ musicName : app.globalData.searchReslut.name });
    this.setData({ uploadTime: timestampToTime(app.globalData.searchReslut.uploadTime)})
  },

  palyMusic:function()
  {
    app.play('JayeLu - 〔纳豆〕空港.mp3');
  }
})