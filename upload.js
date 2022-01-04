/*
	
	文件上传服务端  Node.js实现断点续传
	https://www.jb51.net/article/215712.htm

*/

// 使用express构建服务器api
const express = require("express");
// 引入上传文件逻辑代码
const upload = require("./upload_file");
let bodyParser = require('body-parser');
const app = express();

// 处理所有响应，设置跨域
app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With ");
  res.header("X-Powered-By", " 3.2.1");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
 
app.use(bodyParser.json({ type: "application/*+json" }));
// 视频上传（查询当前切片数）
app.post("/getSize", upload.getSize);
// 视频上传接口
app.post("/video", upload.video);
 
// 开启本地端口侦听
app.listen(8081);