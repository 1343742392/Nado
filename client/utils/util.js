const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

var strToArray = function(str) {

  var strArray = new Array();
  var key;
  for (var f = 0; f < str.length; f++) {
    if (str[f] == ',') {
      console.log('has');
      strArray.push(str.substring(key, f));
      key = f + 1;
    }
  }
  return strArray;
}

var timestampToTime = function(timestamp) {
  var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate() + ' ';
  return Y + M + D;
}

module.exports = {
  strToArray: strToArray,
  timestampToTime: timestampToTime,
  formatTime: formatTime
}
