var http = require("http");
var fs = require("fs");
var url = require("url");
var querystring = require("querystring");

http
  .createServer(function(req, res) {
      //将url地址字符串转化为对象,并获取query部分
    var arg = url.parse(req.url).query;
    //querystring.parse 将参数字符串转化为参数对象
    var params = querystring.parse(arg);
    if (params.code === 'xiaozi') {
      res.end(params.callback + "({'name':'小子'})");
    }
  })
  .listen(3330);


//简单请求
// http
//   .createServer(function(req, res) {
//     fs.readFile("./ceshi.js", function(err, data) {
//       if (err) {
//         return console.log("404 not found");
//       }
//       res.end(data);
//     });
//   })
//   .listen(3330);
