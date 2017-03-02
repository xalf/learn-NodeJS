var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var mimeTypes = {
	'.js': 'text/javascript',
	'.html': 'text/html',
	'.css': 'text/css',
	'.jpg': 'image/jpeg',
	'.gif': 'image/gif',
	'.png': 'image/png',
	'.ico': 'image/x-icon'
};

http.createServer(function(req,res){
	var pathname = url.parse(req.url).pathname;
	var extname = path.extname(pathname);
	var mime = mimeTypes[extname];
	
	if(pathname == '/')
		pathname = '/index.html';
	pathname = pathname.substring(1, pathname.length);
	
	console.log(extname);
	
	if(extname == '.gif' || extname == '.jpg' || extname == '.png'){
		var img = fs.readFileSync('./' + pathname);
		res.writeHead(200, {'Content-Type': mime});
		res.end(img, 'binary');
	} else {
		fs.readFile(pathname, 'utf-8', function(err, data){
			if(err){
				console.log(err);
			} else {
				res.writeHead(200, {'Content-Type': mime});
				res.end(data);
			}
		});
	}
}).listen(8080);