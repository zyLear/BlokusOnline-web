var ws;

function sendMsg() {
    ws.send(document.getElementById('inputText').value);
}
var wxId;

function connect() {

    wxId = document.getElementById('connectText').value
    // 打开一个 web socket
    ws = new WebSocket("ws://localhost:19090/ws?token="); /*+ wxId*/
    // function connect() {




    ws.onopen = function() {
        // Web Socket 已连接上，使用 send() 方法发送数据
        // ws.send("发送数据");
        alert("连接成功");
        console.log('connected');
        setInterval("ping()", 30000);
    };



    ws.onmessage = function(evt) {
        var received_msg = evt.data;
        // alert("数据已接收...");
        console.log("receive from server:" + received_msg);
    };

    ws.onclose = function() {
        // 关闭 websocket
        alert("连接已关闭...");
    };

}


function ping() {
    window.webSocketClient.ws.send('{"content":"","msgType":1000}')
}