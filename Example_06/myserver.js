var express = require('express')
var app = express()

function sseDemo(req, res){
var messageId = 0;
const intervalId = setInterval(() => {
res.write('id: '+messageId+'\n');
res.write('data: Sensor 1: ' +
messageId+'\n\n');
messageId += 1;
}, 1000);
req.on('close', () => {
clearInterval(intervalId);
});
}

app.get('/', function (req, res) {
res.sendfile('./sse_index.html')
})
app.get('/demosse', function (req, res) {
res.writeHead(200, {
'Content-Type': 'text/event-stream',
'Cache-Control': 'no-cache',
'Connection': 'keep-alive',
});
res.write('\n');
sseDemo(req, res);
})
var server = app.listen(8081, function () {
})