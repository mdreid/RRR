var http = require('http');
var querystring = require('querystring');
var utils = require('utils');

case '/formhandler':

	if (req.method == 'POST') {
		var body = '';
		req.on('data', function(chunk) {
			body += chunk.toString();
		});

		req.on('end', function() {
			res.writeHead(200, "OK", {'Content-Type': 'text/html'});

			var decodedBody = querystring.parse(body);
			
			// for debugging
			res.write('<html><head><title>Post data</title></head><body><pre>');
      		res.write(utils.inspect(decodedBody));
      		res.write('</pre></body></html>');

      		sequelize = new Sequelize('')
      		sequelize.transaction(function(t) {
				Recorder.create({ recorder_firstname : decodedBody.firstR}, {recorder_lastname: decodedBody.lastR}, {recorder_email : decodedBody.emailR}, {recorder_password: decodedBody.pwdR}, {admin_code: decodedBody.admin}).success(function() {
				// what do we want the function to do upon successful receipt?
				})
			}
      
      		res.end();
		})
	}
	break;