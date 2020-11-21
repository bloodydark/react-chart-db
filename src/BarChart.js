import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "./components/add-time-entry-form";
// import GetData from "./components/GetData";
import firebase from "./firebase";

const BarChart = () => {
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
  const day = [];
  const today = new Date();
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
  useEffect(() => {
    db.orderBy("DateTime").onSnapshot((snapshot) => {
      const test = snapshot.docs.map((doc) => {
        let item = doc.data();
        // console.log(item);
        let item2 = new Date(item.getTime);
        item.getTime = item2;
        // console.log(item);
        console.log(item);
        return item;
      });


      
      // setGetDate(
      //   test.map((el) => {
      //     return el.new Date(item)
      //   })
      // )
      // setGetDate(
      //   test.map((el) => {
      //     return el.new Date(item2)
      //   })
      // )
      // getDate(
      //   test2.map((el) => {
      //     console.log(el.getTime);
      //     return el.getTime;
      //   })
      // );
    });
  }, []);
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
