import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "./components/add-time-entry-form";
import firebase from "./firebase";

const BarChart = () => {
  const db = firebase.firestore().collection("times");
  const [filledWeek, set_filledWeek] = useState([]);

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
  const init_arrayWeeks = () => {
    const jsWeekAgo = [];
    let today = new Date();
    today.setDate(today.getDate() + 1);
    const infoWeek = [];
    const infoDay = [];
    const subtract = 1;
    const max = 6;
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
    const reversedWeek = infoWeek.reverse();
    const weeksObj = {
      weekLabel: reversedWeek,
      weekData: jsWeekAgo,
    };
    return weeksObj;
  };

  // const getDayList = init_Week().map((el) => el.jsGetDay);

  useEffect(() => {
    set_filledWeek(init_arrayWeeks().weekData);
    db.where(
      "DateTime",
      ">",
      firebase.firestore.Timestamp.fromDate(zeroAdjust())
    )
      .orderBy("DateTime")
      .onSnapshot((snapshot) => {
        console.log(snapshot);
        snapshot.docs.map((doc) => {
          console.log("hello");
          const item = doc.data();
          console.log(item);
          const receivedDay = item.getday;
          const hours = item.temp;
          // console.log(filledWeek.length);
          for (let i = 0; i < filledWeek.length; i++) {
            const tempWeek = filledWeek;
            if (receivedDay === filledWeek[i].jsGetDay) {
              set_filledWeek((tempWeek[i].initNum = hours));
            }
            console.log(tempWeek);
          }
        });
      });
  }, []);
  // console.log(filledWeek);

  return (
    <div className="App">
      {/* <GetData /> */}
      <div style={{ height: "500px", width: "500px" }}>
        <Line
          data={{
            labels: init_arrayWeeks().weekLabel,
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
