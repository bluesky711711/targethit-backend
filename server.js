var http = require('http');
var https = require('https');

var app = require('./app');
var fs = require('fs')
var port = process.env.PORT || 3000; 	  // set our port
var host = process.env.HOST || '0.0.0.0'; // For Heroku to run successfully
///var/cpanel/ssl/cpanel/mycpanel.pem
https.createServer({
	key: fs.readFileSync('key.pem'),
	cert: fs.readFileSync('cert.pem')
},app).listen(port, host, () => {
	console.log("Server ready at http://" + host + ":" + port);
});
