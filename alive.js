var http = require('http');
http.createServer(function (req, res) {
  res.write("Bot's Ready Cok!");
  res.end();
}).listen(8080);
