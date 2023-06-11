// @a.ertekin - 91220001774 - ATAKAN ERTEKİN

var sensor1 = [0];
var sensor2 = [0];
var index = 0;
var str = "";
var str_single="";

function generateData()
{
	var x = Math.floor( Math.random() * 39 + 1);
	var y = Math.floor( Math.random() * 39 + 1);

	var strVal= "";

	sensor1[1] = index;
	sensor1[2] = x;
	sensor1[3] = y;

	sensor2[1] = index;
	sensor2[2] = x;
	sensor2[3] = y;

	index = index + 1;
	strVal = sendToJSON();

	return strVal;
}

function sendToJSON() {
  var jsonData = JSON.stringify({
    sensor1: sensor1.slice(1),
    sensor2: sensor2.slice(1)
  });
  return jsonData;
}

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
			str = generateData();	
			res.writeHead(200, {'Content-Type': 'text/html'});
			data = data.toString().replace("$$$",str)
			data = data.replace("@@@",str_single)
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
			//console.log(message);
			
			if( message.utf8Data == 1 )
			{
					str = generateData();
					connection.send(str);
					console.log("Send:" + str);				
			}
			else
			{
				//Nothing
			}

		}
	});
});
server.listen(8081);