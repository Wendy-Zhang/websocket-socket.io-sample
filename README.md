# websocket-socket.io-sample
=====
为了实践一下websocket的全双工通信的性质，做了一个小小的聊天室，`demo3 `和`demo4` 都是用websocket完成的。`demo5 `和 `demo6 `是关于 socket.io部分，demo6采用socket.io实现了聊天室。<br>
经比较，socket.io写的样例比websocket写的要简洁。主要在于其两大优点：<br>
* 发送的数据如果是对象格式，在此不需要格式化数据，能够直接接受发送的js对象。
```
//使用socket.io时：
socket.on("message",function(data){
            showMessage(data,"message")
        })
//使用Websocket时：
        websocket.onmessage = function(e){
            console.log(e.data);
            var mes = JSON.parse(e.data);
            showMessage(mes.data,mes.type);     
    	}
 ```
* 可自定义消息，接收数据不需要设置type字段。
```
  socket.on("message",function(str){
	  io.emit("message",socket.nickname + ' says: '+ str)
  })
  ```
  目前对websocket-socket.io了解尚浅，后续继续学习~~~~~

