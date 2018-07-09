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
    /*var html = 

    for (var f = 0; f < Object.keys(app.globalData.searchReslut).length / 2, f ++)
    {
      html= html + 
      "\
    <view class='music" + f + "' id='' bindtap='palyMusic'>\
      < view style= 'flex-direction:row;' >\
        <text class='musicName' >" + app.globalData.searchReslut.name + " </text>\
        < text class='uploadTime' >"++" </text>\
      < /view>\
    </view>";
        
    }
    */
    //this.setData({ musicName : app.globalData.searchReslut.name });
    //this.setData({ uploadTime: timestampToTime(app.globalData.searchReslut.uploadTime)})
  },

  palyMusic:function()
  {
    app.play('JayeLu - 〔纳豆〕空港.mp3');
  }
})