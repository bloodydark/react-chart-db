import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "./components/add-time-entry-form";
// import GetData from "./components/GetData";
import firebase from "./firebase";
import dayjs from "dayjs";

const BarChart = () => {
  // const now = dayjs();
  // console.log(now.subtract(7, "day").format());
  // console.log(now);
  const [chartData, setChartData] = useState({});
  const [dataArr, setDataArr] = useState(null);
  const [getDate, setGetDate] = useState(null);
  // const [items, setItems] = useState(null);
  const db = firebase.firestore().collection("times");
  // console.log(getDate);

  // useEffect(() => {
  //   // const startDate = new Date("Fri Nov 20, 2020");
  //   // const endDate = new Date("Fri Nov 19, 2020");
  //   // db.orderBy("DateTime", "asc")
  //   // .startAt(startDate)
  //   // .endAt(endDate)
  //   db.onSnapshot((querySnapshot) =>
  //  {
  //     const items = querySnapshot.docs.map((doc) => {
  //       return doc.data();
  //     });
  //     setItems(items);
  //     console.log(items);
  //   });
  // }, []);

  // const change = getDate.getTime;
  // console.log(change);

  const weekAgo = [];
  const week = [];
  // console.log(week);
  const day = [];
  const today = new Date();
  // console.log(today);
  for (let i = 0; i < 7; i++) {
    week[i] = today.getMonth() + 1 + "月" + today.getDate() + "日";
    today.setDate(today.getDate() - 1);
    day[i] = today.getDay();
    weekAgo.push({
      label: week[i],
      id: day[i],
      figure: 0,
    });
  }
  // console.log(...weekAgo);

  const figureList = weekAgo.map((el) => el.figure);
  // console.log(figureList);
  const moreWeek = new Date().getDate() - 7;
  // console.log(moreWeek);

  const reversedWeek = week.reverse();
  // console.log(reversedWeek);

  // const getgetday = firebase
  //   .firestore()
  //   .collection("times")
  //   .orderBy("DateTime")
  //   .limitToLast(3);
  // console.log(getgetday);

  // const timestamp =  firebase.firestore.Timestamp.fromDate(new Date())
  //   console.log(timestamp)
  // let queryInfo = firebase.firestore().collection("times").where("DateTime", ">", moreWeek )
  let now = dayjs();
  let weekAgo2 = now.subtract(7, "day").format();
  // console.log(weekAgo2);

  useEffect(() => {
    db.orderBy("DateTime").onSnapshot((snapshot) => {
      const test = snapshot.docs.map((doc) => {
        let item = doc.data();
        // console.log(item);
        let item2 = dayjs(item.getTime);
        item.getTime = item2;
        // console.log(item);
        if (item2.isAfter(weekAgo2) ) {
          console.log("Ok!");
          console.log(item);
          return item;
        } else {
          console.log("NO?");
        }
        // let item3 = item2.getDate();
        // console.log(item);

        // if (item2 < now.subtract(3, "day").format()) {
        //   console.log(item2);
        // } else {
        //   console.log("not weekago");
        // }
        // if (item > )
        // console.log(now);

        //   console.log(item2);
        // }

        // let now = new Date()

        // const weekJ = [];
        // const dayJ = [];
        // const todayJ = new Date();
        // for (let i = 0; i < 7; i++) {
        // weekJ[i] = todayJ.getMonth() + 1 + "月" + todayJ.getDate() + "日";
        // todayJ.setDate(todayJ.getDate() - 1);
        // dayJ[i] = todayJ.getDay();
        // }
        // weekAgo.push({
        //   label: week[i],
        //   id: day[i],
        //   figure: 0,
        // });
        // console.log(item);
        // if (item.getTime)
        // return item;

        // console.log(item);
      });
    });
  }, []);

  // useEffect(() => {
  //   db.orderBy("DateTime")
  //     // .where("item2", ">=", today - 7)
  //     .onSnapshot((snapshot) => {
  //       const test2 = snapshot.docs.map((doc) => {
  //         const store = doc.data();
  //         console.log(store);
  //         return store;
  //       });
  //     });
  // }, []);

  // let now = new Date();
  // let before = new Date();
  // const getWeek = [];
  // console.log(getWeek);
  // for (let i = 0; i < 7; i++) {
  //   getWeek.unshift(now.getDate() - i);
  // }

  // console.log(getDate);
  // useEffect(() => {
  //   const queryInfo = firebase
  //     .firestore()
  //     .collection("times")
  //     .orderBy("DateTime")
  //     .limitToLast(7);
  //   queryInfo.get().then((snapshot) => {
  //     const test2 = snapshot.docs.map((doc) => {
  //       let item = doc.data();
  //       let time = item.DateTime;
  //       let temp = item.temp;
  //       let datetime;

  //       if (time !== undefined && temp !== undefined) {
  //         datetime =

  //         return {
  //           time: datetime,
  //           temp: temp,
  //         };
  //       }
  //     });
  //     setDataArr(
  //       test2.map((t) => {
  //         return t.temp;
  //       })
  //     );
  //     setGetDate(
  //       test2.map((t) => {
  //         return t.time;
  //       })
  //     );
  //   });
  // }, []);

  return (
    <div className="App">
      {/* <GetData /> */}
      <div style={{ height: "500px", width: "500px" }}>
        <Line
          data={{
            labels: reversedWeek,
            datasets: [
              {
                label: " # Your trajectory",
                data: figureList,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            scales: {
              xAxes: [
                {
                  ticks: {
                    // maxTicksLimit: 3,
                  },
                },
              ],
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
            legend: {
              labels: {
                fontSize: 25,
              },
            },
          }}
        />
      </div>
      {/* {dataArr && dataArr.map((data) => <li key={data.temp}> {data.temp} </li>)} */}
    </div>
  );
};

export default BarChart;
