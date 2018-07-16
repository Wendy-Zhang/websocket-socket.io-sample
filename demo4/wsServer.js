var ws = require("nodejs-websocket")
var PORT = 3000;
var clientCount = 0; 

// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
	console.log("New connection")
	clientCount++;
    conn.nickname = 'user' + clientCount;
    var msg = {};
    msg.type = "enter";
    msg.data = conn.nickname + ' come in'
    broadcast(JSON.stringify(msg))
	conn.on("text", function (str) {
		console.log("Received "+str)
		var msg = {};
        msg.type = "message";
        msg.data = conn.nickname + "says: " + str
		broadcast(JSON.stringify(msg));      	
	})
	conn.on("close", function (code, reason) {
		console.log("Connection closed")
		var msg = {};
        msg.type = "left";
        msg.data = conn.nickname + ' left'
		broadcast(JSON.stringify(msg));
	})
	conn.on("error",function(error){
		console.log("handle error");
		console.log(error);
	})
}).listen(PORT);

console.log("websocket server listening on port "+PORT);

function broadcast(str){
	server.connections.forEach(function(connection){   //server.connections保存所有连接
		connection.sendText(str);
	})
}