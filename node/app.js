var http = require("http");
var fs = require("fs");
var url = require('url');
var template = require('art-template');

var comments = [
  {
    name:'小子',
    message:'今天打代码了吗？',
    dateTime:'2019-10-90'
  }
]

http
  .createServer(function(req, res) {
    //url.parse 将url路径解析为一个对象
    //第二个参数true 表示直接将查询字符串转为一个对象
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    if (pathname === "/") {
      fs.readFile("./views/index.html", function(err, data) {
        if (err) {
          return res.end("read index.html faild");
        }
        var ret = template.render(data.toString(),{
          comments:comments
        });
        res.end(ret);
      });
    } else if(pathname === '/post') {
      fs.readFile('./views/post.html', function(err, data) {
        if (err) {
          return res.end('read post file Fail');
        }
        res.end(data);
      })
    } else if (pathname.indexOf('/public/') === 0) {
      fs.readFile('.' + pathname, function(err, data) {
        if (err) {
          return res.end('file read fail');
        }
        res.end(data);
      })
    } else if (pathname === '/pinglun') {
      var comment = urlObj.query;
      comment.dateTime = new Date().toLocaleDateString() +' '+ new Date().toLocaleTimeString();
      comments.unshift(comment);
      //处理完数据之后让客户端重新请求/首页
      //服务端让客户端重定向的方法
      //1、状态码设置为302 临时重定向
      //2、在响应头中通过Location告诉客户端往哪重定向
      res.statusCode = 302;
      res.setHeader('Location', '/');
      res.end();
    } else {
      fs.readFile('./views/404.html', function(err, data) {
        if (err) {
          return res.end('file read Fail');
        }
        res.end(data);
      })
    }
  })
  .listen(3030);
