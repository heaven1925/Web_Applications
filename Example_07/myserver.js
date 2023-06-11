

var http = require('http');
var WebSocketServer = require('websocket').server;
var fs=require('fs');
var url = require('url');


server=http.createServer(function (req, res)
{
	var p = url.parse(req.url, true).pathname;
	if( p=="/" )
	{
		fs.readFile('./index.html', function(err, data) 
		{
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(data);
			res.end();
		});
	}
});

var wsServer = new WebSocketServer({httpServer: server});

wsServer.on('request', function(request)
{
	console.log(request);
	var connection = request.accept(null, request.origin);
	connection.on('message', function(message) 
	{
		if (message.type === 'utf8') 
		{
			console.log(message);
			connection.send(message.utf8Data)
		}
	});
});
server.listen(8081);