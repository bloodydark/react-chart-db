import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "./components/add-time-entry-form";
import firebase from "./firebase";

const BarChart = () => {
  const db = firebase.firestore().collection("times");
  const [weekData, set_weekData] = useState([]);

  const zeroAdjust = () => {
    let agoDate = new Date();
    let agoWeek = agoDate.setDate(agoDate.getDate() - 6);
    let hope = new Date(agoWeek);
    let zero = hope.setHours(0);
    let one = new Date(zero);
    let two = one.setMinutes(0);
    let three = new Date(two);
    let four = three.setSeconds(0);
    let five = new Date(four);
    return five;
  };

  /////////////////////////////////////
  //こちらはgetdayと日付が一致している
  ////////////////////////////////////
  const jsWeekAgo = [];

  let today = new Date();
  today.setDate(today.getDate() + 1);
  let infoWeek = [];
  let infoDay = [];
  let subtract = 1;
  let max = 6;
  for (let i = 0; i <= max; i++) {
    today.setDate(today.getDate() - subtract);
    infoWeek[i] = today.getMonth() + 1 + "/" + today.getDate();
    infoDay[i] = today.getDay();
    jsWeekAgo.push({
      label: infoWeek[i],
      jsGetDay: infoDay[i],
      initNum: 0,
    });
  }
  //   console.log(...jsWeekAgo.jsGetDay);
  let reversedWeek = infoWeek.reverse();
  console.log(reversedWeek);
  const getDayList = jsWeekAgo.map((el) => el.jsGetDay);
  //   console.log(getDayList);

  //   const useWeekAgo = [...jsWeekAgo];
  console.log(jsWeekAgo);

  useEffect(() => {
    db.where(
      "DateTime",
      ">",
      firebase.firestore.Timestamp.fromDate(zeroAdjust())
    )
      .orderBy("DateTime")
      .onSnapshot((snapshot) => {
        const test = snapshot.docs.map((doc) => {
          let item = doc.data();
          let getDay = item.getDay;
          let hours = item.temp;

          //   if (getDay === )
          return item;
        });
        console.log(test);
      });
  }, []);

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
                // data: figureList,
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
