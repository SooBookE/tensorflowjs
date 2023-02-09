require("dotenv").config();
const request = require("request");
// axios로 해도 되지만, 공부를 위해 request로 가르쳐 주심.
// 뷰에서는 axios나 socket? 쓰는게 나을 듯.

const REST_API_KEY = process.env.kogpt;
// console.log(REST_API_KEY);
function kogptApi(prompt, max_tokens = 32, temperature, topP, n) {
  const url = "https://api.kakaobrain.com/v1/inference/kogpt/generation";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `KakaoAK ${REST_API_KEY}`,
  };
  const options = {
    url,
    method: "POST",
    body: {
      prompt,
      max_tokens,
      temperature,
      top_p: topP, // 카멜법 안 쓰면 뷰에서 난리치니까 매개변수를 topP로 변경해줬다.
      n,
    },
    headers,
    json: true,
  };

  request.post(options, (e, res, body) => {
    const rst = body;
    console.log(rst);
  });
}
const prompt = "둥글게 둥글게";
kogptApi(prompt, 32, 0.5, 0.7, 1);
