/*
	
	文件上传服务端 node接口--接收前端上传的文件

*/

var fs = require('fs');
var express = require('express');
var app = express();
var formidable = require('formidable');

app.post('/upload', function(req, res) {//前端调用地址：  http://ip:8000/upload
  var form = new formidable.IncomingForm(),
    data;

  // formidable 属性设置可以参考 github 上说明
  form.uploadDir = './uploads';
  form.encoding = 'utf-8';
  form.keepExtensions = true;
  form.maxFieldsSize = 1024 * 1024 * 50; // 50MB

  form.parse(req, function(err, fields, files) {
    console.log('on parse');
    res.writeHead(200, {'content-type': 'text/plain'});
    data = files.fileToUpload;
    res.end(JSON.stringify(data));//返回调用结果
  });

  // 我们可以在文件上传完成后移到放置文件的目标目录
  form.on('end', function() {
    fs.renameSync(data.path, './uploads/'+ data.name);
  });
});


var server = app.listen(8000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
