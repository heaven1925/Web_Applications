var http = require('http');
var url = require('url');

http.createServer(function (req, res) {
res.writeHead(200, {'Content-Type': 'text/html'});
var q = url.parse(req.url, true).query;
var txt = q.sensorID + " " + q.value;
res.end(txt);
console.log(req.url+"\n");
console.log(txt);
}).listen(8080);
console.log("HTTP Server Started!\n");
