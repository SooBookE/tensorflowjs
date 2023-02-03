const express = require("express");
const app = express();
const logger = require("morgan");

const path = require("path");
const _path = path.join(__dirname, "/dist");

const cw = require("./public/crawling.js");
// console.log(cw);

// 파파고를 위해 모듈 설치.
// npm i http-proxy-middleware
const { createProxyMiddleware } = require("http-proxy-middleware");
app.use(
  createProxyMiddleware("/v1", {
    target: "https://openapi.naver.com",
    changeOrigin: true,
  })
);
// 새로고침하면 화면 닫힌다. 뷰의 특성. 이를 방지하려면 모듈 설치해줘야 한다.
// npm i connect-history-api-fallback
const history = require("connect-history-api-fallback");
app.use(history());

app.use("/", express.static(_path));
app.use(logger("tiny"));
app.get("/hak", (req, res) => {
  //   res.send("연결 잘 됐나.");
  //   res.send('<script>alert("연결 잘 됐나.")</script>') // 왜 안돼??
  //   res.send(cw.ax()); // 이건 안 될까? 안 되네.
  cw.ax().then((v) => {
    // res.send("연결 잘 됐나.");
    console.log(v);
    res.send(v);
  });
});

app.listen(3000, () => console.log("연결"));
