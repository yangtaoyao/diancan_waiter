import { getUserInfo } from './auth'
let websocket = null
let username = getUserInfo.cus_userid

// 判断当前浏览器是否支持WebSocket
if ('WebSocket' in window) {
  this.websocket = new WebSocket('ws://127.0.0.1:8888/diancan/websocket/' + username)
} else {
  alert('当前浏览器 Not support websocket')
}

websocket.onerror = function () {
  console.log('WebSocket连接发生错误')
  this.$vux.toast.show({
    text: 'WebSocket连接发生错误',
    position: 'middle',
    type: 'cancel'
  })
}
// 连接成功建立的回调方法
websocket.onopen = function () {
  console.log('WebSocket连接成功')
  this.$vux.toast.show({
    text: 'WebSocket连接成功',
    position: 'middle',
    type: 'success'
  })
}
// 接收到消息的回调方法
websocket.onmessage = function (event) {
  console.log(event.data)
}
// 连接关闭的回调方法
websocket.onclose = function () {
  console.log('WebSocket连接关闭')
}
      // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
window.onbeforeunload = function () {
  closeWebSocket()
}
function closeWebSocket () {
  websocket.close()
}
 // 发送
