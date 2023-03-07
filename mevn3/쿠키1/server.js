const http = require("http");
http
  .createServer((req, res) => {
    // console.log(req.headers.cookie);
    if (req.headers.cookie == undefined) {
      res.writeHead(200, {
        "Set-Cookie": [
          "yummy_cookie = choco; Secure; HttpOnly; Parmanent-cookies; Max-Age = 3600",
          "tasty_cookie = strawberry",
          `Parmanent-cookies; Max-Age = ${60 * 60}`,
        ],
      });
    }
    res.end("Cookie test!");
  })
  .listen(3000);
