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
// 解析html
const HtmlUtil = {
  htmlEncode: function (html) {
    var temp = document.createElement("div")
      (temp.textContent != undefined) ? (temp.textContent = html) : (temp.innerText = html)
    var output = temp.innerHTML
    temp = null
    return output
  },
  htmlDecode: function (text) {
    var temp = document.createElement("div");
    temp.innerHTML = text;
    var output = temp.innerText || temp.textContent;
    temp = null;
    return output;
  }
}

module.exports = {
  formatTime: formatTime,
  HtmlUtil
}
