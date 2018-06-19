//index.js
//获取应用实例

Page
({
  search:function(e)
  {
    console.log('search:' + e.detail.value);
  },

  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('audio');
  },

  audioPlay:function()
  {
    this.audioCtx.play();
  }
  
})