import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "./components/add-time-entry-form";
import firebase from "./firebase";

const BarChart = () => {
  const [chartData, setChartData] = useState({});
  const [dataArr, setDataArr] = useState(null);
  const [getdate, setGetDate] = useState(null);

  const queryInfo = firebase
    .firestore()
    .collection("times")
    .orderBy("DateTime");
  // console.log(queryInfo);

  //一週間前のデータを引っ張てくる
  const WeekAgo = () => {
    const today = new Date();
    console.log(today);

    // queryInfo.get();
  };
  WeekAgo();

  useEffect(() => {
    queryInfo.onSnapshot((snapshot) => {
      const test = snapshot.docs.map((doc) => {
        let item = doc.data();
        let time = item.DateTime;
        let temp = item.temp;
        let datetime;

        if (time !== undefined && temp !== undefined) {
          datetime = new Date().toDateString();

          return {
            time: datetime,
            temp: temp,
          };
        }
      });
      setDataArr(
        test.map((t) => {
          return t.temp;
        })
      );
      setGetDate(
        test.map((t) => {
          return t.time;
        })
      );
    });
  }, []);

  return (
    <div className="App">
      <div style={{ height: "500px", width: "500px" }}>
        <Line
          data={{
            labels: getdate,
            // labels: [
            //   "Mondidayay",
            //   "Tuesday",
            //   "Wednesday",
            //   "Thursday",
            //   "Friday",
            //   "Saturday",
            //   "Sunday",
            // ],
            datasets: [
              {
                label: " # Your trajectory",
                data: dataArr,
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
