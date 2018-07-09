// pages/search/search.js
var app = getApp();

var tools = require('../../utils/util.js')

Page({
  data: {
    m:'f00',
  },
  
  onReady: function (options) {
    console.log(app.globalData.searchReslut);
    this.setData({ array: app.globalData.searchReslut});
    /*var html = '' ;

    for (var f = 0; f < app.globalData.searchReslut.length / 2; f ++ )
    {
      html= html + 
      "\
    <view class='music' id='" + f +"' bindtap='palyMusic'>\
      < view style= 'flex-direction:row;' >\
        <text class='musicName' >" + app.globalData.searchReslut[f * 2] + " </text>\
        < text class='uploadTime' >"+ app.globalData.searchReslut[f * 2 + 1] +" </text>\
      < /view>\
    </view>";
    }
    this.setData({ musics:html});*/
    //this.setData({ musicName : app.globalData.searchReslut.name });
    //this.setData({ uploadTime: timestampToTime(app.globalData.searchReslut.uploadTime)})
  },

  palyMusic:function(e)
  {
    app.play(app.globalData.searchReslut[e.currentTarget.id].musicName);
  }
})