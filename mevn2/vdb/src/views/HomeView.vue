<template>
  <h1>Vue.js + MongoDB CRUD</h1>
  <div>
    <h3><mark>Create</mark> on MongoDB</h3>
    제목 : <input type="text" v-model="title" /><br />
    일시 : <input type="date" v-model="date" /><br />
    내용 : <input type="text" v-model="content" style="width: 400px" />
    <button @click="dbc()">전송</button>
    <h4>{{ data }}</h4>
    <hr />
    <h3><mark>Read</mark> on MongoDB</h3>
    일시 : <input type="date" v-model="date2" /><br />
    <button @click="dbr()">읽어오기</button>
    <h4>{{ data2 }}</h4>
    <hr />
    <h3><mark>Update</mark> on MongoDB</h3>
    제목 : <input type="text" v-model="title3" /><br />
    일시 : <input type="date" v-model="date3" /><br />
    내용 : <input type="text" v-model="content3" style="width: 400px" />
    <button @click="dbu()">1개 데이터 수정</button>
    <h4>{{ data3 }}</h4>
    <hr />
    <h3><mark>Delete</mark> on MongoDB</h3>
    일시 : <input type="date" v-model="date4" /><br />
    <button @click="dbd()">1개 데이터 삭제</button>
    <h4>{{ data4 }}</h4>
    <hr />
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
export default {
  name: "app",
  data() {
    return {
      /* crud용 */
      data: "",
      data2: "",
      data3: "",
      data4: "",
      // 오늘 날짜 초기값으로 넣어주기.
      date: new Date().toISOString().substring(0, 10),
      date2: new Date().toISOString().substring(0, 10),
      date3: new Date().toISOString().substring(0, 10),
      date4: new Date().toISOString().substring(0, 10),
      /* //crud용 */
      title: "", // create용
      content: "", // create용
      title3: "", // update용
      content3: "", // update용
    };
  },
  methods: {
    dbc() {
      this.data = "DB에 저장 중..."; // 스피너 역할.
      axios
        .post("/dbc", {
          title: this.title,
          content: this.content,
          date: this.date,
        })
        .then((res) => (this.data = res.data));
    },
    dbr() {
      this.data2 = "DB에서 불러오는 중..."; // 스피너 역할.
      axios.get("/dbr/" + this.date2).then((res) => (this.data2 = res.data));
    },
    dbu() {
      this.data3 = "DB 내용 수정 중..."; // 스피너 역할.
      axios
        .post("/dbu", {
          title: this.title3,
          content: this.content3,
          date: this.date3,
        })
        .then((res) => (this.data3 = res.data));
    },
    dbd() {
      if (confirm("삭제하시겠습니까?")) {
        this.data4 = "DB 내용 삭제 중..."; // 스피너 역할.
        axios.get("/dbd/" + this.date4).then((res) => (this.data4 = res.data));
      }
    },
  },
};
</script>

<style></style>
