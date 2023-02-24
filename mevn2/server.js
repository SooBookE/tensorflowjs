require("dotenv").config();
const express = require("express");
const history = require("connect-history-api-fallback");
const logger = require("morgan");
const path = require("path");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();

// ProxyMiddleware 참고용 구문 작성.
app.use(
  createProxyMiddleware("/v1", {
    target: "https://openapi.naver.com",
    changeOrigin: true,
  })
);

// 몽고DB 시작.
const VSchema = require("./mdb.cjs");
const _path = path.join(__dirname, "./vdb/dist");
app.use("/", express.static(_path));
app.use(logger("tiny"));
// 포스트 방식 자료 파싱용 미들웨어 구문.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// //포스트 방식 자료 파싱용 미들웨어 구문.

/* 몽고DB CRUD */
// 쓰기(create, update) => POST 사용.
// 읽기/지우기(read, delete) => GET 사용.

// Create of CRUD
app.post("/dbc", (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const date = req.body.date;
  // 즉시 실행 함수로 실행.(윗 단에 ;를 달아줘야 즉시 실행 함수 동작 가능.)
  (async () => {
    const _data = { title, content, date };
    const vs = await new VSchema(_data);
    const t = await vs.save();
    console.log(t); // 확인용.
    res.send("생성 완료.");
  })();
});

// Read of CRUD
app.get("/dbr/:date", (req, res) => {
  // 패쓰 방식.
  const date = req.params.date;
  // 즉시 실행 함수 사용해도 되지만, 일부러 다른 방식으로 해보기.
  const read = async () => {
    const t = await VSchema.find({ date }, { _id: 0, __v: 0 })
      .lean() // 거의 Read에서만 사용한다.
      .then((t) => {
        res.send(t);
        console.log(t); // 확인용.
      });
  };
  read();
});

// Update of CRUD
app.post("/dbu", (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const date = req.body.date;
  // 즉시 실행 함수로 실행.(윗 단에 ;를 달아줘야 즉시 실행 함수 동작 가능.)
  (async () => {
    const t = await VSchema.updateOne(
      {
        date,
      },
      {
        $set: {
          title,
          content,
          date,
        },
      },
      {
        upsert: true,
      }
    );
    console.log(t); // 확인용.
    res.send("수정 완료.");
  })();
});

// Delete of CRUD
app.get("/dbd/:date", (req, res) => {
  // 패쓰 방식.
  const date = req.params.date;
  const t = VSchema.deleteOne({
    date: {
      $eq: date,
    },
  }).then((t) => {
    console.log(t); // 확인용.
    res.send("삭제 완료.");
  });
});
/* //몽고DB CRUD */

app.listen(3000, () => console.log("3000포트로 서버 시작."));
