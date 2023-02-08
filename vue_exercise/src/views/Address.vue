<template>
  <div>[짧은 주소 변환 예제]</div>
  <button @click="check()">console.log로 env 체크하기.</button>
  <hr />
  <textarea
    name=""
    id=""
    cols="30"
    rows="10"
    v-model="inData"
    placeholder="변환할 주소를 입력하세요."
  ></textarea>
  <button @click="getTrans()">짧은주소로변환</button>
  <textarea
    readonly
    name=""
    id=""
    cols="30"
    rows="10"
    :vlaue="trans"
  ></textarea>
</template>

<script>
import axios from "axios";

export default {
  name: "app",
  data() {
    return {
      inData: "",
      trans: "",
    };
  },
  methods: {
    check() {
      console.log(process.env.VUE_APP_ID);
      console.log(process.env.VUE_APP_PW);
    },
    getTrans: async function () {
      this.trans = "변환중.....";
      // const cid = process.env.VUE_APP_ID;
      // const csecret = process.env.VUE_APP_PW;

      const query = encodeURI(this.inData);
      // console.log(query);

      const url = "/v1/util/shorturl";

      const frm = new FormData();
      frm.append("url", query);

      await axios
        .post(url, frm, {
          headers: {
            "Content-Type": "plain/text",
            "X-Naver-Client-Id": "n_FWLqY7W0auvuhlNrRl",
            "X-Naver-Client-Secret": "LnnVWfJgMG",
          },
        })
        .then((res) => {
          // const rst = res
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style></style>
