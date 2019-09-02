const http = require("http"),
      formidable = require("formidable"),
      server = http.createServer(),
      PORT = 3001;

server.on("request", function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method === "POST") {

    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.uploadDir = __dirname + "/downloaded";

    form.on ('fileBegin', function(name, file){
      console.log('Uploading: '+file.name);
        file.path = form.uploadDir + "/" + file.name;
    });
    form.on('end',function(){
	  res.end('Uploaded!');
      console.log('Files saved!');
    });

    form.on('error', function(err) {
		res.end("Something has gone wrong: " + err);
        throw err;
    });
	
    form.parse(req);
  }
});

server.on("listening", function() {
  console.log("Listening!");
});

server.listen(PORT);
