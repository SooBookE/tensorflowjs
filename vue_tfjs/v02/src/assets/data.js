exports.data = {
  labels: [
    "Eating",
    "Drinking",
    "Sleeping",
    "Designing",
    "Coding",
    "Cycling",
    "Running",
  ],
  datasets: [
    {
      label: "My First Dataset",
      data: [65, 59, 90, 81, 56, 55, 40],
      fill: true,
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgb(255, 99, 132)",
      pointBackgroundColor: "rgb(255, 99, 132)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgb(255, 99, 132)",
    },
    {
      label: "My Second Dataset",
      data: [38, 48, 40, 19, 96, 37, 100],
      fill: true,
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgb(54, 162, 235)",
      pointBackgroundColor: "rgb(54, 162, 235)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgb(54, 162, 235)",
    },
  ],
};
// export const data={...} // 방식1. 받는 쪽에선 import {data} from '경로'

// const data = {...} // 방식2. 받는 쪽에선 import {data} from '경로'
// export { data };
// export { data as dd };

// export default{...}; // 방식3. 받는 쪽에선 import data from '경로'. ※ 하나만 내보낼 때
// export { data as default };

// exports.data = {...} // 방식4. 받는 쪽에선 import {data} from '경로'

// 받을 때 import * as 객체이름 from '경로'
// 이렇게 하면 사용하는 쪽에서는 객체이름.키 이렇게 속성이나 메소드를 사용할 수 있다.
