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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  palyMusic: function (e) {
    var array = this.data.array;
    var index = e.currentTarget.offsetTop / 36;
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})