var express = require('express');
var app = express();
var fs = require('fs');

var sensor1 = [0];
var sensor2 = [0];
var index = 1;
var str = "";

function generateData() {
	var x = Math.floor(Math.random() * 100);
	var y = Math.floor(Math.random() * 100);

	sensor1.push(x);
	sensor2.push(y);

	sensorToString();

	index++;
}

function sensorToString() {
	str += ",[" + index + "," + sensor1[index] + "," + sensor2[index] + "]";
}

app.use(express.static('public'));


setInterval ( generateData , 1000 );


app.get('/', function(req, res) {
	//res.sendFile(__dirname + "/" + "index.html" );

	generateData();

	fs.readFile("./index.html", 'utf8', function(err, data) {
		res.writeHead(200, { 'Content-Type': 'text/html' });
		// data string olarak gelecek artık $$$ yerine istenilen veriler gözükecek
		data = data.replace("$$$", str );
		console.log(data);
		res.write(data);
		res.end();
	});
});

app.get('/submitData', function(req, res) {
	response = {
		first_name: req.query.first_name,
		last_name: req.query.last_name
	};
	res.end(JSON.stringify(response));
});

var server = app.listen(8080, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log("Example app listening at http://%s:%s", host, port);
});
