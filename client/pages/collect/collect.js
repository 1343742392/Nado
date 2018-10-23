// pages/collect.js

var app = getApp();

var tools = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [{'name':'sb'},{'public':'sb2'}],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var obj = this;
    wx.request({
      url: app.globalData.requestUrl + '/getCollects.php',
      method: 'GET',
      data: { id: app.globalData.id },
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        obj.setData({array:res.data})
        
      }

    })
  },

  palyMusic: function (e) {
    
    var array = this.data.array;
    var index = e.currentTarget.dataset.name
    var name = array[index][1];
    var subfix = array[index][2];
    var id = array[index][0]
    app.play({ 'name': name, 'subfix': subfix, 'id': id });

    var sing= {};
    var singlist = [];
    for(var f = 0; f < array.length; f ++ )
    {
      sing['id'] = array[f][0];
      sing['name'] = array[f][1];
      sing['subfix'] = array[f][2];
      singlist.push(sing);
      sing = {};
    }
    //console.log(singlist)
    app.globalData.singList = singlist;
  },


})