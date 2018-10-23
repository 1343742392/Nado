
var app = getApp();

var tools = require('../../utils/util.js')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [{ name: '名字', pub: '发布者' }, { name: '名字2', pub: '发布者2' }],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var obj = this
    wx.request({
      url: app.globalData.requestUrl + '/rank.php',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res);
        obj.setData({array:res.data})
      }
    })
  },

  playMusic:function(e)
  {
    var array = this.data.array;
    var index = e.currentTarget.dataset.name;
    var name = array[index]['name'];
    var subfix = array[index]['subfix'];
    var id = array[index]['id']
    app.play({ 'name': name, 'subfix': subfix, 'id': id });

    var sing = {};
    var singlist = [];
    for (var f = 0; f < array.length; f++) {
      sing['id'] = array[f]['id'];
      sing['name'] = array[f]['name'];
      sing['subfix'] = array[f]['subfix'];
      singlist.push(sing);
      sing = {};
    }
    //console.log(singlist)
    app.globalData.singList = singlist;
  },
})